import { useDocumentTitle } from '../hooks/useDocumentTitle'

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
      <div className="coming-soon-poster reveal" role="status" aria-live="polite">
        <span className="coming-soon-label">Produtos</span>
        <h3 className="coming-soon-title">EM BREVE</h3>
        <p className="coming-soon-sub">Estamos preparando novidades para você.</p>
      </div>
    </section>
  )
}
