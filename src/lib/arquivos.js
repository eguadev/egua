import { RuntimeError } from "../errors.js";
import fs from "fs";

/**
 * Le o conteudo de um arquivo como texto.
 * @param {string} caminho O caminho do arquivo.
 * @returns O conteudo do arquivo como texto.
 */
export function leia(caminho) {
    if (typeof caminho !== "string") {
        throw new RuntimeError(
            this.token,
            "O parametro 'caminho' deve ser um texto em arquivos.leia(caminho)."
        );
    }

    try {
        return fs.readFileSync(caminho, "utf-8");
    } catch (e) {
        throw new RuntimeError(this.token, "Erro ao ler arquivo: " + e.message);
    }
}

/**
 * Escreve conteudo em um arquivo. Cria o arquivo se nao existir.
 * @param {string} caminho O caminho do arquivo.
 * @param {string} conteudo O conteudo a ser escrito.
 */
export function salvar(caminho, conteudo) {
    if (typeof caminho !== "string") {
        throw new RuntimeError(
            this.token,
            "O parametro 'caminho' deve ser um texto em arquivos.salvar(caminho, conteudo)."
        );
    }

    if (typeof conteudo !== "string") {
        throw new RuntimeError(
            this.token,
            "O parametro 'conteudo' deve ser um texto em arquivos.salvar(caminho, conteudo)."
        );
    }

    try {
        fs.writeFileSync(caminho, conteudo, "utf-8");
        return true;
    } catch (e) {
        throw new RuntimeError(this.token, "Erro ao escrever arquivo: " + e.message);
    }
}

/**
 * Verifica se um arquivo ou diretorio existe.
 * @param {string} caminho O caminho a ser verificado.
 * @returns Verdadeiro se o arquivo ou diretorio existir.
 */
export function existe(caminho) {
    if (typeof caminho !== "string") {
        throw new RuntimeError(
            this.token,
            "O parametro 'caminho' deve ser um texto em arquivos.existe(caminho)."
        );
    }

    try {
        return fs.existsSync(caminho);
    } catch (e) {
        throw new RuntimeError(this.token, "Erro ao verificar arquivo: " + e.message);
    }
}

/**
 * Remove um arquivo.
 * @param {string} caminho O caminho do arquivo a ser removido.
 */
export function remova(caminho) {
    if (typeof caminho !== "string") {
        throw new RuntimeError(
            this.token,
            "O parametro 'caminho' deve ser um texto em arquivos.remova(caminho)."
        );
    }

    try {
        fs.unlinkSync(caminho);
        return true;
    } catch (e) {
        throw new RuntimeError(this.token, "Erro ao remover arquivo: " + e.message);
    }
}

/**
 * Lista os arquivos e diretorios de um diretorio.
 * @param {string} diretorio O caminho do diretorio.
 * @returns Um vetor com os nomes dos arquivos e diretorios.
 */
export function listar(diretorio) {
    if (typeof diretorio !== "string") {
        throw new RuntimeError(
            this.token,
            "O parametro 'diretorio' deve ser um texto em arquivos.listar(diretorio)."
        );
    }

    try {
        return fs.readdirSync(diretorio);
    } catch (e) {
        throw new RuntimeError(this.token, "Erro ao listar diretorio: " + e.message);
    }
}
