---
description: Biblioteca tempo da linguagem Égua — data e hora atuais, e conversão de texto para data, com exemplos de código.
---

# Biblioteca tempo

A biblioteca `tempo` fornece funções para obter a data e hora atuais do sistema e para converter texto em data. Para usá-la, importe-a primeiro:

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

## texto_para_data

`tempo.texto_para_data(data_como_texto)` converte um texto no formato `DD/MM/AAAA` em uma data. Se a data não existir no calendário (por exemplo, `31/02/2024`), a função sinaliza um erro.

```js
var data = tempo.texto_para_data("25/12/2024");
escreva(data);
```
