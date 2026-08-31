const Exemplos = '';

const OlaMundo = 'escreva("Olá, mundo!");';

const Operações = `var a = 10;
var b = 4;

escreva("Valor de A: " + texto(a));

escreva("Valor de B: " + texto(b));

var soma = a + b; // Soma os dois valores
var sub  = a - b; // Subtrai os dois valores
var mult = a * b; // Multiplica os dois valores
var div  = a / b; // Divide os dois valores

escreva("A soma dos números é igual a: " + texto(soma));	    // Exibe o resultado da soma
escreva("A subtração dos números é igual a: " + texto(sub));	    // Exibe o resultado da subtração
escreva("A multiplicação dos números é igual a: " + texto(mult));   // Exibe o resultado da multiplicação
escreva("A divisão dos números é igual a: " + texto(div));          // Exibe o resultado da divisão`

const Condicional = `var letra = 'E';

// É necessário verificar letras minúsculas e maiúsculas
se 
(
  letra == 'A' ou letra == 'E' ou letra == 'I' ou letra == 'O' ou letra == 'U' ou
  letra == 'a' ou letra == 'e' ou letra == 'i' ou letra == 'o' ou letra == 'u'			
)
{ 
  escreva("A letra " + letra + " é uma vogal!");
}
senão
{
  escreva("A letra " + letra + " não é uma vogal!"); 
}`

const Repetição = `var contador = 10; 

enquanto (contador > 0)
{ 
  escreva ("Detonação em: " + texto(contador)); 
  contador = contador - 1; 
} 

escreva ("Booom!");`

const Função = `função mensagem(texto){
  var linha = "-------------------------------";
  		
  escreva(linha);
  
  escreva(texto);
  
  escreva(linha);
}	

função calcular(a, b){
   var resultado = a * a + b * b;
   
   retorna resultado;
}

mensagem("Mensagem de texto");

escreva("Resultado do primeiro cálculo:");
escreva(calcular(3, 5));

escreva("Resultado do segundo cálculo:");
escreva(calcular(2, 9));`

const Classe = `classe Animal {
  correr() {
      escreva("Correndo Loucamente");
  }
}
classe Cachorro herda Animal {
  latir() {
      escreva("Au Au Au Au");
  }
}
var nomeDoCachorro = Cachorro();
nomeDoCachorro.correr();
nomeDoCachorro.latir();`

const Testes = `var testes = importar("testes");

var descreva = testes.descreva;
var resultados = testes.resultados;

// Código que queremos testar.
classe Calculadora {
  construtor() {
    isto.resultado = 0;
  }

  somar(a, b) {
    isto.resultado = a + b;
    retorna isto.resultado;
  }

  subtrair(a, b) {
    isto.resultado = a - b;
    retorna isto.resultado;
  }

  multiplicar(a, b) {
    isto.resultado = a * b;
    retorna isto.resultado;
  }

  dividir(a, b) {
    isto.resultado = a / b;
    retorna isto.resultado;
  }
}

// Agrupamos testes relacionados dentro de um conjunto.
descreva("Calculadora", função() {
  // Funções usadas pelos testes deste conjunto.
  var teste = testes.teste;
  var esperado_que = testes.esperado_que;
  var antes_de_cada = testes.antes_de_cada;

  var calculadora = nulo;

  // Cada teste começa com uma nova calculadora.
  antes_de_cada(função() {
    calculadora = Calculadora();
  });

  teste("soma dois números", função() {
    esperado_que(calculadora.somar(10, 5)).seja(15);
  });

  teste("subtrai dois números", função() {
    esperado_que(calculadora.subtrair(10, 4)).seja(6);
  });

  teste("multiplica dois números", função() {
    esperado_que(calculadora.multiplicar(4, 3)).seja(12);
  });

  teste("divide dois números", função() {
    esperado_que(calculadora.dividir(10, 4)).seja(2.5);
  });

  // Útil para comparar resultados com casas decimais.
  teste("compara resultados decimais", função() {
    esperado_que(calculadora.dividir(1, 3)).seja_próximo(0.33, 2);
  });

  // Também podemos verificar o estado de um objeto.
  teste("guarda o último resultado", função() {
    calculadora.somar(20, 5);

    esperado_que(calculadora.resultado).seja(25);
  });
});

// Exibe o relatório final.
escreva(resultados());`;


const demos = {
  Exemplos,
  OlaMundo,
  Operações,
  Condicional,
  Repetição,
  Função,
  Classe,
  Testes,
};
