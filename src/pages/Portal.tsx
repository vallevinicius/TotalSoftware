import { useState } from 'react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { usePortalAuth } from '../hooks/usePortalAuth'
import type { PortalEstabelecimento, PortalMensalidade, PortalMeResponse } from '../lib/portalApi'

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
  const { token, data, loading, error, login, logout } = usePortalAuth()

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

      {!token || (!data && !loading) ? (
        <PortalLoginForm loading={loading} error={error} onSubmit={login} />
      ) : loading && !data ? (
        <p className="portal-loading">Carregando seus dados...</p>
      ) : data ? (
        <PortalDashboard data={data} onLogout={logout} />
      ) : null}
    </section>
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
  const [open, setOpen] = useState(false)
  const hasMensalidades = estabelecimento.mensalidades.length > 0

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
