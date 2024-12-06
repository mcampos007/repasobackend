function dividir(num1, num2) {
  return new Promise((resolve, reject) => {
    if (num2 === 0) {
      reject("No se puede dividir por cero");
    } else {
      resolve(num1 / num2);
    }
  });
}

//Ejemplo con Fullfilled
//console.log("Ejemplo con Fullfilled");

dividir(3, 5)
  .then((resultado) => {
    console.log(resultado);
  })
  .catch((error) => {
    console.log(error);
  });

//Ejemplo con Reject
//console.log("//Ejemplo con Reject");

dividir(3, 0)
  .then((resultado) => {
    console.log(resultado);
  })
  .catch((error) => {
    console.log(error);
  });

//Ejemplo con fetch

fetch("https://jsonplaceholder.typicode.com/users")
  .then((data) => {
    console.log("Resultado del fetch");

    console.log(data);
  })
  .catch((err) => {
    console.log("Error capturado");
    console.log(err);
  });
