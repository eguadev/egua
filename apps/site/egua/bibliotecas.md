---
description: Como importar e usar bibliotecas padrão na linguagem Égua para estender as funcionalidades do seu programa.
---

# Bibliotecas

As bibliotecas padrão são conjuntos de funcionalidades internas à linguagem que podem ser utilizadas para estender suas capacidades. No entanto, essas bibliotecas não são carregadas automaticamente, é necessário importá-las explicitamente para utilizá-las. Isso ajuda a manter a linguagem mais leve e permite que você escolha quais recursos deseja usar em cada programa.

```js
var tempo = importar("tempo");

escreva(tempo.agora());
```

Nesse exemplo, a biblioteca "tempo" foi importada e a função `agora()` da biblioteca foi chamada para exibir a data e hora atuais. Cada biblioteca tem suas próprias funções, listadas nas páginas abaixo.

## Bibliotecas disponíveis

- [matemática](/egua/biblioteca-matematica) — funções matemáticas, trigonométricas, estatísticas e de cinemática.
- [textos](/egua/biblioteca-textos) — manipulação de textos: busca, substituição, formatação e mais.
- [tempo](/egua/biblioteca-tempo) — data e hora atuais, e conversão de texto para data.
- [requisição](/egua/biblioteca-requisicao) — requisições HTTP (GET, POST, PUT, DELETE).

Ao utilizar bibliotecas, você pode aproveitar o trabalho de outros desenvolvedores e economizar tempo e esforço, pois não precisa escrever tudo do zero.

Explore as bibliotecas disponíveis e leia a documentação fornecida para entender como usar os recursos disponíveis. Isso permitirá que você escreva programas mais eficientes e poderosos, aproveitando ao máximo o ecossistema de bibliotecas disponíveis para a linguagem Égua.
