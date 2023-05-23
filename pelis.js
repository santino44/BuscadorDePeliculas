const fs = require(`fs`);
const peliculas = fs.readFileSync(__dirname + "/pelis.json");

exports.parsearArgumentos = (argv) => {
  const respuesta = {};

  argv.forEach(function (item, ind) {
    if (item.startsWith("--")) {
      const nombreSinGuiones = item.slice(2);
      respuesta[nombreSinGuiones] = argv[ind + 1];
    }
  });
  return respuesta;
};

exports.busqueda = function (modo) {
  let arrayPelis = buscar();
  if (modo.sort) {
    arrayPelis = ordenarPor(modo.sort, arrayPelis);
  }
  if (modo.search) {
    arrayPelis = buscarPorTitulo(modo.search, arrayPelis);
  }
  if (modo.tag) {
    arrayPelis = buscarPorTag(modo.tag, arrayPelis);
  }
  return arrayPelis;
};

function buscar() {
  return JSON.parse(peliculas);
}

function ordenarPor(criterio, array) {
  const arrayPelisOrdenado = array.sort(function (a, b) {
    if (criterio === "rating") {
      if (a[criterio] > b[criterio]) {
        return -1;
      }
      if (a[criterio] < b[criterio]) {
        return 1;
      }
    }
    if (criterio === "title") {
      if (a[criterio] > b[criterio]) {
        return 1;
      }
      if (a[criterio] < b[criterio]) {
        return -1;
      }
    }
    return 0;
  });
  return arrayPelisOrdenado;
}

function buscarPorTitulo(texto, array) {
  return array.filter((peli) =>
    peli.title.toLowerCase().includes(texto.toLowerCase())
  );
}

function buscarPorTag(tag, array) {
  return array.filter((peli) =>
    peli.tags.some((x) => x.toLowerCase().includes(tag.toLowerCase()))
  );
}
