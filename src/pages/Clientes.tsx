import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { TestimonialsSection, type Testimonial } from '../components/ui/testimonials-section'

const TESTIMONIALS: Testimonial[] = [
  {
    initials: 'HS',
    name: 'Heloiza Schneidewind',
    role: 'Arquiteta',
    quote: 'Atendimento extremamente profissional e eficiente, suporte impecável a todo momento.',
    link: { label: '@heloiza.arq', url: 'https://instagram.com/heloiza.arq' },
  },
  {
    initials: 'RR',
    name: 'Rafael Rodrigues',
    role: 'Setor Imobiliário',
    quote: 'Equipe muito atenciosa e ágil. O projeto ficou excelente e superou minhas expectativas.',
    link: { label: '@rafarodriguesimoveis', url: 'https://instagram.com/rafarodriguesimoveis' },
  },
]

export default function Clientes() {
  useDocumentTitle('Clientes | Total Software')

  return (
    <section id="clientes" className="page-content">
      <div className="section-header">
        <span className="section-number">04 / 06</span>
        <div>
          <h2 className="section-title">Clientes</h2>
          <p className="section-sub">Avaliações de nossos clientes</p>
        </div>
      </div>

      <TestimonialsSection testimonials={TESTIMONIALS} />
    </section>
  )
}
