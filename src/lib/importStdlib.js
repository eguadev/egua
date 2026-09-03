import StandardFn from "../structures/standardFn.js";
import EguaModule from "../structures/module.js";

import * as tempo from "./tempo.js";
import * as matematica from "./matematica.js";
import * as textos from "./textos.js";
import * as requisicao from "./requisicao.js";
import * as arquivos from "./arquivos.js";

function loadModule(moduleName, moduleData) {
    const newModule = new EguaModule(moduleName);

    const keys = Object.keys(moduleData);
    for (let i = 0; i < keys.length; i++) {
        const currentItem = moduleData[keys[i]];

        if (typeof currentItem === "function") {
            newModule[keys[i]] = new StandardFn(
                currentItem.length,
                currentItem
            );
        } else {
            newModule[keys[i]] = currentItem;
        }
    }

    return newModule;
}

export default function checkStdLib(name) {
    switch (name) {
        case "tempo":
            return loadModule("tempo", tempo);
        case "matemática":
            return loadModule("matemática", matematica);
        case "textos":
            return loadModule("textos", textos);
        case "requisição":
            return loadModule("requisição", requisicao);
        case "arquivos":
            return loadModule("arquivos", arquivos);
    }
    return null;
}
