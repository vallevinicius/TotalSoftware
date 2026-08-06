import { useDocumentTitle } from '../hooks/useDocumentTitle'

const WHATSAPP_NUMBER = '5522999447646'

function requestProposal(planName: string) {
  const message = `Olá! Gostaria de solicitar uma proposta para o plano: ${planName}`
  const encodedMessage = encodeURIComponent(message)
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank')
}

const PLANS = [
  {
    title: 'Início Rápido',
    desc: 'Landing para captar clientes',
    features: [
      { text: 'Uma página de destino', included: true },
      { text: 'Design responsivo', included: true },
      { text: 'Formulário de contato', included: true },
      { text: 'SEO básico', included: true },
      { text: 'Analytics avançado', included: false },
      { text: 'Suporte contínuo', included: false },
    ],
    delay: '0s',
    featured: false,
    badge: null,
    button: 'Solicitar proposta',
    buttonPrimary: false,
  },
  {
    title: 'Site Profissional',
    desc: 'Site completo para sua marca',
    features: [
      { text: 'Páginas principais', included: true },
      { text: 'SEO inicial', included: true },
      { text: 'Formulário e CMS', included: true },
      { text: 'Design personalizado', included: true },
      { text: 'Suporte básico', included: true },
      { text: 'E-commerce', included: false },
    ],
    delay: '0.1s',
    featured: true,
    badge: 'MAIS PEDIDO',
    button: 'Solicitar proposta',
    buttonPrimary: true,
  },
  {
    title: 'Loja',
    desc: 'Venda online com estrutura',
    features: [
      { text: 'Catálogo e compra', included: true },
      { text: 'Checkout integrado', included: true },
      { text: 'Automações básicas', included: true },
      { text: 'Gestão de estoque', included: true },
      { text: 'Analytics vendas', included: true },
      { text: 'Suporte por 1 mês', included: true },
    ],
    delay: '0.2s',
    featured: false,
    badge: 'POPULAR',
    button: 'Solicitar proposta',
    buttonPrimary: false,
  },
  {
    title: 'Sistema Inicial',
    desc: 'Primeira versão do seu produto',
    features: [
      { text: 'Escopo essencial', included: true },
      { text: 'Área de login', included: true },
      { text: 'Plano de evolução', included: true },
      { text: 'Banco de dados', included: true },
      { text: 'Deploy incluído', included: true },
      { text: 'Suporte por 3 meses', included: true },
    ],
    delay: '0.3s',
    featured: false,
    badge: null,
    button: 'Solicitar proposta',
    buttonPrimary: true,
  },
  {
    title: 'Projeto Sob Medida',
    desc: 'Fluxo personalizado para seu negócio',
    features: [
      { text: 'Mapeamento completo', included: true },
      { text: 'Time dedicado', included: true },
      { text: 'Suporte no lançamento', included: true },
      { text: 'Integrações customizadas', included: true },
      { text: 'Relatórios detalhados', included: true },
      { text: 'Manutenção contínua', included: true },
    ],
    delay: '0.4s',
    featured: false,
    badge: null,
    button: 'Solicitar proposta',
    buttonPrimary: false,
  },
]

const CUSTOM_OPTIONS = [
  'App Mobile (iOS/Android)',
  'Integração de Sistemas (ERP, CRM, APIs)',
  'UX/UI Design',
  'Sustentação de Software',
  'Escopo montado com você',
  'Proposta alinhada ao seu momento',
]

const FAQS = [
  {
    q: 'Qual plano escolher?',
    a: 'Comece pequeno com o Início Rápido e escale conforme cresce. Para um MVP de SaaS, o Sistema Inicial é perfeito.',
  },
  {
    q: 'Quanto tempo leva?',
    a: 'Início Rápido: 2 semanas | Site Pro: 3-4 semanas | Loja: 4-6 semanas | Sistema Inicial: 6-8 semanas.',
  },
  {
    q: 'Posso customizar um plano?',
    a: 'Sim! Todos os planos são flexíveis. Aumentar ou remover features é possível. Fale com a gente!',
  },
  {
    q: 'Inclui suporte após entrega?',
    a: 'Sim, cada plano inclui suporte. Sistema Inicial vem com 3 meses. Depois oferecemos pacotes de manutenção.',
  },
  {
    q: 'E o suporte contínuo?',
    a: 'Suporte mensal mediante ao pagamento de mensalidade definida na conversa com o especialista. Podemos adequar ao melhor plano para sua necessidade.',
  },
]

export default function Valores() {
  useDocumentTitle('Valores | Total Software')

  return (
    <section id="valores" className="page-content">
      <div className="section-header">
        <span className="section-number">04 / 06</span>
        <div>
          <h2 className="section-title">Valores</h2>
          <p className="section-sub">Planos e pacotes adaptados para cada etapa do seu negócio digital.</p>
        </div>
      </div>

      <div className="pricing-grid">
        {PLANS.map((plan) => (
          <div
            className={['pricing-card', 'reveal', plan.featured && 'featured'].filter(Boolean).join(' ')}
            style={{ transitionDelay: plan.delay }}
            key={plan.title}
          >
            {plan.badge && <div className="pricing-badge">{plan.badge}</div>}
            <div className="pricing-header">
              <h3 className="pricing-title">{plan.title}</h3>
              <p className="pricing-desc">{plan.desc}</p>
            </div>
            <div className="pricing-price">
              <span className="price-value price-quote">Sob consulta</span>
              <span className="price-period">proposta personalizada</span>
            </div>
            <ul className="pricing-features">
              {plan.features.map((feature) => (
                <li key={feature.text}>
                  <span className="check">{feature.included ? '✓' : '✗'}</span> {feature.text}
                </li>
              ))}
            </ul>
            <p className="pricing-note">
              <em>Suporte mensal disponível mediante pagamento de mensalidade definida na conversa com o especialista.</em>
            </p>
            <button
              className={['pricing-btn', plan.buttonPrimary && 'btn-primary'].filter(Boolean).join(' ')}
              onClick={() => requestProposal(plan.title)}
            >
              {plan.button}
            </button>
          </div>
        ))}

        <div className="pricing-card reveal custom-card" style={{ transitionDelay: '0.5s' }}>
          <div className="pricing-header">
            <h3 className="pricing-title">Precisa de Algo Diferente?</h3>
            <p className="pricing-desc">Seu projeto merece uma proposta única</p>
          </div>
          <div className="custom-options">
            {CUSTOM_OPTIONS.map((option) => (
              <button className="custom-option" key={option}>
                {option}
              </button>
            ))}
          </div>
          <p className="pricing-note">
            <em>Suporte mensal disponível mediante pagamento de mensalidade definida na conversa com o especialista.</em>
          </p>
          <button className="pricing-btn btn-primary" onClick={() => requestProposal('Projeto Customizado')}>
            Falar com especialista
          </button>
        </div>
      </div>

      <div className="faq-section reveal" style={{ transitionDelay: '0.6s' }}>
        <h3 className="faq-title">Perguntas Frequentes</h3>
        <div className="faq-grid">
          {FAQS.map((faq) => (
            <div className="faq-item" key={faq.q}>
              <h4>{faq.q}</h4>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
