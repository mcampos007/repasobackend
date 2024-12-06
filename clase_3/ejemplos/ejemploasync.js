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
