import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function FaleConosco() {
  useDocumentTitle('Fale Conosco | Total Software')

  return (
    <section id="fale-conosco" className="page-content">
      <div className="section-header">
        <span className="section-number">06 / 06</span>
        <div>
          <h2 className="section-title">Fale Conosco</h2>
          <p className="section-sub">Entre em contato com a nossa equipe pelos canais abaixo.</p>
        </div>
      </div>

      <div className="contact-grid">
        <a
          href="https://wa.me/5522999447646"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card reveal"
        >
          <div className="contact-label">WhatsApp</div>
          <div className="contact-value">(22) 99944-7646</div>
          <p className="contact-desc">Atendimento comercial de segunda a sexta, das 9h às 18h.</p>
        </a>

        <a
          href="mailto:contatototalsoftware@gmail.com"
          className="contact-card reveal"
          style={{ transitionDelay: '0.1s' }}
        >
          <div className="contact-label">E-mail</div>
          <div className="contact-value">contatototalsoftware@gmail.com</div>
          <p className="contact-desc">Envie sua necessidade e retornamos com uma proposta personalizada.</p>
        </a>
      </div>
    </section>
  )
}
