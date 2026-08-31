import { RuntimeError } from "../../errors.js";
import { novo_resultado } from "./saida_testes.js";

export class ConjuntoDeTestes {
    constructor(descricao, ao_falhar = () => { }) {
        this.descricao = descricao;
        this.ao_falhar = ao_falhar;
        this.total_passou = 0;
        this.total_falhou = 0;
        this.total_assercoes_passou = 0;
        this.total_assercoes_falhou = 0;
        this.testes = [];
        this.ganchos = {
            antes_de_tudo: [],
            antes_de_cada: [],
            depois_de_cada: [],
            depois_de_tudo: []
        };
        this.resultados = [];
        this.resultado_atual = null;
        this.token_atual = null;
    }

    erro(mensagem) {
        throw new RuntimeError(this.token_atual, mensagem);
    }

    inicia_resultado(nome, tipo = "teste") {
        this.resultado_atual = {
            nome,
            tipo,
            assercoes: [],
            erros: []
        };
    }

    registra_assercao(passou, onde, obtido, esperado, detalhes = {}) {
        if (this.resultado_atual === null) {
            this.erro("Uma correspondência só pode ser usada dentro de um teste ou gancho.");
        }

        if (passou) {
            this.total_assercoes_passou += 1;
        } else {
            this.total_assercoes_falhou += 1;
            this.ao_falhar();
        }

        this.resultado_atual.assercoes.push({
            passou,
            onde,
            obtido,
            esperado,
            detalhes
        });
    }

    registra_erro(erro) {
        this.ao_falhar();
        this.resultado_atual.erros.push({
            mensagem: erro && erro.message ? erro.message : String(erro),
            linha: erro && erro.token ? erro.token.line : null
        });
    }

    finaliza_resultado() {
        const resultado = this.resultado_atual;
        if (resultado === null) return;

        const passou = resultado.erros.length === 0 &&
            resultado.assercoes.every(assercao => assercao.passou);

        resultado.passou = passou;

        if (resultado.tipo === "teste") {
            if (passou) this.total_passou += 1;
            else this.total_falhou += 1;
            this.resultados.push(resultado);
        } else if (!passou || resultado.assercoes.length > 0) {
            this.resultados.push(resultado);
        }

        this.resultado_atual = null;
    }

    falhou() {
        return this.total_falhou > 0 ||
            this.resultados.some(resultado => !resultado.passou);
    }

    resumo() {
        let mensagem = `${this.descricao} -- ${this.falhou() ? "FALHOU" : "PASSOU"}\n`;

        for (const resultado of this.resultados) {
            mensagem += `${novo_resultado(resultado, this.descricao)}\n`;
        }

        const total_testes = this.total_passou + this.total_falhou;
        const total_assercoes = this.total_assercoes_passou + this.total_assercoes_falhou;
        mensagem += `Testes: ${this.total_passou} passou, ${this.total_falhou} falhou, ${total_testes} total`;
        mensagem += `\nAsserções: ${this.total_assercoes_passou} passou, ${this.total_assercoes_falhou} falhou, ${total_assercoes} total`;
        return mensagem;
    }
}
