/* ===================================================================
   TEMA.JS
   Controla a troca entre tema escuro (padrão) e tema claro.

   A ideia, em lógica pura, é:
   1. Descobrir se já existe um tema salvo (de uma visita anterior)
   2. Aplicar esse tema assim que a página carrega
   3. Quando o botão for clicado: trocar o tema atual pelo oposto
   4. Salvar a escolha, pra lembrar da próxima vez que a pessoa voltar

   Esse é um padrão muito comum em programação: LER estado salvo,
   APLICAR estado, e então REAGIR a uma ação do usuário.
   =================================================================== */

// Pega o botão de alternar tema no HTML pelo id.
// "const" porque essa referência não vai mudar - o botão continua
// sendo o mesmo elemento durante toda a vida da página.
const botaoTema = document.getElementById('botao-tema');

// A tag <html> é onde guardamos qual tema está ativo,
// através do atributo data-tema (lembra do base.css? é ele quem lê isso).
const elementoHtml = document.documentElement;

// Função que aplica um tema e atualiza o texto do botão.
// Separamos isso em uma função porque vamos usá-la em dois momentos:
// no carregamento da página E no clique do botão. Repetir código é
// um sinal de que ele merece virar uma função.
function aplicarTema(tema) {
  if (tema === 'claro') {
    elementoHtml.setAttribute('data-tema', 'claro');
    botaoTema.textContent = '☀ modo claro';
  } else {
    // Se não for "claro", assumimos escuro (que é o padrão do CSS,
    // então nem precisamos setar o atributo - só removê-lo garante isso).
    elementoHtml.removeAttribute('data-tema');
    botaoTema.textContent = '● modo escuro';
  }
}

// 1) Ao carregar a página, verificamos se existe uma preferência salva
//    no localStorage (uma "gaveta" que o navegador guarda no computador
//    da pessoa, mesmo depois de fechar a aba).
const temaSalvo = localStorage.getItem('tema-curso');

if (temaSalvo) {
  // Se existe algo salvo, aplicamos exatamente o que foi salvo.
  aplicarTema(temaSalvo);
} else {
  // Se não existe nada salvo ainda, aplicamos o padrão (escuro).
  aplicarTema('escuro');
}

// 2) Quando o botão for clicado, alternamos o tema.
botaoTema.addEventListener('click', function () {
  // Verificamos qual tema está ativo AGORA, olhando o atributo da <html>.
  const temaAtual = elementoHtml.getAttribute('data-tema');

  // Se o atual é "claro", o próximo vai ser "escuro" - e vice-versa.
  // Isso é uma "lógica de alternância" (toggle), um padrão super comum.
  const novoTema = temaAtual === 'claro' ? 'escuro' : 'claro';

  aplicarTema(novoTema);

  // Salvamos a escolha pra lembrar na próxima visita.
  localStorage.setItem('tema-curso', novoTema);
});
