import { useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useScroll } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { getProductBySlug } from '../data/produtos'
import { ScrollLinePath } from '../components/ui/scroll-line-path'
import { PricingSection } from '../components/ui/pricing'
import BackgroundGradientSnippet from '../components/ui/background-gradient-snippet'
import AnimatedGradient from '../components/ui/animated-gradient'
import NeonMesh from '../components/ui/neon-mesh'

export default function ProdutoDetail() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  })

  useDocumentTitle(product ? `${product.name} | Total Software` : 'Produto | Total Software')

  if (!product) {
    return <Navigate to="/produtos" replace />
  }

  return (
    <article className={`detail-page ${product.themeClassName ?? ''}`}>
      {product.themeClassName === 'theme-pousada' && (
        <BackgroundGradientSnippet color={product.accentColor} />
      )}
      {product.themeClassName === 'theme-agenda' && (
        <AnimatedGradient
          config={{
            preset: 'custom',
            color1: product.accentColor ?? '#8b5cf6',
            color2: '#000000',
            color3: '#000000',
            proportion: 63,
            scale: 0.75,
            speed: 30,
            distortion: 5,
            swirl: 61,
            swirlIterations: 5,
            softness: 100,
            offset: -168,
            shape: 'Checks',
            shapeSize: 28,
          }}
          style={{ position: 'fixed' }}
        />
      )}
      {product.themeClassName === 'theme-control' && <NeonMesh />}
      <section ref={heroRef} className="detail-page-hero">
        <div className="detail-page-hero-inner">
          <Link to="/produtos" className="detail-page-back">
            ← Voltar aos produtos
          </Link>
          <h1 className="detail-page-title">{product.name}</h1>
          <p className="detail-page-sub">Role para conhecer o produto</p>
          {product.themeClassName !== 'theme-control' && (
            <ScrollLinePath
              className="detail-page-line"
              scrollYProgress={scrollYProgress}
              stroke={product.accentColor}
            />
          )}
        </div>
      </section>

      <section className="detail-page-panel">
        <h2 className="detail-page-giant">{product.giantLabel}</h2>
        <div className="detail-page-info">
          <div className="detail-page-info-cell">
            <span className="detail-page-label">Categoria</span>
            <p>{product.category}</p>
          </div>
          <div className="detail-page-info-cell">
            <span className="detail-page-label">Status</span>
            <p>{product.status}</p>
          </div>
          <div className="detail-page-info-cell">
            <span className="detail-page-label">Tecnologia</span>
            <p>{product.techStack.join(', ')}</p>
          </div>
          <div className="detail-page-info-cell">
            <span className="detail-page-label">Fale conosco</span>
            <Link to="/fale-conosco">Saiba mais</Link>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: '5rem', paddingBottom: '2rem' }}>
        <div className="section-header centered">
          <span className="section-number">Sobre</span>
          <div>
            <h2 className="section-title">Sobre o produto</h2>
          </div>
        </div>
        <div className="detail-page-about centered">
          <p className="detail-page-about-text">{product.about}</p>
        </div>
      </section>

      <section style={{ paddingTop: '2rem', paddingBottom: '7rem' }}>
        <div className="section-header centered">
          <span className="section-number">Funcionalidades</span>
          <div>
            <h2 className="section-title">O que o {product.name} faz</h2>
          </div>
        </div>
        <div className="product-feature-grid">
          {product.highlights.map((highlight) => (
            <div className="product-feature-card" key={highlight}>
              <CheckCircle2 className="product-feature-icon" strokeWidth={1.75} />
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </section>

      {product.pricingPlans && (
        <section style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
          <PricingSection
            plans={product.pricingPlans}
            title="Planos e preços"
            description={product.pricingDescription ?? 'Escolha o plano ideal para o seu negócio.'}
            accentColor={product.accentColor}
          />
        </section>
      )}

      <section style={{ paddingTop: '1rem', paddingBottom: '7rem' }}>
        <div className="detail-page-cta">
          <Link className="portfolio-link" to="/fale-conosco">
            Quero saber mais
          </Link>
          <Link to="/produtos" className="detail-page-back">
            ← Voltar aos produtos
          </Link>
        </div>
      </section>
    </article>
  )
}
