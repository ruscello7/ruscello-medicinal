export const CHAVE_VOLUNTARIOS = 'ruscello:voluntarios';

export function carregar(chave) {
  try {
    const bruto = localStorage.getItem(chave);
    const lista = bruto ? JSON.parse(bruto) : [];
    return Array.isArray(lista) ? lista : [];
  } catch (erro) {
    return [];
  }
}

export function salvar(chave, lista) {
  try {
    localStorage.setItem(chave, JSON.stringify(lista));
  } catch (erro) {
    console.error('Não foi possível salvar no localStorage:', erro);
  }
}

export function remover(chave) {
  localStorage.removeItem(chave);
}