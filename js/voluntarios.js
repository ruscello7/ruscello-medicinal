import { raiz } from './dom.js';
import { CHAVE_VOLUNTARIOS, carregar, salvar, remover } from './storage.js';

if (window.dayjs) dayjs.locale('pt-br');

function formatarData(iso) {
  if (window.dayjs) return dayjs(iso).format('DD/MM/YYYY [às] HH:mm');
  return new Date(iso).toLocaleDateString('pt-BR');
}

export function adicionarVoluntario(form) {
  const dados = {
    nome: form.elements['nome']?.value.trim() || '',
    email: form.elements['email']?.value.trim() || '',
    cidade: form.elements['cidade']?.value.trim() || '',
    data: new Date().toISOString()
  };
  const lista = carregar(CHAVE_VOLUNTARIOS);
  lista.push(dados);
  salvar(CHAVE_VOLUNTARIOS, lista);
}

export function limparVoluntarios() {
  remover(CHAVE_VOLUNTARIOS);
  renderizarVoluntarios();
}

export function renderizarVoluntarios() {
  const contentor = raiz();
  if (!contentor || !document.getElementById('nome')) return;

  let secao = document.getElementById('lista-voluntarios');
  if (!secao) {
    secao = document.createElement('section');
    secao.id = 'lista-voluntarios';
    contentor.append(secao);
  }

  const lista = carregar(CHAVE_VOLUNTARIOS);
  secao.innerHTML = '';

  const titulo = document.createElement('h2');
  titulo.textContent = 'Voluntários cadastrados';
  secao.append(titulo);

  if (lista.length === 0) {
    const vazio = document.createElement('p');
    vazio.textContent = 'Nenhum cadastro salvo neste navegador ainda.';
    secao.append(vazio);
    return;
  }

  const ul = document.createElement('ul');
  ul.className = 'lista-voluntarios';
  lista.forEach((v) => {
    const li = document.createElement('li');
    li.textContent = `${v.nome} — ${v.email} — ${v.cidade} (${formatarData(v.data)})`;
    ul.append(li);
  });
  secao.append(ul);

  const limpar = document.createElement('button');
  limpar.type = 'button';
  limpar.className = 'btn-limpar';
  limpar.dataset.acao = 'limpar-voluntarios';
  limpar.textContent = 'Limpar lista';
  secao.append(limpar);
}