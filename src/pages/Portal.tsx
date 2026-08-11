import { useEffect, useState } from 'react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { usePortalAuth } from '../hooks/usePortalAuth'
import {
  createPagamentoCheckoutSession,
  createPagamentoPortalSession,
  fetchPortalPlanos,
  PortalApiError,
  type PortalEstabelecimento,
  type PortalMensalidade,
  type PortalMeResponse,
} from '../lib/portalApi'

interface PendingPlano {
  produto: 'totalagenda'
  planoNome: string
}

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
  useDocumentTitle('Já sou cliente | Total Software')
  const { token, data, loading, error, login, cadastro, logout, refresh } = usePortalAuth()
  const [checkoutBanner, setCheckoutBanner] = useState<'success' | 'cancelled' | null>(null)
  const [pendingPlano, setPendingPlano] = useState<PendingPlano | null>(null)

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
    if (produto === 'totalagenda' && plano) {
      setPendingPlano({ produto: 'totalagenda', planoNome: plano })
      params.delete('produto')
      params.delete('plano')
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
        <span className="section-number">Área do cliente</span>
        <div>
          <h2 className="section-title">Já sou cliente</h2>
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
        pendingPlano ? (
          <PortalAuthGate
            pendingPlano={pendingPlano}
            loading={loading}
            error={error}
            onLogin={login}
            onCadastro={cadastro}
          />
        ) : (
          <PortalLoginForm loading={loading} error={error} onSubmit={login} />
        )
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
          <PortalDashboard data={data} onLogout={logout} />
        </>
      ) : null}
    </section>
  )
}

function PortalAuthGate({
  pendingPlano,
  loading,
  error,
  onLogin,
  onCadastro,
}: {
  pendingPlano: PendingPlano
  loading: boolean
  error: string | null
  onLogin: (email: string, senha: string) => Promise<boolean>
  onCadastro: (params: { nome: string; email: string; senha: string; telefone?: string }) => Promise<boolean>
}) {
  const [tab, setTab] = useState<'cadastro' | 'login'>('cadastro')

  return (
    <div className="portal-auth-gate">
      <p className="portal-plano-banner">
        Plano <strong>{pendingPlano.planoNome}</strong> selecionado — crie sua conta ou entre para continuar.
      </p>
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

function PortalCadastroForm({
  loading,
  error,
  onSubmit,
}: {
  loading: boolean
  error: string | null
  onSubmit: (params: { nome: string; email: string; senha: string; telefone?: string }) => Promise<boolean>
}) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [telefone, setTelefone] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSubmit({ nome, email, senha, telefone: telefone || undefined })
  }

  return (
    <form className="portal-login-card" onSubmit={handleSubmit}>
      <div className="portal-login-field">
        <label htmlFor="cadastro-nome">Nome</label>
        <input
          id="cadastro-nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          autoComplete="name"
          required
        />
      </div>
      <div className="portal-login-field">
        <label htmlFor="cadastro-email">E-mail</label>
        <input
          id="cadastro-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </div>
      <div className="portal-login-field">
        <label htmlFor="cadastro-senha">Senha</label>
        <input
          id="cadastro-senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          autoComplete="new-password"
          minLength={6}
          required
        />
      </div>
      <div className="portal-login-field">
        <label htmlFor="cadastro-telefone">Telefone (opcional)</label>
        <input
          id="cadastro-telefone"
          type="tel"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          autoComplete="tel"
        />
      </div>
      {error && <p className="portal-error">{error}</p>}
      <button type="submit" className="portfolio-link portal-login-submit" disabled={loading}>
        {loading ? 'Criando conta...' : 'Criar conta e continuar'}
      </button>
    </form>
  )
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleConfirmar(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const planos = await fetchPortalPlanos('totalagenda')
      const plano = planos.find((p) => p.nome === pendingPlano.planoNome)
      if (!plano) {
        setError('Não foi possível encontrar este plano. Fale conosco.')
        setLoading(false)
        return
      }
      const { url } = await createPagamentoCheckoutSession(token, {
        produto: 'totalagenda',
        planoId: plano.id,
        nomeEmpresa,
      })
      window.location.href = url
    } catch (err) {
      setError(err instanceof PortalApiError ? err.message : 'Não foi possível iniciar o pagamento.')
      setLoading(false)
    }
  }

  return (
    <form className="portal-login-card portal-pending-plano" onSubmit={handleConfirmar}>
      <p className="portal-plano-banner">
        Assinar plano <strong>{pendingPlano.planoNome}</strong> do TotalAgenda
      </p>
      <div className="portal-login-field">
        <label htmlFor="pending-nome-empresa">Nome da empresa/negócio</label>
        <input
          id="pending-nome-empresa"
          type="text"
          value={nomeEmpresa}
          onChange={(e) => setNomeEmpresa(e.target.value)}
          required
        />
      </div>
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
  data,
  onLogout,
}: {
  data: PortalMeResponse
  onLogout: () => void
}) {
  const [showEstabelecimentosPopup, setShowEstabelecimentosPopup] = useState(false)
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
        <p className="portal-loading">
          Nenhum estabelecimento vinculado a este login ainda. Fale com a Total Software se
          isso não parecer certo.
        </p>
      ) : (
        <div className="portal-section">
          <h4>Seus estabelecimentos</h4>
          <div className="portal-estabelecimentos-list">
            {data.estabelecimentos.map((estabelecimento) => (
              <EstabelecimentoCard key={estabelecimento.id} estabelecimento={estabelecimento} />
            ))}
          </div>
        </div>
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
