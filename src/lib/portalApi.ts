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

export interface PortalCadastroParams {
  nome: string
  email: string
  senha: string
  telefone?: string
  cpf?: string
  dataNascimento?: string
  cep?: string
  rua?: string
  numero?: string
  complemento?: string
  bairro?: string
  cidade?: string
  estado?: string
  cargo?: string
}

export async function portalCadastro(
  params: PortalCadastroParams,
): Promise<{ token: string; cliente: PortalCliente }> {
  const response = await fetch(`${requireApiUrl()}/api/portal/cadastro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
  if (!response.ok) {
    throw new PortalApiError(await parseError(response, 'Não foi possível criar sua conta.'))
  }
  return response.json()
}

export interface PortalPlano {
  id: number
  nome: string
  precoCents: number
}

export async function fetchPortalPlanos(
  produto: 'totalpousada' | 'totalagenda' | 'totalcontrol',
): Promise<PortalPlano[]> {
  const response = await fetch(
    `${requireApiUrl()}/api/portal/planos?produto=${encodeURIComponent(produto)}`,
  )
  if (!response.ok) {
    throw new PortalApiError(await parseError(response, 'Não foi possível carregar os planos.'))
  }
  const data = await response.json()
  return data.planos
}

export interface PortalEstabelecimentoCriado {
  id: number
  nome: string
  cidade: string
  estado: string
  valorMensalidade: number
}

export async function createEstabelecimento(
  token: string,
  params: { nome: string; cidade: string; estado: string; diaVencimento?: number; planoId: number },
): Promise<{ estabelecimento: PortalEstabelecimentoCriado }> {
  const response = await fetch(`${requireApiUrl()}/api/portal/estabelecimento`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(params),
  })
  if (!response.ok) {
    throw new PortalApiError(await parseError(response, 'Não foi possível cadastrar sua pousada.'))
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

export type CheckoutSessionParams =
  | { produto?: 'totalpousada'; estabelecimentoId: number }
  | {
      produto: 'totalagenda'
      planoId: number
      nomeEmpresa: string
      nomeFantasia: string
      cnpj: string
      nomeProprietario: string
    }
  | {
      produto: 'totalcontrol'
      planoId: number
      nomeFantasia: string
      cnpj: string
      razaoSocial?: string
      senhaAdmin: string
    }

export async function createPagamentoCheckoutSession(
  token: string,
  params: CheckoutSessionParams,
): Promise<{ url: string }> {
  const body =
    params.produto === 'totalagenda'
      ? {
          produto: params.produto,
          planoId: params.planoId,
          nomeEmpresa: params.nomeEmpresa,
          nomeFantasia: params.nomeFantasia,
          cnpj: params.cnpj,
          nomeProprietario: params.nomeProprietario,
        }
      : params.produto === 'totalcontrol'
        ? {
            produto: params.produto,
            planoId: params.planoId,
            nomeFantasia: params.nomeFantasia,
            cnpj: params.cnpj,
            razaoSocial: params.razaoSocial,
            senhaAdmin: params.senhaAdmin,
          }
        : { produto: params.produto ?? 'totalpousada', estabelecimentoId: params.estabelecimentoId }

  const response = await fetch(`${requireApiUrl()}/api/portal/pagamento/checkout-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
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
