---
description: Introdução à linguagem de programação Égua, em português, com sintaxe simplificada, execução no navegador e seu primeiro programa "Olá, Mundo!".
---

<script setup>
import { VPButton } from 'vitepress/theme'
</script>

# Linguagem Égua

Aprender a programar na linguagem égua ensina conceitos que valem para outras linguagens também: variáveis, estruturas de controle (condicionais e laços de repetição) e funções.

A sintaxe da linguagem égua é simples e as regras são claras, então dá para focar nesses conceitos em vez de brigar com detalhes da linguagem.

A IDEgua, a interface online da linguagem, ajuda bastante nisso: dá para ver o fluxo de execução e os erros de forma mais intuitiva, direto no navegador. Enquanto você digita, o editor também sugere palavras-chave e funções e explica brevemente para que cada uma serve.

## Uso online

A linguagem Égua pode ser executada de maneira online via navegador.

<VPButton
  size="big"
  theme="brand"
  text="Abrir a IDEgua"
  href="https://programar.egua.dev"
/>

As sugestões de código aparecem automaticamente durante a digitação. Use as setas para escolher uma opção, `Enter` ou `Tab` para inseri-la e `Esc` para fechar a lista. Para abrir as sugestões manualmente, pressione `Ctrl` + `Espaço` (ou `Command` + `Espaço` no macOS).

## Olá mundo

Na linguagem égua, o famoso "Olá, Mundo!" pode ser exibido com um simples trecho de código. Veja abaixo:

```js
escreva("Olá, Mundo!");
```

O código usa a função `escreva()` para exibir a mensagem. Ao executar, a tela mostra "Olá, Mundo!": o primeiro programa antes de partir para conceitos mais avançados.

## Comentários
Comentários são trechos de texto para adicionar explicações ou notas ao código. O interpretador os ignora durante a execução. Em égua, um comentário começa com `//` e vale até o fim da linha.

Exemplo:
```js
// Este é um comentário de linha única
var idade = 10; // Outro comentário de linha única
```

Comentários deixam o código mais fácil de entender e não afetam a execução do programa.
