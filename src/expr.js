export default class Expr {
    accept(_visitor) { }
}

export class Assign extends Expr {
    constructor(name, value) {
        super();
        this.name = name;
        this.value = value;
    }

    accept(visitor) {
        return visitor.visitAssignExpr(this);
    }
}

export class Binary extends Expr {
    constructor(left, operator, right) {
        super();
        this.left = left;
        this.operator = operator;
        this.right = right;
    }

    accept(visitor) {
        return visitor.visitBinaryExpr(this);
    }
}

export class Função extends Expr {
    constructor(params, body) {
        super();
        this.params = params;
        this.body = body;
    }

    accept(visitor) {
        return visitor.visitFunctionExpr(this);
    }
}

export class Call extends Expr {
    constructor(callee, paren, args) {
        super();
        this.callee = callee;
        this.paren = paren;
        this.args = args;
    }

    accept(visitor) {
        return visitor.visitCallExpr(this);
    }
}

export class Get extends Expr {
    constructor(object, name) {
        super();
        this.object = object;
        this.name = name;
    }

    accept(visitor) {
        return visitor.visitGetExpr(this);
    }
}

export class Grouping extends Expr {
    constructor(expression) {
        super();
        this.expression = expression;
    }

    accept(visitor) {
        return visitor.visitGroupingExpr(this);
    }
}

export class Literal extends Expr {
    constructor(value) {
        super();
        this.value = value;
    }

    accept(visitor) {
        return visitor.visitLiteralExpr(this);
    }
}

export class Array extends Expr {
    constructor(values) {
        super();
        this.values = values;
    }

    accept(visitor) {
        return visitor.visitArrayExpr(this);
    }
}

export class Dictionary extends Expr {
    constructor(keys, values) {
        super();
        this.keys = keys;
        this.values = values;
    }

    accept(visitor) {
        return visitor.visitDictionaryExpr(this);
    }
}

export class Subscript extends Expr {
    constructor(callee, index, closeBracket) {
        super();
        this.callee = callee;
        this.index = index;
        this.closeBracket = closeBracket;
    }

    accept(visitor) {
        return visitor.visitSubscriptExpr(this);
    }
}

export class Assignsubscript extends Expr {
    constructor(obj, index, value) {
        super();
        this.obj = obj;
        this.index = index;
        this.value = value;
    }

    accept(visitor) {
        return visitor.visitAssignsubscriptExpr(this);
    }
}

export class Logical extends Expr {
    constructor(left, operator, right) {
        super();
        this.left = left;
        this.operator = operator;
        this.right = right;
    }

    accept(visitor) {
        return visitor.visitLogicalExpr(this);
    }
}

export class Set extends Expr {
    constructor(object, name, value) {
        super();
        this.object = object;
        this.name = name;
        this.value = value;
    }

    accept(visitor) {
        return visitor.visitSetExpr(this);
    }
}

export class Super extends Expr {
    constructor(keyword, method) {
        super();
        this.keyword = keyword;
        this.method = method;
    }

    accept(visitor) {
        return visitor.visitSuperExpr(this);
    }
}

export class Isto extends Expr {
    constructor(keyword) {
        super();
        this.keyword = keyword;
    }

    accept(visitor) {
        return visitor.visitThisExpr(this);
    }
}

export class Unary extends Expr {
    constructor(operator, right) {
        super();
        this.operator = operator;
        this.right = right;
    }

    accept(visitor) {
        return visitor.visitUnaryExpr(this);
    }
}

export class Variable extends Expr {
    constructor(name) {
        super();
        this.name = name;
    }

    accept(visitor) {
        return visitor.visitVariableExpr(this);
    }
}
