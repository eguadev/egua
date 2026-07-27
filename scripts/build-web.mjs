/**
 * Gera o bundle da linguagem para o navegador (apps/idegua/js/egua.min.js)
 * a partir de src/web.js, expondo a global "Egua" (a IDE usa new Egua.Egua()).
 *
 * Os módulos do Node usados pelo interpretador (fs, path, child_process e a
 * global process) são trocados pelos substitutos mínimos de scripts/shims/.
 */

import { build } from "esbuild";
import { fileURLToPath } from "node:url";

const shim = (name) => fileURLToPath(new URL(`./shims/${name}.js`, import.meta.url));

await build({
    entryPoints: ["src/web.js"],
    outfile: "apps/idegua/js/egua.min.js",
    bundle: true,
    minify: true,
    format: "iife",
    globalName: "Egua",
    platform: "browser",
    target: ["es2017"],
    alias: {
        fs: shim("fs"),
        path: shim("path"),
        child_process: shim("child_process"),
    },
    inject: [shim("process")],
    logLevel: "info",
});
