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
  about: string
  highlights: string[]
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
    about:
      'O AquiTemODS é o portal da Prefeitura de Saquarema dedicado à Agenda 2030, reunindo os 17 Objetivos de Desenvolvimento Sustentável em um só lugar. O site organiza projetos e políticas públicas por ODS, com busca, cadastro de novas iniciativas e uma seção educativa para engajar a população nos temas de sustentabilidade.',
    highlights: ['Busca por ODS', 'Cadastro de projetos', 'Espaço dos ODS', 'SustentAí', 'Enigmas do Futuro (gamificação)', 'FAQ'],
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
    badge: 'Vitrine Virtual',
    wordmark: 'MEIdeSaquá',
    giantLabel: 'MEIdeSaquá',
    caption: 'Vitrine digital do empreendedor local',
    description:
      'Vitrine digital para empreendedores locais, com categorias de negócios, cadastro e fortalecimento da economia regional.',
    about:
      'O MEIdeSaquá é a vitrine digital dos microempreendedores individuais de Saquarema, criada pela Prefeitura para fortalecer o comércio local. Empreendedores se cadastram por categoria — de artesanato a construção — e moradores encontram negócios da cidade organizados por segmento, com busca e uma central de dúvidas.',
    highlights: ['Cadastro de MEIs', 'Busca por categoria', 'Espaço MEI', 'Artesanato, moda, comércio e mais', 'FAQ'],
    award: 'Campeão do Prêmio SEBRAE de Inovação Digital na categoria Sala do empreendedor 2026',
    tags: ['Vitrine Digital', 'Empreendedorismo', 'Saquarema'],
    href: 'https://meidesaqua.saquarema.rj.gov.br/',
    images: ['/images/portfolio/mei-de-saquarema-01.png', '/images/portfolio/mei-de-saquarema-02.png'],
  },
  {
    slug: 'apaixone-se-saquarema',
    title: 'Apaixone-se por Saquarema',
    client: 'Prefeitura de Saquarema',
    category: 'Portal de Turismo',
    year: '2025',
    visualClassName: 'portfolio-visual-apaixonese',
    badge: 'Turismo',
    wordmark: 'Apaixone-se',
    giantLabel: 'Apaixone-se',
    caption: 'Apaixone-se por Saquarema • Turismo',
    description:
      'Portal oficial de turismo de Saquarema, com praias, eventos, gastronomia e atrações da cidade.',
    about:
      'O Apaixone-se por Saquarema é o portal oficial de turismo da Prefeitura, feito para apresentar as belezas naturais, praias, eventos, gastronomia e atrações da cidade. Reúne roteiros e informações práticas das secretarias envolvidas para ajudar visitantes e moradores a planejar sua experiência em Saquarema.',
    highlights: ['Praias e atrações', 'Roteiros de viagem', 'Agenda de eventos', 'Gastronomia local', 'Tradução automática'],
    award: '',
    tags: ['Portal de Turismo', 'Turismo', 'Saquarema'],
    href: 'https://apaixonese.saquarema.rj.gov.br/',
    images: [],
  },
]

export function getProjectBySlug(slug: string | undefined) {
  return PORTFOLIO_PROJECTS.find((project) => project.slug === slug)
}

export function displayUrl(href: string) {
  return href.replace(/^https?:\/\//, '').replace(/\/$/, '')
}
