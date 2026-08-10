import { CalendarDays, CheckCircle2, Star, Users } from "lucide-react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { FluidParticlesBackground } from "../components/ui/fluid-particles-background";

const STATS = [
  { icon: CalendarDays, num: "3+", label: "Anos de experiência" },
  { icon: CheckCircle2, num: "20+", label: "Projetos entregues" },
  { icon: Users, num: "10+", label: "Clientes ativos" },
  { icon: Star, num: "98%", label: "Satisfação" },
];

export default function Home() {
  useDocumentTitle("Total Software | Technology & Software Solutions");

  return (
    <>
      <section className="hero" id="home">
        <FluidParticlesBackground
          className="absolute inset-0 h-full w-full pointer-events-none"
          particleCount={600}
          particleSize={{ min: 0.5, max: 1.5 }}
        />
        <div className="hero-label">Fundada em 2025 — Rio de Janeiro, BR</div>
        <h1 className="hero-title">
          <span className="line">
            <span className="word">Software</span>
          </span>
          <span className="line">
            <span className="word outline">que</span>{" "}
            <span className="word">transforma</span>
          </span>
          <span className="line">
            <span className="word mb-4">negócios.</span>
          </span>
        </h1>
        <div className="hero-bottom">
          <p className="hero-desc">
            Desenvolvemos soluções tecnológicas que impulsionam o crescimento
            das empresas. Da concepção ao deploy, com excelência em cada linha
            de código.
          </p>
        </div>

        <div className="hero-stats">
          {STATS.map((stat, index) => (
            <div
              className="hero-stat-card reveal"
              style={{ transitionDelay: `${index * 0.1}s` }}
              key={stat.label}
            >
              <stat.icon className="hero-stat-icon" strokeWidth={1.75} />
              <div className="hero-stat-num">{stat.num}</div>
              <div className="hero-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
