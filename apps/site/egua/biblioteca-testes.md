---
description: Como escrever e executar testes automatizados na linguagem Égua.
---

# Biblioteca de testes

A biblioteca `testes` permite verificar automaticamente se um programa está se comportando como esperado.

Um teste normalmente executa uma operação, observa o resultado e compara esse resultado com o valor esperado. Isso é útil para encontrar erros durante o desenvolvimento e para garantir que alterações no código não quebrem comportamentos que já funcionavam.

```js
var testes = importar("testes");

var descreva = testes.descreva;
var teste = testes.teste;
var esperado_que = testes.esperado_que;
var resultados = testes.resultados;

descreva("Calculadora", função() {
  teste("soma dois números", função() {
    esperado_que(2 + 3).seja(5);
  });

  teste("compara números decimais", função() {
    esperado_que(0.1 + 0.2).seja_próximo(0.3);
  });

  teste("verifica uma condição", função() {
    var idade = 18;

    esperado_que(idade >= 18).seja_verdadeiro();
  });
});

descreva("Coleções", função() {
  teste("compara vetores", função() {
    esperado_que([1, 2, 3]).seja_objeto([1, 2, 3]);
  });

  teste("compara dicionários", função() {
    var usuário = {
      "nome": "Ana",
      "idade": 20
    };

    esperado_que(usuário).seja_objeto({
      "idade": 20,
      "nome": "Ana"
    });
  });
});

escreva(resultados());
```

Nesse exemplo, `descreva` agrupa testes relacionados, `teste` define um comportamento que queremos verificar e `esperado_que` inicia uma comparação.

## Organização

`descreva(descrição, função)` cria um conjunto de testes relacionados. Um programa pode possuir vários conjuntos, por exemplo um para operações matemáticas, outro para validações e outro para manipulação de textos.

`teste(descrição, função)` declara um caso de teste dentro do conjunto atual.

Dentro de cada caso, `esperado_que(obtido)` recebe o valor produzido pelo programa. Em seguida, uma correspondência informa como esse valor deve ser comparado.

```js
teste("soma dois números", função() {
  var resultado = 4 + 6;

  esperado_que(resultado).seja(10);
});
```

Os casos e ganchos são registrados durante a execução da função passada para `descreva`. Quando essa função termina, o conjunto de testes é executado.

Se um caso lançar uma exceção, somente aquele caso falha. Os testes seguintes continuam sendo executados e os ganchos de limpeza ainda são chamados.

`resultados()` retorna o relatório dos conjuntos executados desde sua última chamada e limpa os resultados armazenados. Normalmente, ele é chamado uma única vez no final do arquivo.

| Função | Uso |
| --- | --- |
| `descreva(descrição, função)` | Agrupa testes relacionados. |
| `teste(descrição, função)` | Declara um caso de teste. |
| `esperado_que(obtido)` | Inicia uma comparação. |
| `resultados()` | Retorna e limpa o relatório dos testes. |

## Ganchos

Alguns testes precisam preparar valores antes da execução ou realizar alguma limpeza depois dela. Para isso, a biblioteca oferece ganchos.

```js
var contador = 0;

descreva("Contador", função() {
  testes.antes_de_cada(função() {
    contador = 0;
  });

  teste("incrementa o contador", função() {
    contador = contador + 1;

    esperado_que(contador).seja(1);
  });

  teste("cada teste começa com contador zerado", função() {
    esperado_que(contador).seja(0);
  });
});
```

`antes_de_tudo` executa uma vez antes de todos os casos.

`antes_de_cada` executa antes de cada caso.

`depois_de_cada` executa depois de cada caso.

`depois_de_tudo` executa uma vez depois de todos os casos.

Se a preparação de um caso falhar, o corpo daquele teste não é executado, mas seus ganchos de limpeza continuam sendo chamados.

## Correspondências

As correspondências descrevem o resultado esperado de um teste.

### `seja(esperado)`

Compara dois valores usando igualdade exata.

```js
esperado_que(2 + 2).seja(4);
```

### `não_seja(esperado)`

Verifica se dois valores são diferentes.

```js
esperado_que("Égua").não_seja("Python");
```

### `seja_verdadeiro()` e `seja_falso()`

Verificam valores booleanos.

```js
esperado_que(10 > 5).seja_verdadeiro();
esperado_que(10 < 5).seja_falso();
```

### `não_nulo()`

Verifica se um valor não é `nulo`.

```js
var nome = "Ana";

esperado_que(nome).não_nulo();
```

### `seja_próximo(esperado, precisão)`

Compara números permitindo uma pequena diferença.

Isso é especialmente útil com números decimais, pois algumas operações podem produzir pequenas diferenças de precisão.

```js
esperado_que(0.1 + 0.2).seja_próximo(0.3);
esperado_que(1.004).seja_próximo(1, 2);
```

A precisão representa o número de casas decimais consideradas e deve ser um inteiro não negativo. O valor padrão é `2`.

### `seja_objeto(esperado)`

Compara recursivamente vetores e dicionários.

```js
esperado_que([1, [2, 3]])
  .seja_objeto([1, [2, 3]]);

esperado_que({
  "nome": "Égua",
  "versão": 1
}).seja_objeto({
  "versão": 1,
  "nome": "Égua"
});
```

A ordem das chaves de um dicionário não altera o resultado.

## Negando uma correspondência

Também é possível inverter uma correspondência usando o modificador `não`.

```js
esperado_que(2).não.seja(3);
esperado_que(falso).não.seja_verdadeiro();
esperado_que([1, 2]).não.seja_objeto([2, 1]);
```

Dois modificadores `não` se anulam.

```js
esperado_que(5).não.não.seja(5);
```

## Relatório

Ao final da execução, `resultados()` gera um relatório com os conjuntos executados, os casos que passaram ou falharam e a quantidade de asserções realizadas.

Quando uma comparação falha, o relatório mostra o que era esperado e o valor realmente obtido.

```js
escreva(resultados());
```

Se algum teste ou gancho falhar, o programa termina com um código de saída diferente de zero. Isso permite executar testes automaticamente em ferramentas de integração contínua.