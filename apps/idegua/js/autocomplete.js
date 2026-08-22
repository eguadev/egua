
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
 * Busca sugestões para a palavra na posição do cursor.
 *
 * @param {string} text Conteúdo completo do editor.
 * @param {number} cursor Posição atual do cursor.
 * @param {boolean} force Inclui resultados quando ainda não há uma palavra.
 * @returns {{ prefix: { text: string, start: number }, results: Suggestion[] }}
 */
function getSuggestions(text, cursor, force = false) {
  const prefix = wordAtCursor(text, cursor);
  if (!force && !prefix.text) return { prefix, results: [] };

  const query = normalize(prefix.text);
  const results = entries
    .filter(({ label }) => {
      const candidate = normalize(label);
      return candidate.startsWith(query) && candidate !== query;
    })
    .slice(0, MAX_RESULTS);

  return { prefix, results };
}

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
  const measurementContext = document.createElement("canvas").getContext("2d");
  const popupId = "idegua-autocomplete";
  const state = {
    results: [],
    selected: 0,
    prefix: { text: "", start: 0 },
  };

  popup.id = popupId;
  popup.className = "idegua-autocomplete";
  popup.setAttribute("role", "listbox");
  popup.setAttribute("aria-label", "Sugestões de código");
  popup.hidden = true;
  wrapper.appendChild(popup);
  textarea.setAttribute("aria-controls", popupId);
  textarea.setAttribute("aria-expanded", "false");

  function close() {
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
    measurementContext.font = `${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
    const textWidth = measurementContext.measureText(line).width;
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
    state.results.forEach((entry, index) => {
      const option = document.createElement("div");
      const optionId = `${popupId}-option-${index}`;
      option.id = optionId;
      option.dataset.index = index;
      option.className = "idegua-autocomplete__option";
      option.setAttribute("role", "option");
      option.setAttribute("aria-selected", String(index === state.selected));
      if (index === state.selected) option.classList.add("is-selected");
      option.innerHTML = `<div class="idegua-autocomplete__title"><code></code><span></span></div><div class="idegua-autocomplete__description"></div>`;
      option.querySelector("code").textContent = entry.label;
      option.querySelector("span").textContent = entry.kind;
      option.querySelector(".idegua-autocomplete__description").textContent = entry.description;
      popup.appendChild(option);
    });
    textarea.setAttribute("aria-activedescendant", `${popupId}-option-${state.selected}`);
    popup.hidden = false;
    textarea.setAttribute("aria-expanded", "true");
    position();
  }

  function show(force) {
    const cursor = textarea.selectionStart;
    if (textarea.selectionStart !== textarea.selectionEnd || !isCodeContext(textarea.value, cursor)) return close();
    const suggestions = getSuggestions(textarea.value, cursor, force);
    state.prefix = suggestions.prefix;
    state.results = suggestions.results;
    state.selected = 0;
    if (!state.results.length) return close();
    render();
  }

  function choose(index) {
    const entry = state.results[index];
    if (!entry) return;
    const cursor = textarea.selectionStart;
    const before = textarea.value.slice(0, state.prefix.start);
    const after = textarea.value.slice(cursor);
    editor.updateCode(before + entry.insertText + after);
    const caret = state.prefix.start + entry.insertText.length - (entry.kind === "função" ? 1 : 0);
    textarea.selectionStart = caret;
    textarea.selectionEnd = caret;
    close();
    textarea.focus();
  }

  function consume(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  textarea.addEventListener("keydown", (event) => {
    const force = (event.ctrlKey || event.metaKey) && event.code === "Space";
    if (force && isCodeContext(textarea.value, textarea.selectionStart)) {
      consume(event);
      show(true);
      return;
    }
    if (popup.hidden) return;

    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp":
        consume(event);
        state.selected = (state.selected + (event.key === "ArrowDown" ? 1 : -1) + state.results.length) % state.results.length;
        render();
        break;
      case "Enter":
      case "Tab":
        consume(event);
        choose(state.selected);
        break;
      case "Escape":
        consume(event);
        close();
        break;
      case "ArrowLeft":
      case "ArrowRight":
      case "Home":
      case "End":
      case "PageUp":
      case "PageDown":
        close();
        break;
    }
  }, true);

  popup.addEventListener("pointerdown", (event) => event.preventDefault());
  popup.addEventListener("click", (event) => {
    const option = event.target.closest("[data-index]");
    if (option) choose(Number(option.dataset.index));
  });

  textarea.addEventListener("input", () => requestAnimationFrame(() => show(false)));
  textarea.addEventListener("click", () => close());
  textarea.addEventListener("blur", () => setTimeout(close, 100));
  textarea.addEventListener("scroll", () => !popup.hidden && position());
  window.addEventListener("resize", () => !popup.hidden && position());
  window.addEventListener("orientationchange", () => !popup.hidden && position());
}
