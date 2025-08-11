import Callable from "./callable.js";
import Environment from "../environment.js";
import ReturnException from "../errors.js";

export default class EguaFunction extends Callable {
    constructor(name, declaration, closure, isInitializer = false) {
        super();
        this.name = name;
        this.declaration = declaration;
        this.closure = closure;
        this.isInitializer = isInitializer;
    }

    arity() {
        return this.declaration.params.length;
    }

    toString() {
        if (this.name === null) return "<função>";
        return `<função ${this.name}>`;
    }

    call(interpreter, args) {
        const environment = new Environment(this.closure);
        const params = this.declaration.params;
        for (let i = 0; i < params.length; i++) {
            const param = params[i];

            const name = param["name"].lexeme;
            let value = args[i];
            if (args[i] === null) {
                value = param["default"] ? param["default"].value : null;
            }
            environment.defineVar(name, value);
        }

        try {
            interpreter.executeBlock(this.declaration.body, environment);
        } catch (error) {
            if (error instanceof ReturnException) {
                if (this.isInitializer) return this.closure.getVarAt(0, "isto");
                return error.value;
            } else {
                throw error;
            }
        }

        if (this.isInitializer) return this.closure.getVarAt(0, "isto");
        return null;
    }

    bind(instance) {
        let environment = new Environment(this.closure);
        environment.defineVar("isto", instance);
        return new EguaFunction(
            this.name,
            this.declaration,
            environment,
            this.isInitializer
        );
    }
};
