const contador = () => {
  let contador = 1;
  console.log("Iniciando el contador");

  let timer = setInterval(() => {
    contador++;
    if (contador > 10) {
      clearInterval(timer);
    }
    console.log(`Èjecutando el Timer ${contador}`);
  }, 1000);
};

console.log("Antes del contador");

contador();

console.log("Luego del contador");
