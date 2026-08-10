const API_URL = import.meta.env.VITE_API_URL as string | undefined

export interface PortalCliente {
  id: number
  nome: string
  email: string
}

export interface PortalMensalidade {
  id: number
  mesReferencia: string
  vencimento: string
  valor: number
  status: 'pendente' | 'pago' | 'atrasado'
  pagoEm: string | null
}

export interface PortalAssinatura {
  ativa: boolean
  status: string
  proximaCobranca: string | null
}

export interface PortalEstabelecimento {
  id: number
  nome: string
  cidade: string
  estado: string
  status: 'ativa' | 'inativa' | 'pendente'
  mensalidadeAtual: PortalMensalidade | null
  mensalidades: PortalMensalidade[]
  assinatura: PortalAssinatura | null
}

export interface PortalProduto {
  id: number
  nome: string
  url: string | null
  status: 'ativo' | 'inativo'
}

export interface PortalMeResponse {
  cliente: PortalCliente
  estabelecimentos: PortalEstabelecimento[]
  produtos: PortalProduto[]
}

export class PortalApiError extends Error {}

function requireApiUrl(): string {
  if (!API_URL) {
    throw new PortalApiError(
      'VITE_API_URL não configurado. Defina no arquivo .env do projeto.',
    )
  }
  return API_URL
}

async function parseError(response: Response, fallback: string): Promise<string> {
  try {
    const data = await response.json()
    return typeof data?.error === 'string' ? data.error : fallback
  } catch {
    return fallback
  }
}

export async function portalLogin(
  email: string,
  senha: string,
): Promise<{ token: string; cliente: PortalCliente }> {
  const response = await fetch(`${requireApiUrl()}/api/portal/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  })
  if (!response.ok) {
    throw new PortalApiError(await parseError(response, 'Não foi possível entrar.'))
  }
  return response.json()
}

export async function portalMe(token: string): Promise<PortalMeResponse> {
  const response = await fetch(`${requireApiUrl()}/api/portal/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) {
    throw new PortalApiError(
      await parseError(response, 'Não foi possível carregar seus dados.'),
    )
  }
  return response.json()
}

export async function createPagamentoCheckoutSession(
  token: string,
  estabelecimentoId: number,
): Promise<{ url: string }> {
  const response = await fetch(`${requireApiUrl()}/api/portal/pagamento/checkout-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ estabelecimentoId }),
  })
  if (!response.ok) {
    throw new PortalApiError(
      await parseError(response, 'Não foi possível iniciar o pagamento.'),
    )
  }
  return response.json()
}

export async function createPagamentoPortalSession(token: string): Promise<{ url: string }> {
  const response = await fetch(`${requireApiUrl()}/api/portal/pagamento/portal-session`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) {
    throw new PortalApiError(
      await parseError(response, 'Não foi possível abrir o gerenciamento de pagamento.'),
    )
  }
  return response.json()
}
