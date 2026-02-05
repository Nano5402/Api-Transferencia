// Ejercicio 1: Usuarios activos y sus publicaciones
// Esta función consulta usuarios y posts, filtra los activos y cuenta sus publicaciones.
export const usuariosActivosConPosts = async () => {
  try {
    // 1. Traer todos los usuarios desde el endpoint /users
    // fetch() hace la petición HTTP al servidor
    const usersResponse = await fetch("http://localhost:3000/users");
    // .json() convierte la respuesta en un objeto JavaScript
    const users = await usersResponse.json();

    // 2. Traer todas las publicaciones desde el endpoint /posts
    const postsResponse = await fetch("http://localhost:3000/posts");
    const posts = await postsResponse.json();

    // 3. Filtrar solo los usuarios que están activos (active: true)
    // .filter() recorre el arreglo y devuelve solo los que cumplen la condición
    const activeUsers = users.filter(user => user.active);

    // 4. Para cada usuario activo, contar cuántos posts tiene
    // .map() crea un nuevo arreglo transformando cada usuario en un objeto con nombre y cantidad de posts
    const resultado = activeUsers.map(user => {
      // .filter() busca los posts cuyo userId coincide con el id del usuario
      const cantidadPosts = posts.filter(post => post.userId === user.id).length;
      return {
        name: user.name,          // nombre del usuario
        publicaciones: cantidadPosts // cantidad de posts asociados
      };
    });

    // 5. Retornar el resultado para usarlo en app.js
    return resultado;
  } catch (error) {
    // Si algo falla, mostramos el error en consola
    console.error("Error en ejercicio 1:", error.message);
  }
};
