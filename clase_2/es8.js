const obj = {
  nombre: "Mario",
  edad: 25,
  colorfav: "Azul",
};

console.log(Object.keys(obj));
console.log(Object.values(obj));
console.log(Object.entries(obj));

// reduce
const numeros = [1, 2, 3, 4, 5, 6];

const total = numeros.reduce(
  (valorInicial, valorAcumulado) => valorInicial + valorAcumulado
);

console.log(`total:${total}`);
