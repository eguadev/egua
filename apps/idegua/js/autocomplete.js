
/* Autocomplete educativo para a IDEgua. */

/** @typedef {"palavra-chave" | "função" | "valor" | "operador"} SuggestionKind */

/**
 * Uma sugestão educativa apresentada no editor.
 *
 * @typedef {Object} Suggestion
 * @property {string} label Texto exibido na lista.
 * @property {SuggestionKind} kind Categoria visual da sugestão.
 * @property {string} description Explicação curta do recurso.
 * @property {string} insertText Texto inserido no editor.
 */

const MAX_RESULTS = 8;

/** @type {Suggestion[]} */
const entries = [
  ["var", "palavra-chave", "Declara uma variável que pode receber um valor."],
  ["função", "palavra-chave", "Declara uma função reutilizável, com parâmetros opcionais."],
  ["retorna", "palavra-chave", "Devolve um valor ao ponto onde a função foi chamada."],
  ["classe", "palavra-chave", "Declara um modelo para criar objetos."],
  ["herda", "palavra-chave", "Indica que uma classe aproveita outra como base."],
  ["isto", "palavra-chave", "Refere-se ao objeto atual."],
  ["super", "palavra-chave", "Acessa membros da classe que serve de base."],
  ["se", "palavra-chave", "Executa um bloco quando uma condição é verdadeira."],
  ["senão se", "palavra-chave", "Testa outra condição quando a anterior não foi atendida."],
  ["senão", "palavra-chave", "Executa um bloco quando as condições anteriores são falsas."],
  ["escolha", "palavra-chave", "Escolhe um caminho entre vários casos possíveis."],
  ["caso", "palavra-chave", "Define uma alternativa dentro de uma escolha."],
  ["padrão", "palavra-chave", "Define a alternativa usada quando nenhum caso corresponde."],
  ["enquanto", "palavra-chave", "Repete um bloco enquanto uma condição for verdadeira."],
  ["para", "palavra-chave", "Repete um bloco controlando início, condição e avanço."],
  ["faça", "palavra-chave", "Executa um bloco antes de testar a condição de repetição."],
  ["pausa", "palavra-chave", "Interrompe o laço ou escolha atual."],
  ["continua", "palavra-chave", "Pula para a próxima repetição do laço."],
  ["tente", "palavra-chave", "Inicia um trecho que pode gerar um erro."],
  ["pegue", "palavra-chave", "Trata um erro ocorrido em um bloco tente."],
  ["finalmente", "palavra-chave", "Executa um bloco ao final do tratamento de erro."],
  ["importar", "palavra-chave", "Carrega recursos de outro módulo."],
  ["verdadeiro", "valor", "Representa um valor lógico verdadeiro."],
  ["falso", "valor", "Representa um valor lógico falso."],
  ["nulo", "valor", "Representa a ausência de um valor."],
  ["e", "operador", "Exige que as duas condições sejam verdadeiras."],
  ["ou", "operador", "Aceita que pelo menos uma condição seja verdadeira."],
  ["em", "operador", "Verifica ou percorre valores contidos em uma coleção."],
  ["escreva", "função", "Mostra um valor na saída do programa."],
  ["aleatório", "função", "Gera um número aleatório."],
  ["aleatório_entre", "função", "Gera um número aleatório dentro de um intervalo."],
  ["inteiro", "função", "Converte um valor para número inteiro."],
  ["real", "função", "Converte um valor para número real."],
  ["texto", "função", "Converte um valor para texto."],
  ["tamanho", "função", "Informa a quantidade de itens ou caracteres."],
  ["para_cada", "função", "Executa uma ação para cada item de um vetor."],
  ["mapear", "função", "Cria um novo vetor ao transformar cada item de outro vetor."],
  ["filtrar", "função", "Cria um vetor só com os itens que passam em um teste."],
  ["reduzir", "função", "Combina os itens de um vetor em um único valor."],
  ["encontrar", "função", "Encontra o primeiro item que passa em um teste."],
  ["encontrar_último", "função", "Encontra o último item que passa em um teste."],
  ["encontrar_índice", "função", "Informa a posição do primeiro item encontrado."],
  ["encontrar_último_índice", "função", "Informa a posição do último item encontrado."],
  ["incluído", "função", "Verifica se um item está presente em um vetor."],
  ["algum", "função", "Verifica se ao menos um item passa em um teste."],
  ["todos", "função", "Verifica se todos os itens passam em um teste."],
  ["ordenar", "função", "Ordena os itens de um vetor."],
].map(([label, kind, description]) => ({
  label, kind, description, insertText: kind === "função" ? `${label}()` : label,
}));

/**
 * Compara termos sem diferenciar maiúsculas, minúsculas ou acentos.
 *
 * @param {string} text Texto a normalizar.
 * @returns {string} Texto normalizado para comparação.
 */
const normalize = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();

/**
 * Encontra a palavra que termina exatamente na posição do cursor.
 *
 * @param {string} text Conteúdo completo do editor.
 * @param {number} cursor Posição atual do cursor.
 * @returns {{ text: string, start: number }} Palavra e seu índice inicial.
 */
const wordAtCursor = (text, cursor) => {
  const left = text.slice(0, cursor);
  const match = left.match(/[\p{L}\p{N}_]+$/u);
  return { text: match ? match[0] : "", start: cursor - (match ? match[0].length : 0) };
};

/**
 * Indica se o cursor está em código, e não em uma string ou comentário de linha.
 *
 * @param {string} text Conteúdo completo do editor.
 * @param {number} cursor Posição atual do cursor.
 * @returns {boolean} Verdadeiro quando sugestões podem ser exibidas.
 */
function isCodeContext(text, cursor) {
  const line = text.slice(text.lastIndexOf("\n", cursor - 1) + 1, cursor);
  let quote = null;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (quote) {
      if (char === "\\") index += 1;
      else if (char === quote) quote = null;
    } else if (char === "'" || char === '"') quote = char;
    else if (char === "/" && line[index + 1] === "/") return false;
  }
  return !quote;
}

/**
 * Adiciona o autocomplete educativo a uma instância já criada do CodeFlask.
 *
 * @param {CodeFlask} editor Instância do editor CodeFlask.
 * @returns {void}
 */
function createAutocomplete(editor) {
  const textarea = editor.elTextarea;
  const wrapper = editor.elWrapper;
  const popup = document.createElement("div");
  const popupId = "idegua-autocomplete";
  let results = [];
  let selected = 0;
  let prefix = { text: "", start: 0 };
  let visible = false;
  let suppressUntilNewWord = false;
  let insertedEnd = -1;

  popup.id = popupId;
  popup.className = "idegua-autocomplete";
  popup.setAttribute("role", "listbox");
  popup.setAttribute("aria-label", "Sugestões de código");
  popup.hidden = true;
  wrapper.appendChild(popup);
  textarea.setAttribute("aria-controls", popupId);
  textarea.setAttribute("aria-expanded", "false");

  function close() {
    visible = false;
    popup.hidden = true;
    textarea.setAttribute("aria-expanded", "false");
    textarea.removeAttribute("aria-activedescendant");
  }

  function position() {
    const valueBeforeCursor = textarea.value.slice(0, textarea.selectionStart);
    const lineStart = valueBeforeCursor.lastIndexOf("\n") + 1;
    const line = valueBeforeCursor.slice(lineStart);
    const style = getComputedStyle(textarea);
    const fontSize = parseFloat(style.fontSize) || 13;
    const lineHeight = parseFloat(style.lineHeight) || 20;
    const paddingLeft = parseFloat(style.paddingLeft) || 10;
    const paddingTop = parseFloat(style.paddingTop) || 10;
    const lineNumber = (valueBeforeCursor.match(/\n/g) || []).length;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = `${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
    const textWidth = context.measureText(line).width;
    const textareaRect = textarea.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    let left = textareaRect.left - wrapperRect.left + paddingLeft + textWidth - textarea.scrollLeft;
    let top = textareaRect.top - wrapperRect.top + paddingTop + (lineNumber + 1) * lineHeight - textarea.scrollTop;
    const width = Math.min(360, Math.max(220, wrapper.clientWidth - 16));
    popup.style.width = `${width}px`;
    const popupHeight = popup.offsetHeight;
    left = Math.max(8, Math.min(left, wrapper.clientWidth - width - 8));
    if (top + popupHeight > wrapper.clientHeight - 8) {
      top = Math.max(8, top - popupHeight - lineHeight);
    }
    popup.style.left = `${left}px`;
    popup.style.top = `${top}px`; 
  }

  function render() {
    popup.innerHTML = "";
    results.forEach((entry, index) => {
      const option = document.createElement("div");
      const optionId = `${popupId}-option-${index}`;
      option.id = optionId;
      option.className = "idegua-autocomplete__option";
      option.setAttribute("role", "option");
      option.setAttribute("aria-selected", String(index === selected));
      if (index === selected) option.classList.add("is-selected");
      option.innerHTML = `<div class="idegua-autocomplete__title"><code></code><span></span></div><div class="idegua-autocomplete__description"></div>`;
      option.querySelector("code").textContent = entry.label;
      option.querySelector("span").textContent = entry.kind;
      option.querySelector(".idegua-autocomplete__description").textContent = entry.description;
      option.addEventListener("pointerdown", (event) => event.preventDefault());
      option.addEventListener("click", () => choose(index));
      popup.appendChild(option);
    });
    textarea.setAttribute("aria-activedescendant", `${popupId}-option-${selected}`);
    popup.hidden = false;
    visible = true;
    textarea.setAttribute("aria-expanded", "true");
    position();
  }

  function show(force) {
    const cursor = textarea.selectionStart;
    if (textarea.selectionStart !== textarea.selectionEnd || !isCodeContext(textarea.value, cursor)) return close();
    prefix = wordAtCursor(textarea.value, cursor);
    if (!force && (!prefix.text || suppressUntilNewWord)) return close();
    const normalizedPrefix = normalize(prefix.text);
    results = entries.filter((entry) => normalize(entry.label).startsWith(normalizedPrefix)).slice(0, MAX_RESULTS);
    selected = 0;
    if (!results.length) return close();
    render();
  }

  function choose(index) {
    const entry = results[index];
    if (!entry) return;
    const cursor = textarea.selectionStart;
    const before = textarea.value.slice(0, prefix.start);
    const after = textarea.value.slice(cursor);
    editor.updateCode(before + entry.insertText + after);
    const caret = prefix.start + entry.insertText.length - (entry.kind === "função" ? 1 : 0);
    textarea.selectionStart = caret;
    textarea.selectionEnd = caret;
    insertedEnd = prefix.start + entry.insertText.length;
    suppressUntilNewWord = true;
    close();
    textarea.focus();
  }

  textarea.addEventListener("keydown", (event) => {
    const force = (event.ctrlKey || event.metaKey) && event.code === "Space";
    if (force && isCodeContext(textarea.value, textarea.selectionStart)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      suppressUntilNewWord = false;
      show(true);
      return;
    }
    if (!visible) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      event.stopImmediatePropagation();
      selected = (selected + (event.key === "ArrowDown" ? 1 : -1) + results.length) % results.length;
      render();
    } else if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      event.stopImmediatePropagation();
      choose(selected);
    } else if (event.key === "Escape") {
      event.preventDefault();
      event.stopImmediatePropagation();
      close();
    } else if (["ArrowLeft", "ArrowRight", "Home", "End", "PageUp", "PageDown"].includes(event.key)) {
      close();
    }
  }, true);

  textarea.addEventListener("input", () => {
    const current = wordAtCursor(textarea.value, textarea.selectionStart);
    // Apagar a sugestão aceita (inclusive com Ctrl+A) inicia uma nova palavra.
    if (suppressUntilNewWord && (!textarea.value || current.start >= insertedEnd)) {
      suppressUntilNewWord = false;
    }
    requestAnimationFrame(() => show(false));
  });

  textarea.addEventListener("click", () => close());
  textarea.addEventListener("blur", () => setTimeout(close, 100));
  textarea.addEventListener("scroll", () => visible && position());
  window.addEventListener("resize", () => visible && position());
  window.addEventListener("orientationchange", () => visible && position());
}
