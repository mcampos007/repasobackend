console.log(1, "Inicio del programa");
let contador = 0;

setTimeout(() => {
  console.log(3, "Dentro del 1er SetTimeOut");
}, 3000);

console.log(2, "Fin del programa");

setTimeout(() => {
  console.log(4, "Dentro del 2do SetTimeOut");
}, 0);

const intervalId = setInterval(() => {
  console.log(5, "Dentro del setInterval");
  if (contador === 5) {
    clearInterval(intervalId);
  }
  contador++;
}, 1000);
