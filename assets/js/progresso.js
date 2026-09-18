/* ===================================================================
   PROGRESSO.JS
   Este arquivo só cuida de DADOS - guardar e consultar quais módulos
   o aluno já concluiu. Não mexe em HTML nem em CSS.

   Por que separar assim? Porque tanto a landing page quanto cada
   página de módulo precisam LER essa informação, mas cada uma exibe
   de um jeito diferente. Se a lógica de dados estivesse misturada
   com a de exibição, teríamos que duplicar código nos dois lugares.

   Isso é o princípio de "separação de responsabilidades": cada
   arquivo faz UMA coisa bem feita.
   =================================================================== */

// Nome da "gaveta" no localStorage onde a lista de módulos concluídos
// fica guardada. Usar uma constante evita erros de digitação se essa
// chave for usada em vários lugares.
const CHAVE_PROGRESSO = 'progresso-curso-logica-js';

// Devolve um array com os slugs dos módulos já concluídos.
// Ex: ["modulo-01-intro", "modulo-03-condicionais"]
function obterModulosConcluidos() {
  const salvo = localStorage.getItem(CHAVE_PROGRESSO);

  // Tudo que sai do localStorage é sempre TEXTO (string), mesmo que
  // originalmente fosse uma lista. Por isso usamos JSON.parse pra
  // transformar esse texto de volta em um array de verdade.
  // Se nunca foi salvo nada, devolvemos uma lista vazia.
  return salvo ? JSON.parse(salvo) : [];
}

// Verifica se UM módulo específico já está na lista de concluídos.
function moduloEstaConcluido(slug) {
  const concluidos = obterModulosConcluidos();
  return concluidos.includes(slug);
}

// Adiciona um módulo à lista de concluídos (se ainda não estiver lá).
function marcarModuloComoConcluido(slug) {
  const concluidos = obterModulosConcluidos();

  if (!concluidos.includes(slug)) {
    concluidos.push(slug);
    // JSON.stringify faz o caminho inverso do parse: transforma o
    // array de volta em texto, pra poder ser guardado no localStorage.
    localStorage.setItem(CHAVE_PROGRESSO, JSON.stringify(concluidos));
  }
}

// Remove um módulo da lista (usado quando o aluno "desmarca" um módulo).
function desmarcarModulo(slug) {
  const concluidos = obterModulosConcluidos().filter(function (s) {
    return s !== slug;
  });
  localStorage.setItem(CHAVE_PROGRESSO, JSON.stringify(concluidos));
}
