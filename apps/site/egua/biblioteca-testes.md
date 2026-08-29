---
description: Como escrever e executar testes automatizados na linguagem Égua.
---

# Biblioteca de testes

A biblioteca `testes` permite escrever testes automatizados em Égua, organizá-los em conjuntos e gerar um relatório ao final da execução. Quando uma asserção ou um gancho falha, o programa termina com código de saída diferente de zero, útil em integração contínua.

```js
var testes = importar("testes");

testes.descreva("Operações matemáticas", função() {
  testes.teste("soma dois números", função() {
    testes.esperado_que(2 + 2).seja(4);
  });

  testes.teste("resultado é positivo", função() {
    testes.esperado_que(10 > 0).seja_verdadeiro();
  });
});

testes.descreva("Textos", função() {
  testes.teste("compara textos", função() {
    testes.esperado_que("égua").não_seja("cavalo");
  });
});

escreva(testes.resultados());
```

## Organização

`descreva(descrição, função)` declara um conjunto de testes. A descrição deve ser um texto não vazio. Use conjuntos pequenos e focados, por exemplo, um para validações, outro para cálculos e outro para ganchos.

`teste(descrição, função)` declara um caso de teste. Ele deve ficar dentro de um `descreva`, ter uma descrição não vazia e receber uma função. Dentro dela, use `esperado_que(obtido)` e escolha uma das correspondências abaixo.

Os casos e os ganchos são registrados primeiro. A execução de um conjunto começa quando a função de seu `descreva` termina, independentemente da ordem em que os casos e ganchos foram declarados.

`resultados()` retorna o relatório de todos os conjuntos executados desde a chamada anterior e limpa esses resultados. Por isso, normalmente ela deve ser chamada uma única vez, no fim do arquivo.

Uma exceção em um caso reprova somente esse caso; os casos seguintes e os ganchos de limpeza continuam sendo executados. `esperado_que()` só pode ser usado dentro de um caso de teste ou de um gancho.

| Função | Uso |
| --- | --- |
| `descreva(descrição, função)` | Declara um conjunto de testes. |
| `teste(descrição, função)` | Declara um caso dentro do conjunto atual. |
| `esperado_que(obtido)` | Inicia uma asserção sobre um valor. |
| `resultados()` | Retorna e limpa o relatório acumulado. |

## Ganchos

Os ganchos recebem uma função e controlam a preparação e a limpeza dos testes de um conjunto:

```js
testes.descreva("Banco de dados", função() {
  testes.antes_de_tudo(função() {
    // Executado uma vez antes de todos os testes.
  });

  testes.antes_de_cada(função() {
    // Executado antes de cada teste.
  });

  testes.depois_de_cada(função() {
    // Executado depois de cada teste.
  });

  testes.depois_de_tudo(função() {
    // Executado uma vez depois de todos os testes.
  });
});
```

`antes_de_tudo` roda uma vez antes dos casos; `depois_de_tudo`, uma vez depois deles. `antes_de_cada` e `depois_de_cada` rodam ao redor de cada caso. Se a preparação de um caso falhar, o corpo daquele caso não é executado, mas seus ganchos de limpeza continuam rodando.

## Correspondências

Qualquer correspondência pode ser invertida com o modificador `não`:

```js
testes.esperado_que(2).não.seja(3);
testes.esperado_que(falso).não.seja_verdadeiro();
testes.esperado_que([1, 2]).não.seja_objeto([2, 1]);
```

Dois modificadores se anulam, portanto `não.não.seja(valor)` equivale a `seja(valor)`.

### `seja(esperado)`

Compara os valores usando igualdade exata (`Object.is`).

### `não_seja(esperado)`

Verifica se os valores são diferentes usando desigualdade exata.

### `seja_verdadeiro()` e `seja_falso()`

Verificam se o valor obtido é exatamente o booleano `verdadeiro` ou `falso`.

### `não_nulo()`

Verifica se o valor obtido não é `nulo`.

### `seja_próximo(esperado, precisão)`

Compara dois números aceitando uma pequena diferença. A precisão representa o número de casas decimais, deve ser um inteiro não negativo e seu valor padrão é `2`. Os dois valores devem ser números.

```js
testes.esperado_que(1.004).seja_próximo(1, 2);
```

### `seja_objeto(esperado)`

Compara recursivamente o conteúdo de vetores e dicionários. A ordem das chaves de um dicionário não altera o resultado.

```js
testes.esperado_que([1, [2, 3]])
  .seja_objeto([1, [2, 3]]);

testes.esperado_que({"nome": "Égua", "versão": 1})
  .seja_objeto({"versão": 1, "nome": "Égua"});
```

## Relatório e integração contínua

Cada conjunto informa se passou ou falhou, seguido pela quantidade de casos e asserções. Em uma falha, o relatório mostra a correspondência, o valor esperado e o valor obtido.