<br>
<p align="center">
  <img src="https://raw.githubusercontent.com/eguadev/egua/main/assets/egua.jpg" alt="Linguagem Égua" width="auto" height="180px">

  <h3 align="center">Linguagem Égua</h3>

  <p align="center">
    Linguagem de programação simples e moderna.
    <br />
    <a href="https://egua.dev/egua" target="_blank"><strong>Documentação »</strong></a>
    <br />
    <br />
    <a href="https://programar.egua.dev" target="_blank">IDEgua</a>
    ·
    <a href="https://github.com/eguadev/egua/issues" target="_blank">Reportar Bug</a>
    <br />
    <br />
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dw/egua">
    <img src="https://img.shields.io/npm/v/egua">
    <img alt="Tamanho" src="https://img.shields.io/npm/unpacked-size/egua">
    <img src="https://img.shields.io/github/license/eguadev/egua" />
    <br>
    <a href="https://twitter.com/eguadev" target="_blank"> <img src="https://img.shields.io/badge/-Twitter-1ca0f1?style=flat&labelColor=1ca0f1&logo=twitter&logoColor=white&link=Twitter" href="https://twitter.com/eguadev">
    <a href="https://www.instagram.com/eguadev/" target="_blank"><img src="https://img.shields.io/badge/-Instagram-c13584?style=flat&labelColor=c13584&logo=instagram&logoColor=white">
    <a href="https://www.youtube.com/channel/UCDgGUdR_6hZ6lfVaQbkQPLw" target="_blank"><img src="https://img.shields.io/badge/-YouTube-ff0000?style=flat-square&labelColor=ff0000&logo=youtube&logoColor=white">
    <a href="https://www.linkedin.com/company/eguadev/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-blue?style=flat&logo=Linkedin&logoColor=white"> </a>
  </p>
</p>

## Sobre

Égua é uma linguagem de programação interpretada, com sintaxe totalmente em português, voltada ao ensino de programação. O interpretador (lexer, parser, resolver e avaliador *tree-walking*) é escrito em JavaScript e roda em dois ambientes: no Node.js, via CLI com REPL, e no navegador, através de um bundle consumido pela [IDEgua](https://programar.egua.dev). É distribuída pelo npm sob licença MIT.

## Comece a programar

### No navegador, sem instalar nada

Visite a [IDEgua](https://programar.egua.dev) e comece a programar direto do navegador. O editor sugere palavras-chave e funções enquanto você digita; use `Ctrl` + `Espaço` (ou `Command` + `Espaço` no macOS) para abrir as sugestões manualmente.

### Instalação local (CLI)

Com o [Node.js](https://nodejs.org) 18 ou mais recente instalado:

```sh
npm i -g egua
```

Isso disponibiliza o comando `egua` no seu terminal, de duas formas:

```sh
# Executa um arquivo .egua
egua meu_programa.egua

# Sem argumentos, abre o modo interativo (REPL)
egua
```

No modo interativo, cada linha é executada na hora:

```
égua> escreva("Olá, mundo!")
Olá, mundo!
```

## Seu primeiro programa

Crie um arquivo `ola.egua`:

```
escreva("Olá, mundo!");
```

E execute:

```sh
egua ola.egua
```

## Bibliotecas padrão

A linguagem inclui bibliotecas nativas, carregadas com `importar`:

```
var m = importar("matematica");
escreva(m.raizq(16)); // 4
```

| Biblioteca | Para quê |
| --- | --- |
| `matematica` | Funções matemáticas (raiz quadrada, trigonometria, etc.) |
| `textos` | Manipulação de textos (maiúsculas, divisão, substituição, etc.) |
| `tempo` | Data e hora do sistema |
| `requisicao` | Requisições HTTP (`obter`, `enviar`, `atualizar`, `excluir`) |

Também há funções globais sempre disponíveis, como `escreva`, `texto`, `paraCada`, `mapear`, `filtrar` e `ordenar`. A referência completa está na [documentação](https://egua.dev/egua).

## Estrutura do repositório

Este é um monorepo com a linguagem e suas aplicações:

| Caminho | O que é |
| --- | --- |
| `src/` | Núcleo da linguagem: lexer, parser, resolver, interpretador e bibliotecas padrão |
| `bin/` | Ponto de entrada do CLI (`egua`) |
| `tests/` | Suíte de testes escrita na própria linguagem (`tests.egua`) |
| `scripts/` | Build do bundle da linguagem para o navegador (esbuild) |
| `apps/site/` | Site e documentação ([egua.dev](https://egua.dev)), feito com VitePress |
| `apps/idegua/` | IDE online ([programar.egua.dev](https://programar.egua.dev)) |

## Desenvolvendo localmente

```sh
git clone https://github.com/eguadev/egua.git
cd egua
npm ci

# Roda a suíte de testes da linguagem
npm test

# Executa a sua cópia local do interpretador
./bin/egua meu_programa.egua

# Gera o bundle da linguagem usado pela IDEgua (apps/idegua/js/egua.min.js)
npm run build-web
```

Para rodar o site de documentação:

```sh
cd apps/site
npm ci
npm run dev
```

## Documentação

- Para acessar nossa documentação, visite o [site de documentação](https://egua.dev/egua).

## Contribuições

* Para contribuições, por favor, leia o nosso [Guia de Contribuição](.github/CONTRIBUTING.md) antes de submeter uma Pull Request.

## Contato

- Email: `lucaspompeuneves@gmail.com`
