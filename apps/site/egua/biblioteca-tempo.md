---
description: Biblioteca tempo da linguagem Égua — data e hora atuais, conversão, formatação, diferença entre datas e pausa, com exemplos de código.
---

# Biblioteca tempo

A biblioteca `tempo` fornece funções para consultar a data e a hora do sistema, converter e formatar datas, calcular intervalos e pausar um programa. Para usá-la, importe-a primeiro:

```js
var tempo = importar("tempo");
```

## agora

`tempo.agora()` retorna a data e hora atuais completas.

```js
escreva(tempo.agora());
```

## segundos

`tempo.segundos()` retorna os segundos atuais do sistema (0 a 59).

```js
escreva(tempo.segundos());
```

## minutos

`tempo.minutos()` retorna os minutos atuais do sistema (0 a 59).

```js
escreva(tempo.minutos());
```

## horas

`tempo.horas()` retorna a hora atual do sistema (0 a 23).

```js
escreva(tempo.horas());
```

## dia, mes e ano

`tempo.dia()`, `tempo.mes()` e `tempo.ano()` retornam as partes da data atual do sistema. O dia vai de 1 a 31 e o mês, de 1 a 12.

```js
escreva(tempo.dia());
escreva(tempo.mes());
escreva(tempo.ano());
```

## dia_da_semana

`tempo.dia_da_semana()` retorna o nome do dia da semana atual em português, como `"segunda-feira"` ou `"sábado"`.

```js
escreva(tempo.dia_da_semana());
```

## texto_para_data

`tempo.texto_para_data(data_como_texto)` converte um texto no formato `DD/MM/AAAA` em uma data. Se a data não existir no calendário (por exemplo, `31/02/2024`), a função sinaliza um erro.

```js
var data = tempo.texto_para_data("25/12/2024");
escreva(data);
```

## formate_data

`tempo.formate_data(data, formato)` transforma uma data em texto. O formato pode usar `DD` para o dia, `MM` para o mês e `AAAA` para o ano.

```js
var data = tempo.texto_para_data("25/12/2024");

escreva(tempo.formate_data(data, "DD/MM/AAAA"));
// Saída: 25/12/2024

escreva(tempo.formate_data(data, "AAAA-MM-DD"));
// Saída: 2024-12-25
```

## diferença

`tempo.diferença(data1, data2)` retorna a diferença absoluta, em dias inteiros, entre duas datas. A ordem das datas não altera o resultado.

```js
var inicio = tempo.texto_para_data("01/01/2024");
var fim = tempo.texto_para_data("11/01/2024");

escreva(tempo.diferença(inicio, fim));
// Saída: 10
```

::: info Compatibilidade
A grafia `tempo.diferenca()` continua disponível para programas escritos na versão 1.3.14. Em novos códigos, prefira `tempo.diferença()`.
:::

## pausa

`tempo.pausa(milissegundos)` pausa a execução do programa pelo tempo informado. O valor precisa ser um número maior ou igual a zero.

```js
escreva("Antes da pausa");
tempo.pausa(1000);
escreva("Um segundo depois");
```
