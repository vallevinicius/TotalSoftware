import type { PricingPlan } from "../components/ui/pricing";

export interface Product {
  slug: string;
  name: string;
  category: string;
  status: string;
  visualClassName: string;
  badge: string;
  wordmark: string;
  giantLabel: string;
  caption: string;
  description: string;
  about: string;
  highlights: string[];
  techStack: string[];
  themeClassName?: string;
  accentColor?: string;
  pricingPlans?: PricingPlan[];
  pricingDescription?: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: "total-pousada",
    name: "Total Pousada",
    category: "SaaS de Gestão Hoteleira",
    status: "Em desenvolvimento",
    visualClassName: "portfolio-visual-pousada",
    badge: "SaaS",
    wordmark: "Total Pousada",
    giantLabel: "TotalPousada",
    caption: "Gestão de pousadas sem overbooking",
    description:
      "Sistema de gestão para pousadas e pequenos hotéis, com reservas, check-in e check-out, calendário e financeiro em um só lugar.",
    about:
      "O Total Pousada é um sistema de gestão feito para pousadas e pequenos hotéis, reunindo reservas, calendário de disponibilidade, check-in e check-out, controle financeiro e gestão de equipe em um só lugar. O sistema recalcula preços e disponibilidade automaticamente para evitar overbooking, e conta com controle de acesso por perfil para cada membro da equipe.",
    highlights: [
      "Controle de reservas",
      "Prevenção de overbooking",
      "Check-in e check-out",
      "Calendário de disponibilidade",
      "Controle financeiro",
      "Gestão de equipe e permissões",
      "Tarifas sazonais e políticas de estadia",
      "Conta de demonstração",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MySQL"],
    themeClassName: "theme-pousada",
    accentColor: "#3b82f6",
    pricingDescription: "Escolha o plano ideal para a sua pousada.",
    // TODO: preços de exemplo — confirmar valores reais antes de publicar
    pricingPlans: [
      {
        name: "Essencial",
        price: "89",
        yearlyPrice: "71",
        period: "mês",
        description:
          "Para pousadas pequenas começando a organizar as reservas.",
        buttonText: "Falar com a gente",
        href: "/fale-conosco",
        features: [
          "Controle de reservas",
          "Calendário de disponibilidade",
          "Check-in e check-out",
          "Conta de demonstração",
        ],
      },
      {
        name: "Profissional",
        price: "149",
        yearlyPrice: "119",
        period: "mês",
        description:
          "Para pousadas que querem evitar overbooking e controlar o financeiro.",
        buttonText: "Falar com a gente",
        href: "/fale-conosco",
        isPopular: true,
        features: [
          "Tudo do plano Essencial",
          "Prevenção de overbooking",
          "Controle financeiro",
          "Tarifas sazonais e políticas de estadia",
        ],
      },
      {
        name: "Empresarial",
        price: "249",
        yearlyPrice: "199",
        period: "mês",
        description: "Para redes de pousadas com equipe e operação maiores.",
        buttonText: "Falar com a gente",
        href: "/fale-conosco",
        features: [
          "Tudo do plano Profissional",
          "Gestão de equipe e permissões",
          "Suporte prioritário",
          "Onboarding dedicado",
        ],
      },
    ],
  },
  {
    slug: "total-agenda",
    name: "TotalAgenda",
    category: "SaaS de Agendamento",
    status: "Em desenvolvimento",
    visualClassName: "portfolio-visual-agenda",
    badge: "SaaS",
    wordmark: "TotalAgenda",
    giantLabel: "TotalAgenda",
    caption: "Agenda online para negócios com equipe",
    description:
      "Sistema de agenda online para negócios de serviços com equipe, com controle de horários e profissionais em um só lugar.",
    about:
      "O TotalAgenda é um sistema de agenda online para negócios de serviços que trabalham com equipe, como salões, clínicas e estúdios. Os planos variam de acordo com o número de profissionais que podem usar o sistema ao mesmo tempo.",
    // TODO: copy resumida — ampliar descrição/destaques de marketing do TotalAgenda quando houver mais informações do produto
    highlights: [
      "Agenda de horários online",
      "Gestão de profissionais por plano",
      "Assinatura mensal via cartão",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    accentColor: "#8b5cf6",
    pricingDescription: "Escolha o plano ideal para o seu negócio.",
    pricingPlans: [
      {
        name: "Essencial",
        price: "29.9",
        yearlyPrice: "29.9",
        period: "mês",
        description: "Para negócios pequenos começando a organizar a agenda.",
        buttonText: "Assinar",
        href: "/portal?produto=totalagenda&plano=Essencial",
        features: ["Agenda de horários online", "Até 2 profissionais"],
      },
      {
        name: "Profissional",
        price: "79.9",
        yearlyPrice: "79.9",
        period: "mês",
        description: "Para negócios com uma equipe um pouco maior.",
        buttonText: "Assinar",
        href: "/portal?produto=totalagenda&plano=Profissional",
        isPopular: true,
        features: ["Tudo do plano Essencial", "Até 5 profissionais"],
      },
      {
        name: "Premium",
        price: "149.9",
        yearlyPrice: "149.9",
        period: "mês",
        description: "Para negócios que precisam de uma equipe maior.",
        buttonText: "Assinar",
        href: "/portal?produto=totalagenda&plano=Premium",
        features: ["Tudo do plano Profissional", "Profissionais ilimitados"],
      },
    ],
  },
  {
    slug: "total-agenda",
    name: "Total Agenda",
    category: "SaaS de Agendamento",
    status: "Em breve",
    visualClassName: "portfolio-visual-agenda",
    badge: "SaaS",
    wordmark: "Total Agenda",
    giantLabel: "TotalAgenda",
    caption: "Agendamento sem dor de cabeça",
    description:
      "Sistema de agendamento online para negócios de serviço, com calendário, confirmações automáticas e gestão de clientes em um só lugar.",
    about:
      "O Total Agenda é um sistema de agendamento pensado para negócios de serviço em geral — barbearias, salões, clínicas, consultórios, personal trainers e afins. Centraliza a agenda de todos os profissionais, envia confirmações e lembretes automáticos para reduzir faltas, e mantém um cadastro organizado de clientes e histórico de atendimentos.",
    highlights: [
      "Agendamento online",
      "Calendário centralizado por profissional",
      "Confirmação e lembrete automático",
      "Cadastro de clientes e histórico",
      "Bloqueio de horários e folgas",
      "Múltiplos profissionais e serviços",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MySQL"],
  },
  {
    slug: "total-control",
    name: "Total Control",
    category: "SaaS de Gestão Empresarial",
    status: "Em breve",
    visualClassName: "portfolio-visual-control",
    badge: "SaaS",
    wordmark: "Total Control",
    giantLabel: "TotalControl",
    caption: "Controle total do seu negócio",
    description:
      "Sistema de gestão para o dia a dia do negócio, com ponto de venda, controle de estoque e vendas no balcão em um só lugar.",
    about:
      "O Total Control é um sistema de controle geral do negócio, reunindo ponto de venda (PDV), controle de estoque e vendas no balcão em uma única plataforma. Permite abrir e fechar caixa, cadastrar produtos e fornecedores, acompanhar o histórico de movimentações e gerar relatórios de vendas para ter visibilidade completa da operação.",
    highlights: [
      "Ponto de venda (PDV)",
      "Controle de estoque",
      "Vendas no balcão",
      "Abertura e fechamento de caixa",
      "Cadastro de produtos e fornecedores",
      "Relatórios de vendas",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MySQL"],
  },
];

export function getProductBySlug(slug: string | undefined) {
  return PRODUCTS.find((product) => product.slug === slug);
}
