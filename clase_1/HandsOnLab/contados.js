class Contador {
  static contadorGlobal = 0;

  constructor(responsable) {
    this.contador = 0;
    this.responsable = responsable;
  }

  getResponsable() {
    return this.responsable;
  }

  contar() {
    this.contador++;
    Contador.contadorGlobal++;
  }

  getCuentaIndividual() {
    return this.contador;
  }

  getCuentaGlobal() {
    return Contador.contadorGlobal;
  }
}

const cnt1 = new Contador("Mario");
const cnt2 = new Contador("Cesar");

cnt1.contar();
cnt1.contar();
cnt1.contar();
cnt2.contar();
cnt2.contar();
cnt2.contar();
cnt2.contar();
cnt2.contar();

console.log(cnt2.getResponsable());
console.log(cnt2.getCuentaIndividual());
console.log(cnt2.getCuentaGlobal());

console.log(cnt1.getResponsable());
console.log(cnt1.getCuentaIndividual());
console.log(cnt1.getCuentaGlobal());
