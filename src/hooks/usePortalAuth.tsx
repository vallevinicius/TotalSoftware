import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  portalLogin,
  portalCadastro,
  portalMe,
  PortalApiError,
  type PortalCadastroParams,
  type PortalMeResponse,
} from '../lib/portalApi'

const TOKEN_STORAGE_KEY = 'ts_portal_token'

interface PortalAuthValue {
  token: string | null
  data: PortalMeResponse | null
  loading: boolean
  error: string | null
  login: (email: string, senha: string) => Promise<boolean>
  cadastro: (params: PortalCadastroParams) => Promise<boolean>
  logout: () => void
  refresh: () => Promise<void>
}

const PortalAuthContext = createContext<PortalAuthValue | null>(null)

export function PortalAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_STORAGE_KEY),
  )
  const [data, setData] = useState<PortalMeResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadMe = useCallback(async (currentToken: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await portalMe(currentToken)
      setData(result)
    } catch (err) {
      setData(null)
      setToken(null)
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      setError(err instanceof PortalApiError ? err.message : 'Sessão expirada. Entre novamente.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (token) {
      loadMe(token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = useCallback(async (email: string, senha: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await portalLogin(email, senha)
      localStorage.setItem(TOKEN_STORAGE_KEY, result.token)
      setToken(result.token)
      await loadMe(result.token)
      return true
    } catch (err) {
      setError(err instanceof PortalApiError ? err.message : 'Não foi possível entrar.')
      setLoading(false)
      return false
    }
  }, [loadMe])

  const cadastro = useCallback(
    async (params: PortalCadastroParams) => {
      setLoading(true)
      setError(null)
      try {
        const result = await portalCadastro(params)
        localStorage.setItem(TOKEN_STORAGE_KEY, result.token)
        setToken(result.token)
        await loadMe(result.token)
        return true
      } catch (err) {
        setError(err instanceof PortalApiError ? err.message : 'Não foi possível criar sua conta.')
        setLoading(false)
        return false
      }
    },
    [loadMe],
  )

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    setToken(null)
    setData(null)
    setError(null)
  }, [])

  const refresh = useCallback(async () => {
    if (token) await loadMe(token)
  }, [token, loadMe])

  const value = useMemo<PortalAuthValue>(
    () => ({ token, data, loading, error, login, cadastro, logout, refresh }),
    [token, data, loading, error, login, cadastro, logout, refresh],
  )

  return <PortalAuthContext.Provider value={value}>{children}</PortalAuthContext.Provider>
}

export function usePortalAuth() {
  const ctx = useContext(PortalAuthContext)
  if (!ctx) {
    throw new Error('usePortalAuth deve ser usado dentro de PortalAuthProvider.')
  }
  return ctx
}
