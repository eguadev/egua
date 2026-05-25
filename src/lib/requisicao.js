const RuntimeError = require("../errors.js").RuntimeError;
const { spawnSync } = require("child_process");

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

    const script = `
var http = require('http');
var https = require('https');
var u = new URL(process.argv[1]);
var mod = u.protocol === 'https:' ? https : http;
var dados = process.argv[3] || '';
var opcoes = {
    hostname: u.hostname,
    port: u.port || (u.protocol === 'https:' ? 443 : 80),
    path: u.pathname + u.search,
    method: process.argv[2],
    headers: dados ? {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(dados)
    } : {}
};
var req = mod.request(opcoes, function(res) {
    var corpo = '';
    res.on('data', function(c) { corpo += c; });
    res.on('end', function() { console.log(corpo); });
});
req.on('error', function(e) { console.error('ERRO:' + e.message); process.exit(1); });
if (dados) req.write(dados);
req.end();
`;

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

/**
 * Realiza uma requisicao HTTP GET.
 * @param {string} url A URL para a requisicao.
 * @returns O corpo da resposta (objeto JSON ou texto).
 */
module.exports.obter = function (url) {
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
};

/**
 * Realiza uma requisicao HTTP POST.
 * @param {string} url A URL para a requisicao.
 * @param {any} dados Os dados a serem enviados (objeto ou texto).
 * @returns O corpo da resposta (objeto JSON ou texto).
 */
module.exports.enviar = function (url, dados) {
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
};

/**
 * Realiza uma requisicao HTTP PUT.
 * @param {string} url A URL para a requisicao.
 * @param {any} dados Os dados a serem enviados (objeto ou texto).
 * @returns O corpo da resposta (objeto JSON ou texto).
 */
module.exports.atualizar = function (url, dados) {
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
};

/**
 * Realiza uma requisicao HTTP DELETE.
 * @param {string} url A URL para a requisicao.
 * @returns O corpo da resposta (objeto JSON ou texto).
 */
module.exports.excluir = function (url) {
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
};
