const laDatos: string[] = ["Mario", "Cesar", "Fernando", "Karina"];

const mostrarLista = (data: any[]): string => {
  // Especificamos el tipo de 'data' como un array genérico
  if (data.length === 0) return "Lista Vacía";

  data.map((element: any) => {
    // Si quieres especificar el tipo, puedes usar 'element: string' si es solo texto
    console.log(element);
  });

  return `El array tiene ${data.length} elementos`;
};

// Casos de prueba
console.log(mostrarLista([])); // Lista Vacía
console.log(mostrarLista([1])); // El array tiene 1 elemento
console.log(mostrarLista(laDatos)); // El array tiene 4 elementos
