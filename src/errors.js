export class RuntimeError extends Error {
  constructor(token, message) {
    super(message);
    this.token = token;
  }
}

export class ContinueException extends Error { }

export class BreakException extends Error { }

export default class ReturnException extends Error {
  constructor(value) {
    super(value);
    this.value = value;
  }
}
