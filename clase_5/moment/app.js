import moment from "moment";

var now = moment().format();
var now1 = moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); // "Sunday, February 14th 2010, 3:25:50 pm"
var now2 = moment().format("ddd, hA"); // "Sun, 3PM"
var now3 = moment().format("[Today is] dddd"); // "Today is Sunday"
//var now4 = moment("gibberish").format("YYYY MM DD");
const txtFecha = "1966-12-19";
if (moment(txtFecha).isValid()) {
  //const hoy = moment("2025-02-26").format("dddd, MMMM Do YYYY");
  const hoy = moment();
  console.log(1, hoy);
  var birthDate = moment("1966-12-19");
  console.log(2, `Mi Fecha de Nacimiento es ${birthDate}`);

  const dias = hoy.diff(birthDate, "days");
  console.log(3, `Han pasado ${dias} desde que naciste`);
} else {
  console.log(" Fecha INgresada no es válida");
}

// console.log(1, `La fecha de Hoy es ${now}`);
// console.log(2, `La fecha de Hoy es ${now1}`);
// console.log(3, `La fecha de Hoy es ${now2}`);

//console.log(5, `La fecha de Hoy es ${now4}`);
