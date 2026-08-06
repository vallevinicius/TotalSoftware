export interface PortfolioProject {
  slug: string
  title: string
  client: string
  category: string
  year: string
  visualClassName: string
  badge: string
  wordmark: string
  giantLabel: string
  caption: string
  description: string
  award: string
  tags: string[]
  href: string
  images: string[]
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    slug: 'aquitemods',
    title: 'AquiTemODS — Saquarema',
    client: 'Prefeitura de Saquarema',
    category: 'Portal Institucional',
    year: '2025',
    visualClassName: 'portfolio-visual-ods',
    badge: 'Agenda 2030',
    wordmark: 'AquiTemODS',
    giantLabel: 'AquiTemODS',
    caption: 'AquiTemODS • Agenda 2030',
    description:
      'Vitrine de políticas públicas da Agenda 2030, com categorias ODS, projetos em destaque e participação cidadã.',
    award: 'Vice-Campeão do Prêmio SEBRAE de Inovação Digital na categoria Prefeitura Inovadora 2026',
    tags: ['Portal Institucional', 'Agenda 2030', 'Saquarema'],
    href: 'https://aquitemods.saquarema.rj.gov.br/',
    images: ['/images/portfolio/aquitemods-01.png', '/images/portfolio/aquitemods-02.png'],
  },
  {
    slug: 'mei-de-saquarema',
    title: 'MEI de Saquarema',
    client: 'Prefeitura de Saquarema',
    category: 'Vitrine Digital',
    year: '2025',
    visualClassName: 'portfolio-visual-mei',
    badge: 'MEIs',
    wordmark: 'de Saquarema',
    giantLabel: 'MEIdeSaquá',
    caption: 'Vitrine digital do empreendedor local',
    description:
      'Vitrine digital para empreendedores locais, com categorias de negócios, cadastro e fortalecimento da economia regional.',
    award: 'Campeão do Prêmio SEBRAE de Inovação Digital na categoria Sala do empreendedor 2026',
    tags: ['Vitrine Digital', 'Empreendedorismo', 'Saquarema'],
    href: 'https://meidesaqua.saquarema.rj.gov.br/',
    images: ['/images/portfolio/mei-de-saquarema-01.png', '/images/portfolio/mei-de-saquarema-02.png'],
  },
]

export function getProjectBySlug(slug: string | undefined) {
  return PORTFOLIO_PROJECTS.find((project) => project.slug === slug)
}

export function displayUrl(href: string) {
  return href.replace(/^https?:\/\//, '').replace(/\/$/, '')
}
