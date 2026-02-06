// Uso prompt-sync para que el programa sea interactivo en consola
import promptSync from "prompt-sync";
const prompt = promptSync();

// Importo las funciones que hice en los módulos
import { 
  usuariosActivosConPosts, 
  publicacionesConComentarios, 
  buscarPublicacionPorId, 
  eliminarPublicacion 
} from "./modulos/index.js";

const main = async () => {
  console.log(" ");
  console.log("1. Ver usuarios activos y sus publicaciones");
  console.log("2. Revisar publicaciones con y sin comentarios");
  console.log("3. Buscar una publicación por ID");
  console.log("4. Eliminar una publicación (si no tiene comentarios)");

  // Pido al usuario que elija qué ejercicio quiere correr
  const opcion = parseInt(prompt("Escribe el número del ejercicio que quieres probar: "));

  switch (opcion) {
    case 1:
      // Ejercicio 1
      const resultado1 = await usuariosActivosConPosts();
      console.log("Usuarios activos y cantidad de publicaciones:");
      console.log(resultado1);
      break;

    case 2:
      // Ejercicio 2
      const resultado2 = await publicacionesConComentarios();
      console.log("Listado de publicaciones con su estado:");
      console.log(resultado2);
      break;

    case 3:
      // Ejercicio 3
      const idPublicacion = parseInt(prompt("Ingresa el ID de la publicación que quieres consultar: "));
      const resultado3 = await buscarPublicacionPorId(idPublicacion);
      console.log("Información detallada de la publicación:");
      console.log(resultado3);
      break;

    case 4:
      // Ejercicio 4
      const idEliminar = parseInt(prompt("Ingresa el ID de la publicación que quieres intentar eliminar: "));
      const resultado4 = await eliminarPublicacion(idEliminar);
      console.log("Resultado:");
      console.log(resultado4);
      break;

    default:
      console.log("Opción no válida. Por favor escribe un número entre 1 y 4.");
  }
};

// Arranco el programa
main();
