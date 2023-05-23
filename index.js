const { parsearArgumentos, busqueda } = require("./pelis");

function main() {
  const soloLosArgumentos = process.argv.slice(2);

  const argumentos = parsearArgumentos(soloLosArgumentos);

  const resultado = busqueda(argumentos);

  console.log(resultado);
}

main();
