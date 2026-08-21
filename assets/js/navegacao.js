/* ===================================================================
   NAVEGACAO.JS
   Duas responsabilidades neste arquivo:

   1) Guardar a lista de módulos do curso em um só lugar (um "array
      de objetos" - a estrutura de dados mais usada em JS pra listas
      de coisas parecidas). Quando um módulo novo for criado, é só
      adicionar um item aqui, e ele aparece no menu automaticamente.

   2) Controlar o comportamento do menu dropdown: abrir, fechar,
      fechar ao clicar fora, fechar com Esc.
   =================================================================== */

// -------------------------------------------------------------
// 1) DADOS: a trilha de módulos do curso.
// Cada módulo é um "objeto" com propriedades (slug, titulo, disponivel).
// "slug" é o nome da pasta do módulo (sem espaços, sem acento) -
// é assim que ele aparece na URL.
// -------------------------------------------------------------
const modulosDoCurso = [
  { slug: 'modulo-01-intro',      titulo: 'O que é lógica de programação', disponivel: true  },
  { slug: 'modulo-02-variaveis',  titulo: 'Variáveis e tipos de dados',     disponivel: false },
  { slug: 'modulo-03-condicionais', titulo: 'Condicionais',                 disponivel: false },
  { slug: 'modulo-04-loops',      titulo: 'Loops e repetição',              disponivel: false },
  { slug: 'modulo-05-funcoes',    titulo: 'Funções',                        disponivel: false },
  { slug: 'modulo-06-arrays',     titulo: 'Arrays e objetos',               disponivel: false },
];

// -------------------------------------------------------------
// Descobre o "caminho base" pra chegar na pasta modulos/, dependendo
// de onde a página atual está.
//   - Se estamos no index.html (raiz): a pasta modulos/ está aqui do lado.
//   - Se estamos DENTRO de modulos/algum-modulo/: precisa voltar um nível (../).
// window.location.pathname é o endereço da página atual no navegador.
// -------------------------------------------------------------
function caminhoBaseModulos() {
  const estaDentroDeUmModulo = window.location.pathname.includes('/modulos/');
  return estaDentroDeUmModulo ? '../' : 'modulos/';
}

// -------------------------------------------------------------
// Monta o HTML de cada item do menu, a partir dos dados acima.
// Recebe um módulo (objeto) e o número dele na lista (índice),
// devolve uma string de HTML pronta pra ser inserida na página.
// -------------------------------------------------------------
function criarItemDeMenu(modulo, indice) {
  const numero = String(indice + 1).padStart(2, '0'); // 1 -> "01", 2 -> "02"...
  const slugAtual = window.location.pathname.includes(modulo.slug);

  if (!modulo.disponivel) {
    // Módulo ainda não existe: mostramos na lista, mas sem link (não clicável).
    // Isso deixa claro pro aluno que a trilha continua, mesmo que o
    // conteúdo ainda não esteja pronto.
    return `
      <span class="dropdown__item dropdown__item--desabilitado">
        <span class="dropdown__item-numero">${numero}</span>
        ${modulo.titulo} <small>(em breve)</small>
      </span>
    `;
  }

  const classeExtra = slugAtual ? ' dropdown__item--atual' : '';
  const href = `${caminhoBaseModulos()}${modulo.slug}/index.html`;

  return `
    <a href="${href}" class="dropdown__item${classeExtra}">
      <span class="dropdown__item-numero">${numero}</span>
      ${modulo.titulo}
    </a>
  `;
}

// -------------------------------------------------------------
// 2) MONTAGEM E COMPORTAMENTO DO DROPDOWN
// -------------------------------------------------------------
const dropdown = document.querySelector('.dropdown');
const gatilho = document.querySelector('.dropdown__gatilho');
const menu = document.querySelector('.dropdown__menu');

// Preenche o menu com os itens gerados a partir de modulosDoCurso.
// .map() percorre cada módulo do array e devolve o HTML dele;
// .join('') junta tudo numa única string de HTML.
if (menu) {
  menu.innerHTML = modulosDoCurso.map(criarItemDeMenu).join('');
}

// Alterna a classe "dropdown--aberto" no clique do botão.
if (gatilho) {
  gatilho.addEventListener('click', function (evento) {
    // Impede que esse clique seja "escutado" também pelo listener
    // do documento (abaixo), o que fecharia o menu na mesma hora que abre.
    evento.stopPropagation();
    dropdown.classList.toggle('dropdown--aberto');
    gatilho.setAttribute(
      'aria-expanded',
      dropdown.classList.contains('dropdown--aberto') ? 'true' : 'false'
    );
  });
}

// Fecha o menu se a pessoa clicar em qualquer lugar fora dele.
document.addEventListener('click', function (evento) {
  if (dropdown && !dropdown.contains(evento.target)) {
    dropdown.classList.remove('dropdown--aberto');
  }
});

// Fecha o menu se a pessoa apertar a tecla Esc (boa prática de acessibilidade).
document.addEventListener('keydown', function (evento) {
  if (evento.key === 'Escape') {
    dropdown?.classList.remove('dropdown--aberto');
  }
});
