import process from "node:process";
import Lexer from "./lexer.js";
import Parser from "./parser.js";
import Resolver from "./resolver.js";
import Interpreter from "./interpreter.js";
import tokenTypes from "./tokenTypes.js";
// import fs from "node:process"
import fs from 'node:fs';
import path from "node:path"
import readline from "node:readline" 

export default class Egua {
    constructor(filename) {
        this.filename = filename;

        this.hadError = false;
        this.hadRuntimeError = false;
    }

    runPrompt() {
        const interpreter = new Interpreter(this, process.cwd());
        console.log("Console da Linguagem Égua");
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "\négua> "
        });

        rl.prompt();

        rl.on("line", line => {
            this.hadError = false;
            this.hadRuntimeError = false;

            this.run(line, interpreter);
            rl.prompt();
        });
    }

    runfile(filename) {
        this.filename = path.basename(filename);
        const interpreter = new Interpreter(this, process.cwd());

        const fileData = fs.readFileSync(filename).toString();
        this.run(fileData, interpreter);

        if (this.hadError) process.exit(65);
        if (this.hadRuntimeError) process.exit(70);
    }

    run(code, interpreter) {
        const lexer = new Lexer(code, this);
        const tokens = lexer.scan();

        if (this.hadError === true) return;

        const parser = new Parser(tokens, this);
        const statements = parser.parse();

        if (this.hadError === true) return;

        const resolver = new Resolver(interpreter, this);
        resolver.resolve(statements);

        if (this.hadError === true) return;

        interpreter.interpret(statements);
    }

    report(line, where, message) {
        if (this.filename)
            console.error(
                `[Arquivo: ${this.filename}] [Linha: ${line}] Erro${where}: ${message}`
            );
        else console.error(`[Linha: ${line}] Erro${where}: ${message}`);
        this.hadError = true;
    }

    error(token, errorMessage) {
        if (token.type === tokenTypes.EOF) {
            this.report(token.line, " no final", errorMessage);
        } else {
            this.report(token.line, ` no '${token.lexeme}'`, errorMessage);
        }
    }

    lexerError(line, char, msg) {
        this.report(line, ` no '${char}'`, msg);
    }

    runtimeError(error) {
        console.log(error)
        console.log(error.message)
        const line = error.token.line;
        if (error.token && line) {
            if (this.fileName)
                console.error(
                    `Erro: [Arquivo: ${this.fileName}] [Linha: ${error.token.line}] ${error.message}`
                );
            else console.error(`Erro: [Linha: ${error.token.line}] ${error.message}`);
        } else {
            console.error(`Erro: ${error.message}`);
        }
        this.hadRuntimeError = true;
    }
};
