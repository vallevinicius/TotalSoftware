import { useDocumentTitle } from '../hooks/useDocumentTitle'

const SERVICES = [
  {
    icon: '⬡',
    name: 'Desenvolvimento Web',
    desc: 'Sistemas e plataformas web de alta performance, desde MVPs ágeis até arquiteturas complexas em microserviços.',
    delay: '0s',
  },
  {
    icon: '◇',
    name: 'Apps Mobile',
    desc: 'Aplicativos nativos e híbridos para iOS e Android com design centrado no usuário e performance de elite.',
    delay: '0.1s',
  },
  {
    icon: '△',
    name: 'Software Sob Medida',
    desc: 'Desenvolvimento de sistemas personalizados para atender regras de negócio específicas com foco em qualidade e escalabilidade.',
    delay: '0.2s',
  },
  {
    icon: '○',
    name: 'Integração de Sistemas',
    desc: 'Conectamos ERPs, CRMs, gateways e APIs para unificar dados e automatizar processos entre plataformas.',
    delay: '0.05s',
  },
  {
    icon: '□',
    name: 'UX/UI Design',
    desc: 'Interfaces que encantam e convertem. Design system, prototipagem e pesquisa com usuários reais.',
    delay: '0.15s',
  },
  {
    icon: '✦',
    name: 'Sustentação de Software',
    desc: 'Manutenção evolutiva e corretiva, melhorias contínuas e suporte técnico para manter seus sistemas sempre performando.',
    delay: '0.25s',
  },
]

export default function Servicos() {
  useDocumentTitle('Serviços | Total Software')

  return (
    <section id="servicos" className="page-content">
      <div className="section-header">
        <span className="section-number">02 / 05</span>
        <div>
          <h2 className="section-title">Serviços</h2>
          <p className="section-sub">Soluções completas para cada etapa da jornada digital da sua empresa.</p>
        </div>
      </div>
      <div className="services-grid">
        {SERVICES.map((service) => (
          <div className="service-item reveal" style={{ transitionDelay: service.delay }} key={service.name}>
            <div className="service-icon">{service.icon}</div>
            <div className="service-name">{service.name}</div>
            <p className="service-desc">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
