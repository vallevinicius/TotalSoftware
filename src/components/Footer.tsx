import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer id="contato">
      <div className="footer-top">
        <div>
          <div className="footer-brand">
            Total<span>Software</span>
          </div>
          <div className="footer-tagline">Technology & Software Solutions</div>
        </div>
        <ul className="footer-links">
          <li>
            <Link to="/portfolio">Portfolio</Link>
          </li>
          <li>
            <Link to="/clientes">Clientes</Link>
          </li>
          <li>
            <Link to="/servicos">Serviços</Link>
          </li>
          <li className="hidden-menu">
            <Link to="/produtos">Produtos</Link>
          </li>
          <li>
            <Link to="/valores">Valores</Link>
          </li>
          <li>
            <Link to="/equipe">Equipe</Link>
          </li>
          <li>
            <Link to="/fale-conosco">Fale Conosco</Link>
          </li>
          <li>
            <a href="mailto:contatototalsoftware@gmail.com">contatototalsoftware@gmail.com</a>
          </li>
        </ul>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© 2025 Total Software. Todos os direitos reservados.</span>
        <span className="footer-copy">Rio de Janeiro — São Paulo — Recife</span>
      </div>
    </footer>
  )
}
