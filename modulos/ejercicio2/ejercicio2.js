export const publicacionesConEstadoComentarios = async () => {
  try {
    // Consultar todas las publicaciones
    const postsResponse = await fetch("http://localhost:3000/posts");
    const posts = await postsResponse.json();

    // Consultar todos los comentarios
    const commentsResponse = await fetch("http://localhost:3000/comments");
    const comments = await commentsResponse.json();

    // Relacionar comentarios con sus publicaciones
    const resultado = posts.map(post => {
      const cantidadComentarios = comments.filter(c => c.postId === post.id).length;

      // Clasificar publicaciones según tengan o no comentarios
      const estado = cantidadComentarios > 0 ? "Con comentarios" : "Sin comentarios";

      return {
        titulo: post.title,
        comentarios: cantidadComentarios,
        estado: estado
      };
    });

    // 5. Retornar el listado
    return resultado;
  } catch (error) {
    console.error("Error en ejercicio 2:", error.message);
  }
};
