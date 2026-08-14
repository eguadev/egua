---
description: Guia dos operadores da linguagem Égua — aritméticos, relacionais, lógicos e especiais — com exemplos e ordem de prioridade.
---

# Operadores

Operadores servem para manipular e comparar dados. A linguagem égua tem operadores matemáticos, de comparação e lógicos, e eles seguem uma ordem de prioridade que determina como as operações são calculadas.

Veja os operadores da linguagem égua:

- `**` - Exponenciação: calcula a potência de um número.

   ```js
   var resultado = 2 ** 3; // resultado é igual a 8
   ```

- `*` - Multiplicação: realiza a multiplicação entre dois valores.

   ```js
   var resultado = 4 * 5; // resultado é igual a 20
   ```

- `/` - Divisão: realiza a divisão entre dois valores.

   ```js
   var resultado = 10 / 2; // resultado é igual a 5
   ```

- `+` - Adição: realiza a soma entre dois valores ou concatenação de strings.

   ```js
   var resultado = 3 + 4; // resultado é igual a 7

   var texto = "Olá, " + "mundo!"; // texto é igual a "Olá, mundo!"
   ```

- `-` - Subtração: realiza a subtração entre dois valores.

   ```js
   var resultado = 8 - 3; // resultado é igual a 5
   ```

- `%` - Resto da divisão (Módulo): retorna o resto da divisão entre dois valores.

   ```js
   var resultado = 10 % 3; // resultado é igual a 1
   ```

- `>` - Maior que: verifica se um valor é maior que outro.

   ```js
   var resultado = 5 > 3; // resultado é igual a verdadeiro
   ```

- `<` - Menor que: verifica se um valor é menor que outro.

   ```js
   var resultado = 2 < 4; // resultado é igual a verdadeiro
   ```

- `==` - Igual a: verifica se dois valores têm o mesmo tipo e o mesmo valor.

   ```js
   var resultado = 4 == "4"; // resultado é igual a falso, pois os tipos são diferentes
   ```

- `!=` - Diferente de: verifica se dois valores são diferentes.

   ```js
   var resultado = 3 != 5; // resultado é igual a verdadeiro
   ```

- `e` - E lógico: verifica se duas condições são verdadeiras.

   ```js
   var resultado = (5 > 3) e (2 < 4); // resultado é igual a verdadeiro
   ```

- `ou` - Ou lógico: verifica se pelo menos uma das condições é verdadeira.

   ```js
   var resultado = (5 > 3) ou (2 > 4); // resultado é igual a verdadeiro
   ```

### Operadores especiais

Existem também operadores para manipulação bit a bit. São menos comuns no dia a dia de quem está começando, mas ficam aqui para consulta:

- `<<` - desloca os bits para a esquerda;
- `>>` - desloca os bits para a direita;
- `&` - E bit a bit;
- `^` - Ou exclusivo bit a bit;
- `|` - Ou bit a bit.

O operador `em` (que verifica se um valor está contido em outro) está documentado em [Fluxo de Controle](/egua/fluxo-controle).

### Prioridade dos operadores

Os operadores têm uma ordem clara de prioridade, semelhante à matemática, onde as operações são realizadas em uma ordem específica (ordenadas de cima para baixo com a maior precedência no topo).

- `**`
- `/`, `*` e `%`
- `+` e `-`
- `<<` e `>>`
- `&`
- `|` e `^`
- `>` e `<`
- `==` e `!=`
- `em`, `e` e `ou`
