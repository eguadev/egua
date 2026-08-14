---
description: Biblioteca matemática da linguagem Égua — trigonometria, estatística, funções afim e quadrática, e cinemática, com exemplos de código.
---

# Biblioteca matemática

A biblioteca `matemática` fornece funções matemáticas, trigonométricas, estatísticas e de cinemática. Para usá-la, importe-a primeiro:

```js
var matemática = importar("matemática");
```

## Ângulos

### graus

`matemática.graus(angulo)` converte um ângulo de radianos para graus.

```js
escreva(matemática.graus(matemática.pi));
// Saída: 180
```

### radiano

`matemática.radiano(angulo)` converte um ângulo de graus para radianos.

```js
escreva(matemática.radiano(180));
// Saída: 3.141592653589793
```

### pi

`matemática.pi` é a constante matemática Pi (π).

```js
escreva(matemática.pi);
// Saída: 3.141592653589793
```

## Trigonometria

`matemática.sen(x)`, `matemática.cos(x)` e `matemática.tan(x)` calculam seno, cosseno e tangente de `x` (em radianos). `matemática.arc_sen(x)`, `matemática.arcos(x)` e `matemática.arc_tan(x)` calculam as funções inversas.

```js
escreva(matemática.sen(matemática.pi / 2));
// Saída: 1
```

## Exponenciais e potências

- `matemática.exp(x)` — retorna *e* elevado a `x`.
- `matemática.log(x)` — retorna o logaritmo natural de `x`.
- `matemática.potência(base, expoente)` — retorna `base` elevado a `expoente`.
- `matemática.raizq(x)` — retorna a raiz quadrada de `x`.

```js
escreva(matemática.potência(2, 10));
// Saída: 1024
```

## Função Afim e Quadrática

### fun1R

`matemática.fun1R(a, b)` retorna a raiz da função afim `a*x + b = 0`.

```js
escreva(matemática.fun1R(2, -4));
// Saída: 2
```

### fun2R

`matemática.fun2R(a, b, c)` retorna as duas raízes reais da função quadrática `a*x² + b*x + c = 0`. Se não houver raízes reais (delta negativo), a função sinaliza um erro.

```js
escreva(matemática.fun2R(1, -5, 6));
// Saída: [3, 2]
```

### aprox

`matemática.aprox(x, casas)` arredonda um número ou vetor (1D ou 2D) de números para o número de casas decimais informado (padrão: 2).

```js
escreva(matemática.aprox([1.2345, 2.3456], 2));
// Saída: [1.23, 2.35]
```

### gerar_pontos_abscissa

`matemática.gerar_pontos_abscissa(distancia, valor_ponto_central, número_pontos)` gera um vetor de pontos igualmente espaçados na abscissa, centrado em `valor_ponto_central`. `número_pontos` é opcional (padrão: 7).

```js
escreva(matemática.gerar_pontos_abscissa(2, 3));
// Saída: [-3, -1, 1, 3, 5, 7, 9]
```

### pontos_espaçados

`matemática.pontos_espaçados(inicio, fim, quantidade)` gera um vetor com `quantidade` pontos igualmente espaçados entre `inicio` e `fim` (incluindo ambos).

```js
escreva(matemática.pontos_espaçados(0, 10, 5));
// Saída: [0, 2.5, 5, 7.5, 10]
```

## Estatística

### mediana

`matemática.mediana(vetor)` retorna a mediana de um vetor de números.

```js
escreva(matemática.mediana([5, 1, 3, 2, 4]));
// Saída: 3
```

### moda

`matemática.moda(vetor)` retorna um vetor com o(s) valor(es) mais frequente(s) em `vetor`.

```js
escreva(matemática.moda([1, 2, 2, 3]));
// Saída: [2]
```

### número_ocorrências

`matemática.número_ocorrências(vetor, valor)` conta quantas vezes `valor` aparece em `vetor`.

```js
escreva(matemática.número_ocorrências([1, 2, 3, 2, 2], 2));
// Saída: 3
```

### max / min

`matemática.max(vetor)` e `matemática.min(vetor)` retornam, respectivamente, o maior e o menor número de um vetor.

```js
escreva(matemática.max([4, 8, 1, 9]));
// Saída: 9
```

### média

`matemática.média(vetor)` retorna a média aritmética dos números de um vetor.

```js
escreva(matemática.média([2, 4, 6]));
// Saída: 4
```

## Cinemática

### velocidade_média

`matemática.velocidade_média(distancia, tempo)` retorna a velocidade média.

```js
escreva(matemática.velocidade_média(100, 20));
// Saída: 5
```

### delta_s / delta_t

`matemática.delta_s(posicao_inicial, posicao_final)` e `matemática.delta_t(tempo_inicial, tempo_final)` retornam, respectivamente, o espaço percorrido e o intervalo de tempo.

```js
escreva(matemática.delta_s(10, 30));
// Saída: 20
```

### aceleração

`matemática.aceleração(velocidade_final, velocidade_inicial, tempo_final, tempo_inicial)` retorna a aceleração média.

```js
escreva(matemática.aceleração(30, 0, 60, 0));
// Saída: 0.5
```

### mrufh

`matemática.mrufh(posicao_inicial, velocidade, duracao)` retorna a função horária da posição de um Movimento Retilíneo Uniforme (M.R.U.) e as posições calculadas a cada instante, de 0 até `duracao`.

```js
escreva(matemática.mrufh(0, 30, 5));
```

### mruv

`matemática.mruv(velocidade_inicial, duracao, aceleração)` retorna um vetor com a velocidade em cada instante de tempo (de 0 até `duracao`) de um Movimento Retilíneo Uniformemente Variado (M.R.U.V.), segundo `v(t) = v0 + a*t`.

```js
escreva(matemática.mruv(0, 5, 2));
// Saída: [0, 2, 4, 6, 8]
```

## Outras funções

### min_aprox

`matemática.min_aprox(valor)` retorna o maior número inteiro menor ou igual a `valor` (arredondamento para baixo).

```js
escreva(matemática.min_aprox(4.9));
// Saída: 4
```
