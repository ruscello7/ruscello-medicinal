import { desativarValidacaoNativa } from './validacao.js';
import { fecharModal, iniciarModal } from './modal.js';
import { iniciarFormulario } from './formulario.js';
import { iniciarRoteador } from './roteador.js';
import { renderizarProjetos } from './projetos.js';
import { renderizarVoluntarios } from './voluntarios.js';

// o HTML usa onclick="fecharModal(...)", então expomos a função no escopo global
window.fecharModal = fecharModal;

const botaoMenu = document.querySelector('.menu-toggle');
if (botaoMenu) {
  botaoMenu.addEventListener('click', () => {
    const aberto = botaoMenu.getAttribute('aria-expanded') === 'true';
    botaoMenu.setAttribute('aria-expanded', String(!aberto));
    document.querySelector('nav').classList.toggle('aberto');
  });
}

iniciarModal();
iniciarFormulario();
iniciarRoteador();
desativarValidacaoNativa();

if (location.pathname.endsWith('projetos.html')) renderizarProjetos();
if (location.pathname.endsWith('cadastro.html')) renderizarVoluntarios();