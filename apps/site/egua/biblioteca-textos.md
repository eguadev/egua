---
description: Biblioteca textos da linguagem Égua — busca, substituição, formatação e manipulação de textos, com exemplos de código.
---

# Biblioteca textos

A biblioteca `textos` fornece funções para manipular textos. Para usá-la, importe-a primeiro:

```js
var textos = importar("textos");
```

## Constantes

- `textos.letras_minúsculas` — todas as letras minúsculas de a a z.
- `textos.letras_maiúsculas` — todas as letras maiúsculas de A a Z.
- `textos.letras` — todas as letras, minúsculas e maiúsculas.
- `textos.dígitos` — os dígitos de 0 a 9.
- `textos.pontuações` — os caracteres de pontuação comuns.

```js
escreva(textos.letras_minúsculas);
// Saída: abcdefghijklmnopqrstuvwxyz
```

## maiúsculo

`textos.maiúsculo(texto)` converte o texto para maiúsculo.

```js
escreva(textos.maiúsculo("égua"));
// Saída: ÉGUA
```

## minúsculo

`textos.minúsculo(texto)` converte o texto para minúsculo.

```js
escreva(textos.minúsculo("ÉGUA"));
// Saída: égua
```

## contém

`textos.contém(texto, subtexto)` retorna `verdadeiro` se `texto` contém `subtexto`.

```js
escreva(textos.contém("linguagem égua", "égua"));
// Saída: verdadeiro
```

## formate

`textos.formate(texto, ...argumentos)` substitui cada ocorrência de `{}` no texto pelo argumento correspondente, na ordem.

```js
escreva(textos.formate("Olá, {}! Você tem {} anos.", "Ana", 30));
// Saída: Olá, Ana! Você tem 30 anos.
```

## dividir

`textos.dividir(texto, separador, limite)` divide o texto em um vetor de subtextos usando `separador`. O parâmetro `limite` é opcional.

```js
escreva(textos.dividir("um,dois,três", ","));
// Saída: [um, dois, três]
```

## tamanho

`textos.tamanho(texto)` retorna o número de caracteres do texto. Equivalente à função global `tamanho()` quando aplicada a um texto.

```js
escreva(textos.tamanho("égua"));
// Saída: 4
```

## repita

`textos.repita(texto, contador)` repete o texto `contador` vezes.

```js
escreva(textos.repita("ab", 3));
// Saída: ababab
```

## substituir

`textos.substituir(texto, texto_buscado, novo_texto)` substitui a **primeira** ocorrência de `texto_buscado` por `novo_texto`. A busca é sempre literal (não usa expressão regular).

```js
escreva(textos.substituir("banana", "a", "o"));
// Saída: bonana
```

## substituir_tudo

`textos.substituir_tudo(texto, texto_buscado, novo_texto)` substitui **todas** as ocorrências de `texto_buscado` por `novo_texto`.

```js
escreva(textos.substituir_tudo("banana", "a", "o"));
// Saída: bonono
```

## busca

`textos.busca(texto, texto_buscado)` retorna o índice da primeira ocorrência de `texto_buscado` no texto, ou `-1` caso não seja encontrado. A busca é sempre literal (não usa expressão regular, então caracteres como `.`, `(` e `)` são tratados como texto comum).

```js
escreva(textos.busca("linguagem égua", "égua"));
// Saída: 10
```

## apara

`textos.apara(texto)` remove espaços em branco do começo e do fim do texto.

```js
escreva(textos.apara("  égua  "));
// Saída: égua
```

## caractere_em

`textos.caractere_em(texto, posicao)` retorna o caractere na posição informada (a contagem começa em 0).

```js
escreva(textos.caractere_em("égua", 1));
// Saída: g
```

## código_em

`textos.código_em(texto, posicao)` retorna o código Unicode do caractere na posição informada.

```js
escreva(textos.código_em("A", 0));
// Saída: 65
```

## fatiar

`textos.fatiar(texto, inicio, fim)` retorna a fatia do texto entre as posições `inicio` e `fim` (opcional).

```js
escreva(textos.fatiar("programação", 0, 7));
// Saída: program
```

## começa_com

`textos.começa_com(texto, prefixo)` retorna `verdadeiro` se o texto começa com o prefixo informado.

```js
escreva(textos.começa_com("égua linguagem", "égua"));
// Saída: verdadeiro
```

## termina_com

`textos.termina_com(texto, sufixo)` retorna `verdadeiro` se o texto termina com o sufixo informado.

```js
escreva(textos.termina_com("linguagem égua", "égua"));
// Saída: verdadeiro
```

## preencha_início

`textos.preencha_início(texto, tamanho, preenchimento)` preenche o início do texto com o caractere informado (padrão: espaço) até atingir o tamanho desejado.

```js
escreva(textos.preencha_início("42", 5, "0"));
// Saída: 00042
```

## preencha_fim

`textos.preencha_fim(texto, tamanho, preenchimento)` preenche o fim do texto com o caractere informado (padrão: espaço) até atingir o tamanho desejado.

```js
escreva(textos.preencha_fim("42", 5, "."));
// Saída: 42...
```
