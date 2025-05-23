function suma(num1, num2) {
  return new Promise((resolve, reject) => {
    if (num1 === 0 || num2 === 0) {
      reject("Operación Innecesaria");
    } else {
      const resultado = num1 + num2;
      if (resultado < 0) {
        reject("La calculadora solo devuelve valores positivos");
      }
      resolve(resultado);
    }
  });
}

function resta(num1, num2) {
  if (num1 === 0 && num2 === 0) {
    return "Los parámetros deben ser mayores que cero";
  }

  return new Promise((resolve, reject) => {
    if (num1 === 0 || num2 === 0) {
      reject("Operación Inválida");
    }
    const resultado = num1 - num2;
    if (resultado < 0) {
      reject("La calculadora solo devuelve valores positivos");
    }
    resolve(resultado);
  });
}

async function calculos(num1, num2) {
  try {
    const resultadosuma = await suma(num1, num2);
    console.log(1, `REsultado de la Suma: ${resultadosuma}`);

    const resultadoresta = await resta(num1, num2);
    console.log(2, `Resultado de la resta: ${resultadoresta}`);
  } catch (error) {
    console.log(error);
  }
}

calculos(10, 5);
calculos(0, 0);
calculos(-10, 5);
