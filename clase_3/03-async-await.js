const divisionPromesa = (a, b) => {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject("No se puede dividir por 0");
    } else {
      resolve(a / b);
    }
  });
};

const divisionAsync = async (a, b) => {
  try {
    return await divisionPromesa(a, b);
  } catch (error) {
    console.log(error);
  }
};

const test = async () => {
  console.log(1, await divisionAsync(10, 0));
};

test();

// Ejemplo con SetTimeout

const error = true;
const getData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!error) {
        resolve("Datos Obtenidos");
      }
      {
        reject("Error al obtener los datos");
      }
    }, 3000);
  });
};

const test2 = async () => {
  try {
    console.log(await getData());
  } catch (error) {
    throw new Error(error);
    console.log(error);
  }
};

test2();

//Ejemplo async await con fetch
const getApi = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

//getApi();

//Ejemplo consultando a la api de github
const getUser = async (user) => {
  try {
    const response = await fetch(`https://api.github.com/users/${user}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

getUser("mcampos007");
