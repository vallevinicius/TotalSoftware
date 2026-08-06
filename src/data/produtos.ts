export interface Product {
  slug: string
  name: string
  category: string
  status: string
  visualClassName: string
  badge: string
  wordmark: string
  giantLabel: string
  caption: string
  description: string
  about: string
  highlights: string[]
  techStack: string[]
  themeClassName?: string
  accentColor?: string
}

export const PRODUCTS: Product[] = [
  {
    slug: 'total-pousada',
    name: 'Total Pousada',
    category: 'SaaS de Gestão Hoteleira',
    status: 'Em desenvolvimento',
    visualClassName: 'portfolio-visual-pousada',
    badge: 'SaaS',
    wordmark: 'Total Pousada',
    giantLabel: 'TotalPousada',
    caption: 'Gestão de pousadas sem overbooking',
    description:
      'Sistema de gestão para pousadas e pequenos hotéis, com reservas, check-in e check-out, calendário e financeiro em um só lugar.',
    about:
      'O Total Pousada é um sistema de gestão feito para pousadas e pequenos hotéis, reunindo reservas, calendário de disponibilidade, check-in e check-out, controle financeiro e gestão de equipe em um só lugar. O sistema recalcula preços e disponibilidade automaticamente para evitar overbooking, e conta com controle de acesso por perfil para cada membro da equipe.',
    highlights: [
      'Controle de reservas',
      'Prevenção de overbooking',
      'Check-in e check-out',
      'Calendário de disponibilidade',
      'Controle financeiro',
      'Gestão de equipe e permissões',
      'Tarifas sazonais e políticas de estadia',
      'Conta de demonstração',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MySQL'],
    themeClassName: 'theme-pousada',
    accentColor: '#3b82f6',
  },
]

export function getProductBySlug(slug: string | undefined) {
  return PRODUCTS.find((product) => product.slug === slug)
}
