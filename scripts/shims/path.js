/**
 * Substituto do módulo "path" do Node para o bundle do navegador.
 * O interpretador só usa join, dirname e basename (no comando "importar"),
 * sempre com caminhos POSIX — o suficiente está implementado aqui.
 */

export function join(...parts) {
    return parts.filter(Boolean).join("/").replace(/\/{2,}/g, "/");
}

export function dirname(p) {
    const i = p.lastIndexOf("/");
    if (i === -1) return ".";
    if (i === 0) return "/";
    return p.slice(0, i);
}

export function basename(p) {
    const i = p.lastIndexOf("/");
    return i === -1 ? p : p.slice(i + 1);
}

export default { join, dirname, basename };
