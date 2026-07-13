import { RuntimeError } from "../errors.js";
import childProcess from "child_process";

function _requisicao(url, metodo, dados) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }

    try {
        new URL(url);
    } catch (e) {
        throw new Error("URL invalida: " + url);
    }

    let corpoDados = "";
    if (dados !== undefined && dados !== null) {
        corpoDados = typeof dados === "object" ? JSON.stringify(dados) : String(dados);
    }

    if (typeof process !== "undefined" && process.versions && process.versions.node) {
        return _requisicaoNode(url, metodo, corpoDados);
    }

    if (typeof XMLHttpRequest !== "undefined") {
        return _requisicaoNavegador(url, metodo, corpoDados);
    }

    throw new Error("Ambiente nao suportado para requisicoes HTTP.");
}

function _requisicaoNode(url, metodo, corpoDados) {
    const spawnSync = childProcess.spawnSync;

    const script = '\
var http = require("http");\n\
var https = require("https");\n\
var u = new URL(process.argv[1]);\n\
var mod = u.protocol === "https:" ? https : http;\n\
var dados = process.argv[3] || "";\n\
var opcoes = {\n\
    hostname: u.hostname,\n\
    port: u.port || (u.protocol === "https:" ? 443 : 80),\n\
    path: u.pathname + u.search,\n\
    method: process.argv[2],\n\
    headers: dados ? {\n\
        "Content-Type": "application/json",\n\
        "Content-Length": Buffer.byteLength(dados)\n\
    } : {}\n\
};\n\
var req = mod.request(opcoes, function(res) {\n\
    var corpo = "";\n\
    res.on("data", function(c) { corpo += c; });\n\
    res.on("end", function() { console.log(corpo); });\n\
});\n\
req.on("error", function(e) { console.error("ERRO:" + e.message); process.exit(1); });\n\
if (dados) req.write(dados);\n\
req.end();\n\
';

    const resultado = spawnSync(process.execPath, ["-e", script, url, metodo, corpoDados], {
        encoding: "utf-8",
        timeout: 30000
    });

    if (resultado.status !== 0 || resultado.stderr) {
        const msg = resultado.stderr ? resultado.stderr.replace("ERRO:", "").trim() : "Erro desconhecido na requisicao.";
        throw new Error(msg);
    }

    try {
        return JSON.parse(resultado.stdout.trim());
    } catch (e) {
        return resultado.stdout.trim();
    }
}

function _requisicaoNavegador(url, metodo, corpoDados) {
    const xhr = new XMLHttpRequest();
    xhr.open(metodo, url, false);

    if (corpoDados) {
        xhr.setRequestHeader("Content-Type", "application/json");
    }

    try {
        xhr.send(corpoDados || null);
    } catch (e) {
        throw new Error("Erro na requisicao: " + e.message);
    }

    if (xhr.status < 200 || xhr.status >= 300) {
        throw new Error("Erro na requisicao: status " + xhr.status);
    }

    try {
        return JSON.parse(xhr.responseText);
    } catch (e) {
        return xhr.responseText;
    }
}

/**
 * Realiza uma requisicao HTTP GET.
 * @param {string} url A URL para a requisicao.
 * @returns O corpo da resposta (objeto JSON ou texto).
 */
export function obter(url) {
    if (typeof url !== "string") {
        throw new RuntimeError(
            this.token,
            "O parametro deve ser um texto em requisicao.obter(url)."
        );
    }
    try {
        return _requisicao(url, "GET");
    } catch (e) {
        throw new RuntimeError(this.token, e.message);
    }
}

/**
 * Realiza uma requisicao HTTP POST.
 * @param {string} url A URL para a requisicao.
 * @param {any} dados Os dados a serem enviados (objeto ou texto).
 * @returns O corpo da resposta (objeto JSON ou texto).
 */
export function enviar(url, dados) {
    if (typeof url !== "string") {
        throw new RuntimeError(
            this.token,
            "O parametro 'url' deve ser um texto em requisicao.enviar(url, dados)."
        );
    }
    try {
        return _requisicao(url, "POST", dados);
    } catch (e) {
        throw new RuntimeError(this.token, e.message);
    }
}

/**
 * Realiza uma requisicao HTTP PUT.
 * @param {string} url A URL para a requisicao.
 * @param {any} dados Os dados a serem enviados (objeto ou texto).
 * @returns O corpo da resposta (objeto JSON ou texto).
 */
export function atualizar(url, dados) {
    if (typeof url !== "string") {
        throw new RuntimeError(
            this.token,
            "O parametro 'url' deve ser um texto em requisicao.atualizar(url, dados)."
        );
    }
    try {
        return _requisicao(url, "PUT", dados);
    } catch (e) {
        throw new RuntimeError(this.token, e.message);
    }
}

/**
 * Realiza uma requisicao HTTP DELETE.
 * @param {string} url A URL para a requisicao.
 * @returns O corpo da resposta (objeto JSON ou texto).
 */
export function excluir(url) {
    if (typeof url !== "string") {
        throw new RuntimeError(
            this.token,
            "O parametro deve ser um texto em requisicao.excluir(url)."
        );
    }
    try {
        return _requisicao(url, "DELETE");
    } catch (e) {
        throw new RuntimeError(this.token, e.message);
    }
}
