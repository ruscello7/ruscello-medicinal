import { raiz } from './dom.js';

const projetos = [
  {
    titulo: 'Ação de Saúde Comunitária',
    categoria: 'Voluntariado',
    descricao: 'Mutirões de orientação em saúde e bem-estar em bairros atendidos pela organização.'
  },
  {
    titulo: 'Campanha do Agasalho',
    categoria: 'Doações',
    descricao: 'Arrecadação e distribuição de agasalhos para famílias em situação de vulnerabilidade.'
  },
  {
    titulo: 'Farmácia Solidária',
    categoria: 'Doações',
    descricao: 'Coleta de medicamentos dentro da validade para repasse a quem mais precisa.'
  },
  {
    titulo: 'Palestras de Prevenção',
    categoria: 'Voluntariado',
    descricao: 'Encontros educativos sobre prevenção de doenças com profissionais voluntários.'
  }
];

function criarCard(projeto) {
  return `
    <article class="card-projeto">
      <span class="card-categoria">${projeto.categoria}</span>
      <h3>${projeto.titulo}</h3>
      <p>${projeto.descricao}</p>
    </article>
  `;
}

export function renderizarProjetos() {
  const contentor = raiz();
  if (!contentor) return;

  let secao = document.getElementById('lista-projetos');

  if (!secao) {
    secao = document.createElement('section');
    secao.id = 'lista-projetos';
    secao.innerHTML = '<h2>Nossos projetos</h2><div class="grid-projetos"></div>';
    contentor.append(secao);
  }

  const grade = secao.querySelector('.grid-projetos');
  grade.innerHTML = projetos.map(criarCard).join('');
}