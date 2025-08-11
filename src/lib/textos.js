/**
 * Biblioteca padrão para a manipulação de textos.
 *
 * Contém as principais funções para lidar com textos.
 *
 * @file   textos.js
 * @author André G.
 * @since  1.3.7
 */

import { RuntimeError } from "../errors.js";

// Constantes úteis

/**
 * Conjunto de todas as letras minúsculas
 */
export const letras_minusculas = "abcdefghijklmnopqrstuvwxyz";

/**
 * Conjunto de todas as letras maiúsculas
 */
export const letras_maiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Conjunto de todas as letras
 */
export const letras = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Conjunto de todos os dígitos
 */
export const digitos = "0123456789";

/**
 * Conjunto de pontuações
 */
export const pontuacoes = '!"' + "#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

// Funções de Manipulação de textos.

/**
 * Converte o texto passado para maiúsculo.
 *
 * @param {string} texto  o texto a ser convertido.
 * @return {string} a string convertida.
 */
export function maiusculo(texto) {
    if (typeof texto !== "string") {
        throw new RuntimeError(
            this.token,
            "O parâmetro passado deve ser um texto"
        );
    }
    return texto.toUpperCase();
}

/**
 * Converte o texto passado para minúsculo.
 *
 * @param {string} texto  o texto a ser convertido.
 * @return {string} a string convertida.
 */
export function minusculo(texto) {
    if (typeof texto !== "string") {
        throw new RuntimeError(
            this.token,
            "O parâmetro passado deve ser um texto"
        );
    }
    return texto.toLowerCase();
}

/**
 * Verifica se um texto possui um subtexto.
 *
 * @param {string} texto  o texto a ser checado.
 * @param {string} subtexto  o subtexto a ser procurado.
 * @return {boolean} verdadeiro se o texto possui o subtexto falso caso contrário.
 */
export function contem(texto, subtexto) {
    if (typeof texto !== "string") {
        throw new RuntimeError(
            this.token,
            "O parâmetro passado deve ser um texto"
        );
    }
    if (typeof subtexto !== "string") {
        throw new RuntimeError(
            this.token,
            "O segundo parâmetro também deve ser um texto"
        );
    }
    return texto.includes(subtexto);
}

/**
 * Posiciona os argumentos fornecidos no texto.
 *
 * Note que: o texto precisa estar na forma `"Meu texto {}"`
 * onde o `{}` será substituído pelo primeiro argumento da função.
 *
 * Ex.: `textos.formate("Texto {} {} ", "número", 1)` -> `"Texto número 1"`.
 *
 * @param {string} texto  o texto a ser formatado.
 * @param {any[]} argumentos  vetor de argumentos a serem posicionados.
 * @return {string} o texto formatado.
 */
export function formate(texto, ...argumentos) {
    if (typeof texto !== "string") {
        throw new RuntimeError(
            this.token,
            "O parâmetro passado deve ser um texto"
        );
    }
    for (let i = 0; i < argumentos.length; i++) {
        let value = argumentos[i];
        if (typeof value === "boolean") {
            value = value ? "verdadeiro" : "falso";
        }
        if (value === null) {
            value = "nulo";
        }
        if (typeof value === "object") {
            value = "<dicionário>";
        }
        texto = texto.replace("{}", value);
    }
    return texto;
}

/**
 * Divide o texto passado em um vetor de subtextos.
 *
 * @param {string} texto o texto a ser dividido.
 * @param {string} separador o texto usado para a divisão.
 * @param {number} limite um inteiro que limita o número de divisões.
 *
 * @returns {string[]} um vetor contendo os textos divididos.
 */
export function dividir(
    texto,
    separador = "",
    limite = Number.MAX_SAFE_INTEGER
) {
    if (typeof texto !== "string") {
        throw new RuntimeError(
            this.token,
            "O parâmetro passado deve ser um texto"
        );
    }
    if (typeof separador !== "string") {
        throw new RuntimeError(
            this.token,
            "O separador passado deve ser um texto"
        );
    }
    if (typeof limite !== "number") {
        throw new RuntimeError(
            this.token,
            "O limite passado deve ser um número"
        );
    }
    return texto.split(separador, limite);
}

/**
 * Retorna o tamanho de um texto.
 *
 * @param {string} texto o texto para obter o tamanho.
 * @return {number} o tamanho do texto.
 */
export function tamanho(texto) {
    if (typeof texto !== "string") {
        throw new RuntimeError(
            this.token,
            "O parâmetro passado deve ser um texto"
        );
    }
    return texto.length;
}

/**
 * Repete um texto fornecido.
 *
 * @param {string} texto o texto para obter o tamanho.
 * @param {number} contador o número de cópias.
 * @return {string} um texto com o número de cópias do texto fornecido.
 */
export function repita(texto, contador = 0) {
    if (typeof texto !== "string") {
        throw new RuntimeError(
            this.token,
            "O parâmetro passado deve ser um texto"
        );
    }
    if (typeof contador !== "number") {
        throw new RuntimeError(
            this.token,
            "O contador passado deve ser um número"
        );
    }
    return texto.repeat(contador);
}

/**
 * Substitui em um texto fornecido o padrão indicado por um novo valor.
 *
 * @param {string} texto o texto para obter o tamanho.
 * @param {string} texto_buscado o texto ou expressão regular para ser substituído.
 * @param {string} novo_texto o novo texto para substituição.
 * @return {string} um novo texto com os valores substituídos.
 */
export function substituir(texto, texto_buscado, novo_texto) {
    if (typeof texto !== "string") {
        throw new RuntimeError(
            this.token,
            "O parâmetro passado deve ser um texto"
        );
    }
    if (typeof texto_buscado !== "string") {
        throw new RuntimeError(
            this.token,
            "O padrão passado deve ser um texto"
        );
    }
    if (typeof novo_texto !== "string") {
        throw new RuntimeError(this.token, "O novo valor deve ser um texto");
    }
    return texto.replace(texto_buscado, novo_texto);
}

/**
 *  Busca um subtexto em um texto.
 *
 * @param {string} texto o texto original.
 * @param {string} texto_buscado o texto que deve ser buscado ou expressão regular.
 *
 * @returns {number} o índice da primeira ocorrência no texto fornecido ou -1 caso contrário.
 */
export function busca(texto, texto_buscado) {
    if (typeof texto !== "string") {
        throw new RuntimeError(
            this.token,
            "O parâmetro passado deve ser um texto"
        );
    }
    if (typeof texto_buscado !== "string") {
        throw new RuntimeError(
            this.token,
            "O padrão passado deve ser um texto"
        );
    }
    return texto.search(texto_buscado);
}

/**
 * Remove espaços em branco no começo e no fim do texto.
 *
 * @param {string} texto o texto original.
 * @returns {string} um texto sem espaços em ambos os lados.
 */
export function apara(texto) {
    if (typeof texto !== "string") {
        throw new RuntimeError(
            this.token,
            "O parâmetro passado deve ser um texto"
        );
    }
    return texto.trim();
}
