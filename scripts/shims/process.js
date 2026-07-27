/**
 * Substituto da global "process" do Node, injetado pelo esbuild em todo módulo
 * que a referencia. "versions" vazio faz a biblioteca "requisicao" cair no
 * caminho do navegador (XMLHttpRequest), como acontecia com o shim do
 * browserify.
 */

export const process = {
    cwd: () => "/",
    versions: {},
};
