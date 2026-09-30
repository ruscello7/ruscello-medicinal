import { campoValidavel, validarCampo, mostrarResultado } from './validacao.js';
import { adicionarVoluntario, renderizarVoluntarios, limparVoluntarios } from './voluntarios.js';
import { abrirModal } from './modal.js';

export function iniciarFormulario() {
  ['input', 'change', 'focusout'].forEach((tipo) => {
    document.addEventListener(tipo, (e) => {
      const campo = e.target;
      if (!campo.form || !campoValidavel(campo)) return;
      mostrarResultado(campo, validarCampo(campo));
    });
  });

  document.addEventListener('submit', (e) => {
    const form = e.target.closest('form');
    if (!form) return;
    e.preventDefault();

    const campos = [...form.elements].filter(campoValidavel);
    let primeiroErro = null;

    campos.forEach((campo) => {
      const mensagem = validarCampo(campo);
      mostrarResultado(campo, mensagem);
      if (mensagem && !primeiroErro) primeiroErro = campo;
    });

    let aviso = form.querySelector('.alerta-form');
    if (!aviso) {
      aviso = document.createElement('div');
      form.prepend(aviso);
    }

    if (primeiroErro) {
      aviso.className = 'alerta-form erro';
      aviso.textContent = 'Corrija os campos destacados antes de enviar.';
      primeiroErro.focus();
    } else {
      adicionarVoluntario(form);
      aviso.className = 'alerta-form sucesso';
      aviso.textContent = 'Cadastro enviado com sucesso!';
      form.reset();
      form.querySelectorAll('.msg-campo').forEach((m) => m.remove());
      form.querySelectorAll('.valido, .invalido').forEach((c) => c.classList.remove('valido', 'invalido'));
      renderizarVoluntarios();
      abrirModal('modal-sucesso');
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.dataset && e.target.dataset.acao === 'limpar-voluntarios') {
      limparVoluntarios();
    }
  });
}