// Uso de operador exponencial
const numeros = [2, 3, 4, 5, 6];

const numeroesNuevos = numeros.map((numero) => numero ** 2);
console.log(numeroesNuevos);

//Includes
const nombres = ["mario", "CEsar", "Fernando"];

const nombre = "mario";

if (nombres.includes(nombre)) {
  console.log(`${nombre} está presents`);
} else {
  console.log(`${nombre} No esta presente!!`);
}
