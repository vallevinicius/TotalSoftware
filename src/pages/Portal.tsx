import { useEffect, useState } from 'react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { usePortalAuth } from '../hooks/usePortalAuth'
import {
  createEstabelecimento,
  createPagamentoCheckoutSession,
  createPagamentoPortalSession,
  fetchPortalPlanos,
  PortalApiError,
  type PortalCadastroParams,
  type PortalEstabelecimento,
  type PortalMensalidade,
  type PortalMeResponse,
  type PortalPlano,
} from '../lib/portalApi'
import { buscarEnderecoPorCep, maskCep, maskCnpj, maskCpf, maskTelefone } from '../lib/masks'

type PendingPlano =
  | { produto: 'totalagenda'; planoNome: string }
  | { produto: 'totalpousada'; planoNome: string }
  | { produto: 'totalcontrol'; planoNome: string }

function formatMoney(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function formatMonth(dateStr: string) {
  const [year, month] = dateStr.split('-')
  return new Date(Number(year), Number(month) - 1, 1).toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  })
}

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}

function normalizeUrl(url: string) {
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(url) ? url : `https://${url}`
}

const STATUS_LABEL: Record<PortalMensalidade['status'], string> = {
  pago: 'Pago',
  pendente: 'Pendente',
  atrasado: 'Atrasado',
}

function StatusBadge({ status }: { status: PortalMensalidade['status'] }) {
  return <span className={`portal-status portal-status-${status}`}>{STATUS_LABEL[status]}</span>
}

export default function Portal() {
  useDocumentTitle('Área do cliente | Total Software')
  const { token, data, loading, error, login, cadastro, logout, refresh } = usePortalAuth()
  const [checkoutBanner, setCheckoutBanner] = useState<'success' | 'cancelled' | null>(null)
  const [pendingPlano, setPendingPlano] = useState<PendingPlano | null>(null)
  const [authMode, setAuthMode] = useState<'login' | 'cadastro'>('login')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    let changed = false

    const checkout = params.get('checkout')
    if (checkout === 'success' || checkout === 'cancelled') {
      setCheckoutBanner(checkout)
      if (token) refresh()
      params.delete('checkout')
      changed = true
    }

    const produto = params.get('produto')
    const plano = params.get('plano')
    if ((produto === 'totalagenda' || produto === 'totalpousada' || produto === 'totalcontrol') && plano) {
      setPendingPlano({ produto, planoNome: plano })
      params.delete('produto')
      params.delete('plano')
      changed = true
    }

    if (params.get('modo') === 'cadastro') {
      setAuthMode('cadastro')
      params.delete('modo')
      changed = true
    }

    if (changed) {
      const newSearch = params.toString()
      window.history.replaceState(null, '', window.location.pathname + (newSearch ? `?${newSearch}` : ''))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="page-content">
      <div className="section-header centered">
        <span className="section-number">Portal</span>
        <div>
          <h2 className="section-title">Área do cliente</h2>
          <p className="section-sub">
            Acompanhe seus produtos e a situação da sua mensalidade.
          </p>
        </div>
      </div>

      {checkoutBanner && (
        <p className={`portal-checkout-banner portal-checkout-banner-${checkoutBanner}`}>
          {checkoutBanner === 'success'
            ? 'Pagamento automático ativado com sucesso.'
            : 'Ativação cancelada. Você pode tentar novamente quando quiser.'}
        </p>
      )}

      {!token || (!data && !loading) ? (
        <PortalAuthGate
          pendingPlano={pendingPlano}
          initialTab={pendingPlano ? 'cadastro' : authMode}
          loading={loading}
          error={error}
          onLogin={login}
          onCadastro={cadastro}
        />
      ) : loading && !data ? (
        <p className="portal-loading">Carregando seus dados...</p>
      ) : data ? (
        <>
          {pendingPlano && token && (
            <PendingCheckoutCard
              token={token}
              pendingPlano={pendingPlano}
              onDone={() => setPendingPlano(null)}
            />
          )}
          <PortalDashboard token={token!} data={data} onLogout={logout} />
        </>
      ) : null}
    </section>
  )
}

function PortalAuthGate({
  pendingPlano,
  initialTab,
  loading,
  error,
  onLogin,
  onCadastro,
}: {
  pendingPlano: PendingPlano | null
  initialTab: 'cadastro' | 'login'
  loading: boolean
  error: string | null
  onLogin: (email: string, senha: string) => Promise<boolean>
  onCadastro: (params: PortalCadastroParams) => Promise<boolean>
}) {
  const [tab, setTab] = useState<'cadastro' | 'login'>(initialTab)

  return (
    <div className="portal-auth-gate">
      {pendingPlano && (
        <p className="portal-plano-banner">
          Plano <strong>{pendingPlano.planoNome}</strong> do {PRODUTO_LABEL[pendingPlano.produto]} selecionado. Crie
          sua conta ou entre para continuar.
        </p>
      )}
      <div className="portal-auth-tabs">
        <button
          type="button"
          className={`portal-auth-tab${tab === 'cadastro' ? ' is-active' : ''}`}
          onClick={() => setTab('cadastro')}
        >
          Criar conta
        </button>
        <button
          type="button"
          className={`portal-auth-tab${tab === 'login' ? ' is-active' : ''}`}
          onClick={() => setTab('login')}
        >
          Já sou cliente
        </button>
      </div>
      {tab === 'cadastro' ? (
        <PortalCadastroForm loading={loading} error={error} onSubmit={onCadastro} />
      ) : (
        <PortalLoginForm loading={loading} error={error} onSubmit={onLogin} />
      )}
    </div>
  )
}

const emptyCadastroForm = {
  nome: '',
  email: '',
  senha: '',
  telefone: '',
  cpf: '',
  dataNascimento: '',
  cep: '',
  rua: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
  cargo: '',
}

function PortalCadastroForm({
  loading,
  error,
  onSubmit,
}: {
  loading: boolean
  error: string | null
  onSubmit: (params: PortalCadastroParams) => Promise<boolean>
}) {
  const [form, setForm] = useState(emptyCadastroForm)
  const [buscandoCep, setBuscandoCep] = useState(false)

  async function handleCepBlur() {
    const digits = form.cep.replace(/\D/g, '')
    if (digits.length !== 8) return

    setBuscandoCep(true)
    const endereco = await buscarEnderecoPorCep(form.cep)
    setBuscandoCep(false)
    if (!endereco) return

    setForm((prev) => ({
      ...prev,
      rua: endereco.rua || prev.rua,
      bairro: endereco.bairro || prev.bairro,
      cidade: endereco.cidade || prev.cidade,
      estado: endereco.estado || prev.estado,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSubmit({
      nome: form.nome,
      email: form.email,
      senha: form.senha,
      telefone: form.telefone || undefined,
      cpf: form.cpf || undefined,
      dataNascimento: form.dataNascimento || undefined,
      cep: form.cep || undefined,
      rua: form.rua || undefined,
      numero: form.numero || undefined,
      complemento: form.complemento || undefined,
      bairro: form.bairro || undefined,
      cidade: form.cidade || undefined,
      estado: form.estado || undefined,
      cargo: form.cargo || undefined,
    })
  }

  return (
    <form className="portal-login-card portal-cadastro-form" onSubmit={handleSubmit}>
      <div className="portal-form-section">
        <h5 className="portal-form-section-title">Dados pessoais</h5>
        <div className="portal-login-field">
          <label htmlFor="cadastro-nome">Nome</label>
          <input
            id="cadastro-nome"
            type="text"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            autoComplete="name"
            required
          />
        </div>
        <div className="portal-login-field">
          <label htmlFor="cadastro-email">E-mail</label>
          <input
            id="cadastro-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            autoComplete="email"
            required
          />
        </div>
        <div className="portal-login-field">
          <label htmlFor="cadastro-senha">Senha</label>
          <input
            id="cadastro-senha"
            type="password"
            value={form.senha}
            onChange={(e) => setForm({ ...form, senha: e.target.value })}
            autoComplete="new-password"
            minLength={6}
            required
          />
        </div>
        <div className="portal-login-field">
          <label htmlFor="cadastro-telefone">Telefone</label>
          <input
            id="cadastro-telefone"
            type="tel"
            value={form.telefone}
            onChange={(e) => setForm({ ...form, telefone: maskTelefone(e.target.value) })}
            autoComplete="tel"
          />
        </div>
        <div className="portal-login-field">
          <label htmlFor="cadastro-cpf">CPF</label>
          <input
            id="cadastro-cpf"
            type="text"
            value={form.cpf}
            onChange={(e) => setForm({ ...form, cpf: maskCpf(e.target.value) })}
            inputMode="numeric"
            maxLength={14}
          />
        </div>
        <div className="portal-login-field">
          <label htmlFor="cadastro-data-nascimento">Data de nascimento</label>
          <input
            id="cadastro-data-nascimento"
            type="date"
            value={form.dataNascimento}
            onChange={(e) => setForm({ ...form, dataNascimento: e.target.value })}
          />
        </div>
        <div className="portal-login-field">
          <label htmlFor="cadastro-cargo">Cargo / função</label>
          <input
            id="cadastro-cargo"
            type="text"
            value={form.cargo}
            onChange={(e) => setForm({ ...form, cargo: e.target.value })}
          />
        </div>
      </div>

      <div className="portal-form-section">
        <h5 className="portal-form-section-title">Endereço</h5>
        <div className="portal-login-field">
          <label htmlFor="cadastro-cep">CEP</label>
          <input
            id="cadastro-cep"
            type="text"
            value={form.cep}
            onChange={(e) => setForm({ ...form, cep: maskCep(e.target.value) })}
            onBlur={handleCepBlur}
            inputMode="numeric"
            maxLength={9}
            disabled={buscandoCep}
          />
        </div>
        <div className="portal-login-field">
          <label htmlFor="cadastro-rua">Rua</label>
          <input
            id="cadastro-rua"
            type="text"
            value={form.rua}
            onChange={(e) => setForm({ ...form, rua: e.target.value })}
          />
        </div>
        <div className="portal-login-field">
          <label htmlFor="cadastro-numero">Número</label>
          <input
            id="cadastro-numero"
            type="text"
            value={form.numero}
            onChange={(e) => setForm({ ...form, numero: e.target.value })}
          />
        </div>
        <div className="portal-login-field">
          <label htmlFor="cadastro-complemento">Complemento</label>
          <input
            id="cadastro-complemento"
            type="text"
            value={form.complemento}
            onChange={(e) => setForm({ ...form, complemento: e.target.value })}
          />
        </div>
        <div className="portal-login-field">
          <label htmlFor="cadastro-bairro">Bairro</label>
          <input
            id="cadastro-bairro"
            type="text"
            value={form.bairro}
            onChange={(e) => setForm({ ...form, bairro: e.target.value })}
          />
        </div>
        <div className="portal-login-field">
          <label htmlFor="cadastro-cidade">Cidade</label>
          <input
            id="cadastro-cidade"
            type="text"
            value={form.cidade}
            onChange={(e) => setForm({ ...form, cidade: e.target.value })}
          />
        </div>
        <div className="portal-login-field">
          <label htmlFor="cadastro-estado">Estado</label>
          <input
            id="cadastro-estado"
            type="text"
            value={form.estado}
            onChange={(e) => setForm({ ...form, estado: e.target.value.toUpperCase() })}
            maxLength={2}
            placeholder="Ex.: SP"
          />
        </div>
      </div>

      {error && <p className="portal-error">{error}</p>}
      <button type="submit" className="portfolio-link portal-login-submit" disabled={loading}>
        {loading ? 'Criando conta...' : 'Criar conta e continuar'}
      </button>
    </form>
  )
}

const PRODUTO_LABEL: Record<PendingPlano['produto'], string> = {
  totalagenda: 'TotalAgenda',
  totalpousada: 'Total Pousada',
  totalcontrol: 'TotalControl',
}

function PendingCheckoutCard({
  token,
  pendingPlano,
  onDone,
}: {
  token: string
  pendingPlano: PendingPlano
  onDone: () => void
}) {
  const [nomeEmpresa, setNomeEmpresa] = useState('')
  const [nomePousada, setNomePousada] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')
  const [diaVencimento, setDiaVencimento] = useState('10')
  const [nomeFantasia, setNomeFantasia] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [nomeProprietario, setNomeProprietario] = useState('')
  const [razaoSocial, setRazaoSocial] = useState('')
  const [senhaAdmin, setSenhaAdmin] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleConfirmar(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const planos = await fetchPortalPlanos(pendingPlano.produto)
      const plano = planos.find((p) => p.nome === pendingPlano.planoNome)
      if (!plano) {
        setError('Não foi possível encontrar este plano. Fale conosco.')
        setLoading(false)
        return
      }

      let url: string
      if (pendingPlano.produto === 'totalagenda') {
        ;({ url } = await createPagamentoCheckoutSession(token, {
          produto: 'totalagenda',
          planoId: plano.id,
          nomeEmpresa,
          nomeFantasia,
          cnpj,
          nomeProprietario,
        }))
      } else if (pendingPlano.produto === 'totalcontrol') {
        ;({ url } = await createPagamentoCheckoutSession(token, {
          produto: 'totalcontrol',
          planoId: plano.id,
          nomeFantasia,
          cnpj,
          razaoSocial: razaoSocial || undefined,
          senhaAdmin,
        }))
      } else {
        const { estabelecimento } = await createEstabelecimento(token, {
          nome: nomePousada,
          cidade,
          estado,
          diaVencimento: Number(diaVencimento) || undefined,
          planoId: plano.id,
        })
        ;({ url } = await createPagamentoCheckoutSession(token, {
          produto: 'totalpousada',
          estabelecimentoId: estabelecimento.id,
        }))
      }

      window.location.href = url
    } catch (err) {
      setError(err instanceof PortalApiError ? err.message : 'Não foi possível iniciar o pagamento.')
      setLoading(false)
    }
  }

  return (
    <form className="portal-login-card portal-pending-plano" onSubmit={handleConfirmar}>
      <p className="portal-plano-banner">
        Assinar plano <strong>{pendingPlano.planoNome}</strong> do {PRODUTO_LABEL[pendingPlano.produto]}
      </p>

      {pendingPlano.produto === 'totalagenda' && (
        <>
          <div className="portal-login-field">
            <label htmlFor="pending-nome-fantasia-agenda">Nome fantasia</label>
            <input
              id="pending-nome-fantasia-agenda"
              type="text"
              value={nomeFantasia}
              onChange={(e) => setNomeFantasia(e.target.value)}
              required
            />
          </div>
          <div className="portal-login-field">
            <label htmlFor="pending-nome-empresa">Nome da empresa</label>
            <input
              id="pending-nome-empresa"
              type="text"
              value={nomeEmpresa}
              onChange={(e) => setNomeEmpresa(e.target.value)}
              required
            />
          </div>
          <div className="portal-login-field">
            <label htmlFor="pending-cnpj-agenda">CNPJ</label>
            <input
              id="pending-cnpj-agenda"
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(maskCnpj(e.target.value))}
              inputMode="numeric"
              maxLength={18}
              required
            />
          </div>
          <div className="portal-login-field">
            <label htmlFor="pending-nome-proprietario">Nome completo do proprietário</label>
            <input
              id="pending-nome-proprietario"
              type="text"
              value={nomeProprietario}
              onChange={(e) => setNomeProprietario(e.target.value)}
              required
            />
          </div>
        </>
      )}

      {pendingPlano.produto === 'totalpousada' && (
        <>
          <div className="portal-login-field">
            <label htmlFor="pending-nome-pousada">Nome da pousada</label>
            <input
              id="pending-nome-pousada"
              type="text"
              value={nomePousada}
              onChange={(e) => setNomePousada(e.target.value)}
              required
            />
          </div>
          <div className="portal-login-field">
            <label htmlFor="pending-cidade">Cidade</label>
            <input
              id="pending-cidade"
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              required
            />
          </div>
          <div className="portal-login-field">
            <label htmlFor="pending-estado">Estado (UF)</label>
            <input
              id="pending-estado"
              type="text"
              value={estado}
              onChange={(e) => setEstado(e.target.value.toUpperCase())}
              maxLength={2}
              placeholder="Ex.: SP"
              required
            />
          </div>
          <div className="portal-login-field">
            <label htmlFor="pending-dia-vencimento">Dia de vencimento</label>
            <input
              id="pending-dia-vencimento"
              type="number"
              min={1}
              max={31}
              value={diaVencimento}
              onChange={(e) => setDiaVencimento(e.target.value)}
            />
          </div>
        </>
      )}

      {pendingPlano.produto === 'totalcontrol' && (
        <>
          <div className="portal-login-field">
            <label htmlFor="pending-nome-fantasia">Nome fantasia</label>
            <input
              id="pending-nome-fantasia"
              type="text"
              value={nomeFantasia}
              onChange={(e) => setNomeFantasia(e.target.value)}
              required
            />
          </div>
          <div className="portal-login-field">
            <label htmlFor="pending-cnpj">CNPJ</label>
            <input
              id="pending-cnpj"
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(maskCnpj(e.target.value))}
              inputMode="numeric"
              maxLength={18}
              required
            />
          </div>
          <div className="portal-login-field">
            <label htmlFor="pending-razao-social">Razão social (opcional)</label>
            <input
              id="pending-razao-social"
              type="text"
              value={razaoSocial}
              onChange={(e) => setRazaoSocial(e.target.value)}
            />
          </div>
          <div className="portal-login-field">
            <label htmlFor="pending-senha-admin">Senha de acesso ao TotalControl</label>
            <input
              id="pending-senha-admin"
              type="password"
              value={senhaAdmin}
              onChange={(e) => setSenhaAdmin(e.target.value)}
              autoComplete="new-password"
              minLength={6}
              required
            />
          </div>
          <p className="portal-login-hint">
            Essa senha é só pra administrar sua loja dentro do sistema de PDV do TotalControl —
            separada da senha que você usa aqui no portal.
          </p>
        </>
      )}

      {error && <p className="portal-error">{error}</p>}
      <div className="portal-pending-plano-actions">
        <button type="submit" className="portfolio-link portal-login-submit" disabled={loading}>
          {loading ? 'Redirecionando...' : 'Confirmar e ir para pagamento'}
        </button>
        <button type="button" className="detail-page-back" onClick={onDone} disabled={loading}>
          Agora não
        </button>
      </div>
    </form>
  )
}

function PortalLoginForm({
  loading,
  error,
  onSubmit,
}: {
  loading: boolean
  error: string | null
  onSubmit: (email: string, senha: string) => Promise<boolean>
}) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSubmit(email, senha)
  }

  return (
    <form className="portal-login-card" onSubmit={handleSubmit}>
      <div className="portal-login-field">
        <label htmlFor="portal-email">E-mail</label>
        <input
          id="portal-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
        />
      </div>
      <div className="portal-login-field">
        <label htmlFor="portal-senha">Senha</label>
        <input
          id="portal-senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          autoComplete="current-password"
          required
        />
      </div>
      {error && <p className="portal-error">{error}</p>}
      <button type="submit" className="portfolio-link portal-login-submit" disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
      <p className="portal-login-hint">
        As credenciais são fornecidas pela Total Software. Se ainda não recebeu a sua,{' '}
        <a href="/fale-conosco">fale conosco</a>.
      </p>
    </form>
  )
}

function PortalDashboard({
  token,
  data,
  onLogout,
}: {
  token: string
  data: PortalMeResponse
  onLogout: () => void
}) {
  const [showEstabelecimentosPopup, setShowEstabelecimentosPopup] = useState(false)
  const [showNovoEstabelecimento, setShowNovoEstabelecimento] = useState(false)
  const hasEstabelecimentos = data.estabelecimentos.length > 0

  return (
    <div className="portal-dashboard">
      <div className="portal-dashboard-header">
        <div>
          <h3>{data.cliente.nome}</h3>
          <p>{data.cliente.email}</p>
        </div>
        <button type="button" className="detail-page-back" onClick={onLogout}>
          Sair
        </button>
      </div>

      <div className="hero-stats portal-stats">
        <button
          type="button"
          className="hero-stat-card portal-stat-card-clickable"
          onClick={() => hasEstabelecimentos && setShowEstabelecimentosPopup(true)}
          aria-haspopup="dialog"
          disabled={!hasEstabelecimentos}
        >
          <div className="hero-stat-num">{data.estabelecimentos.length}</div>
          <div className="hero-stat-label">Estabelecimentos</div>
        </button>
        <div className="hero-stat-card">
          <div className="hero-stat-num">
            {data.produtos.filter((produto) => produto.status === 'ativo').length}
          </div>
          <div className="hero-stat-label">Produtos ativos</div>
        </div>
      </div>

      {showEstabelecimentosPopup && (
        <EstabelecimentosPopup
          estabelecimentos={data.estabelecimentos}
          onClose={() => setShowEstabelecimentosPopup(false)}
        />
      )}

      {!hasEstabelecimentos ? (
        !showNovoEstabelecimento && (
          <div className="portal-empty-state">
            <p>
              Nenhum estabelecimento vinculado a este login ainda. Fale com a Total Software se
              isso não parecer certo.
            </p>
            <button
              type="button"
              className="portfolio-link portal-login-submit"
              onClick={() => setShowNovoEstabelecimento(true)}
            >
              Cadastrar estabelecimento
            </button>
          </div>
        )
      ) : (
        <div className="portal-section">
          <div className="portal-section-header-row">
            <h4>Seus estabelecimentos</h4>
            {!showNovoEstabelecimento && (
              <button
                type="button"
                className="detail-page-back"
                onClick={() => setShowNovoEstabelecimento(true)}
              >
                + Cadastrar estabelecimento
              </button>
            )}
          </div>
          <div className="portal-estabelecimentos-list">
            {data.estabelecimentos.map((estabelecimento) => (
              <EstabelecimentoCard key={estabelecimento.id} estabelecimento={estabelecimento} />
            ))}
          </div>
        </div>
      )}

      {showNovoEstabelecimento && (
        <NovoEstabelecimentoForm token={token} onCancel={() => setShowNovoEstabelecimento(false)} />
      )}

      {data.produtos.length > 0 && (
        <div className="portal-section">
          <h4>Seus produtos</h4>
          <div className="portfolio-grid">
            {data.produtos.map((produto) => (
              <div className="portal-produto-card" key={produto.id}>
                <h5>{produto.nome}</h5>
                {produto.url ? (
                  <a href={normalizeUrl(produto.url)} target="_blank" rel="noopener noreferrer" className="portfolio-link">
                    Acessar
                  </a>
                ) : (
                  <span className="portal-produto-sem-link">Sem link disponível</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Cadastro de estabelecimento (Total Pousada) direto pelo dashboard, sem
// precisar voltar pra pagina de precos — usado quando o cliente ja tem
// conta mas ainda nao tem nenhuma pousada vinculada (ou quer adicionar mais
// uma). Pede o plano (nao ha um pendingPlano vindo da URL aqui) e os
// mesmos dados de sempre, depois cria o estabelecimento e manda pro
// checkout da Stripe.
function NovoEstabelecimentoForm({ token, onCancel }: { token: string; onCancel: () => void }) {
  const [planos, setPlanos] = useState<PortalPlano[] | null>(null)
  const [planoId, setPlanoId] = useState<number | null>(null)
  const [nome, setNome] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')
  const [diaVencimento, setDiaVencimento] = useState('10')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPortalPlanos('totalpousada')
      .then((result) => {
        setPlanos(result)
        setPlanoId((current) => current ?? result[0]?.id ?? null)
      })
      .catch(() => setError('Não foi possível carregar os planos. Tente novamente.'))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!planoId) return
    setLoading(true)
    setError(null)
    try {
      const { estabelecimento } = await createEstabelecimento(token, {
        nome,
        cidade,
        estado,
        diaVencimento: Number(diaVencimento) || undefined,
        planoId,
      })
      const { url } = await createPagamentoCheckoutSession(token, {
        produto: 'totalpousada',
        estabelecimentoId: estabelecimento.id,
      })
      window.location.href = url
    } catch (err) {
      setError(err instanceof PortalApiError ? err.message : 'Não foi possível cadastrar o estabelecimento.')
      setLoading(false)
    }
  }

  return (
    <form className="portal-login-card portal-pending-plano" onSubmit={handleSubmit}>
      <p className="portal-plano-banner">Cadastrar estabelecimento do Total Pousada</p>

      <div className="portal-login-field">
        <label htmlFor="novo-estab-plano">Plano</label>
        <select
          id="novo-estab-plano"
          value={planoId ?? ''}
          onChange={(e) => setPlanoId(Number(e.target.value))}
          required
          disabled={!planos}
        >
          {!planos && <option value="">Carregando planos...</option>}
          {planos?.map((plano) => (
            <option key={plano.id} value={plano.id}>
              {plano.nome} — {formatMoney(plano.precoCents / 100)}/mês
            </option>
          ))}
        </select>
      </div>
      <div className="portal-login-field">
        <label htmlFor="novo-estab-nome">Nome da pousada</label>
        <input
          id="novo-estab-nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>
      <div className="portal-login-field">
        <label htmlFor="novo-estab-cidade">Cidade</label>
        <input
          id="novo-estab-cidade"
          type="text"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          required
        />
      </div>
      <div className="portal-login-field">
        <label htmlFor="novo-estab-estado">Estado (UF)</label>
        <input
          id="novo-estab-estado"
          type="text"
          value={estado}
          onChange={(e) => setEstado(e.target.value.toUpperCase())}
          maxLength={2}
          placeholder="Ex.: SP"
          required
        />
      </div>
      <div className="portal-login-field">
        <label htmlFor="novo-estab-dia-vencimento">Dia de vencimento</label>
        <input
          id="novo-estab-dia-vencimento"
          type="number"
          min={1}
          max={31}
          value={diaVencimento}
          onChange={(e) => setDiaVencimento(e.target.value)}
        />
      </div>

      {error && <p className="portal-error">{error}</p>}
      <div className="portal-pending-plano-actions">
        <button type="submit" className="portfolio-link portal-login-submit" disabled={loading || !planoId}>
          {loading ? 'Enviando...' : 'Cadastrar e ir para pagamento'}
        </button>
        <button type="button" className="detail-page-back" onClick={onCancel} disabled={loading}>
          Cancelar
        </button>
      </div>
    </form>
  )
}

const ESTABELECIMENTO_STATUS_LABEL: Record<PortalEstabelecimento['status'], string> = {
  ativa: 'Ativo',
  inativa: 'Inativo',
  pendente: 'Pendente',
}

function EstabelecimentosPopup({
  estabelecimentos,
  onClose,
}: {
  estabelecimentos: PortalEstabelecimento[]
  onClose: () => void
}) {
  return (
    <div
      className="portal-popup-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="portal-popup"
        role="dialog"
        aria-modal="true"
        aria-label="Seus estabelecimentos"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="portal-popup-header">
          <h4>Seus estabelecimentos</h4>
          <button type="button" className="portal-popup-close" onClick={onClose} aria-label="Fechar">
            ×
          </button>
        </div>
        <div className="portal-popup-body">
          {estabelecimentos.map((estabelecimento) => (
            <div className="portal-popup-item" key={estabelecimento.id}>
              <div className="portal-popup-item-header">
                <h5>{estabelecimento.nome}</h5>
                <span className="portal-popup-item-status">
                  {ESTABELECIMENTO_STATUS_LABEL[estabelecimento.status]}
                </span>
              </div>
              <p className="portal-popup-item-local">
                {estabelecimento.cidade} — {estabelecimento.estado}
              </p>
              {estabelecimento.mensalidadeAtual && (
                <div className="portal-popup-item-mensalidade">
                  <span className="portal-estabelecimento-valor">
                    {formatMoney(estabelecimento.mensalidadeAtual.valor)}
                  </span>
                  <StatusBadge status={estabelecimento.mensalidadeAtual.status} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function EstabelecimentoCard({ estabelecimento }: { estabelecimento: PortalEstabelecimento }) {
  const { token } = usePortalAuth()
  const [open, setOpen] = useState(false)
  const [pagamentoLoading, setPagamentoLoading] = useState(false)
  const [pagamentoError, setPagamentoError] = useState<string | null>(null)
  const hasMensalidades = estabelecimento.mensalidades.length > 0

  async function handleAtivarPagamento() {
    if (!token) return
    setPagamentoLoading(true)
    setPagamentoError(null)
    try {
      const { url } = await createPagamentoCheckoutSession(token, { estabelecimentoId: estabelecimento.id })
      window.location.href = url
    } catch (err) {
      setPagamentoError(
        err instanceof PortalApiError ? err.message : 'Não foi possível iniciar o pagamento.',
      )
      setPagamentoLoading(false)
    }
  }

  async function handleGerenciarPagamento() {
    if (!token) return
    setPagamentoLoading(true)
    setPagamentoError(null)
    try {
      const { url } = await createPagamentoPortalSession(token)
      window.location.href = url
    } catch (err) {
      setPagamentoError(
        err instanceof PortalApiError ? err.message : 'Não foi possível abrir o gerenciamento.',
      )
      setPagamentoLoading(false)
    }
  }

  return (
    <div className="portal-estabelecimento-card">
      <button
        type="button"
        className="portal-estabelecimento-header"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <div>
          <h5>{estabelecimento.nome}</h5>
          <p>
            {estabelecimento.cidade} — {estabelecimento.estado}
          </p>
        </div>
        {estabelecimento.mensalidadeAtual && (
          <div className="portal-estabelecimento-mensalidade">
            <span className="portal-estabelecimento-valor">
              {formatMoney(estabelecimento.mensalidadeAtual.valor)}
            </span>
            <StatusBadge status={estabelecimento.mensalidadeAtual.status} />
          </div>
        )}
      </button>

      <div className="portal-pagamento-section">
        {estabelecimento.assinatura?.ativa ? (
          <>
            <p className="portal-pagamento-status">
              Pagamento automático ativo
              {estabelecimento.assinatura.proximaCobranca
                ? ` — próxima cobrança em ${formatDate(estabelecimento.assinatura.proximaCobranca)}`
                : ''}
            </p>
            <button
              type="button"
              className="portfolio-link portal-pagamento-btn"
              onClick={handleGerenciarPagamento}
              disabled={pagamentoLoading}
            >
              {pagamentoLoading ? 'Abrindo...' : 'Gerenciar pagamento'}
            </button>
          </>
        ) : (
          <button
            type="button"
            className="portfolio-link portal-pagamento-btn"
            onClick={handleAtivarPagamento}
            disabled={pagamentoLoading}
          >
            {pagamentoLoading ? 'Redirecionando...' : 'Ativar pagamento automático'}
          </button>
        )}
        {pagamentoError && <p className="portal-error">{pagamentoError}</p>}
      </div>

      {hasMensalidades && (
        <div className="portal-mensalidades-section">
          <button
            type="button"
            className="portal-mensalidades-toggle"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
          >
            <span>Histórico de mensalidades</span>
            <span className={`portal-mensalidades-chevron${open ? ' is-open' : ''}`}>▾</span>
          </button>

          {open && (
            <div className="portal-mensalidades-list">
              {estabelecimento.mensalidades.map((mensalidade) => (
                <div className="portal-mensalidade-row" key={mensalidade.id}>
                  <span className="portal-mensalidade-mes">{formatMonth(mensalidade.mesReferencia)}</span>
                  <span className="portal-mensalidade-valor">{formatMoney(mensalidade.valor)}</span>
                  <span className="portal-mensalidade-vencimento">
                    Vence em {formatDate(mensalidade.vencimento)}
                  </span>
                  <StatusBadge status={mensalidade.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
