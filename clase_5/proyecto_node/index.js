import moment from "moment";

const fecha_actual = moment();
const fecha_nacimiento = moment("1966-12-19");

console.log(fecha_actual);
console.log(fecha_nacimiento);

//validar fecha de nacimiento
if (fecha_nacimiento.isValid()) {
  console.log("Fecha de nacimiento válida");
}
const edad = fecha_actual.diff(fecha_nacimiento, "years");
console.log(edad);
//Cantidad de dias que pasaron dede mi fehca de nacimiento
const dias = fecha_actual.diff(fecha_nacimiento, "days");
console.log(dias);

// console.log(moment().format("MMMM Do YYYY, h:mm:ss a"));
