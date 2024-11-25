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
