# Funções Integradas

As funções integradas da linguagem égua são ferramentas poderosas que podem ser usadas para realizar tarefas específicas. Aqui estão algumas funções internas comuns e suas descrições:

## Aleatório

A função `aleatorio()` retorna um número aleatório entre 0 e 1.

Exemplo:
```js
var numeroAleatorio = aleatorio();

escreva(numeroAleatorio);
// Saída: 0.8540051495195808
```

## Aleatório Entre

A função `aleatorioEntre(minimo, maximo)` retorna um número aleatório entre os valores `minimo` e `maximo`. O valor gerado nunca será igual ao número máximo passado para a função, sempre será um a menos.

Exemplo:
```js
var numeroAleatorio = aleatorioEntre(1, 9);

escreva(numeroAleatorio);
// Saída: um valor entre 1 e 8
```

## Inteiro

A função `inteiro(valor)` converte um número flutuante ou texto (que não contenha letras) em um número inteiro.

Exemplo:
```js
var testeTexto = "111";

escreva(111 + inteiro(testeTexto));
// Saída: 222
```

## Mapear

A função `mapear(vetor, funcao)` percorre um vetor e executa uma função para cada item desse vetor. Ela retorna um novo vetor contendo os resultados das chamadas da função para cada elemento do vetor original.

Exemplo:
```js
var array = [1, 2, 3];

var fn = função(valor) {
  retorna valor * 2;
};

escreva(mapear(array, fn));
// Saída: [2, 4, 6]
```

## Ordenar

A função `ordenar(vetor)` é usada para ordenar os valores de um vetor em ordem crescente. Ela retorna o vetor ordenado. A função `ordenar()` só aceita vetores como entrada.

Exemplo:
```js
var vetorNomes = ["Lucas", "Heictor", "Julio", "Brennus", "Arleson"];
var vetorNumeros = [1, 2, 6, 7, 3, 4];

vetorNomes = ordenar(vetorNomes);
escreva(vetorNomes);
// Saída: Arleson, Brennus, Heictor, Julio, Lucas

vetorNumeros = ordenar(vetorNumeros);
escreva(vetorNumeros);
// Saída: 1, 2, 3, 4, 6, 7
```

## Real

A função `real(valor)` converte um número inteiro ou texto (que não contenha letras) em um número flutuante.

Exemplo:
```js
var testeTexto = "504.69";

escreva(0.01 + real(testeTexto));
// Saída: 504.7
```

## Tamanho

A função `tamanho(valor)` retorna o número de elementos que compõem um vetor ou o tamanho de um texto.

Exemplo:
```js
var vetorNomes = ["Lucas", "Heictor", "Julio", "Brennus", "Arleson"];
var texto = "Égua";

escreva(tamanho(vetorNomes));
// Saída: 5

escreva(tamanho(texto));
// Saída: 4
```

## Texto

A função `texto(valor)` converte números flutuantes ou inteiros em texto.

Exemplo:
```js
var testeNumero = 123;

escreva("123" + texto(testeNumero));
// Saída: 123123
```

Essas funções internas são apenas algumas das muitas ferramentas disponíveis no Égua para ajudar na resolução de problemas e manipulação de dados. Ao explorar e entender essas funções, você terá mais recursos para criar programas poderosos e eficientes.