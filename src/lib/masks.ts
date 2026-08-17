// Aplica a mascara de CPF (000.000.000-00) progressivamente enquanto o
// usuario digita. Puramente visual, nao valida os digitos verificadores.
export function maskCpf(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  const part1 = digits.slice(0, 3)
  const part2 = digits.slice(3, 6)
  const part3 = digits.slice(6, 9)
  const part4 = digits.slice(9, 11)

  let result = part1
  if (part2) result += `.${part2}`
  if (part3) result += `.${part3}`
  if (part4) result += `-${part4}`
  return result
}

// Mascara de CEP (00000-000) progressiva enquanto o usuario digita.
export function maskCep(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  const part1 = digits.slice(0, 5)
  const part2 = digits.slice(5, 8)
  return part2 ? `${part1}-${part2}` : part1
}

// Mascara de telefone progressiva enquanto o usuario digita. Reflui de
// "(00) 0000-0000" (fixo) para "(00) 00000-0000" (celular) assim que o
// 11o digito e' digitado.
export function maskTelefone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  const ddd = digits.slice(0, 2)
  const isCelular = digits.length > 10
  const parte1 = digits.slice(2, isCelular ? 7 : 6)
  const parte2 = digits.slice(isCelular ? 7 : 6, isCelular ? 11 : 10)

  let result = ddd
  if (result) result = `(${result}`
  if (digits.length > 2) result += ') '
  result += parte1
  if (parte2) result += `-${parte2}`
  return result
}

// Mascara de CNPJ (00.000.000/0000-00) progressiva enquanto o usuario digita.
export function maskCnpj(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 14)
  const part1 = digits.slice(0, 2)
  const part2 = digits.slice(2, 5)
  const part3 = digits.slice(5, 8)
  const part4 = digits.slice(8, 12)
  const part5 = digits.slice(12, 14)

  let result = part1
  if (part2) result += `.${part2}`
  if (part3) result += `.${part3}`
  if (part4) result += `/${part4}`
  if (part5) result += `-${part5}`
  return result
}

export interface EnderecoPorCep {
  rua: string
  bairro: string
  cidade: string
  estado: string
}

// Busca o endereco pelo CEP usando a API publica do ViaCEP, direto do
// navegador (nao precisa do backend proprio). Retorna null se o CEP for
// invalido, nao encontrado, ou em caso de erro de rede — quem chama decide
// como avisar o usuario.
export async function buscarEnderecoPorCep(cep: string): Promise<EnderecoPorCep | null> {
  const digits = cep.replace(/\D/g, '')
  if (digits.length !== 8) return null

  try {
    const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`)
    if (!res.ok) return null

    const data = await res.json()
    if (data.erro) return null

    return {
      rua: data.logradouro ?? '',
      bairro: data.bairro ?? '',
      cidade: data.localidade ?? '',
      estado: data.uf ?? '',
    }
  } catch {
    return null
  }
}
