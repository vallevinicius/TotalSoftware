import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('Página não encontrada | Total Software')

  return (
    <section className="hero hero-center" id="not-found">
      <div className="hero-label">Erro 404</div>
      <h1 className="hero-title">
        <span className="line">
          <span className="word outline">Página</span>
        </span>
        <span className="line">
          <span className="word">não encontrada.</span>
        </span>
      </h1>
      <div className="hero-bottom">
        <p className="hero-desc">
          O endereço que você tentou acessar não existe ou foi movido. Confira o link ou volte para o início.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="portfolio-link">
            Voltar para o início
          </Link>
          <Link to="/fale-conosco" className="detail-page-back">
            Fale conosco
          </Link>
        </div>
      </div>
    </section>
  )
}
