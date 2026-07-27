/**
 * Substituto do módulo "child_process" do Node para o bundle do navegador.
 * A biblioteca "requisicao" só usa spawnSync no caminho exclusivo do Node
 * (protegido por verificação de ambiente), então um módulo vazio basta.
 */

export default {};
