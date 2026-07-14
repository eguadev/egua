# Fluxo de Controle

A programação envolve o controle de fluxo, que determina a ordem em que as instruções são executadas em um programa. A linguagem de programação égua oferece uma variedade de opções de controle de fluxo que permitem tomar decisões, repetir a execução de blocos de código e lidar com erros.

## Valores booleanos

No controle de fluxo de todas as linguagens de programação, os valores booleanos desempenham um papel importante. Em égua, os valores booleanos são representados pelos termos "verdadeiro" e "falso". O controle de fluxo, como a instrução `se`, será executado somente se a condição for avaliada como verdadeira. Por exemplo, `se(verdadeiro){}` será executado porque a condição é verdadeira, enquanto `se(falso){}` não será executado porque a condição é falsa.

## Comparação de igualdade

Para comparar se dois objetos são iguais em Égua, é necessário que sejam do mesmo tipo e tenham o mesmo valor. Essa comparação é avaliada como "verdadeira" se os valores forem iguais, e "falsa" caso contrário. Veja alguns exemplos:

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

Em égua, todos os tipos de dados, exceto "nulo" e "falso", são avaliados como verdadeiros. Veja alguns exemplos:

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

A linguagem Égua fornece as instruções `se`, `senão se` e `senão` para controle de fluxo condicional eficiente. As instruções `senão se` e `senão` são opcionais e devem ser anexadas à instrução `se`. Você pode ter apenas uma instrução `senão se` adicional. Cada instrução é seguida por um bloco de código que será executado com base na condição da instrução. O bloco de código de uma instrução `se` é executado se a condição for avaliada como verdadeira. Caso contrário, as instruções `senão se` serão avaliadas em ordem, e se qualquer uma das condições for verdadeira, o bloco de código correspondente será executado. Somente um bloco `senão se` pode ser executado. Se a instrução `se` não for executada e nenhuma instrução `senão se` for executada, o bloco `senão` será executado, se fornecido.

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

// Exemplo: Imprime "sem comparação"
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

A instrução `enquanto` em Égua é usada para criar um loop que executa repetidamente um bloco de código enquanto uma condição específica for avaliada como verdadeira. Antes de cada execução do bloco de código, a condição é verificada para determinar se o bloco deve continuar a ser executado. Se a condição for falsa no início, o bloco nunca será executado.

```js
// Exemplo: Loop infinito
enquanto (verdadeiro) {
  escreva("sim");
}
```

## Para

A instrução `para` é usada para criar um laço que executa um bloco de código um número específico de vezes. Ela possui quatro partes: um inicializador, uma condição, um passo e um corpo. Qualquer uma dessas partes pode ser deixada em branco. O inicializador é executado antes do laço `para`, a condição decide se o corpo deve ser executado, a passo é executada após cada execução do corpo e o corpo contém as instruções a serem repetidas. A instrução `para` é definida com o inicializador, a condição e a passo separados por ponto e vírgula, seguidos pelo bloco de código do corpo.

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

A instrução `faça - enquanto` é usada para criar um laço que executa um bloco de código pelo menos uma vez e continua a executá-lo enquanto uma condição específica for avaliada como verdadeira. Primeiro, o bloco de código é executado e, em seguida, a condição é verificada. Se a condição for verdadeira, o bloco de código será executado novamente. Se a condição for falsa, o loop será encerrado.

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

As instruções `escolha` e `caso` são usadas para encadear várias condições e executar diferentes blocos de código com base em uma expressão de seleção. A expressão de seleção é avaliada e comparada aos valores de cada caso. Se houver uma correspondência, o bloco de código correspondente ao caso será executado. Se nenhum caso corresponder, o bloco de código padrão será executado, se fornecido.

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

A estrutura `tente - pegue - finalmente` é usada para lidar com exceções ou erros que podem ocorrer durante a execução do código. O bloco `pegue` e o bloco `finalmente` são opcionais. Primeiro, o bloco `tente` é executado e, se ocorrer algum erro durante a execução, ele será capturado e o bloco `pegue` será executado. O bloco `tente` garante que os erros não interrompam o programa. Após a tentativa e, se fornecido, a execução do bloco `pegue`, o bloco `finalmente` é executado.

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

Essas são as principais instruções de controle de fluxo em Égua. Com o entendimento dessas instruções, você pode criar programas mais complexos e controlar o fluxo de execução de maneira eficiente.