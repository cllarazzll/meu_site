// Controles de Acessibilidade (Tamanho da Fonte e Contraste)
let tamanhoFonteAtual = 16;

function alterarFonte(delta) {
  const novaFonte = tamanhoFonteAtual + delta;
  if (novaFonte >= 12 && novaFonte <= 24) {
    tamanhoFonteAtual = novaFonte;
    document.documentElement.style.fontSize = `${tamanhoFonteAtual}px`;
  }
}

function alternarContraste() {
  document.body.classList.toggle('high-contrast');
}

// Dados para os Componentes Dinâmicos
const dadosCarrossel = [
  {
    titulo: "Rampas de Acesso Normatizadas",
    descricao: "Infraestrutura projetada com inclinação exata conforme a NBR 9050, garantindo deslocamento seguro e sem esforço."
  },
  {
    titulo: "Salas de Recursos Multifuncionais",
    descricao: "Ambientes equipados com softwares de comunicação alternativa, lupas eletrônicas e materiais táteis adaptados."
  },
  {
    titulo: "Sinalização Tátil e Visual Integrated",
    descricao: "Pisos táteis de alerta e direcionamento integrados à sinalização contrastante e com caracteres em Braille."
  }
];

const dadosFAQ = [
  {
    pergunta: "O que a Lei Brasileira de Inclusão (LBI) exige das escolas?",
    resposta: "A LBI exige que as instituições de ensino garantam oferta de educação inclusiva em todos os níveis, proibindo a cobrança de valores adicionais em mensalidades para alunos com deficiência."
  },
  {
    pergunta: "Quanto tempo leva um projeto completo de adequação?",
    resposta: "O diagnóstico é concluído em até 7 dias úteis. A implementação das adequações arquitetônicas e treinamentos varia de 30 a 90 dias, dependendo do porte da escola."
  },
  {
    pergunta: "A consultoria oferece treinamento para os professores?",
    resposta: "Sim, oferecemos capacitação completa em Desenho Universal para a Aprendizagem (DUA) e metodologias pedagógicas inclusivas para toda a equipe docente."
  }
];

// Inicialização do Carrossel
let indiceCarrossel = 0;

function renderizarCarrossel() {
  const display = document.getElementById('carousel-display');
  const dotsContainer = document.getElementById('carousel-dots');
  
  if (!display || !dotsContainer) return;

  const item = dadosCarrossel[indiceCarrossel];
  display.innerHTML = `
    <h3>${item.titulo}</h3>
    <p style="margin-top:10px; color:var(--muted);">${item.descricao}</p>
  `;

  dotsContainer.innerHTML = dadosCarrossel.map((_, idx) => `
    <span class="dot ${idx === indiceCarrossel ? 'active' : ''}" onclick="irParaSlide(${idx})"></span>
  `).join('');
}

function irParaSlide(index) {
  indiceCarrossel = index;
  renderizarCarrossel();
}

// Inicialização do Acordeão (FAQ)
function renderizarFAQ() {
  const container = document.getElementById('accordion-container');
  if (!container) return;

  container.innerHTML = dadosFAQ.map((item, idx) => `
    <div class="accordion-item" id="faq-item-${idx}">
      <button class="accordion-header" onclick="alternarAcordeao(${idx})">
        <span>${item.pergunta}</span>
        <span class="icon">+</span>
      </button>
      <div class="accordion-content">
        <p>${item.resposta}</p>
      </div>
    </div>
  `).join('');
}

function alternarAcordeao(index) {
  const item = document.getElementById(`faq-item-${index}`);
  if (item) {
    const estaAberto = item.classList.contains('open');
    document.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('open'));
    if (!estaAberto) {
      item.classList.add('open');
    }
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  renderizarCarrossel();
  renderizarFAQ();

  const btnPrev = document.getElementById('carousel-prev');
  const btnNext = document.getElementById('carousel-next');

  if (btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => {
      indiceCarrossel = (indiceCarrossel - 1 + dadosCarrossel.length) % dadosCarrossel.length;
      renderizarCarrossel();
    });

    btnNext.addEventListener('click', () => {
      indiceCarrossel = (indiceCarrossel + 1) % dadosCarrossel.length;
      renderizarCarrossel();
    });
  }
});