import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { PRODUCTS } from '../data/produtos'

export default function Produtos() {
  useDocumentTitle('Produtos | Total Software')

  return (
    <section id="produtos" className="page-content">
      <div className="section-header">
        <span className="section-number">03 / 05</span>
        <div>
          <h2 className="section-title">Produtos</h2>
          <p className="section-sub">Soluções proprietárias prontas para acelerar sua operação.</p>
        </div>
      </div>

      <div className="portfolio-grid">
        {PRODUCTS.map((product, index) => (
          <Link
            to={`/produtos/${product.slug}`}
            className="portfolio-card reveal"
            key={product.slug}
            style={{ transitionDelay: `${0.25 + index * 0.05}s` }}
          >
            <div className={`portfolio-visual portfolio-visual-logo ${product.visualClassName}`}>
              <div className="portfolio-mei-mark">
                <span className="portfolio-mei-badge">{product.badge}</span>
                <div className="portfolio-mei-wordmark">{product.wordmark}</div>
              </div>
              <div className="portfolio-logo-caption" style={{ textAlign: 'center' }}>
                {product.caption}
              </div>
            </div>
            <div className="portfolio-meta">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="portfolio-tags">
                <span className="tag">{product.category}</span>
                <span className="tag">{product.status}</span>
              </div>
              <div className="portfolio-actions">
                <span className="portfolio-link">Ver o produto</span>
              </div>
            </div>
          </Link>
        ))}

        <div className="portfolio-card reveal" style={{ transitionDelay: '0.35s' }}>
          <div className="portfolio-visual portfolio-visual-logo">
            <div className="portfolio-mei-mark">
              <span className="portfolio-mei-badge">Total Control</span>
              <div className="portfolio-mei-wordmark">Em breve</div>
            </div>
            <div className="portfolio-logo-caption" style={{ textAlign: 'center' }}>
              Estamos preparando novidades para você
            </div>
          </div>
          <div className="portfolio-meta">
            <h3>Total Control</h3>
            <p>Novo produto em desenvolvimento. Em breve mais detalhes por aqui.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
