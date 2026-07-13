# Funções

As funções são blocos de código que podem ser chamados e executados em diferentes partes de um programa. Elas ajudam a organizar o código, evitar repetições e facilitar a reutilização de trechos específicos de lógica.

Existem dois tipos de funções em égua: funções padrão e funções anônimas.

## Função Padrão

As funções padrão podem ser declaradas usando a palavra-chave `função`, seguida por um nome para a função, uma lista de parâmetros entre parênteses (cada elemento separado por vírgula) e um bloco de código delimitado por chaves. Veja um exemplo:

```js
função saudação(nome) {
  escreva("Olá, " + nome + "!");
}

saudação("Égua"); // Saída: Olá, Égua!
```

Nesse exemplo, declaramos a função `saudação` com um parâmetro `nome`. Dentro da função, usamos a instrução `escreva` para exibir uma mensagem de saudação, concatenando o nome passado como argumento.

## Função Anônima

As funções anônimas são aquelas que não possuem um nome especificado. Elas são frequentemente usadas como variáveis ou passadas como argumentos para outras funções. Veja um exemplo do uso de uma função anônima na função `mapear()`:

```js
var resultado = mapear([1, 2, 3], função(item) {
  retorna item * 2;
});

escreva(resultado); // Saída: [2, 4, 6]
```

Nesse exemplo, usamos uma função anônima como argumento para a função `mapear()`. Essa função anônima recebe um parâmetro `item` e retorna o valor do item multiplicado por 2. A função `mapear()` aplica essa função anônima a cada elemento do vetor e retorna um novo vetor com os resultados.

## Chamada de Função

Para executar uma função, é necessário realizar a chamada da função. A chamada de função envolve o uso do nome da função seguido por parênteses, e pode incluir argumentos, se a função esperar parâmetros. Veja um exemplo:

```js
função saudação(nome) {
  escreva("Olá, " + nome + "!");
}

saudação("Égua"); // Saída: Olá, Égua!
```

Nesse exemplo, chamamos a função `saudação` passando a string `"Égua"` como argumento. A função é executada, exibindo a mensagem "Olá, Égua!".

## Retorno de Função

Uma função pode retornar um valor utilizando a palavra-chave `retorna`. Isso permite que o resultado da função seja utilizado em outras partes do programa. Veja exemplos de funções com retorno:

```js
função soma(a, b) {
  retorna a + b;
}

var resultado = soma(2, 3);
escreva(resultado); // Saída: 5
```

Nesse exemplo, a função `soma` recebe dois parâmetros `a` e `b` e retorna a soma dos valores. Ao chamar a função `soma(2, 3)`, o resultado é retornado e atribuído à variável `resultado`, que em seguida é exibida.

Uma função também pode ter um fluxo de execução interrompido por uma instrução `retorna` sem valor. Isso encerra a execução da função imediatamente. Veja um exemplo:

```js
função exibeA() {
  escreva("A");
  retorna;
  escreva("B");
}

exibeA(); // Saída: A
```

Nesse exemplo, a função `exibeA` exibe a letra "A" e, em seguida, a instrução `retorna` interrompe a execução da função, fazendo com que a linha `escreva("B")` nunca seja alcançada.