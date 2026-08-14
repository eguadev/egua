---
description: Como importar e usar bibliotecas padrão na linguagem Égua para estender as funcionalidades do seu programa.
---

# Bibliotecas

Bibliotecas padrão adicionam funcionalidades à linguagem, mas não vêm carregadas automaticamente: você precisa importá-las. Isso mantém a linguagem leve e deixa você escolher só o que precisa em cada programa.

```js
var tempo = importar("tempo");

escreva(tempo.agora());
```

O código acima importa a biblioteca "tempo" e chama `agora()` para exibir a data e hora atuais. Cada biblioteca tem suas próprias funções, listadas nas páginas abaixo.

## Bibliotecas disponíveis

- [matemática](/egua/biblioteca-matematica): funções matemáticas, trigonométricas, estatísticas e de cinemática.
- [textos](/egua/biblioteca-textos): manipulação de textos, como busca, substituição e formatação.
- [tempo](/egua/biblioteca-tempo): data e hora atuais, e conversão de texto para data.
- [requisição](/egua/biblioteca-requisicao): requisições HTTP (GET, POST, PUT, DELETE).

Usar bibliotecas prontas economiza o trabalho de escrever tudo do zero.
