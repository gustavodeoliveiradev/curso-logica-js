/* ===================================================================
   PROGRESSO-UI.JS
   Este arquivo só existe na landing page (index.html). Ele PEGA os
   dados de progresso.js e ATUALIZA a tela: a barra de progresso e
   o selo "✓ Concluído" nos cards.

   Repare que esse arquivo não sabe COMO o progresso é salvo (isso é
   responsabilidade do progresso.js) - ele só sabe como MOSTRAR.
   =================================================================== */

// Esperamos o HTML inteiro carregar antes de procurar elementos na
// página. Sem isso, o script poderia rodar antes dos cards existirem.
document.addEventListener('DOMContentLoaded', function () {

  // Pega todos os cards de módulo que têm o atributo data-modulo.
  // Esse atributo é o que liga o card ao slug usado no progresso.
  const cartoes = document.querySelectorAll('.card-modulo[data-modulo]');
  const totalDeModulos = cartoes.length;
  let quantidadeConcluida = 0;

  cartoes.forEach(function (cartao) {
    // .dataset.modulo lê o valor de data-modulo="..." direto do HTML.
    const slug = cartao.dataset.modulo;

    if (moduloEstaConcluido(slug)) {
      quantidadeConcluida++;

      const statusElemento = cartao.querySelector('.card-modulo__status');
      if (statusElemento) {
        statusElemento.textContent = '✓ Concluído';
        statusElemento.classList.remove('card-modulo__status--disponivel');
        statusElemento.classList.add('card-modulo__status--concluido');
      }
    }
  });

  // Atualiza a barra de progresso e o texto, se eles existirem na página.
  const textoProgresso = document.getElementById('progresso-texto');
  const preenchimento = document.getElementById('progresso-preenchimento');

  if (textoProgresso && preenchimento) {
    textoProgresso.textContent = `${quantidadeConcluida} de ${totalDeModulos} módulos concluídos`;

    // Regra de três simples pra transformar em porcentagem: se
    // totalDeModulos for 0, evitamos dividir por zero.
    const porcentagem = totalDeModulos > 0
      ? (quantidadeConcluida / totalDeModulos) * 100
      : 0;

    preenchimento.style.width = `${porcentagem}%`;
  }
});
