# Tipos de dados
Ao iniciar sua jornada na programação, você será apresentado a um conceito fundamental: os tipos de dados. Os tipos de dados desempenham um papel essencial em qualquer linguagem de programação, pois determinam como a informação é armazenada e manipulada em um programa.

Em termos simples, um tipo de dado é uma classificação atribuída a um valor ou variável que define as operações que podem ser realizadas com ele e a maneira como ele é representado na memória do computador.

À medida que você avança em sua jornada de aprendizado da programação, explorará uma variedade de tipos de dados e aprenderá a manipulá-los de maneiras cada vez mais sofisticadas. Os tipos de dados são a base para construir programas poderosos e eficientes, e dominar seu uso é essencial para se tornar um programador habilidoso.

Abaixo você aprenderá os tipos de dados em linguagem égua.

## Texto

O texto é utilizado para representar sequências de caracteres e é delimitado por aspas duplas (`" "`) ou aspas simples (`' '`). Podemos acessar caracteres individuais em uma string utilizando a notação de índice.

Exemplo:

```js
var texto = "abc";
var texto2 = 'abc';

escreva("abc"[0]); // exibe "a"
escreva(texto[-1]); // exibe "c"
```


## Números

Os números podem ser inteiros ou de ponto flutuante (números com casas decimais). Eles são utilizados para representar valores numéricos em um programa.

Exemplo:

```js
var numeroInteiro = 3;

var numeroFlutuante = 8.5;
```

## Listas

As listas são coleções ordenadas de elementos. Elas são declaradas entre colchetes (`[]`) e os elementos são separados por vírgulas. Podemos acessar os elementos de uma lista utilizando a notação de índice.

Exemplo:

```js
var vetor = [1, "2"];
var vetorVazio = [];

escreva([1, "2"][0]); // exibe 1
escreva(vetor[2]); // sinaliza um erro por estar fora do tamanho do vetor

var vetor = [1, "2"];
vetor[1] = 3;
escreva(vetor); // exibe [1, 3]

var vetor = [1, "2"];
vetor[2] = 3;
escreva(vetor); // exibe [1, 2, 3]

var vetor = [1, "2"];
vetor[3] = 3;
escreva(vetor); // exibe [1, 2, nulo, 3]
```

## Dicionários

Os dicionários são estruturas de dados que associam valores a chaves únicas. Eles são úteis quando precisamos armazenar informações em pares chave-valor. Cada chave é única e mapeada para um valor correspondente.

Exemplo:

```js
var dicionario = {}; // declaração de dicionário vazio
dicionario = {'a': 'b'}; // atribuição de um dicionário à variável
escreva(dicionario['a']); // exibe 'b'

var dicionario = {};
dicionario['a'] = 'b'; // retorna um novo dicionário {'a': 'b'}
var dicionario = {'a': 1};

dicionario['a'] = 2; // retorna um novo dicionário {'a': 2}
escreva(dicionario['a']);
```

## Nulo

O valor "nulo" representa uma estrutura de dados vazia, sem nenhum valor atribuído. É utilizado quando uma variável não possui um valor específico.

Exemplo:

```js
var variavel;
escreva(variavel); // exibe "nulo" pois não possui valor atribuído

var variavelNula = nulo; // também pode ser atribuído explicitamente o valor "nulo"
```

## Booleanos

Os valores booleanos representam a lógica verdadeiro ou falso. Eles são utilizados para expressar condições ou resultados de comparações.

Exemplo:

```js
var variavel1 = verdadeiro;
var variavel0 = falso;
```

Compreender e utilizar corretamente esses tipos de dados é fundamental na programação, pois eles são os blocos de construção básicos para o desenvolvimento de programas mais complexos.