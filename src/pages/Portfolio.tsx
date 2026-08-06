import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { PORTFOLIO_PROJECTS } from '../data/portfolioProjects'

export default function Portfolio() {
  useDocumentTitle('Portfolio | Total Software')

  return (
    <section id="portfolio" className="page-content">
      <div className="section-header">
        <span className="section-number">01 / 02</span>
        <div>
          <h2 className="section-title">Portfolio</h2>
          <p className="section-sub">Projetos selecionados desenvolvidos para o ecossistema de Saquarema.</p>
        </div>
      </div>
      <div className="portfolio-grid">
        {PORTFOLIO_PROJECTS.map((project, index) => (
          <Link
            to={`/portfolio/${project.slug}`}
            className="portfolio-card reveal"
            key={project.slug}
            style={{ transitionDelay: `${0.25 + index * 0.05}s` }}
          >
            <div className={`portfolio-visual portfolio-visual-logo ${project.visualClassName}`}>
              <div className="portfolio-mei-mark">
                <span className="portfolio-mei-badge">{project.badge}</span>
                <div className="portfolio-mei-wordmark">{project.wordmark}</div>
              </div>
              <div className="portfolio-logo-caption" style={{ textAlign: 'center' }}>
                {project.caption}
              </div>
            </div>
            <div className="portfolio-meta">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>{project.award}</p>
              <div className="portfolio-tags">
                {project.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="portfolio-actions">
                <span className="portfolio-link">Ver o projeto</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
