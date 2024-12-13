// ejemplo sencillo
console.log("Tareas 1");

setTimeout(() => {
  console.log("Tarea 2");
}, 2000);

console.log("Tarea 3");

// Ejemplo mas elaborado

const temporizador = (callback) => {
  setTimeout(() => {
    callback();
  }, 2000);
};

const operacion = () => console.log("Tarea 5");

console.log("Tares 4");
temporizador(operacion);
console.log("Tarea 6");
