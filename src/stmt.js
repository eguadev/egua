export default class Stmt {
    accept(visitor) { }
}

export class Expression extends Stmt {
    constructor(expression) {
        super();
        this.expression = expression;
    }

    accept(visitor) {
        return visitor.visitExpressionStmt(this)
    }
}

export class Função extends Stmt {
    constructor(name, func) {
        super();
        this.name = name;
        this.func = func;
    }

    accept(visitor) {
        return visitor.visitFunctionStmt(this);
    }
}

export class Retorna extends Stmt {
    constructor(keyword, value) {
        super();
        this.keyword = keyword;
        this.value = value;
    }

    accept(visitor) {
        return visitor.visitReturnStmt(this);
    }
}

export class Classe extends Stmt {
    constructor(name, superclass, methods) {
        super();
        this.name = name;
        this.superclass = superclass;
        this.methods = methods;
    }

    accept(visitor) {
        return visitor.visitClassStmt(this);
    }
}

export class Block extends Stmt {
    constructor(statements) {
        super();
        this.statements = statements;
    }

    accept(visitor) {
        return visitor.visitBlockStmt(this);
    }
}

export class Escreva extends Stmt {
    constructor(expression) {
        super();
        this.expression = expression;
    }

    accept(visitor) {
        return visitor.visitPrintStmt(this);
    }
}

export class Importar extends Stmt {
    constructor(path, closeBracket) {
        super();
        this.path = path;
        this.closeBracket = closeBracket;
    }

    accept(visitor) {
        return visitor.visitImportStmt(this);
    }
}

export class Fazer extends Stmt {
    constructor(doBranch, whileCondition) {
        super();
        this.doBranch = doBranch;
        this.whileCondition = whileCondition;
    }

    accept(visitor) {
        return visitor.visitDoStmt(this);
    }
}

export class Enquanto extends Stmt {
    constructor(condition, body) {
        super();
        this.condition = condition;
        this.body = body;
    }

    accept(visitor) {
        return visitor.visitWhileStmt(this);
    }
}

export class Para extends Stmt {
    constructor(initializer, condition, increment, body) {
        super();
        this.initializer = initializer;
        this.condition = condition;
        this.increment = increment;
        this.body = body;
    }

    accept(visitor) {
        return visitor.visitForStmt(this);
    }
}

export class Tente extends Stmt {
    constructor(tryBranch, catchBranch, elseBranch, finallyBranch) {
        super();
        this.tryBranch = tryBranch;
        this.catchBranch = catchBranch;
        this.elseBranch = elseBranch;
        this.finallyBranch = finallyBranch;
    }

    accept(visitor) {
        return visitor.visitTryStmt(this);
    }
}

export class Se extends Stmt {
    constructor(condition, thenBranch, elifBranches, elseBranch) {
        super();
        this.condition = condition;
        this.thenBranch = thenBranch;
        this.elifBranches = elifBranches;
        this.elseBranch = elseBranch;
    }

    accept(visitor) {
        return visitor.visitIfStmt(this);
    }
}

export class Escolha extends Stmt {
    constructor(condition, branches, defaultBranch) {
        super();
        this.condition = condition;
        this.branches = branches;
        this.defaultBranch = defaultBranch;
    }

    accept(visitor) {
        return visitor.visitSwitchStmt(this);
    }
}

export class Pausa extends Stmt {
    constructor() {
        super();
    }

    accept(visitor) {
        return visitor.visitBreakStmt(this);
    }
}

export class Continua extends Stmt {
    constructor() {
        super();
    }

    accept(visitor) {
        return visitor.visitContinueStmt(this);
    }
}

export class Var extends Stmt {
    constructor(name, initializer) {
        super();
        this.name = name;
        this.initializer = initializer;
    }

    accept(visitor) {
        return visitor.visitVarStmt(this);
    }
}
