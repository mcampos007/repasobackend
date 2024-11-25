const objetos = [
  {
    manzanas: 3,
    peras: 2,
    carne: 1,
    jugos: 5,
    dulces: 2,
  },
  {
    manzanas: 1,
    sandias: 1,
    huevos: 6,
    jugos: 1,
    panes: 4,
  },
];

const productos = [];

objetos.forEach((obj) => {
  const keys = Object.keys(obj);
  console.log(`Keys de Objeto:${keys}`);
  keys.forEach((key) => {
    if (!productos.includes(key)) {
      console.log(`Agrenago Producto Nuevo: ${key}`);
      productos.push(key);
    } else {
      console.log(`Este producto ya existe : ${key}`);
    }
  });
});

console.log(`El arry de productos es: ${productos}`);

console.log("*********************************");
console.log("Las Keys de Objetos es ");
objetos.forEach((key) => {
  console.log(Object.keys(key));
});
console.log("Las Values de Objetos es ");

let totalVendido = 0;
objetos.forEach((key) => {
  console.log(Object.values(key));
  const lnValues = Object.values(key);
  lnValues.forEach((cant) => {
    totalVendido += cant;
  });
});
console.log(`La cantidad total vendida es ${totalVendido}`);

// console.log(Object.keys(objetos));
// console.log(Object.values(objetos));
// console.log(Object.entries(objetos));

// console.log("Entries");
// objetos.forEach((key) => {
//   let keyValues = Object.entries(objetos);
//   console.log(keyValues);
//   console.log("Prod para cada keyvalue");
//   keyValues.forEach((prod) => {
//     console.log(prod[1]);
//   });
// });
// let totalVendidos = 0;
// objetos.forEach((obj) => {});
