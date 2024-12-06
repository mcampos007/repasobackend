function dividir(num1, num2) {
  return new Promise((resolve, reject) => {
    console.log("dividir");

    if (num2 === 0) {
      reject("No se puede dividir por cero");
    } else {
      resolve(num1 / num2);
    }
  });
}

function suma(num1, num2) {
  return new Promise((resolve, reject) => {
    if (num1 === 0 || num2 === 0) {
      reject("Operación inncesesario");
    } else {
      const resultado = num1 + num2;
      resolve(resultado);
    }
  });
}

function resta(num1, num2) {
  return new Promise((resolve, reject) => {
    if (num1 === 0 || num2 === 0) {
      reject("Operación inncesesario");
    } else {
      const resultado = num1 - num2;
      if (resultado < 0) {
        reject("La calculadora solo devuelve valores positivos");
      } else {
        resolve(resultado);
      }
    }
  });
}

function multiplicacion(num1, num2) {
  return new Promise((resolve, reject) => {
    if (num1 < 0 || num2 < 0) {
      reject("operacion inncesaria");
    } else {
      const resultado = num1 * num2;
      if (resultado < 0) {
        reject("la calculadora solo devuelve valores positivos");
      } else {
        resolve(resultado);
      }
    }
  });
}

async function calculos(num1, num2) {
  try {
    const resultadoSuma = await suma(num1, num2);
    console.log(1, resultadoSuma);
  } catch (error) {
    console.log(error);
  }

  //
  try {
    const resultadoResta = await resta(num1, num2);
    console.log(2, resultadoResta);
  } catch (error) {
    console.log(error);
  }

  //
  try {
    const resultadodivision = await dividir(num1, num2);
    console.log(3, resultadodivision);
  } catch (error) {
    console.log(error);
  }
  //
  try {
    const resultadoMUltiplicacion = await multiplicacion(num1, num2);
    console.log(4, resultadoMUltiplicacion);
  } catch (error) {
    console.log(error);
  }
}

//calculos(1, 1);

calculos(1, 0);
