import type { PricingPlan } from "../components/ui/pricing";

export interface FeatureGroup {
  title: string;
  description: string;
  items: { title: string; description: string }[];
}

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
  featureGroups?: FeatureGroup[];
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
    pricingPlans: [
      {
        name: "Essencial",
        price: "89",
        yearlyPrice: "71",
        period: "mês",
        description:
          "Para pousadas pequenas começando a organizar as reservas.",
        buttonText: "Assinar",
        href: "/portal?produto=totalpousada&plano=Essencial",
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
        buttonText: "Assinar",
        href: "/portal?produto=totalpousada&plano=Profissional",
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
        buttonText: "Assinar",
        href: "/portal?produto=totalpousada&plano=Empresarial",
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
    slug: "marquo",
    name: "Marquo",
    category: "SaaS de Agendamento",
    status: "Em desenvolvimento",
    visualClassName: "portfolio-visual-agenda",
    badge: "SaaS",
    wordmark: "Marquo",
    giantLabel: "Marquo",
    caption: "Agenda online para negócios com equipe",
    description:
      "Sistema de agenda online para negócios de serviços com equipe, com controle de horários e profissionais em um só lugar.",
    about:
      "O Marquo é um sistema de agenda online para negócios de serviços que trabalham com equipe, como salões, clínicas e estúdios. Os planos variam de acordo com o número de profissionais que podem usar o sistema ao mesmo tempo.",
    // TODO: copy resumida — ampliar descrição/destaques de marketing do Marquo quando houver mais informações do produto
    highlights: [
      "Agenda de horários online",
      "Gestão de profissionais por plano",
      "Assinatura mensal via cartão",
    ],
    featureGroups: [
      {
        title: "Agenda e atendimento",
        description: "Do agendamento ao atendimento concluído, sem planilha nem caderno.",
        items: [
          {
            title: "Agenda por profissional",
            description:
              "Grade do dia com uma coluna por profissional, criação de atendimento direto no horário vago e painel lateral para confirmar, remarcar ou cancelar.",
          },
          {
            title: "Vários serviços por atendimento",
            description:
              "Um mesmo atendimento pode ter mais de um serviço, com preço e duração registrados no momento da marcação.",
          },
          {
            title: "Link público de agendamento",
            description:
              "Seus clientes agendam sozinhos pela página do seu negócio, escolhendo serviço, profissional e horário disponível.",
          },
          {
            title: "Status do atendimento",
            description:
              "Acompanhe cada atendimento: agendado, confirmado, em atendimento, concluído, falta ou cancelado.",
          },
          {
            title: "Sem conflito de horários",
            description:
              "O sistema impede dois atendimentos no mesmo horário para o mesmo profissional e respeita os bloqueios da agenda.",
          },
          {
            title: "Lista de espera",
            description:
              "Quando a agenda está cheia, registre os clientes interessados e acompanhe quem já foi contatado.",
          },
        ],
      },
      {
        title: "Clientes",
        description: "Conheça quem passa pelo seu negócio e mantenha o histórico à mão.",
        items: [
          {
            title: "Cadastro completo",
            description:
              "Contato, aniversário, observações e etiquetas para organizar sua base de clientes.",
          },
          {
            title: "Histórico do cliente",
            description:
              "Linha do tempo com atendimentos realizados, agendamentos futuros e faltas.",
          },
          {
            title: "Fichas personalizadas",
            description:
              "Crie formulários próprios, como anamnese, e preencha durante o atendimento.",
          },
        ],
      },
      {
        title: "Vendas e caixa",
        description: "Feche a conta do atendimento e saiba o que entrou no dia.",
        items: [
          {
            title: "Comandas",
            description:
              "Reúna serviços, produtos e itens avulsos, aplique descontos e registre as formas de pagamento: dinheiro, débito, crédito ou Pix.",
          },
          {
            title: "Controle de caixa",
            description:
              "Abertura com fundo de troco, sangria, suprimento e fechamento com conferência.",
          },
          {
            title: "Produtos e estoque",
            description:
              "Catálogo de produtos com entradas, saídas e ajustes. A venda na comanda dá baixa no estoque automaticamente.",
          },
        ],
      },
      {
        title: "Equipe e financeiro",
        description: "Saiba quanto cada profissional rendeu e como está o resultado do mês.",
        items: [
          {
            title: "Profissionais e horários",
            description:
              "Cadastre a equipe, defina horários de trabalho e escolha quais serviços cada um atende.",
          },
          {
            title: "Comissões e repasses",
            description:
              "Regras de comissão por profissional, em porcentagem ou valor fixo, com saldo a repassar e registro dos repasses.",
          },
          {
            title: "Financeiro",
            description:
              "Contas a pagar e a receber, fluxo de caixa por categoria e resultado do negócio com custo dos produtos e despesas.",
          },
          {
            title: "Relatórios",
            description:
              "Balanço geral de serviços realizados e produtos vendidos, por período e por cliente.",
          },
          {
            title: "Acessos por função",
            description:
              "Perfis de dono, recepção e profissional, cada um vendo apenas o que precisa.",
          },
        ],
      },
      {
        title: "Presença online",
        description: "Seja encontrado por quem procura o seu serviço.",
        items: [
          {
            title: "Página pública do negócio",
            description:
              "Logo, endereço, contato e galeria de fotos, com link próprio para divulgar.",
          },
          {
            title: "Marketplace",
            description:
              "Apareça na busca por cidade e categoria e receba avaliações de clientes que já foram atendidos.",
          },
          {
            title: "Área do cliente",
            description:
              "Seu cliente acompanha e gerencia os próprios agendamentos em uma conta pessoal.",
          },
        ],
      },
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    themeClassName: "theme-agenda",
    accentColor: "#8b5cf6",
    pricingDescription: "Escolha o plano ideal para o seu negócio.",
    pricingPlans: [
      {
        name: "Essencial",
        price: "49.9",
        yearlyPrice: "49.9",
        period: "mês",
        description: "Para quem trabalha sozinho ou em dupla.",
        buttonText: "Assinar",
        href: "/portal?produto=marquo&plano=Essencial",
        features: [
          "Até 2 profissionais",
          "Agenda online com link de agendamento",
          "Clientes, fichas de anamnese e lista de espera",
          "Comandas, caixa, produtos e estoque",
          "Comissões, repasses e financeiro",
          "Relatórios do negócio",
          "Página pública e marketplace",
          "Todas as funcionalidades em qualquer plano",
        ],
      },
      {
        name: "Profissional",
        price: "99.9",
        yearlyPrice: "99.9",
        period: "mês",
        description: "Para salões e barbearias com equipe pequena.",
        buttonText: "Assinar",
        href: "/portal?produto=marquo&plano=Profissional",
        isPopular: true,
        features: [
          "Até 5 profissionais",
          "Agenda online com link de agendamento",
          "Clientes, fichas de anamnese e lista de espera",
          "Comandas, caixa, produtos e estoque",
          "Comissões, repasses e financeiro",
          "Relatórios do negócio",
          "Página pública e marketplace",
          "Todas as funcionalidades em qualquer plano",
        ],
      },
      {
        name: "Premium",
        price: "189.9",
        yearlyPrice: "189.9",
        period: "mês",
        description: "Para equipes grandes e negócios em crescimento.",
        buttonText: "Assinar",
        href: "/portal?produto=marquo&plano=Premium",
        features: [
          "Profissionais ilimitados",
          "Agenda online com link de agendamento",
          "Clientes, fichas de anamnese e lista de espera",
          "Comandas, caixa, produtos e estoque",
          "Comissões, repasses e financeiro",
          "Relatórios do negócio",
          "Página pública e marketplace",
          "Todas as funcionalidades em qualquer plano",
        ],
      },
    ],
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
    themeClassName: "theme-control",
    accentColor: "#10B981",
    pricingDescription: "Escolha o plano ideal para o seu negócio.",
    pricingPlans: [
      {
        name: "Starter",
        price: "59.9",
        yearlyPrice: "59.9",
        period: "mês",
        description: "Comece com 14 dias grátis, depois R$ 59,90/mês.",
        buttonText: "Assinar",
        href: "/portal?produto=totalcontrol&plano=Starter",
        features: [
          "Teste grátis por 14 dias",
          "Ponto de venda (PDV)",
          "Vendas no balcão ilimitadas",
          "Controle de estoque completo",
          "Abertura e fechamento de caixa",
        ],
      },
      {
        name: "Pro",
        price: "129.9",
        yearlyPrice: "129.9",
        period: "mês",
        description: "Para negócios com equipe de vendas e comissionamento.",
        buttonText: "Assinar",
        href: "/portal?produto=totalcontrol&plano=Pro",
        isPopular: true,
        features: [
          "Tudo do plano Starter",
          "Gestão de equipe",
          "Comissão de vendedores",
          "Relatórios de vendas avançados",
        ],
      },
      {
        name: "Enterprise",
        price: "249.9",
        yearlyPrice: "249.9",
        period: "mês (1ª loja)",
        description:
          "Para redes com mais de uma loja. A partir de R$ 249,90 (1ª loja) + R$ 79,90 por loja adicional.",
        buttonText: "Assinar",
        href: "/portal?produto=totalcontrol&plano=Enterprise",
        features: [
          "Tudo do plano Pro",
          "Múltiplas lojas",
          "R$ 79,90 por loja adicional",
          "Suporte prioritário",
        ],
      },
    ],
  },
];

export function getProductBySlug(slug: string | undefined) {
  return PRODUCTS.find((product) => product.slug === slug);
}
