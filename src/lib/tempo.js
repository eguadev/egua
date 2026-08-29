import { RuntimeError } from "../errors.js";

// Retorna uma data completa
export function agora () {
	return new Date();
};

// Retorna os segundos atuais do sistema
export function segundos () {
	return new Date().getSeconds();
};

// Retorna os minutos atuais do sistema
export function minutos () {
	return new Date().getMinutes();
};

// Retorna a hora atual do sistema
export function horas () {
	return new Date().getHours();
};

/**
 * Retorna uma instância de Date do JavaScript da data passada por parâmetro, no formato DD/MM/AAAA.
 * @param {string} dataComoTexto A data a ser convertida como texto, no formato DD/MM/AAAA.
 * @returns A data como um objeto Date to JavaScript.
 */
export function texto_para_data (dataComoTexto) {
	const regex = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/;

	if (typeof dataComoTexto !== 'string' || !regex.test(dataComoTexto)) {
		throw new RuntimeError(
			this.token,
			"O parâmetro passado deve ser um texto com a data no formato DD/MM/AAAA. Ex: '01/01/2014'"
		);
	}

	const [dia, mes, ano] = dataComoTexto.split("/").map(Number);
	const date = new Date(converterDataPtParaIso(dataComoTexto));

	if (date.getUTCDate() !== dia || date.getUTCMonth() + 1 !== mes || date.getUTCFullYear() !== ano) {
		throw new RuntimeError(
			this.token,
			"Data inválida: '" + dataComoTexto + "' não existe no calendário."
		);
	}

	const timezoneOffset = date.getTimezoneOffset();

	return new Date(date.getTime() + timezoneOffset * 60 * 1000);
}

function converterDataPtParaIso(date) {
	const day = date.split("/")[0];
	const month = date.split("/")[1];
	const year = date.split("/")[2];

	return `${year}-${month}-${day}`;
}

/**
 * Retorna o dia do mês atual (1-31).
 * @returns O dia do mês.
 */
export function dia() {
	return new Date().getDate();
}

/**
 * Retorna o mês atual (1-12).
 * @returns O mês.
 */
export function mes() {
	return new Date().getMonth() + 1;
}

/**
 * Retorna o ano atual.
 * @returns O ano completo.
 */
export function ano() {
	return new Date().getFullYear();
}

/**
 * Retorna o nome do dia da semana em português.
 * @returns O nome do dia da semana (domingo, segunda, etc.).
 */
export function dia_da_semana() {
	const dias = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
	return dias[new Date().getDay()];
}

/**
 * Formata uma data conforme o formato especificado.
 * @param {Date} data A data a ser formatada.
 * @param {string} formato O formato desejado (ex: "DD/MM/AAAA", "AAAA-MM-DD").
 * @returns A data formatada como texto.
 */
export function formate_data(data, formato) {
	if (!(data instanceof Date)) {
		throw new RuntimeError(
			this.token,
			"O primeiro parâmetro deve ser uma data em tempo.formate_data(data, formato)."
		);
	}

	if (typeof formato !== "string") {
		throw new RuntimeError(
			this.token,
			"O segundo parâmetro deve ser um texto em tempo.formate_data(data, formato)."
		);
	}

	const dia = String(data.getDate()).padStart(2, "0");
	const mes = String(data.getMonth() + 1).padStart(2, "0");
	const ano = data.getFullYear();

	return formato
		.replace("DD", dia)
		.replace("MM", mes)
		.replace("AAAA", ano);
}

/**
 * Calcula a diferença em dias entre duas datas.
 * @param {Date} data1 A primeira data.
 * @param {Date} data2 A segunda data.
 * @returns A diferença em dias (valor absoluto).
 */
export function diferenca(data1, data2) {
	if (!(data1 instanceof Date) || !(data2 instanceof Date)) {
		throw new RuntimeError(
			this.token,
			"Ambos os parâmetros devem ser datas em tempo.diferenca(data1, data2)."
		);
	}

	const diffMs = Math.abs(data2.getTime() - data1.getTime());
	return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Pausa a execução por um tempo determinado.
 * @param {number} milissegundos O tempo de pausa em milissegundos.
 */
export function pausa(milissegundos) {
	if (typeof milissegundos !== "number" || milissegundos < 0) {
		throw new RuntimeError(
			this.token,
			"O parâmetro deve ser um número positivo em tempo.pausa(milissegundos)."
		);
	}

	const inicio = Date.now();
	while (Date.now() - inicio < milissegundos) {
		// busy wait
	}
}
