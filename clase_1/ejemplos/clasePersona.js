class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  static especie = "Humano";

  hablar($texto) {
    console.log(`${this.nombre}: ${texto}}`);
  }
  datos() {
    console.log(`${this.nombre}-${this.edad}`);
  }
}

// Instancias
const lautaro = new Persona("Lautaro", 25);
const matias = new Persona("Matias", 22);

lautaro.datos();
matias.datos();

console.log(Persona.especie);

Persona.especie = "alien";

console.log(Persona.especie);
