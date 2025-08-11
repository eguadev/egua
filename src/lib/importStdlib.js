import StandardFn from "../structures/standardFn.js";
import EguaModule from "../structures/module.js";

import * as tempo from "./tempo.js";
import * as matematica from "./matematica.js";
import * as textos from "./textos.js";

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
        case "matematica":
            return loadModule("matematica", matematica);
        case "textos":
            return loadModule("textos", textos);
    }
    return null;
}
