/**
 * Substituto do módulo "fs" do Node para o bundle do navegador.
 * O navegador não tem sistema de arquivos; o interpretador captura este erro
 * e o converte em RuntimeError ("Não foi possível ler o arquivo.") quando o
 * usuário tenta importar um arquivo local.
 */

function indisponivel() {
    throw new Error("O sistema de arquivos não está disponível no navegador.");
}

export const existsSync = indisponivel;
export const readFileSync = indisponivel;

export default { existsSync, readFileSync };
