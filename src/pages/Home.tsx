import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { FluidParticlesBackground } from '../components/ui/fluid-particles-background'

export default function Home() {
  useDocumentTitle('Total Software | Technology & Software Solutions')

  return (
    <>
      <section className="hero" id="home">
        <FluidParticlesBackground
          className="absolute inset-0 h-full w-full pointer-events-none"
          particleCount={600}
          particleSize={{ min: 0.5, max: 1.5 }}
        />
        <div className="hero-label">Fundada em 2025 — Rio de Janeiro, BR</div>
        <h1 className="hero-title">
          <span className="line">
            <span className="word">Software</span>
          </span>
          <span className="line">
            <span className="word outline">que</span> <span className="word">transforma</span>
          </span>
          <span className="line">
            <span className="word">negócios.</span>
          </span>
        </h1>
        <div className="hero-bottom">
          <p className="hero-desc">
            Desenvolvemos soluções tecnológicas que impulsionam o crescimento das empresas. Da concepção ao
            deploy, com excelência em cada linha de código.
          </p>
          <div className="hero-counter">
            <strong>20+</strong>
            projetos entregues
          </div>
        </div>
      </section>

      <div className="stats-bar">
        <div className="stat-cell reveal">
          <div className="stat-num">3+</div>
          <div className="stat-label">Anos de experiência</div>
        </div>
        <div className="stat-cell reveal" style={{ transitionDelay: '0.1s' }}>
          <div className="stat-num">20+</div>
          <div className="stat-label">Projetos entregues</div>
        </div>
        <div className="stat-cell reveal" style={{ transitionDelay: '0.2s' }}>
          <div className="stat-num">10+</div>
          <div className="stat-label">Clientes ativos</div>
        </div>
        <div className="stat-cell reveal" style={{ transitionDelay: '0.3s' }}>
          <div className="stat-num">98%</div>
          <div className="stat-label">Satisfação</div>
        </div>
      </div>
    </>
  )
}
