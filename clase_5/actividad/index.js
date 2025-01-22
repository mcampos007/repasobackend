import fs from "fs";

// number generation

function generateRandomNumbers(count, min, max) {
  const numbers = [];
  for (let i = 0; i < count; i++) {
    numbers.push(Math.floor(Math.random() * (max - min + 1) + min));
  }
  return numbers;
}
function cantidaddeOcurrencias(numbers) {
  const ocurrences = {};
  numbers.forEach((number) => {
    if (ocurrences[number]) {
      ocurrences[number]++;
    } else {
      ocurrences[number] = 1;
    }
  });
  return ocurrences;
}

//Numeros generados
const numbers = generateRandomNumbers(10000, 1, 20);

//Ocurrencias
const ocurrences = cantidaddeOcurrencias(numbers);

console.log(ocurrences);

// file creation
fs.writeFileSync("numbers.txt", numbers.join(","));
