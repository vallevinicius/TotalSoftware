import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router nao reseta o scroll ao trocar de rota (so navegadores fazem
// isso em navegacoes "de verdade", com reload de pagina). Sem isso, ir de
// uma pagina com scroll longo (ex.: precos no fim de /produtos/x) pra
// /portal mantem a posicao antiga da tela.
export function useScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
}
