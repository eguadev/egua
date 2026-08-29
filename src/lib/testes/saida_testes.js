function formata_valor(valor) {
    if (valor === null || valor === undefined) return "nulo";
    if (typeof valor === "boolean") return valor ? "verdadeiro" : "falso";

    if (typeof valor === "object") {
        const visitados = new WeakSet();

        try {
            return JSON.stringify(valor, (_chave, item) => {
                if (item !== null && typeof item === "object") {
                    if (visitados.has(item)) return "[Circular]";
                    visitados.add(item);
                }

                return item;
            });
        } catch (_erro) {
            return String(valor);
        }
    }

    return String(valor);
}

const saidas = {
    seja: ({ esperado, obtido, detalhes }) => {
        const negado = detalhes.negado;
        let mensagem =
            `\tesperado_que(obtido).${negado ? "não." : ""}seja(esperado) // igualdade exata`;

        mensagem +=
            `\n\t${negado ? "Não esperado" : "Esperado"}: ${formata_valor(esperado)}` +
            `\n\tObtido: ${formata_valor(obtido)}`;

        return mensagem;
    },

    não_seja: ({ esperado, obtido, detalhes }) => {
        const negado = detalhes.negado;
        let mensagem =
            `\tesperado_que(obtido).${negado ? "não." : ""}não_seja(esperado) // desigualdade exata`;

        mensagem +=
            `\n\t${negado ? "Esperado" : "Não esperado"}: ${formata_valor(esperado)}` +
            `\n\tObtido: ${formata_valor(obtido)}`;

        return mensagem;
    },

    seja_verdadeiro: ({ obtido, detalhes }) => {
        const negado = detalhes.negado;
        let mensagem =
            `\tesperado_que(obtido).${negado ? "não." : ""}seja_verdadeiro()\n`;

        mensagem +=
            `\tEsperado: ${negado ? "valor diferente de verdadeiro" : "verdadeiro"}` +
            `\n\tObtido: ${formata_valor(obtido)}`;

        return mensagem;
    },

    seja_falso: ({ obtido, detalhes }) => {
        const negado = detalhes.negado;
        let mensagem =
            `\tesperado_que(obtido).${negado ? "não." : ""}seja_falso()\n`;

        mensagem +=
            `\tEsperado: ${negado ? "valor diferente de falso" : "falso"}` +
            `\n\tObtido: ${formata_valor(obtido)}`;

        return mensagem;
    },

    não_nulo: ({ obtido, detalhes }) => {
        const negado = detalhes.negado;
        let mensagem =
            `\tesperado_que(obtido).${negado ? "não." : ""}não_nulo()\n`;

        mensagem +=
            `\tEsperado: ${negado ? "nulo" : "valor não nulo"}` +
            `\n\tObtido: ${formata_valor(obtido)}`;

        return mensagem;
    },

    seja_próximo: ({ esperado, obtido, detalhes }) => {
        const precisao = detalhes.precisao;
        const negado = detalhes.negado;

        let mensagem =
            `\tesperado_que(obtido).${negado ? "não." : ""}seja_próximo(esperado, ${precisao})\n`;

        mensagem +=
            `\tEsperado: ${negado ? "não " : ""}próximo a ${formata_valor(esperado)}` +
            `\n\tObtido: ${formata_valor(obtido)}`;

        return mensagem;
    },

    seja_objeto: ({ esperado, obtido, detalhes }) => {
        const negado = detalhes.negado;
        let mensagem =
            `\tesperado_que(obtido).${negado ? "não." : ""}seja_objeto(esperado)`;

        mensagem +=
            `\n\t${negado ? "Não esperado" : "Esperado"}: ${formata_valor(esperado)}` +
            `\n\tObtido: ${formata_valor(obtido)}`;

        return mensagem;
    },
};

function reporta_assercao(assercao) {
    const report = saidas[assercao.onde];

    return report
        ? report(assercao)
        : "\tCorrespondência desconhecida.";
}

export function novo_resultado(resultado, nome_conjunto) {
    let saida = `  ${resultado.passou ? "✔" : "✖"}  ${resultado.nome}`;

    if (resultado.passou) return saida;

    for (const assercao of resultado.assercoes.filter(item => !item.passou)) {
        saida += `\n${reporta_assercao(assercao)}`;
    }

    for (const erro of resultado.erros) {
        const local = erro.linha ? ` [Linha: ${erro.linha}]` : "";
        saida += `\n\tErro${local}: ${erro.mensagem}`;
    }

    return saida;
}
