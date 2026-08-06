import { useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useScroll } from 'framer-motion'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { getProjectBySlug, displayUrl } from '../data/portfolioProjects'
import { HoverExpandGallery } from '../components/ui/hover-expand'
import { ScrollLinePath } from '../components/ui/scroll-line-path'

export default function PortfolioDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  })

  useDocumentTitle(project ? `${project.title} | Total Software` : 'Projeto | Total Software')

  if (!project) {
    return <Navigate to="/portfolio" replace />
  }

  return (
    <article className="detail-page">
      <section ref={heroRef} className="detail-page-hero">
        <div className="detail-page-hero-inner">
          <Link to="/portfolio" className="detail-page-back">
            ← Voltar ao portfolio
          </Link>
          <h1 className="detail-page-title">{project.title}</h1>
          <p className="detail-page-sub">Role para conhecer o projeto</p>
          <ScrollLinePath className="detail-page-line" scrollYProgress={scrollYProgress} />
        </div>
      </section>

      <section className="detail-page-panel">
        <h2 className="detail-page-giant">{project.giantLabel}</h2>
        <div className="detail-page-info">
          <div className="detail-page-info-cell">
            <span className="detail-page-label">Cliente</span>
            <p>{project.client}</p>
          </div>
          <div className="detail-page-info-cell">
            <span className="detail-page-label">Categoria</span>
            <p>{project.category}</p>
          </div>
          <div className="detail-page-info-cell">
            <span className="detail-page-label">Ano</span>
            <p>{project.year}</p>
          </div>
          <div className="detail-page-info-cell">
            <span className="detail-page-label">Site</span>
            <a href={project.href} target="_blank" rel="noopener noreferrer">
              {displayUrl(project.href)}
            </a>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: '5rem', paddingBottom: '2rem' }}>
        <div className="section-header centered">
          <span className="section-number">Sobre</span>
          <div>
            <h2 className="section-title">Sobre o projeto</h2>
          </div>
        </div>
        <div className="detail-page-about centered">
          <p className="detail-page-about-text">{project.about}</p>
          <ul className="detail-page-highlights">
            {project.highlights.map((highlight) => (
              <li className="tag" key={highlight}>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section style={{ paddingTop: '2rem' }}>
        <div className="section-header centered">
          <span className="section-number">Galeria</span>
          <div>
            <h2 className="section-title">Imagens do site</h2>
            <p className="section-sub">{project.description}</p>
          </div>
        </div>
        <HoverExpandGallery
          className="mt-12"
          images={project.images.map((src, index) => ({
            src,
            alt: `${project.title} — captura de tela ${index + 1}`,
            caption: `Tela ${String(index + 1).padStart(2, '0')}`,
          }))}
        />
        <div className="detail-page-cta">
          <a className="portfolio-link" href={project.href} target="_blank" rel="noopener noreferrer">
            Visitar site
          </a>
          <Link to="/portfolio" className="detail-page-back">
            ← Voltar ao portfolio
          </Link>
        </div>
      </section>
    </article>
  )
}
