import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import PortfolioDetail from './pages/PortfolioDetail'
import Servicos from './pages/Servicos'
import Produtos from './pages/Produtos'
import ProdutoDetail from './pages/ProdutoDetail'
import Valores from './pages/Valores'
import Clientes from './pages/Clientes'
import Equipe from './pages/Equipe'
import FaleConosco from './pages/FaleConosco'
import Portal from './pages/Portal'
import NotFound from './pages/NotFound'
import { PortalAuthProvider } from './hooks/usePortalAuth'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="portfolio/:slug" element={<PortfolioDetail />} />
        <Route path="servicos" element={<Servicos />} />
        <Route path="produtos" element={<Produtos />} />
        <Route path="produtos/:slug" element={<ProdutoDetail />} />
        <Route path="valores" element={<Valores />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="equipe" element={<Equipe />} />
        <Route path="fale-conosco" element={<FaleConosco />} />
        <Route
          path="portal"
          element={
            <PortalAuthProvider>
              <Portal />
            </PortalAuthProvider>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
