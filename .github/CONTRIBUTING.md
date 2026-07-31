# Guia de contribuição da Linguagem Égua

Olá! Que bom que você quer contribuir com a Linguagem Égua.

A Linguagem Égua é interpretada, tem sintaxe totalmente em português e é voltada ao ensino de programação. O interpretador é escrito em JavaScript e roda em dois ambientes: no Node.js (CLI e REPL) e no navegador, onde é usado pela [IDEgua](https://programar.egua.dev).

Este guia explica como o projeto é organizado, como preparar o ambiente e o que esperamos de uma contribuição, seja no núcleo da linguagem, nas bibliotecas, na IDE ou na documentação.

## O navegador vem primeiro

A Linguagem Égua foi pensada para ser usada principalmente pela IDEgua, direto do navegador, sem instalar nada. Tudo que for implementado precisa funcionar tanto na CLI quanto no navegador, mas o foco é o navegador: quando houver dúvida entre um caminho que favorece um ou outro, o navegador ganha.

Na prática, isso significa duas coisas para quem contribui:

- Evite depender de recursos que só existem no Node.js (`fs`, `child_process`, etc.). No bundle web esses módulos são trocados por substitutos mínimos (`scripts/shims/`), e a funcionalidade não vai existir na IDEgua.
- Toda mudança no núcleo ou nas bibliotecas deve ser testada no navegador antes do PR, com `npm run build-web` (veja a seção sobre a IDEgua).

## Antes de escrever código: abra uma issue

Recomendamos que toda contribuição tenha uma issue atrelada. Descreva na issue o que você pretende fazer e por quê, e espere a discussão acontecer antes de partir para o código. Isso evita a situação mais chata para todo mundo: um PR pronto, com trabalho investido, recusado porque a mudança não faz sentido para a linguagem.

Isso vale especialmente para mudanças de sintaxe e semântica, que afetam quem já ensina e aprende com a Linguagem Égua. Para correções pequenas e óbvias, como um erro de digitação na documentação, pode abrir o PR direto.

## Visão geral do repositório

Este é um monorepo. A linguagem (pacote npm `egua`) fica na raiz, e as aplicações ficam em `apps/`:

| Caminho | O que é | Onde vai parar |
| --- | --- | --- |
| `src/` | Núcleo da linguagem: lexer, parser, resolver, interpretador e bibliotecas padrão | Pacote npm `egua` |
| `bin/egua` | Ponto de entrada do CLI | Pacote npm `egua` |
| `tests/tests.egua` | Suíte de testes, escrita na própria linguagem | Executada pelo CI |
| `scripts/build-web.mjs` | Build do bundle da linguagem para o navegador (esbuild) | `apps/idegua/js/egua.min.js` |
| `apps/idegua/` | IDE online, site estático | [programar.egua.dev](https://programar.egua.dev) (Netlify) |
| `apps/site/` | Site e documentação, feito com VitePress | [egua.dev](https://egua.dev) (Netlify) |

## Preparando o ambiente

Você vai precisar de:

- [Node.js](https://nodejs.org) 18 ou mais recente (o CI usa Node 22)
- Git

```sh
git clone https://github.com/eguadev/egua.git
cd egua
npm ci
```

Para executar a sua cópia local do interpretador:

```sh
# Executa um arquivo .egua
./bin/egua meu_programa.egua

# Sem argumentos, abre o modo interativo (REPL)
./bin/egua
```

Se for mexer no site de documentação:

```sh
cd apps/site
npm ci
npm run dev   # servidor local do VitePress
```

## Como a linguagem funciona por dentro

O interpretador é do tipo *tree-walking*: o código-fonte passa por um pipeline clássico até ser executado diretamente sobre a árvore sintática, sem compilação intermediária.

```
código .egua → Lexer → tokens → Parser → AST → Resolver → Interpreter → execução
```

Mapa dos arquivos em `src/`:

| Arquivo | Responsabilidade |
| --- | --- |
| `lexer.js` | Transforma o texto em tokens; é aqui que ficam as palavras reservadas (`se`, `enquanto`, `função`...) |
| `tokenTypes.js` | Enumeração dos tipos de token |
| `parser.js` | Monta a árvore sintática (AST) a partir dos tokens |
| `expr.js` / `stmt.js` | Classes dos nós da AST (expressões e comandos) |
| `resolver.js` | Resolução de escopos e variáveis antes da execução |
| `interpreter.js` | Percorre a AST e executa o programa |
| `environment.js` | Escopos e ambientes de variáveis |
| `errors.js` | Erros da linguagem (léxicos, sintáticos e de execução) |
| `structures/` | Objetos de runtime: funções, classes, instâncias, módulos, funções nativas |
| `lib/globalLib.js` | Funções globais sempre disponíveis (`escreva`, `texto`, `paraCada`, `mapear`, `filtrar`, `ordenar`...) |
| `lib/importStdlib.js` | Registro das bibliotecas carregáveis com `importar` |
| `lib/matematica.js`, `textos.js`, `tempo.js`, `requisicao.js` | As bibliotecas padrão em si |
| `egua.js` | Ponto de entrada no Node.js (CLI e REPL) |
| `web.js` | Ponto de entrada no navegador (vira o bundle da IDEgua) |

O projeto usa ES Modules (`"type": "module"` no `package.json`).

Se você nunca estudou interpretadores, o livro gratuito [Crafting Interpreters](https://craftinginterpreters.com/), em inglês, é a melhor referência: a arquitetura da Linguagem Égua segue de perto a do interpretador *tree-walking* apresentado lá.

## Formas de contribuir

### Reportando bugs

Abra uma [issue](https://github.com/eguadev/egua/issues) com:

- O menor programa possível na Linguagem Égua que reproduz o problema;
- O comportamento esperado e o comportamento observado;
- Onde aconteceu: na IDEgua (qual navegador) ou na CLI (qual versão do Node).

### Bibliotecas padrão

É o caminho mais simples para começar. Uma biblioteca é um módulo JavaScript cujas funções exportadas viram funções da Linguagem Égua. Para criar uma nova:

1. Crie `src/lib/minhabiblioteca.js` exportando funções puras de JavaScript (use as bibliotecas existentes, como `src/lib/textos.js`, de modelo);
2. Registre-a em `src/lib/importStdlib.js` (adicione o `import` e um novo `case` no `switch`);
3. Adicione testes em `tests/tests.egua` exercitando as novas funções;
4. Documente-a em `apps/site/egua/bibliotecas.md`, no mesmo PR.

Depois disso ela já pode ser usada na linguagem:

```
var b = importar("minhabiblioteca");
escreva(b.minhaFuncao());
```

Lembre da regra lá do começo: o mesmo código roda no navegador, e o navegador é o foco. Antes de propor uma biblioteca que dependa de módulos do Node, abra uma issue para discutirmos se ela cabe na linguagem.

Funções globais, as que não precisam de `importar`, ficam em `src/lib/globalLib.js` e seguem a mesma lógica.

### Núcleo da linguagem

Mudanças em sintaxe e semântica geralmente tocam vários pontos do pipeline. Uma palavra-chave nova, por exemplo, costuma envolver:

1. `tokenTypes.js`: o novo tipo de token;
2. `lexer.js`: a palavra reservada;
3. `parser.js` (e `expr.js`/`stmt.js`, se houver nó novo de AST): a regra sintática;
4. `resolver.js`: se envolver escopos ou variáveis;
5. `interpreter.js`: o comportamento em execução;
6. `tests/tests.egua`: testes cobrindo o caso feliz e os casos de erro;
7. `apps/site/egua/`: a página de documentação correspondente.

Mensagens de erro fazem parte da experiência de ensino da linguagem: escreva-as em português claro, pensando em quem está aprendendo a programar.

### IDEgua

A IDE (`apps/idegua/`) é um site estático que consome o bundle da linguagem. Como o navegador é o ambiente principal da Linguagem Égua, testar nele não é opcional: se a sua mudança foi no núcleo ou nas bibliotecas, gere o bundle e abra a IDE localmente.

```sh
npm run build-web
# gera apps/idegua/js/egua.min.js a partir de src/web.js

# sirva a pasta localmente, por exemplo:
npx serve apps/idegua
```

O arquivo `egua.min.js` é gerado; não o edite manualmente nem se preocupe em commitá-lo, porque a Netlify roda `npm run build-web` a cada deploy.

### Site e documentação

A documentação vive neste mesmo repositório, em `apps/site/` (VitePress). Correções de texto e novos exemplos são muito bem-vindos, e toda mudança na linguagem deve atualizar a documentação no mesmo PR.

## Testes

A suíte de testes é escrita na própria Linguagem Égua:

```sh
npm test   # executa ./bin/egua tests/tests.egua
```

A suíte imprime `OK!` ou `ERRO!` para cada caso e um contador de erros ao final de cada seção. Erros de sintaxe ou de execução derrubam o processo com código de saída diferente de zero, o que falha o CI.

Ao contribuir, adicione em `tests/tests.egua` uma função de teste para a sua mudança, seguindo o padrão das existentes (escreve um cabeçalho, exercita a funcionalidade, incrementa o contador de erros em caso de falha), e chame-a no corpo do arquivo.

## Abrindo o Pull Request

1. Se ainda não existe, abra uma issue descrevendo a mudança (veja a seção "Antes de escrever código");
2. Crie uma branch a partir da `main`;
3. Faça commits em português, no presente do indicativo (ex.: `Adiciona a função inverter à biblioteca textos`);
4. Rode `npm test` e, se tocou no núcleo ou nas bibliotecas, `npm run build-web` com teste manual no navegador;
5. Abra o PR contra a `main`, vinculando a issue e explicando o quê e o porquê da mudança.

O que acontece depois:

- O CI (GitHub Actions) roda os testes, o build do bundle e o build do site a cada push;
- A Netlify gera *deploy previews* do site e da IDE para o PR;
- Um mantenedor revisa o código; mudanças na linguagem também são avaliadas pelo impacto em quem ensina com ela.

Não altere a versão no `package.json`. O versionamento e a publicação são responsabilidade dos mantenedores: um push de tag dispara o workflow `publish.yml`, que roda os testes e publica no npm via Trusted Publishing, e o merge na `main` publica o site e a IDE automaticamente pela Netlify.

### Checklist

- [ ] Issue aberta e discutida, para mudanças que não sejam triviais;
- [ ] Ambiente montado (`npm ci`) e `npm test` passando;
- [ ] Testes da sua mudança adicionados em `tests/tests.egua`;
- [ ] Testado no navegador (`npm run build-web`), se tocou no núcleo ou nas bibliotecas;
- [ ] Documentação atualizada em `apps/site/`, se a mudança é visível para quem usa a linguagem;
- [ ] Versão do `package.json` sem alteração;
- [ ] PR aberto contra a `main`, com descrição do quê e do porquê.

## Material de apoio

- [Crafting Interpreters](https://craftinginterpreters.com/): livro gratuito sobre a construção de interpretadores; a Linguagem Égua segue essa arquitetura;
- [Palestra sobre a criação de bibliotecas na Linguagem Égua, na BrasilJS on the Road 2020](http://www.youtube.com/watch?v=W2LccJacNXE) e [vídeo de exemplo](http://www.youtube.com/watch?v=CZw0-y4Em2U). A estrutura do repositório mudou desde a gravação, mas os conceitos continuam valendo.

## Código de conduta

Ao participar, você concorda com o nosso [Código de Conduta](../CODE_OF_CONDUCT.md). Seja gentil: muita gente que chega aqui está escrevendo as primeiras linhas de código da vida.

## Agradecimentos

Desde já agradecemos de coração pela sua contribuição.
