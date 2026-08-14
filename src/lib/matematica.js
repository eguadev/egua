import { RuntimeError } from "../errors.js";

export function graus(angle) {
  if (isNaN(angle) || angle === null)
    throw new RuntimeError(
      this.token,
      "Você deve prover um número para mat.graus(ângulo)."
    );

  return angle * (180 / Math.PI);
}

export function mediana(a) {
  if (!Array.isArray(a) || a.length === 0 || a.some(isNaN))
    throw new RuntimeError(
      this.token,
      "Você deve prover um vetor de números para mediana(vetor)."
    );

  const ordenado = [...a].sort(function (x, y) { return x - y; });
  const mid = ordenado.length / 2;
  return mid % 1 ? ordenado[mid - 0.5] : (ordenado[mid - 1] + ordenado[mid]) / 2;
}

/**
 * Calcula a moda de um vetor.
 * @param {inteiro[]} vetor Vetor de inteiros.
 * @returns Valor inteiro da moda.
 */
export function moda(numbers) {
  if (!Array.isArray(numbers))
    throw new RuntimeError(
      this.token,
      "Parâmetro `vetor` deve ser um vetor na função moda(vetor)."
    );

  if (numbers.some(isNaN))
    throw new RuntimeError(
      this.token,
      "Todos os elementos de `vetor` deve ser numéricos na função moda(vetor)."
    );

  let modes = [], count = [], i = 0, number = 0, maxIndex = 0;

  for (let i = 0; i < numbers.length; i += 1) {
    number = numbers[i];
    count[number] = (count[number] || 0) + 1;
    if (count[number] > maxIndex) {
      maxIndex = count[number];
    }
  }

  for (i in count)
    if (count.hasOwnProperty(i)) {
      if (count[i] === maxIndex) {
        modes.push(Number(i));
      }
    }

  return modes;
}

export const pi = Math.PI;

export function radiano(angulo) {
  if (isNaN(angulo) || angulo === null)
    throw new RuntimeError(
      this.token,
      "Você deve prover um número para o parâmetro `angulo`, em radiano(angulo)."
    );

  return angulo * (Math.PI / 180);
}

//FUNÇÃO AFIM E QUADRÁTICA
/**
 * Gera valores para abscissa.
 * @param {inteiro} distancia A distância entra dois pontos.
 * @param {inteiro} valorPontoCentral O ponto central na abscissa.
 * @param {inteiro} numeroPontos Número de pontos a serem gerados (padrão: 7).
 * @returns Um vetor, contendo o número de pontos informado ou definido por padrão em uma abscissa.
 *          Se o número informado é par, um ponto negativo a mais é gerado.
 */
export function gerar_pontos_abscissa(distancia, valorPontoCentral, numeroPontos) {
  if (!Number.isInteger(distancia))
    throw new RuntimeError(
      this.token,
      "Você deve prover um valor inteiro para o parâmetro `distancia`, em gerar_pontos_abscissa(distancia, valorInicial)."
    );

  if (!Number.isInteger(valorPontoCentral))
    throw new RuntimeError(
      this.token,
      "Você deve prover um valor inteiro para o parâmetro `valorInicial`, em gerar_pontos_abscissa(distancia, valorInicial)."
    );

  if (!numeroPontos) {
    numeroPontos = 7;
  }

  const elementoInicial = valorPontoCentral - (((numeroPontos / 2) >> 0) * distancia);
  const x = [];
  for (let i = 0; i < numeroPontos; i++) {
    x.push(elementoInicial + (i * distancia));
  }

  return x;
}

//Raíz da Função Afim
export function fun1R(a, b) {
  if (isNaN(a) || a === null || isNaN(b) || b === null)
    throw new RuntimeError(
      this.token,
      "Você deve prover valores para fun1R(valor1,valor2)."
    );
  return (-1 * b) / a;
}

//Intervalo Preenchido
export function pontos_espaçados(startValue, stopValue, cardinality) {
  if (
    isNaN(startValue) || startValue === null ||
    isNaN(stopValue) || stopValue === null ||
    isNaN(cardinality) || cardinality === null
  )
    throw new RuntimeError(
      this.token,
      "Você deve prover valores para pontos_espaçados(valor1,valor2,valor3)."
    );
  const lista = [];
  const step = (stopValue - startValue) / (cardinality - 1);
  for (let i = 0; i < cardinality; i++) {
    lista.push(startValue + (step * i));
  }
  return lista;
}

//Raízes da Função Quadrática
export function fun2R(a, b, c) {
  if (isNaN(a) || a === null || a === 0)
    throw new RuntimeError(
      this.token,
      "Você deve prover valores para fun2R(a,b,c), com a diferente de zero."
    );

  const delta = Math.pow(b, 2) - (4 * a * c);

  if (delta < 0)
    throw new RuntimeError(
      this.token,
      "Não há raízes reais para os valores fornecidos em fun2R(a,b,c) (delta negativo)."
    );

  const r1 = (-1 * b + Math.sqrt(delta)) / (2 * a);
  const r2 = (-1 * b - Math.sqrt(delta)) / (2 * a);

  return [r1, r2];
}

//Aproximação de valores
export function aprox(x, z) {
  if (x === undefined || x === null || (typeof x !== "number" && !Array.isArray(x)))
    throw new RuntimeError(
      this.token,
      "Você deve prover um número ou vetor para aprox(x,z)."
    );

  if (z === undefined || z === null) { z = 2; }

  if (typeof z !== "number")
    throw new RuntimeError(
      this.token,
      "O parâmetro `z` deve ser um número em aprox(x,z)."
    );

  if (typeof x === "number") {
    return parseFloat(x.toFixed(z));
  }

  if (x.length === 0 || !Array.isArray(x[0])) { // vetor vazio ou 1D
    return x.map((valor) => parseFloat(valor.toFixed(z)));
  }

  return x.map((linha) => linha.map((valor) => parseFloat(valor.toFixed(z)))); // 2D
}

/**
 * Conta quantas vezes um determinado valor aparece em um vetor.
 * @param {qualquer[]} vetor Vetor de elementos
 * @param {qualquer} valor Valor a ser encontrado no vetor
 * @returns Valor inteiro, com o número de vezes que `valor` foi encontrado em `vetor`.
 */
export function número_ocorrências(vetor, valor) {
  if (!Array.isArray(vetor))
    throw new RuntimeError(
      this.token,
      "Parâmetro `vetor` deve ser um vetor, em número_ocorrências(vetor, valor)."
    );

  return vetor.filter((v) => (v === valor)).length;
}

/* ESTATÍSTICA */

/**
 * Encontra o elemento máximo em um vetor.
 * @param {inteiro[]} vetor Um vetor de números inteiros.
 * @returns O maior número encontrado em um vetor.
 */
export function max(vetor) {
  if (!Array.isArray(vetor))
    throw new RuntimeError(
      this.token,
      "Parâmetro `vetor` deve ser um vetor, em max(vetor)."
    );

  if (vetor.some(isNaN))
    throw new RuntimeError(
      this.token,
      "Todos os elementos de `vetor` deve ser numéricos, em max(vetor)."
    );

  return Math.max.apply(null, vetor);
}

/**
 * Encontra o elemento mínimo em um vetor.
 * @param {inteiro[]} vetor Um vetor de números inteiros.
 * @returns O menor número encontrado em um vetor.
 */
export function min(vetor) {
  if (!Array.isArray(vetor))
    throw new RuntimeError(
      this.token,
      "Parâmetro `vetor` deve ser um vetor, em min(vetor)."
    );

  if (vetor.some(isNaN))
    throw new RuntimeError(
      this.token,
      "Todos os elementos de `vetor` deve ser numéricos, em min(vetor)."
    );

  return Math.min.apply(null, vetor);
}

// Retorna a média de um vetor de números
export function média() {
  const argumentsLength = Object.keys(arguments).length;

  if (argumentsLength <= 0) {
    throw new RuntimeError(
      this.token,
      "Você deve fornecer um parâmetro para a função."
    );
  }

  if (argumentsLength > 1) {
    throw new RuntimeError(
      this.token,
      "A função recebe apenas um parâmetro."
    );
  }

  // Pega o primeiro argumento do objeto de argumentos
  const args = arguments['0'];

  if (!Array.isArray(args)) {
    throw new RuntimeError(
      this.token,
      "Você deve fornecer um parâmetro do tipo vetor."
    );
  }

  // Valida se o array está vazio.
  if (!args.length) {
    throw new RuntimeError(
      this.token,
      "Vetor vazio. Você deve fornecer ao menos um valor ao vetor."
    );
  }

  // Valida se o array contém apenas valores do tipo número.
  args.forEach(item => {
    if (typeof item !== 'number') {
      throw new RuntimeError(
        this.token,
        "Você deve fornecer um vetor contendo apenas valores do tipo número."
      );
    }
  })

  // Soma todos os itens.
  const valoresSomados = args.reduce(
    (acumulador, itemAtual) => acumulador + itemAtual, 0);

  // Faz o cáculo da média em si e retorna.
  return (valoresSomados / args.length);
}

/*TRIGONOMETRIA*/
//Seno de um número
export function sen(x) {
  if (isNaN(x) || x === null)
    throw new RuntimeError(
      this.token,
      "Você deve prover valores para sen(x)."
    );

  return Math.sin(x);
}

//Cosseno de um número
export function cos(x) {
  if (isNaN(x) || x === null)
    throw new RuntimeError(
      this.token,
      "Você deve prover valores para cos(x)."
    );

  return Math.cos(x);
}

//Tangente de um número
export function tan(x) {
  if (isNaN(x) || x === null)
    throw new RuntimeError(
      this.token,
      "Você deve prover valores para tan(x)."
    );

  return Math.tan(x);
}

//Arco cosseno de um número
export function arcos(x) {
  if (isNaN(x) || x === null)
    throw new RuntimeError(
      this.token,
      "Você deve prover valores para arcos(x)."
    );

  return Math.acos(x);
}

//Arco seno de um número
export function arc_sen(x) {
  if (isNaN(x) || x === null)
    throw new RuntimeError(
      this.token,
      "Você deve prover valores para arc_sen(x)."
    );

  return Math.asin(x);
}

//Arco tangente de um número
export function arc_tan(x) {
  if (isNaN(x) || x === null)
    throw new RuntimeError(
      this.token,
      "Você deve prover valores para arc_tan(x)."
    );

  return Math.atan(x)
}

//Exponencial
export function exp(x) {
  if (isNaN(x) || x === null)
    throw new RuntimeError(
      this.token,
      "Você deve prover valores para exp(x)."
    );

  return Math.exp(x);
}

//Logaritmo natural
export function log(x) {
  if (isNaN(x) || x === null)
    throw new RuntimeError(
      this.token,
      "Você deve prover valores para log(x)."
    );

  return Math.log(x);
}

// Retorna a base elevada ao expoente
export function potência(base, expoente) {
  if (typeof base !== 'number' || typeof expoente !== 'number') {
    throw new RuntimeError(
      this.token,
      "Os parâmetros devem ser do tipo número."
    );
  }

  return Math.pow(base, expoente);
}

//Raíz quadrada
export function raizq(x) {
  if (isNaN(x) || x === null)
    throw new RuntimeError(
      this.token,
      "Você deve prover valores para raizq(x)."
    );

  return Math.sqrt(x);
}

/*CINEMÁTICA*/

//Velocidade média
export function velocidade_média(s, t) {
  if (isNaN(s) || s === null || isNaN(t) || t === null)
    throw new RuntimeError(
      this.token,
      "Você deve prover valores para velocidade_média(d,t)."
    );

  return (s / t);
}

//Espaço percorrido
export function delta_s(s0, s) {
  if (isNaN(s0) || s0 === null || isNaN(s) || s === null)
    throw new RuntimeError(
      this.token,
      "Você deve prover valores para delta_s(e0,e1)."
    );
  const ds = s - s0;
  return ds;
}

//Tempo Percorrido
export function delta_t(t0, t) {
  if (isNaN(t0) || t0 === null || isNaN(t) || t === null)
    throw new RuntimeError(
      this.token,
      "Você deve prover valores para delta_t(t0,t1)."
    );
  const dt = t - t0;
  return dt;
}

// Cálculo de aceleração
export function aceleração(
  velocidadeFinal, velocidadeInicial, tempoFinal, tempoInicial) {

  if (
    velocidadeFinal === null ||
    velocidadeInicial === null ||
    tempoFinal === null ||
    tempoInicial === null
  ) {
    throw new RuntimeError(
      this.token,
      "Devem ser fornecidos quatro parâmetros obrigatórios."
    );
  }

  if (
    typeof velocidadeFinal !== 'number' ||
    typeof velocidadeInicial !== 'number' ||
    typeof tempoFinal !== 'number' ||
    typeof tempoInicial !== 'number'
  ) {
    throw new RuntimeError(
      this.token,
      "Todos os parâmetros devem ser do tipo número."
    );
  }

  return (velocidadeFinal - velocidadeInicial) / (tempoFinal - tempoInicial);
}

//Função Horária da Posição (M.R.U)
export function mrufh(s0, v, t) {
  if (isNaN(s0) || s0 === null || isNaN(v) || v === null || isNaN(t) || t === null)
    throw new RuntimeError(
      this.token,
      "Você deve prover valores para mrufh(s0,v,t)."
    );

  const posicoes = [];
  for (let i = 0; i <= t; i++) {
    posicoes.push(s0 + v * i);
  }

  return ["Função: " + s0 + "+(" + v + ")*t" + "\n" + "Posições: " + posicoes];
}

//Gráfico da velocidade (M.R.U.V): v(t) = v0 + a*t
export function mruv(v0, duracao, a) {
  if (
    isNaN(v0) || v0 === null ||
    isNaN(duracao) || duracao === null ||
    isNaN(a) || a === null
  )
    throw new RuntimeError(
      this.token,
      "Você deve prover valores para mruv(v0, duracao, a)."
    );

  const velocidades = [];
  for (let t = 0; t < duracao; t++) {
    velocidades.push(v0 + a * t);
  }

  return velocidades;
}

// Retorna o menor número inteiro dentre o valor de "value"
export function min_aprox(value) {

  if (typeof value !== 'number') {
    throw new RuntimeError(
      this.token,
      "O valor passado pra função deve ser um número."
    );
  }

  return Math.floor(value);
}
