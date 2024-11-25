//REgistrador de Tikect de Eventos

class TicketManager {
  #precioBaseGanancia = 0.15;

  constructor() {
    this.eventos = [];
  }

  getEventos() {
    return this.eventos;
  }

  agregarEvento(evento) {
    console.log(evento);
    evento.precio += evento.precio * this.#precioBaseGanancia;

    if (this.eventos.length === 0) {
      evento.id = 1;
    } else {
      evento.id = this.eventos[this.eventos.length - 1].id + 1;
    }

    this.eventos.push(evento);
  }

  agregarUsuario(idEvento, idUsuario) {
    const evento = this.eventos.find((evento) => evento.id === idEvento);

    if (!evento) {
      return "No existe el evento";
    }

    if (!evento.participantes.includes(idUsuario)) {
      evento.participantes.push(idUsuario);
    } else {
      return "El usuario ya existe!!";
    }
  }

  ponerEventoEnGira(idEvento, nuevaLocalidad, nuevaFecha) {
    const evento = this.eventos.find((evento) => evento.id === idEvento);
    if (!evento) {
      return "El evento No existe";
    }
    const newEvento = {
      ...evento,
      lugar: nuevaLocalidad,
      fecha: nuevaFecha,
      id: this.eventos[this.eventos.length - 1].id + 1,
      participantes: [],
    };
    this.eventos.push(newEvento);
  }
}

class Evento {
  constructor(
    nombre,
    lugar,
    precio,
    capacidad = 58,
    fecha = Date.now(),
    participantes
  ) {
    this.nombre = nombre;
    this.lugar = lugar;
    this.precio = precio;
    this.capacidad = capacidad;
    this.fecha = fecha;
    this.participantes = [];
  }
}

//Set de pruebas

const manejadorEventos = new TicketManager();

console.log(
  1,
  "Agregando evento coder 1 para Argentina, precio:200, para 50 participantes"
);
manejadorEventos.agregarEvento(new Evento("Evento code 1", "Salta", 200, 50));

console.log(
  2,
  "Agregando al evento con id 1 la participacion del usuario con id 2"
);
manejadorEventos.agregarUsuario(1, 2);

console.log(
  3,
  "Crear una copia vacia del evento 1 para mexico para el 30/11/2024"
);
manejadorEventos.ponerEventoEnGira(1, "Mexico", "30/11/2024");

console.log(3, "Mostrar todos los eventos");

console.log(manejadorEventos.getEventos());
