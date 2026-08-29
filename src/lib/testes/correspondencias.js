import StandardFn from "../../structures/standardFn.js";

function compara_objetos(obtido, esperado, visitados = new WeakMap()) {
    if (Object.is(obtido, esperado)) return true;
    if (obtido === null || esperado === null) return false;
    if (typeof obtido !== "object" || typeof esperado !== "object") return false;

    if (obtido instanceof Date || esperado instanceof Date) {
        return obtido instanceof Date && esperado instanceof Date &&
            Object.is(obtido.getTime(), esperado.getTime());
    }

    if (Array.isArray(obtido) !== Array.isArray(esperado)) return false;

    if (visitados.has(obtido)) return visitados.get(obtido) === esperado;
    visitados.set(obtido, esperado);

    const chaves_obtido = Object.keys(obtido).sort();
    const chaves_esperado = Object.keys(esperado).sort();
    if (chaves_obtido.length !== chaves_esperado.length) return false;

    for (let indice = 0; indice < chaves_obtido.length; indice++) {
        const chave = chaves_obtido[indice];
        if (chave !== chaves_esperado[indice]) return false;
        if (!compara_objetos(obtido[chave], esperado[chave], visitados)) return false;
    }

    return true;
}

export class Correspondencias {
    constructor(obtido, conjunto_testes, negado = false) {
        this.obtido = obtido;
        this.conjunto_testes = conjunto_testes;
        this.negado = negado;

        const correspondencias = this;

        this.seja = new StandardFn(1, function (esperado) {
            correspondencias.atualiza_token(this.token);
            correspondencias.registra(
                Object.is(correspondencias.obtido, esperado),
                "seja",
                esperado
            );
        });

        this.não_seja = new StandardFn(1, function (esperado) {
            correspondencias.atualiza_token(this.token);
            correspondencias.registra(
                !Object.is(correspondencias.obtido, esperado),
                "não_seja",
                esperado
            );
        });

        this.seja_verdadeiro = new StandardFn(0, function () {
            correspondencias.atualiza_token(this.token);
            correspondencias.registra(
                correspondencias.obtido === true,
                "seja_verdadeiro",
                true
            );
        });

        this.seja_falso = new StandardFn(0, function () {
            correspondencias.atualiza_token(this.token);
            correspondencias.registra(
                correspondencias.obtido === false,
                "seja_falso",
                false
            );
        });

        this.não_nulo = new StandardFn(0, function () {
            correspondencias.atualiza_token(this.token);
            correspondencias.registra(
                correspondencias.obtido !== null,
                "não_nulo",
                null
            );
        });

        this.seja_próximo = new StandardFn(1, function (esperado, precisao = 2) {
            correspondencias.atualiza_token(this.token);
            correspondencias.registra_proximidade(esperado, precisao);
        });

        this.seja_objeto = new StandardFn(1, function (esperado) {
            correspondencias.atualiza_token(this.token);
            correspondencias.registra(
                compara_objetos(correspondencias.obtido, esperado),
                "seja_objeto",
                esperado
            );
        });
    }

    negada() {
        return new Correspondencias(
            this.obtido,
            this.conjunto_testes,
            !this.negado
        );
    }

    exporta() {
        const correspondencias = this;

        return {
            seja: this.seja,
            não_seja: this.não_seja,
            seja_verdadeiro: this.seja_verdadeiro,
            seja_falso: this.seja_falso,
            não_nulo: this.não_nulo,
            seja_próximo: this.seja_próximo,
            seja_objeto: this.seja_objeto,
            get não() {
                return correspondencias.negada().exporta();
            }
        };
    }

    atualiza_token(token) {
        this.conjunto_testes.token_atual = token;
    }

    registra(resultado, onde, esperado, detalhes = {}) {
        this.conjunto_testes.registra_assercao(
            this.negado ? !resultado : resultado,
            onde,
            this.obtido,
            esperado,
            { ...detalhes, negado: this.negado }
        );
    }

    registra_proximidade(esperado, precisao) {
        if (typeof esperado !== "number") {
            this.conjunto_testes.erro("`esperado` precisa ser do tipo número.");
        }

        if (typeof this.obtido !== "number") {
            this.conjunto_testes.erro("`obtido` precisa ser do tipo número.");
        }

        if (typeof precisao !== "number" || !Number.isInteger(precisao) || precisao < 0) {
            this.conjunto_testes.erro(
                "`precisão` precisa ser um número inteiro não negativo."
            );
        }

        let passou;
        if ((this.obtido === Infinity && esperado === Infinity) ||
            (this.obtido === -Infinity && esperado === -Infinity)) {
            passou = true;
        } else {
            const diferenca_esperada = Math.pow(10, -precisao) / 2;
            const diferenca_obtida = Math.abs(esperado - this.obtido);
            passou = diferenca_obtida < diferenca_esperada;
        }

        this.registra(passou, "seja_próximo", esperado, { precisao });
    }
}

export function correspondencias(obtido, conjunto_testes, negado = false) {
    return new Correspondencias(obtido, conjunto_testes, negado).exporta();
}
