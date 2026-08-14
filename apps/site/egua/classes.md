---
description: Programação orientada a objetos na linguagem Égua — criação de classes, métodos, construtor e herança — com exemplos de código.
---

# Classes

A égua suporta orientação a objetos nativamente: classes, objetos, métodos e herança.

## Criando uma classe

Uma classe é uma estrutura que define as características e comportamentos de um objeto. Em Égua, você pode criar uma classe usando a palavra-chave `classe` seguida pelo nome da classe.

Exemplo:
```js
classe Teste {}
```

## Instanciando uma classe

A instância de uma classe é criada através da chamada da classe, criando assim um objeto. Em Égua, para criar uma instância de uma classe, basta chamar o nome da classe seguido de parênteses.

Exemplo:
```js
classe Teste {}

var teste = Teste();
escreva(teste); // Saída: "<Teste instância>"
```

## Métodos

Os métodos são funções associadas a uma classe que definem os comportamentos do objeto. Em Égua, você pode definir métodos dentro de uma classe sem a palavra-chave `função`. Os métodos podem ser acessados através da instância do objeto usando o operador `.`.

Exemplo:
```js
classe Teste {
  teste_função() {
    escreva("olá");
  }
}

var teste = Teste();
teste.teste_função(); // Saída: "olá"
```

## Referência à instância (isto)

Dentro de um método, `isto` se refere à instância atual do objeto, o que dá acesso ao estado e aos métodos dela.

Exemplo:
```js
classe Teste {
  construtor() {
    escreva(isto);
  }
}

var teste = Teste(); // Saída: "<Teste instância>"
```

## Estado do objeto

O estado de um objeto se refere às variáveis que são atribuídas a ele. Em Égua, você pode definir o estado de um objeto usando a palavra-chave `isto` dentro de um método. Isso permite que cada instância do objeto tenha seu próprio estado.

Exemplo:
```js
classe Teste {
  teste_função() {
    isto.a = 100;
    escreva(isto.a); // Saída: "100"
  }
}

var teste = Teste();
teste.teste_função();
```

## Construtor

O construtor é um método especial que é automaticamente chamado ao instanciar a classe. Ele é usado para inicializar o estado do objeto ou executar qualquer código de configuração necessário.

Exemplo:
```js
classe Teste {
  construtor() {
    escreva("começou");
  }
}

var teste = Teste(); // Saída: "começou"
```

## Herança

Uma classe pode herdar atributos e métodos de uma classe pai, reaproveitando código e adicionando o que for específico da classe filha.

Exemplo:
```js
classe Animal {}

classe Cachorro herda Animal {}
```

```js
classe Animal {
  corre() {
    escreva("correndo");
  }
}

classe Cachorro herda Animal {}

var thor = Cachorro();

thor.corre(); // Saída: "correndo"
```

Também é possível chamar um método pertencente à classe pai na classe filha usando a palavra-chave `super`. Isso permite acessar e executar o código da classe pai.

Exemplo:
```js
classe A {
  data(data) {
    escreva(data);
  }
}

classe B herda A {
  construtor(data) {
    super.data(data);
  }
}

var a = B("13/12/1981");
```

Neste exemplo, a classe `B` herda de `A` e chama o método `data` da classe pai com `super.data(data)`, dentro do próprio construtor.
