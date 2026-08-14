---
description: Funções integradas da linguagem Égua, como aleatório_entre, mapear, ordenar e tamanho, prontas para usar em seus programas.
---

# Funções Integradas

As funções integradas da linguagem égua estão sempre disponíveis, sem precisar de `importar()`.

## Escreva

A instrução `escreva(valor)` exibe um valor na tela (saída padrão).

Exemplo:
```js
escreva("Olá, Mundo!");
// Saída: Olá, Mundo!
```

## Aleatório

A função `aleatório()` retorna um número aleatório entre 0 e 1.

Exemplo:
```js
var número_aleatório = aleatório();

escreva(número_aleatório);
// Saída: 0.8540051495195808
```

## Aleatório Entre

A função `aleatório_entre(mínimo, máximo)` retorna um número aleatório entre os valores `mínimo` e `máximo`. O valor gerado nunca será igual ao número máximo passado para a função, sempre será um a menos.

Exemplo:
```js
var número_aleatório = aleatório_entre(1, 9);

escreva(número_aleatório);
// Saída: um valor entre 1 e 8
```

## Inteiro

A função `inteiro(valor)` converte um número flutuante ou texto (que não contenha letras) em um número inteiro.

Exemplo:
```js
var teste_texto = "111";

escreva(111 + inteiro(teste_texto));
// Saída: 222
```

## Para Cada

A função `para_cada(vetor, funcao)` percorre um vetor e executa uma função para cada item, sem retornar nenhum valor. Use quando quiser apenas executar uma ação para cada elemento (como imprimir), não transformar o vetor.

Exemplo:
```js
var números = [1, 2, 3];

para_cada(números, função(valor) {
  escreva(valor);
});
// Saída: 1
//        2
//        3
```

## Mapear

A função `mapear(vetor, funcao)` percorre um vetor e executa uma função para cada item desse vetor. Ela retorna um novo vetor contendo os resultados das chamadas da função para cada elemento do vetor original.

Exemplo:
```js
var números = [1, 2, 3];

var fn = função(valor) {
  retorna valor * 2;
};

escreva(mapear(números, fn));
// Saída: [2, 4, 6]
```

## Filtrar

A função `filtrar(vetor, funcao)` percorre um vetor e retorna um novo vetor contendo apenas os elementos para os quais a função passada retornou um valor verdadeiro.

Exemplo:
```js
var números = [1, 2, 3, 4];

var fn = função(valor) {
  retorna valor % 2 == 0;
};

escreva(filtrar(números, fn));
// Saída: [2, 4]
```

## Reduzir

A função `reduzir(vetor, funcao, valor_inicial)` percorre um vetor acumulando um resultado, chamando `funcao(acumulado, valor)` para cada elemento. O parâmetro `valor_inicial` é opcional; se não for informado, o primeiro elemento do vetor é usado como valor inicial.

Exemplo:
```js
var números = [1, 2, 3];

var fn = função(total, valor) {
  retorna total + valor;
};

escreva(reduzir(números, fn, 0));
// Saída: 6
```

## Encontrar

A função `encontrar(vetor, funcao)` retorna o primeiro elemento do vetor para o qual a função passada retorna um valor verdadeiro, ou `nulo` se nenhum elemento corresponder.

Exemplo:
```js
var números = [1, 2, 3];

var fn = função(valor) {
  retorna valor > 1;
};

escreva(encontrar(números, fn));
// Saída: 2
```

## Encontrar Índice

A função `encontrar_índice(vetor, funcao)` retorna o índice do primeiro elemento do vetor para o qual a função passada retorna um valor verdadeiro, ou `-1` se nenhum elemento corresponder.

Exemplo:
```js
var números = [1, 2, 3];

var fn = função(valor) {
  retorna valor == 3;
};

escreva(encontrar_índice(números, fn));
// Saída: 2
```

## Encontrar Último

A função `encontrar_último(vetor, funcao)` retorna o último elemento do vetor para o qual a função passada retorna um valor verdadeiro, ou `nulo` se nenhum elemento corresponder.

Exemplo:
```js
var números = [1, 2, 3];

var fn = função(valor) {
  retorna valor > 1;
};

escreva(encontrar_último(números, fn));
// Saída: 3
```

## Encontrar Último Índice

A função `encontrar_último_índice(vetor, funcao)` retorna o índice do último elemento do vetor para o qual a função passada retorna um valor verdadeiro, ou `-1` se nenhum elemento corresponder.

Exemplo:
```js
var números = [1, 2, 3];

var fn = função(valor) {
  retorna valor > 1;
};

escreva(encontrar_último_índice(números, fn));
// Saída: 2
```

## Incluído

A função `incluído(vetor, valor)` retorna `verdadeiro` se `valor` existir no vetor (comparação de tipo e valor iguais), ou `falso` caso contrário.

Exemplo:
```js
var números = [1, 2, 3];

escreva(incluído(números, 3));
// Saída: verdadeiro

escreva(incluído(números, "3"));
// Saída: falso (tipos diferentes)
```

## Algum

A função `algum(vetor, funcao)` retorna `verdadeiro` se pelo menos um elemento do vetor fizer a função passada retornar um valor verdadeiro.

Exemplo:
```js
var números = [1, 2, 3];

var fn = função(valor) {
  retorna valor > 2;
};

escreva(algum(números, fn));
// Saída: verdadeiro
```

## Todos

A função `todos(vetor, funcao)` retorna `verdadeiro` somente se todos os elementos do vetor fizerem a função passada retornar um valor verdadeiro.

Exemplo:
```js
var números = [1, 2, 3];

var fn = função(valor) {
  retorna valor >= 1;
};

escreva(todos(números, fn));
// Saída: verdadeiro
```

## Ordenar

A função `ordenar(vetor)` é usada para ordenar os valores de um vetor em ordem crescente. Ela retorna o vetor ordenado (o mesmo vetor recebido é alterado). A função `ordenar()` só aceita vetores como entrada.

Exemplo:
```js
var vetor_nomes = ["Lucas", "Heictor", "Julio", "Brennus", "Arleson"];
var vetor_numeros = [1, 2, 6, 7, 3, 4];

vetor_nomes = ordenar(vetor_nomes);
escreva(vetor_nomes);
// Saída: Arleson, Brennus, Heictor, Julio, Lucas

vetor_numeros = ordenar(vetor_numeros);
escreva(vetor_numeros);
// Saída: 1, 2, 3, 4, 6, 7
```

## Real

A função `real(valor)` converte um número inteiro ou texto (que não contenha letras) em um número flutuante.

Exemplo:
```js
var teste_texto = "504.69";

escreva(0.01 + real(teste_texto));
// Saída: 504.7
```

## Tamanho

A função `tamanho(valor)` retorna o número de elementos que compõem um vetor ou o tamanho de um texto.

Exemplo:
```js
var vetor_nomes = ["Lucas", "Heictor", "Julio", "Brennus", "Arleson"];
var texto_exemplo = "Égua";

escreva(tamanho(vetor_nomes));
// Saída: 5

escreva(tamanho(texto_exemplo));
// Saída: 4
```

## Texto

A função `texto(valor)` converte um valor (número, booleano, `nulo` ou dicionário) em texto.

Exemplo:
```js
var teste_numero = 123;

escreva("123" + texto(teste_numero));
// Saída: 123123
```

Para matemática avançada, manipulação de textos, datas e requisições HTTP, veja as [Bibliotecas](/egua/bibliotecas).
