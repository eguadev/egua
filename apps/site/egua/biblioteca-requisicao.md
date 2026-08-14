---
description: Biblioteca requisição da linguagem Égua — requisições HTTP GET, POST, PUT e DELETE, com exemplos de código.
---

# Biblioteca requisição

A biblioteca `requisição` permite fazer chamadas HTTP para APIs e servidores web. Para usá-la, importe-a primeiro:

```js
var requisição = importar("requisição");
```

Todas as funções são bloqueantes (o programa espera a resposta antes de continuar) e sinalizam um erro se a resposta tiver um status HTTP de erro (4xx ou 5xx) ou se a requisição falhar por qualquer outro motivo (rede, timeout de 30 segundos, URL inválida). Use `tente`/`pegue` para lidar com falhas.

## obter

`requisição.obter(url)` realiza uma requisição HTTP GET e retorna o corpo da resposta (como objeto, se for JSON, ou como texto).

```js
tente {
  var resposta = requisição.obter("https://exemplo.com/api/dados");
  escreva(resposta);
} pegue {
  escreva("Não foi possível obter os dados.");
}
```

## enviar

`requisição.enviar(url, dados)` realiza uma requisição HTTP POST, enviando `dados` (um dicionário ou texto) no corpo da requisição.

```js
var dados = {"nome": "Égua"};
var resposta = requisição.enviar("https://exemplo.com/api/dados", dados);
escreva(resposta);
```

## atualizar

`requisição.atualizar(url, dados)` realiza uma requisição HTTP PUT, enviando `dados` no corpo da requisição.

```js
var dados = {"nome": "Égua atualizada"};
var resposta = requisição.atualizar("https://exemplo.com/api/dados/1", dados);
escreva(resposta);
```

## excluir

`requisição.excluir(url)` realiza uma requisição HTTP DELETE.

```js
var resposta = requisição.excluir("https://exemplo.com/api/dados/1");
escreva(resposta);
```

## Limitações

Essa biblioteca roda o interpretador Node em um subprocesso para cada requisição, então não é indicada para chamar em laços com muitas repetições. Também não é possível configurar cabeçalhos HTTP personalizados (como autenticação) atualmente.
