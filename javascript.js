// Menu lateral
const menu = document.getElementById('menu_aba');

window.openMenu = function() {
  if (menu) menu.style.display = 'block';
};
window.closeMenu = function() {
  if (menu) menu.style.display = 'none';
};

// Temas
window.temaInatel = function() {
  document.documentElement.style.setProperty('--cor-back1', '#edf2f4');
  document.documentElement.style.setProperty('--cor-click', '#126ae2');
  document.documentElement.style.setProperty('--cor-text', 'black');
};
window.temaLim = function() {
  document.documentElement.style.setProperty('--cor-back1', '#f7fff7');
  document.documentElement.style.setProperty('--cor-click', '#6a937a');
  document.documentElement.style.setProperty('--cor-text', 'black');
};
window.temaDark = function() {
  document.documentElement.style.setProperty('--cor-back1', '#1e1e1e');
  document.documentElement.style.setProperty('--cor-click', '#ffffff');
  document.documentElement.style.setProperty('--cor-text', 'white');
};

// ---------- Materias (cards por matéria) ----------
const materias = [
  { nome: 'Algoritmos I', faltas: 2, notas: [8.5, 7.0], sala: 'Sala 5 - Prédio 1' },
  { nome: 'Cálculo III', faltas: 8, notas: [7.5, 6.8], sala: 'Sala 5 - Prédio 1' },
  { nome: 'Banco de Dados II', faltas: 0, notas: [9.2, 8.7], sala: 'Sala 5 - Prédio 1' }
];

function formatNotas(notas) {
  return notas.map(n => n.toFixed(1)).join(' • ');
}

function renderMaterias() {
  const container = document.getElementById('materias_container');
  if (!container) return;
  container.innerHTML = '';
  materias.forEach(mat => {
    const avg = mat.notas && mat.notas.length ? (mat.notas.reduce((s, v) => s + v, 0) / mat.notas.length) : 0;
    const card = document.createElement('div');
    card.className = 'materia-card';
    card.innerHTML = `
      <div class="materia-header">
        <div class="materia-nome">${mat.nome}</div>
        <div class="materia-sala">${mat.sala}</div>
      </div>
      <div class="materia-body">
        <div class="materia-item">
          <div class="materia-value">${mat.faltas}</div>
          <div class="materia-label">Faltas</div>
        </div>
        <div class="materia-item">
          <div class="materia-value">${formatNotas(mat.notas)}</div>
          <div class="materia-label">Notas</div>
        </div>
        <div class="materia-item">
          <div class="materia-value">${avg.toFixed(2)}</div>
          <div class="materia-label">Média</div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ---------- Oportunidades (filtro + busca) ----------
const oportunidades = [
  { tipo: 'Estágio', titulo: 'Estágio em Desenvolvimento Web', empresa: 'Tech Solutions', descricao: 'Procuramos aluno para trabalhar com React e Node.js', periodo: '6 meses', bolsa: 'R$ 1.500,00' },
  { tipo: 'Emprego', titulo: 'Desenvolvedor Junior', empresa: 'Inovação Digital', descricao: 'Vaga para desenvolvedores iniciantes em Python', periodo: 'Contrato', bolsa: 'R$ 3.500,00' },
  { tipo: 'Estágio', titulo: 'Estágio em UI/UX Design', empresa: 'Creative Studio', descricao: 'Design de interfaces e prototipagem com Figma', periodo: '4 meses', bolsa: 'R$ 1.200,00' },
  { tipo: 'Emprego', titulo: 'Analista de Sistemas', empresa: 'Tech Corp', descricao: 'Análise e desenvolvimento de sistemas em Java', periodo: 'Contrato', bolsa: 'R$ 5.000,00' }
];

window.mostrarOportunidades = function() {
  document.getElementById('conteudo_principal').style.display = 'none';
  document.getElementById('oportunidades_container').style.display = 'block';
  const tipoEl = document.getElementById('filtro-tipo');
  const buscaEl = document.getElementById('filtro-busca');
  if (tipoEl) tipoEl.value = 'Todos';
  if (buscaEl) buscaEl.value = '';
  aplicarFiltros();
};

window.aplicarFiltros = function() {
  const tipo = (document.getElementById('filtro-tipo') || {}).value || 'Todos';
  const busca = ((document.getElementById('filtro-busca') || {}).value || '').toLowerCase();
  let lista = oportunidades.slice();
  if (tipo !== 'Todos') lista = lista.filter(o => o.tipo === tipo);
  if (busca) lista = lista.filter(o => o.titulo.toLowerCase().includes(busca) || o.empresa.toLowerCase().includes(busca));
  renderizarOportunidades(lista);
};

function renderizarOportunidades(lista) {
  const container = document.getElementById('lista_oportunidades');
  if (!container) return;
  container.innerHTML = '';
  if (!lista.length) {
    container.innerHTML = '<div class="vazio"><p>Nenhuma oportunidade encontrada</p></div>';
    return;
  }
  lista.forEach(o => {
    const corBorda = o.tipo === 'Estágio' ? '#126ae2' : '#8e24aa';
    const icone = o.tipo === 'Estágio' ? '📚' : '💼';
    const card = document.createElement('div');
    card.className = 'oportunidade-card';
    card.innerHTML = `
      <div class="card-header">
        <div class="card-icon">${icone}</div>
        <div class="card-info-header">
          <span class="badge" style="background-color:${corBorda}">${o.tipo}</span>
          <h3 class="card-titulo">${o.titulo}</h3>
          <p class="card-empresa">${o.empresa}</p>
        </div>
      </div>
      <p class="card-descricao">${o.descricao}</p>
      <div class="card-details">
        <div class="detail-item">
          <span class="material-symbols-outlined">schedule</span>
          <div><strong>Período</strong><p>${o.periodo}</p></div>
        </div>
        <div class="detail-item">
          <span class="material-symbols-outlined">attach_money</span>
          <div><strong>Bolsa</strong><p>${o.bolsa}</p></div>
        </div>
      </div>
      <div class="card-footer"><button class="btn-candidatar" style="background-color:${corBorda}">Candidatar-se</button></div>
    `;
    container.appendChild(card);
  });
}

window.voltarDashboard = function() {
  document.getElementById('conteudo_principal').style.display = 'block';
  document.getElementById('oportunidades_container').style.display = 'none';
};

// inicialização
document.addEventListener('DOMContentLoaded', () => {
  closeMenu();
  renderMaterias();
});