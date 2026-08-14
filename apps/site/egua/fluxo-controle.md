---
description: Estruturas de fluxo de controle na linguagem Égua — se/senão, enquanto, para, escolha-caso e tente-pegue-finalmente — com exemplos.
---

# Fluxo de Controle

Controle de fluxo é o que determina a ordem em que as instruções rodam. Na linguagem égua, você tem estruturas para tomar decisões, repetir blocos de código e lidar com erros.

## Valores booleanos

Como em qualquer linguagem, valores booleanos guiam o controle de fluxo. Na linguagem égua, eles são representados pelos termos "verdadeiro" e "falso": uma instrução como `se` só executa quando a condição é verdadeira. Por exemplo, `se(verdadeiro){}` executa, mas `se(falso){}` não.

## Comparação de igualdade

Para comparar se dois objetos são iguais na linguagem égua, é necessário que sejam do mesmo tipo e tenham o mesmo valor. Essa comparação é avaliada como "verdadeira" se os valores forem iguais, e "falsa" caso contrário. Veja alguns exemplos:

```js
1 == 1; // Verdadeiro
"1" == "1"; // Verdadeiro
nulo == nulo; // Verdadeiro

"1" == "2"; // Falso
1 == 2; // Falso
1 == "1"; // Falso
```

A comparação é baseada apenas na igualdade dos valores.

## Avaliação da veracidade

Na linguagem égua, todos os tipos de dados, exceto "nulo" e "falso", são avaliados como verdadeiros. Veja alguns exemplos:

```js
{}; // Verdadeiro
1; // Verdadeiro
verdadeiro; // Verdadeiro
[]; // Verdadeiro

1 == '1'; // Falso devido à avaliação de falso
nulo; // Falso
falso; // Falso
```

## Palavras-chave de controle

A linguagem égua possui várias palavras-chave que auxiliam no controle de fluxo:

- `e` - Retorna verdadeiro se ambos os valores forem verdadeiros.
- `ou` - Retorna verdadeiro se pelo menos um dos valores for verdadeiro.
- `em` - Retorna verdadeiro se o valor da esquerda estiver contido no valor da direita.

```js
verdadeiro e verdadeiro; // Verdadeiro
verdadeiro e falso; // Falso

falso ou falso; // Falso
verdadeiro ou falso; // Verdadeiro

'a' em ['b']; // Falso
'b' em ['b']; // Verdadeiro
'c' em 'abc'; // Verdadeiro
'chave' em {'chave': 'valor'};
```

## Se - Senão se - Senão

`se`, `senão se` e `senão` controlam o fluxo condicional. `senão se` e `senão` são opcionais, e você pode encadear quantos `senão se` quiser. A linguagem égua testa as condições em ordem e executa o primeiro bloco cujo `se` (ou `senão se`) for verdadeiro; se nenhum for, executa o `senão`, quando existir.

```js
// Exemplo: Imprime "sim"
se (verdadeiro) {
  escreva('sim');
}

// Exemplo: Imprime "correspondente 2"
var a = 2;
se (a == 1) {
  escreva('correspondente 1');
} senão se (a == 2) {
  escreva('correspondente 2');
} senão {
  escreva('sem valor correspondente');
}

// Exemplo: Imprime "Sem valor correspondente"
var a = 3;
se (a == 1) {
  escreva('correspondente 1');
} senão se (a == 2) {
  escreva('correspondente 2');
} senão {
  escreva('Sem valor correspondente');
}
```

## Enquanto

`enquanto` repete um bloco de código enquanto a condição for verdadeira. A condição é checada antes de cada repetição; se já começar falsa, o bloco nunca roda.

```js
// Exemplo: Loop infinito
enquanto (verdadeiro) {
  escreva("sim");
}
```

## Para

`para` repete um bloco um número definido de vezes, com três partes separadas por ponto e vírgula: inicializador, condição e passo. Todas são opcionais. O inicializador roda uma vez, antes do laço; a condição é checada a cada volta; o passo roda depois de cada execução do corpo.

```js
// Exemplo: Imprime números de 0 a 4
// Inicializador, condição, passo
para (var i = 0; i < 5; i = i + 1) {
  // Corpo
  escreva(i);
}

// Exemplo: Inicializador e passo omitidos
// Imprime infinitamente porque a condição é sempre verdadeira
para (; verdadeiro; ) {
  escreva("sim");
}
```

## Faça - Enquanto

`faça - enquanto` executa o bloco pelo menos uma vez antes de checar a condição. Se a condição for verdadeira, repete; se for falsa, para.

```js
// Exemplo: "sim" é escrito uma vez
faça {
  escreva("sim");
} enquanto (falso);

// Exemplo: Imprime números de 0 a 4
var i = 0;
faça {
  escreva(i);
  i = i + 1;
} enquanto (i < 5);
```

## Escolha - Caso

`escolha` compara uma expressão com os valores de cada `caso`, um por um. Quando encontra correspondência, executa aquele bloco; se nenhum bate, executa o `padrão`, quando existir.

```js
// Exemplo: Imprime "correspondente à opção 2"
escolha (1) {
  caso "1":
    escreva("correspondente à opção 1");

  caso 1:
    escreva("correspondente à opção 2");

  padrão:
    escreva("Sem opção correspondente");
}

// Exemplo: Imprime "Sem opção correspondente"
escolha (2) {
  caso "1":
    escreva("correspondente à opção 1");

  caso 1:
    escreva("correspondente à opção 2");

  padrão:
    escreva("Sem opção correspondente");
}
```

## Tente - Pegue - Finalmente

`tente - pegue - finalmente` lida com erros durante a execução. O bloco `tente` roda primeiro; se der erro, o `pegue` (opcional) entra em ação, e o programa não para por causa disso. O `finalmente` (também opcional) roda por último, sempre.

```js
// Exemplo: Imprime "sucesso" e "pronto"
tente {
  escreva("sucesso");
} pegue {
  escreva("pegue");
} finalmente {
  escreva("pronto");
}

// Exemplo: Imprime "captura" e "pronto"
tente {
  // Lança um erro
  1 > "1";

  escreva("sucesso");
} pegue {
  escreva("captura");
} finalmente {
  escreva("pronto");
}
```
