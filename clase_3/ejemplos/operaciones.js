//ejemplo de operaciones artimeticas con callbaks

const sumar = (num1, num2) => num1 + num2;
const restar = (num1, num2) => num1 - num2;
const multiplicar = (num1, num2) => num1 * num2;
const dividir = (num1, num2) => num1 / num2;

function calcular(numero1, numero2, callback) {
  return callback(numero1, numero2);
}
console.log(calcular(1, 2, sumar));
console.log(calcular(1, 2, restar));
console.log(calcular(1, 2, multiplicar));
console.log(calcular(1, 2, dividir));
