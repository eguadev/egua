import Callable from "./callable.js";
import { RuntimeError } from "../errors.js";

export default class StandardFn extends Callable {
    constructor(arityValue, func) {
        super();
        this.arityValue = arityValue;
        this.func = func;
    }

    call(interpreter, args, token) {
        this.token = token;
        try {
            return this.func.apply(this, args);
        } catch (error) {
            if (error instanceof RuntimeError) {
                throw error;
            }
            throw new RuntimeError(token, error.message);
        }
    }

    toString() {
        return "<função>";
    }
};
