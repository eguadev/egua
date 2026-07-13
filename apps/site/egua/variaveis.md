# Variáveis

As variáveis são uma das primeiras estruturas de dados que todo programador aprende ao começar a programar. Elas são caracterizadas por terem um nome e armazenarem valores em memória.

Para declarar uma variável, utilizamos a palavra-chave `var` seguida pelo nome desejado e, opcionalmente, podemos atribuir um valor inicial.

Exemplo de declaração de uma variável com valor inicial atribuído:

```js
var variavel = "1";
```

Uma das características das variáveis é que seus valores podem ser alterados ao longo do código sem a necessidade de sinalização especial.

Exemplo de alteração de valor de uma variável:

```js
var a = "1";
a = "2";
escreva(a); // exibe 2
```

No entanto, é importante ter em mente que as variáveis têm escopo, que é o contexto em que elas são criadas e podem ser utilizadas.

Escopo é o contexto em que uma variável é definida e pode ser acessada em um programa. O escopo determina onde uma variável ou função é visível e utilizável. Existem escopos global e local. No escopo global, as variáveis podem ser acessadas de qualquer parte do programa. No escopo local, elas só podem ser acessadas dentro do bloco onde foram declaradas. Entender o escopo é importante para organizar e controlar o acesso aos dados em um programa, evitando conflitos e vazamento de variáveis. Em égua escopo é definido por `{ }`

Variáveis declaradas no escopo geral podem ser acessadas por escopos internos, mas o contrário não é possível.

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

Uma característica interessante é que o escopo interno pode alterar variáveis do escopo externo sem a necessidade de uma nova declaração.

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

Entender o conceito de variáveis e escopo é fundamental para o desenvolvimento de programas mais complexos. À medida que você avança na sua jornada de programação, outros tipos de variáveis e escopos também podem ser explorados.