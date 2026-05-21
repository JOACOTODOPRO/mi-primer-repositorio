// 1. Mensaje de bienvenida
let nombre = "Juan";
let ciudad = "Buenos Aires";

console.log("Hola, soy " + nombre + " y vivo en " + ciudad);


// 2. Cálculo de propina
let cuentaTotal = 250;
let propina = cuentaTotal * 0.10;

console.log("La propina es: $" + propina);


// 3. Conversor de temperatura
let celsius = 30;
let fahrenheit = celsius * 1.8 + 32;

console.log(celsius + "°C equivalen a " + fahrenheit + "°F");


// 4. Intercambio de valores
let a = 5;
let b = 10;
let auxiliar = a;

a = b;
b = auxiliar;

console.log("a =", a);
console.log("b =", b);


// 5. Par o impar
let numero = 7;

if (numero % 2 === 0) {
  console.log("El número es par");
} else {
  console.log("El número es impar");
}


// 6. Aprobado o Suspenso
let nota = 4;

if (nota >= 5) {
  console.log("Aprobado");
} else {
  console.log("Suspenso");
}


// 7. Calculadora de descuento
let gasto = 120;
let precioFinal;

if (gasto > 100) {
  precioFinal = gasto - (gasto * 0.15);
} else {
  precioFinal = gasto;
}

console.log("Precio final: $" + precioFinal);


// 8. La tabla del 5
for (let i = 1; i <= 10; i++) {
  console.log("5 x " + i + " = " + (5 * i));
}


// 9. Suma de números
let suma = 0;

for (let i = 1; i <= 50; i++) {
  suma += i;
}

console.log("La suma total es: " + suma);


// 10. Buscador de elementos
let nombres = ["Ana", "Luis", "Carlos", "María", "Sofía"];

for (let i = 0; i < nombres.length; i++) {
  console.log("Nombre: " + nombres[i]);
}


// 11. Filtrado básico
let numeros = [2, 8, 15, 4, 22, 7];

for (let i = 0; i < numeros.length; i++) {
  if (numeros[i] > 10) {
    console.log(numeros[i]);
  }
}


// 12. Función área
function calcularArea(ancho, alto) {
  return ancho * alto;
}

console.log("Área:", calcularArea(5, 8));


// 13. Función saludo
function saludar(nombre) {
  return "¡Hola, " + nombre + "!";
}

console.log(saludar("Lucía"));


// 14. Mini Conversor
function convertirMinutosASegundos(minutos) {
  return minutos * 60;
}

console.log(convertirMinutosASegundos(5));


// 15. Verificador de correo
let email = "usuario@email.com";

if (email.includes("@")) {
  console.log("Correo válido");
} else {
  console.log("Correo inválido");
}