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

testes.descreva("Calculadora", função() {
  testes.teste("soma dois números", função() {
    testes.esperado_que(2 + 3).seja(5);
  });

  testes.teste("compara números próximos", função() {
    testes.esperado_que(0.1 + 0.2).seja_próximo(0.3);
  });

  testes.teste("compara vetores", função() {
    testes.esperado_que([1, 2, 3]).seja_objeto([1, 2, 3]);
  });
});

escreva(testes.resultados());`

const demos = {
  Exemplos,
  OlaMundo,
  Operações,
  Condicional,
  Repetição,
  Função,
  Classe,
  Testes,
}
