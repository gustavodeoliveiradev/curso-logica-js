/* ===================================================================
   MODULO-01.JS
   Lógica específica desta página: quando o botão "Executar" é
   clicado, a gente roda de verdade o exemplo mostrado no bloco de
   código, e escreve o resultado no "console" simulado da página.

   A ideia é: você lê o código, aperta o botão, e vê o resultado
   REAL - não é só um texto fixo simulando uma saída.
   =================================================================== */

const botaoExecutar = document.getElementById('botao-executar');
const console_saida = document.getElementById('console-saida');

// Esta é a MESMA lógica mostrada no bloco de código ao lado.
// Repare: é só um algoritmo simples verificando se um número é par.
function verificarSePar(numero) {
  // O operador % (módulo) devolve o RESTO de uma divisão.
  // Se o resto da divisão por 2 for 0, o número é par.
  const resto = numero % 2;

  if (resto === 0) {
    return `${numero} é par`;
  } else {
    return `${numero} é ímpar`;
  }
}

if (botaoExecutar) {
  botaoExecutar.addEventListener('click', function () {
    // Escolhemos alguns números de exemplo pra testar a função.
    const numerosParaTestar = [4, 7, 10, 15];

    // Limpa o console antes de escrever um novo resultado,
    // caso o botão seja clicado mais de uma vez.
    console_saida.innerHTML = '';

    // Pra cada número da lista, rodamos verificarSePar() e
    // escrevemos o resultado como uma nova linha no console.
    numerosParaTestar.forEach(function (numero) {
      const resultado = verificarSePar(numero);

      const linha = document.createElement('p');
      linha.className = 'bloco-console__linha';
      linha.textContent = resultado;

      console_saida.appendChild(linha);
    });
  });
}
