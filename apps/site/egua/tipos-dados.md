---
description: Os tipos de dados da linguagem Égua — texto, números, listas, dicionários, nulo e booleanos — explicados com exemplos de código.
---

# Tipos de dados
Tipos de dados definem como a informação é guardada e manipulada num programa. Todo valor tem um tipo.

Um tipo de dado define quais operações fazem sentido para aquele valor e como ele é representado na memória do computador.

Veja os tipos de dados da linguagem égua.

## Texto

Texto é uma sequência de caracteres, delimitada por aspas duplas (`" "`) ou aspas simples (`' '`). Dá para pegar um caractere específico usando colchetes com a posição desejada, começando em 0. Um índice negativo conta a partir do fim: `-1` é o último caractere, `-2` o penúltimo, e assim por diante.

Exemplo:

```js
var texto = "abc";
var texto2 = 'abc';

escreva("abc"[0]); // exibe "a" (primeiro caractere)
escreva(texto[-1]); // exibe "c" (último caractere)
```


## Números

Os números podem ser inteiros ou de ponto flutuante (números com casas decimais). Eles são utilizados para representar valores numéricos em um programa.

Exemplo:

```js
var número_inteiro = 3;

var número_flutuante = 8.5;
```

## Listas

Listas (também chamadas de vetores) são coleções ordenadas de elementos, declaradas entre colchetes (`[]`) e com os elementos separados por vírgula. Assim como no texto, dá para acessar um elemento pela posição, começando em 0.

```js
var vetor = [1, "2"];
var vetor_vazio = [];

escreva([1, "2"][0]); // exibe 1
escreva(vetor[2]); // sinaliza um erro por estar fora do tamanho do vetor
```

Ler uma posição que não existe sinaliza um erro, mas escrever numa posição além do fim do vetor funciona: a égua completa os espaços vazios com `nulo`.

```js
var vetor = [1, "2"];
vetor[1] = 3;
escreva(vetor); // exibe [1, 3] (troca o valor na posição 1)

var vetor = [1, "2"];
vetor[2] = 3;
escreva(vetor); // exibe [1, 2, 3] (posição seguinte, o vetor cresce em 1)

var vetor = [1, "2"];
vetor[3] = 3;
escreva(vetor); // exibe [1, 2, nulo, 3] (pula a posição 2, que vira nulo)
```

## Dicionários

Dicionários guardam valores associados a chaves, em pares chave-valor. Diferente da lista, que usa posições numéricas, o dicionário usa as chaves que você escolher para acessar cada valor.

Exemplo:

```js
var dicionario = {}; // dicionário vazio
dicionario = {'a': 'b'}; // dicionário com a chave 'a' e valor 'b'
escreva(dicionario['a']); // exibe 'b'

var dicionario = {};
dicionario['a'] = 'b'; // adiciona a chave 'a' com valor 'b'
var dicionario = {'a': 1};

dicionario['a'] = 2; // troca o valor da chave 'a' para 2
escreva(dicionario['a']);
```

## Nulo

O valor "nulo" representa uma estrutura de dados vazia, sem nenhum valor atribuído. É utilizado quando uma variável não possui um valor específico.

Exemplo:

```js
var variável;
escreva(variável); // exibe "nulo" pois não possui valor atribuído

var variável_nula = nulo; // também pode ser atribuído explicitamente o valor "nulo"
```

## Booleanos

Os valores booleanos representam a lógica verdadeiro ou falso. Eles são utilizados para expressar condições ou resultados de comparações.

Exemplo:

```js
var variável1 = verdadeiro;
var variável0 = falso;
```
