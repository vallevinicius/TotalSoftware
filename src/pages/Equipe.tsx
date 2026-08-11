import { useDocumentTitle } from '../hooks/useDocumentTitle'

const TEAM = [
  {
    initials: 'VV',
    name: 'Vinicius do Valle',
    photo: '/images/equipe/vinicius-valle.jpg',
    roles: ['CEO, Co-founder & Desenvolvedor', 'Ganhador premio sebrae Regional de Tecnologia na Prefeitura'],
    url: 'https://viniciusvalledev.com/',
    delay: '0s',
  },
  {
    initials: 'VD',
    name: 'Vinicius Diller',
    photo: '/images/equipe/vinicius-diller.jpg',
    roles: ['CTO, Founder & Desenvolvedor', 'Ganhador premio sebrae Regional de Tecnologia na Prefeitura'],
    url: 'https://vinicius-diller-portifolio.vercel.app/',
    delay: '0.1s',
  },
]

export default function Equipe() {
  useDocumentTitle('Equipe | Total Software')

  return (
    <section id="equipe" className="page-content">
      <div className="section-header">
        <span className="section-number">05 / 05</span>
        <div>
          <h2 className="section-title">Equipe</h2>
          <p className="section-sub">Profissionais apaixonados por tecnologia e comprometidos com resultados reais.</p>
        </div>
      </div>
      <div className="team-grid">
        {TEAM.map((member) => (
          <a
            href={member.url}
            target="_blank"
            rel="noopener noreferrer"
            className="team-card reveal"
            style={{ transitionDelay: member.delay }}
            key={member.name}
          >
            <div className="team-photo">
              <img src={member.photo} alt={member.name} className="team-photo-img" />
              <div className="team-photo-line"></div>
            </div>
            <div className="team-name">{member.name}</div>
            {member.roles.map((role) => (
              <div className="team-role" key={role}>
                {role}
              </div>
            ))}
          </a>
        ))}
      </div>
    </section>
  )
}
