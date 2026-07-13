# Operadores

Os operadores são elementos fundamentais nas linguagens de programação, pois permitem a manipulação e o processamento de dados. Existem diferentes tipos de operadores, como operadores matemáticos, operadores de comparação e operadores lógicos. Eles seguem uma hierarquia de prioridade, determinando a ordem em que as operações são executadas.

Aqui estão os exemplos de operadores em égua:

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

- `==` - Igual a: verifica se dois valores são iguais.

   ```js
   var resultado = 4 == "4"; // resultado é igual a verdadeiro
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

Compreender a utilização e a ordem de prioridade dos operadores é essencial para construir expressões e executar cálculos de forma correta em seus programas.

### Operadores especiais

Existem outros operadores especieais relacionados a manipulação bit a bit, como:

- `<<` - Deslocamento bit a bit à esquerda;
- `>>` - Deslocamento bit a bit à direita;
- `&` - e bit a bit;
- `^` - Ou exclusivo bit a bit;
- `|` - Ou bit a bit;
- `em` - em;

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
