export function abrirModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('ativo', 'aberto', 'show');
  modal.style.display = 'flex';
  modal.style.opacity = '1';
  modal.style.visibility = 'visible';
}

export function fecharModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('ativo', 'aberto', 'show');
  modal.style.display = 'none';
}

export function iniciarModal() {
  document.addEventListener('click', (e) => {
    if (e.target.classList && e.target.classList.contains('modal')) {
      fecharModal(e.target.id);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach((m) => fecharModal(m.id));
    }
  });
}