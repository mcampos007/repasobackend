# CURSO BACKEND REPASO

## Clase 0

### Tipos de Datos

- Tipo primitivp (String, boolenas, number, null, undefined)
- Tipo Objeto (Son datos de tipo objetos: Date, RegExp, Error, funciones o clases, Arrays y objetos especiales)

### Variables

- Puede cambiar su valor

## Clase 1

### Principio Básicos de JS

1. Fundamentos
   _. Datos y variables
   _. ES6 - Let y const ECMAScript es un standard var, ya no se utiliza
   Let y const _Importante el scope_
   -. Funciones - Template String - Scopes

### Uso de clases en JS

-Metodos
-Propiedades

## Clase 2 (Nuevas funcionalidades de los lenguajes ECMAScritpt)

- Se definen nuevas funciones
- Se pasan estas funcinalidades a etapa de prueba
- Se icorporan en los navegadores

### ES7

-Operador exponencial \*\*
-array includes (función muy util)

```js
// Uso de operador exponencial
const numeros = [2, 3, 4, 5, 6];

const numeroesNuevos = numeros.map((numero) => numero ** 2);
console.log(numeroesNuevos);
```

-funcion includes

```js
//Includes
const nombres = ["mario", "CEsar", "Fernando"];

const nombre = "mario";

if (nombres.includes(nombre)) {
  console.log(`${nombre} está presents`);
} else {
  console.log(`${nombre} No esta presente!!`);
}
```

## ES8

- Async/await
- Object.entries/Object.keys/Object.values

```js
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
console.log(´total:${total}´);

```

## ES9

- finally()
- spread

```js
const obj1 = {
  nombre: "mario",
  edad: 25,
  colorfav: "azul",
};

const obj2 = {
  nombre: "cesar",
  edad: 28,
};

const obj3 = { ...obj1, ...obj2 };

//Genera un nuevo objeto donde agrega las propiedades faltante y reemplaza las existentes
//es el spreadOpertor
console.log(obj3);
```

- rest

```js
//Ejempo de rest
const obj4 = {
  a: "Algo",
  b: "otro algo",
  c: "Algo mas",
};

const { a, ...resto } = obj4;
console.log(a);
console.log(resto);

console.log(obj4);
```

## ES10 trim and flat

```js
const text0 = "     Tesxto con espacios    ";
console.log(text0);
console.log(text0.trim());

const array = [
  [1, 2],
  [
    [1, 2],
    [1, 2],
  ],
  [1, 2],
];

console.log("Ejemplo de Flat");

console.log(array);
```

## ES11

### Operador Nulish

El operador Nullish (??) en JavaScript es una forma simple de proporcionar un valor predeterminado para una expresión que es null o undefined. Introducido en ES2020, este operador evalúa el lado izquierdo y, si su valor es null o undefined, devuelve el valor del lado derecho.

Ejemplo:

```js
const valor = null;

const nuevoValor = valor ?? 0;

console.log(nuevoValor);
```

### Variables privadas

En JavaScript, una variable privada dentro de una clase es una propiedad que solo puede ser accedida o manipulada desde dentro de la clase misma. Esto garantiza que su valor no pueda ser alterado directamente desde fuera de la clase, lo que mejora la encapsulación y protege los datos.

## CLASE 3 - PROGRAMACION SINCRONICA Y ASINCRONICA

- Funciones callback
- Modelo API REST
- Creación de Promesas , Ejemplo de una API para test http://jsonplaceholder.typecode.com
- Asyn / Await (Try / Catch)

## time de la clase 01:24:00
