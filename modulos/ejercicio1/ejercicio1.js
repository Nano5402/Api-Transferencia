// Ejercicio 1: Usuarios activos y sus publicaciones
// La idea es traer usuarios y posts, filtrar los que están activos y contar cuántos posts tiene cada uno.

export const usuariosActivosConPosts = async () => {
  try {
    // 1. Pedimos todos los usuarios al servidor (endpoint /users)
    // fetch() hace la petición HTTP y .json() convierte la respuesta en objetos JS
    const usersResponse = await fetch("http://localhost:3000/users");
    const users = await usersResponse.json();

    // 2. Pedimos todas las publicaciones (endpoint /posts)
    const postsResponse = await fetch("http://localhost:3000/posts");
    const posts = await postsResponse.json();

    // 3. Nos quedamos solo con los usuarios activos (active: true)
    // .filter() recorre el arreglo y devuelve los que cumplen la condición
    const activeUsers = users.filter(user => user.active);

    // 4. Para cada usuario activo, contamos cuántos posts tiene
    // .map() arma un nuevo arreglo con el nombre y la cantidad de posts
    const resultado = activeUsers.map(user => {
      // Ojo: usamos Number() para evitar problemas si userId o id vienen como string
      const cantidadPosts = posts.filter(post => Number(post.userId) === Number(user.id)).length;

      return {
        name: user.name,              // nombre del usuario
        publicaciones: cantidadPosts  // cuántos posts tiene (puede ser 0)
      };
    });

    // 5. Retornamos el resultado para mostrarlo en app.js
    return resultado;

  } catch (error) {
    // Si algo falla, mostramos el error en consola
    console.error("Error en ejercicio 1:", error.message);
  }
};
