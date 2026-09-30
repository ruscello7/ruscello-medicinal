import { desativarValidacaoNativa } from './validacao.js';
import { renderizarProjetos } from './projetos.js';
import { renderizarVoluntarios } from './voluntarios.js';

async function renderizar(url) {
  const app = document.getElementById('app');
  const destino = new URL(url, location.href);

  try {
    const resposta = await fetch(destino.pathname);
    if (!resposta.ok) throw new Error('Página não encontrada');

    const texto = await resposta.text();
    const doc = new DOMParser().parseFromString(texto, 'text/html');
    const conteudo = doc.querySelector('main') || doc.body;

    app.innerHTML = '';
    app.append(...conteudo.childNodes);
    document.title = doc.title;

    desativarValidacaoNativa();

    if (destino.pathname.endsWith('projetos.html')) renderizarProjetos();
    if (destino.pathname.endsWith('cadastro.html')) renderizarVoluntarios();
  } catch (erro) {
    app.innerHTML = '<section><h2>Erro</h2><p>Não foi possível carregar a página.</p></section>';
  }

  const alvo = destino.hash ? document.querySelector(destino.hash) : null;
  if (alvo) {
    alvo.scrollIntoView();
  } else {
    window.scrollTo(0, 0);
  }
}

export function iniciarRoteador() {
  document.addEventListener('click', (e) => {
    const app = document.getElementById('app');
    const link = e.target.closest('a[data-link]');
    if (!link || !app) return;
    e.preventDefault();
    history.pushState(null, '', link.href);
    renderizar(link.href);
    document.querySelector('nav')?.classList.remove('aberto');
  });

  window.addEventListener('popstate', () => {
    if (document.getElementById('app')) renderizar(location.href);
  });
}