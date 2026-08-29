import { RuntimeError } from "../../errors.js";
import EguaFunction from "../../structures/function.js";
import { ConjuntoDeTestes } from "./conjunto.js";
import { Correspondencias } from "./correspondencias.js";

const bibliotecas_por_interpretador = new WeakMap();

export class BibliotecaDeTestes {
    constructor(interpreter) {
        this.interpreter = interpreter;
        this.conjunto_atual = null;
        this.conjuntos = [];
    }

    registra_falha_no_interpretador() {
        this.interpreter.Egua.hadRuntimeError = true;
    }

    valida_funcao(funcao, token, nome) {
        if (!(funcao instanceof EguaFunction)) {
            throw new RuntimeError(token, `O parâmetro de ${nome} deve ser uma função.`);
        }
    }

    valida_conjunto(token) {
        if (this.conjunto_atual === null) {
            throw new RuntimeError(token, "O conjunto de testes não foi descrito.");
        }
    }

    executa_funcoes(funcoes, conjunto) {
        let passou = true;

        for (const funcao of funcoes) {
            try {
                funcao.call(this.interpreter, []);
            } catch (erro) {
                conjunto.registra_erro(erro);
                passou = false;
            }
        }

        return passou;
    }

    executa_conjunto(conjunto) {
        conjunto.inicia_resultado("gancho antes_de_tudo", "gancho");
        const preparacao_passou = this.executa_funcoes(
            conjunto.ganchos.antes_de_tudo,
            conjunto
        );
        conjunto.finaliza_resultado();

        if (preparacao_passou) {
            for (const caso of conjunto.testes) {
                conjunto.token_atual = caso.token;
                conjunto.inicia_resultado(caso.descricao);

                const preparacao_do_teste_passou = this.executa_funcoes(
                    conjunto.ganchos.antes_de_cada,
                    conjunto
                );

                if (preparacao_do_teste_passou) {
                    try {
                        caso.funcao.call(this.interpreter, []);
                    } catch (erro) {
                        conjunto.registra_erro(erro);
                    }
                }

                this.executa_funcoes(conjunto.ganchos.depois_de_cada, conjunto);
                conjunto.finaliza_resultado();
            }
        }

        conjunto.inicia_resultado("gancho depois_de_tudo", "gancho");
        this.executa_funcoes(conjunto.ganchos.depois_de_tudo, conjunto);
        conjunto.finaliza_resultado();
    }

    registra_gancho(tipo, funcao, token) {
        this.valida_conjunto(token);
        this.valida_funcao(funcao, token, tipo);
        this.conjunto_atual.ganchos[tipo].push(funcao);
    }

    descreva(descricao = "", funcao, token) {
        if (typeof descricao !== "string") {
            throw new RuntimeError(token, "A descrição do conjunto deve ser um texto.");
        }

        if (descricao.length === 0) {
            throw new RuntimeError(token, "A descrição do conjunto não pode ser vazia.");
        }

        this.valida_funcao(funcao, token, "descreva");

        const conjunto_pai = this.conjunto_atual;
        const conjunto = new ConjuntoDeTestes(
            descricao,
            () => this.registra_falha_no_interpretador()
        );
        this.conjunto_atual = conjunto;

        try {
            funcao.call(this.interpreter, []);
            this.executa_conjunto(conjunto);
            this.conjuntos.push(conjunto);
        } finally {
            this.conjunto_atual = conjunto_pai;
        }
    }

    esperado_que(obtido, token) {
        this.valida_conjunto(token);
        this.conjunto_atual.token_atual = token;
        return new Correspondencias(obtido, this.conjunto_atual).exporta();
    }

    teste(descricao = "", funcao, token) {
        this.valida_conjunto(token);

        if (typeof descricao !== "string") {
            throw new RuntimeError(token, "A descrição do teste deve ser um texto.");
        }

        if (descricao.length === 0) {
            throw new RuntimeError(token, "A descrição do teste não pode ser vazia.");
        }

        this.valida_funcao(funcao, token, "teste");

        this.conjunto_atual.testes.push({ descricao, funcao, token });
    }

    resultados(token) {
        if (this.conjuntos.length === 0) {
            throw new RuntimeError(token, "Nenhum conjunto de testes foi executado.");
        }

        if (this.conjuntos.some(conjunto => conjunto.falhou())) {
            this.registra_falha_no_interpretador();
        }

        const resumo = this.conjuntos.map(conjunto => conjunto.resumo()).join("\n\n");
        this.conjuntos = [];
        return resumo;
    }

    exporta() {
        const biblioteca = this;

        return {
            antes_de_cada: function (funcao) {
                biblioteca.registra_gancho("antes_de_cada", funcao, this.token);
            },
            antes_de_tudo: function (funcao) {
                biblioteca.registra_gancho("antes_de_tudo", funcao, this.token);
            },
            descreva: function (descricao = "", funcao) {
                return biblioteca.descreva(descricao, funcao, this.token);
            },
            depois_de_cada: function (funcao) {
                biblioteca.registra_gancho("depois_de_cada", funcao, this.token);
            },
            depois_de_tudo: function (funcao) {
                biblioteca.registra_gancho("depois_de_tudo", funcao, this.token);
            },
            esperado_que: function (obtido) {
                return biblioteca.esperado_que(obtido, this.token);
            },
            resultados: function () {
                return biblioteca.resultados(this.token);
            },
            teste: function (descricao = "", funcao) {
                return biblioteca.teste(descricao, funcao, this.token);
            }
        };
    }
}

export default function criar_biblioteca_testes(interpreter) {
    if (!bibliotecas_por_interpretador.has(interpreter)) {
        bibliotecas_por_interpretador.set(
            interpreter,
            new BibliotecaDeTestes(interpreter)
        );
    }

    return bibliotecas_por_interpretador.get(interpreter).exporta();
}
