const regras = {
  email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, msg: 'Digite um e-mail válido, como nome@dominio.com.' },
  telefone: { regex: /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/, msg: 'Digite um telefone válido, como (11) 91234-5673.' },
  cpf: { regex: /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, msg: 'Digite um CPF válido, como 123.456.789-00.' },
  cep: { regex: /^\d{5}-?\d{3}$/, msg: 'Digite um CEP válido, como 06300-000.' }
};

function tipoDaRegra(campo) {
  const ref = `${campo.id} ${campo.name}`.toLowerCase();
  if (campo.type === 'email' || ref.includes('email')) return 'email';
  if (campo.type === 'tel' || ref.includes('tel') || ref.includes('fone') || ref.includes('celular')) return 'telefone';
  if (ref.includes('cpf')) return 'cpf';
  if (ref.includes('cep')) return 'cep';
  return null;
}

export function desativarValidacaoNativa() {
  document.querySelectorAll('form').forEach((f) => f.setAttribute('novalidate', ''));
}

export function campoValidavel(campo) {
  return !['submit', 'button', 'reset', 'hidden', 'radio'].includes(campo.type);
}

export function validarCampo(campo) {
  if (campo.type === 'checkbox') {
    return campo.required && !campo.checked ? 'Marque esta opção para continuar.' : '';
  }

  const valor = campo.value.trim();

  if (campo.required && !valor) return 'Este campo é obrigatório.';
  if (!valor) return '';

  if (campo.minLength > 0 && valor.length < campo.minLength) {
    return `Digite pelo menos ${campo.minLength} caracteres.`;
  }

  const regra = regras[tipoDaRegra(campo)];
  if (regra && !regra.regex.test(valor)) return regra.msg;

  return '';
}

export function mostrarResultado(campo, mensagem) {
  let aviso = campo.nextElementSibling;

  if (!aviso || !aviso.classList.contains('msg-campo')) {
    aviso = document.createElement('small');
    aviso.className = 'msg-campo';
    aviso.setAttribute('role', 'alert');
    campo.after(aviso);
  }

  aviso.textContent = mensagem;
  campo.classList.toggle('invalido', mensagem !== '');
  campo.classList.toggle('valido', mensagem === '' && campo.value.trim() !== '');
  campo.setAttribute('aria-invalid', String(mensagem !== ''));
}