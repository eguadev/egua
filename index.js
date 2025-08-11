import process from "node:process";
import Egua from "./src/egua.js";

const main = function () {
    const args = process.argv;

    const egua = new Egua();
    if (args.length === 2) {
        egua.runPrompt();
    } else {
        egua.runfile(args[2]);
    }
};

main();
