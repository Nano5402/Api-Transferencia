// Ejercicio 2: Publicaciones con y sin comentarios
// La idea es traer posts y comentarios, relacionarlos y decir si tienen interacción o no.

export const publicacionesConComentarios = async () => {
  try {
    // 1. Pedimos todas las publicaciones al servidor (endpoint /posts)
    const postsResponse = await fetch("http://localhost:3000/posts");
    const posts = await postsResponse.json(); // .json() convierte la respuesta en objetos JS

    // 2. Pedimos todos los comentarios (endpoint /comments)
    const commentsResponse = await fetch("http://localhost:3000/comments");
    const comments = await commentsResponse.json();

    // 3. Relacionamos cada post con sus comentarios
    const resultado = posts.map(post => {
      // Usamos Number() para asegurarnos que comparamos números y no strings
      const comentariosPost = comments.filter(c => Number(c.postId) === Number(post.id));

      // Contamos cuántos comentarios tiene el post
      const cantidadComentarios = comentariosPost.length;

      // Estado: si tiene comentarios o no
      const estado = cantidadComentarios > 0 ? "Con comentarios" : "Sin comentarios";

      return {
        titulo: post.title,              // título del post
        numeroComentarios: cantidadComentarios, // cantidad de comentarios
        estado: estado                   // clasificación
      };
    });

    // 4. Retornamos el listado final
    return resultado;

  } catch (error) {
    console.error("Error en ejercicio 2:", error.message);
  }
};
