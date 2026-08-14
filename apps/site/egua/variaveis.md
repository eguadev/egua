---
description: Como declarar, atribuir e usar variáveis na linguagem de programação Égua, incluindo escopo global e local, com exemplos práticos.
---

# Variáveis

Variáveis são uma das primeiras coisas que todo programador aprende: elas têm um nome e guardam um valor na memória.

Para declarar uma variável, usa-se a palavra-chave `var` seguida do nome escolhido, com um valor inicial opcional.

Exemplo de declaração de uma variável com valor inicial atribuído:

```js
var variável = "1";
```

O valor de uma variável pode mudar ao longo do código, sem precisar de nenhuma sinalização especial.

Exemplo de alteração de valor de uma variável:

```js
var a = "1";
a = "2";
escreva(a); // exibe 2
```

As variáveis também têm escopo: o contexto onde elas existem e podem ser acessadas.

Existem dois tipos de escopo, global e local. No escopo global, a variável pode ser acessada de qualquer parte do programa; no local, só dentro do bloco onde foi declarada. Na linguagem égua, um bloco é definido por `{ }`.

Uma variável do escopo externo pode ser acessada de dentro de um bloco interno, mas o contrário não funciona.

Exemplo de escopo:

```js
{
  var a = "1";
}

escreva(a); // sinaliza um erro
```

```js
var a = "1";
{
  escreva(a); // exibe 1
}
```

Um bloco interno também pode alterar uma variável do escopo externo, sem precisar declará-la de novo.

Exemplo de alteração de variáveis em escopos:

```js
var a = "1";
{
  a = "2";
}

escreva(a); // exibe 2
```

```js
var a = "1";
{
  var a = "2";
  escreva(a); // exibe 2
}

escreva(a); // exibe 1
```
