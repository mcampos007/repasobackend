# CLASE Nº 3 PROGRAMACION SINCRONICA Y A SINCRONICA

## TIPOS DE FUNCIONES

- TRADICIONALES
  Ejemplo de sintaxis

```js
function nombre(args) {
  return args;
}
```

- ARROW FUNCTION
  Ejemplo de sintáxis

```js
const nombre = (args) => {
  return args;
};
```

- FUNCIONES DEFINIDAS
  cuenta con un nombre especifico. Usualmente se usan para NO reasiganarse

- FUNCIONES ANONIMAS
  No cuentan con un nombre específico. son usualmente pensadas para reasignarse o utilzarse en un proceso sin almacenarce en memoria

## CALBACKS

Es una función como cualquier otra , la diferencia está en que esta se pasa coo parámetro (argumento) para poder ser utilizado por otra funcion.
Ejemplos donde utilizo callbacks son:

&#10003; El método onclick en fronend

&#10003; El método forEach

&#10003; El método map o filter

**_Ejemplos de callbacks_**

```js
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//Ejemplo básico de uso de map
numeros.map((numero, index) => {
  console.log(`Número:${numero} Indice: ${index}`);
});

//Ejemplo donde obtengo un nuevo array

const nuevoNumeros = numeros.map((numero) => {
  return numero ** 2;
});
console.log(nuevoNumeros);
```

```js
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
```

### Convenciones

- Es simpre el ultimo paramatro
- Suele ser una función que recibe dos parametros
- La funccion llama al callback luego de ejecutar todas las funciones
- Si la funcción fué exitosa , la función llamará al callback pasando null como primer parametro, y si generó algún resultado este se pasará como segundo parámetro
- Si la operación resultón en un error , la función llaará al callback pasando el error obtenido como primer parámetro

### CALLBACK ANIDADOS (HELL)

- Es el motivo por el cual se crearon promesas
- En general en funciones con arrays

### promesas

- Es un objeto especial que encapsula el codigo para esperar una respuesta
- Tres estados Pendiente Rechazado Completada (Pending, Rejectes, Fulfiled)

### ejemplo de promesa

```js
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
```

```js
//Ejemplo con fetch se puede suceder que haya muchos .then anidados

fetch("https://jsonplaceholder.typicode.com/users")
  .then((data) => {
    console.log("Resultado del fetch");

    console.log(data);
  })
  .catch((err) => {
    console.log("Error capturado");
    console.log(err);
  });
```

### Sincronismo

- Una tarea se ejecuta a continuación de la otra
- Son bloqueantes, es decir se continua con la siguiente tarea una vez que finaliza la actual
  En el ejemplo siguiente se puede observar el bloque que produce la funcin console.log

```js
console.log("Tares 1");

for (let i = 1; i < 999999999; i++);
console.log("Tares 2");
console.log("Tares 3");
```

### Asincronismo

- No son bloqueantes
  el ejemplo muestra el caso de un asincronismo, la funcion setTimeout no detiene la secuencia del codigo

```js
console.log("Tares 1");

setTimeout(() => {
  console.log("Tares 2");
}, 2000);

console.log("Tares 3");
```

### Async / Await

- Permite gestionar un entorno asincronico reslviendo las limitaciones de .the y .cath de las promesas
- Async se coloca al principio de la funcion
- todo el cuerpo debera ejecutarse de manea asincronica
- await permitira esperar por el resultado de la promesa y extraer el resultado
- Como algo puede salir mal, se debe encerrar generalmente entr eyn bloque try{} catch{}

ejmplo de asyn/await

```js
//Ejmplo de async await con una funcion

async function callApi() {
  try {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");

    const data = await respuesta.json();

    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

callApi();
```

codewars
javascript.info

# Finalizada la clase 3, se debe comenzr la clase 4
