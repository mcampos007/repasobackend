const suma = (a, b) => a + b;
const resta = (a, b) => a - b;
const multiplicacion = (a, b) => a * b;
const division = (a, b) => a / b;

const operaciones = (a, b, callback) => {
  return callback(a, b);
};

console.log(operaciones(5, 5, suma));
console.log(operaciones(5, 5, resta));
console.log(operaciones(5, 5, multiplicacion));
console.log(operaciones(5, 5, division));

/* ----------------------------- > 02-callbacks.js < ----------------------------- */
const timeinms = 2000;

setTimeout(() => {
  console.log(`Este mensaje se muestra luego de ${timeinms / 1000} segundos`);
}, timeinms);
