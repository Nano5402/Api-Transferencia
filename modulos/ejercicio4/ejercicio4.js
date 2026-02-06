// Esta función recibe un ID de publicación, valida si tiene comentarios
// y decide si se puede eliminar o no.

export const eliminarPublicacion = async (id) => {
  try {
    // Traer todas las publicaciones desde el endpoint /posts
    const postsResponse = await fetch("http://localhost:3000/posts");
    const posts = await postsResponse.json();

    // Buscar la publicación específica por su id
    // Convertimos ambos valores a número para evitar problemas de tipo
    const publicacion = posts.find(post => Number(post.id) === Number(id));

    if (!publicacion) {
      throw new Error("Publicación no encontrada.");
    }

    // Traer todos los comentarios desde el endpoint /comments
    const commentsResponse = await fetch("http://localhost:3000/comments");
    const comments = await commentsResponse.json();

    // Verificar si la publicación tiene comentarios asociados
    // .some() devuelve true si al menos un comentario cumple la condición
    const tieneComentarios = comments.some(c => Number(c.postId) === Number(id));

    if (tieneComentarios) {
      // Si hay comentarios, no se elimina
      return "Esta publicación no se puede eliminar ya que tiene comentarios.";
    } else {
      // Si no tiene comentarios, ejecutar la eliminación con DELETE
      await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE"
      });

      // Validar el resultado con una nueva consulta
      const validarResponse = await fetch(`http://localhost:3000/posts/${id}`);
      if (validarResponse.status === 404) {
        return "La publicacion se elimino de forma exitosa.";
      } else {
        return "Error: la publicación no se eliminó";
      }
    }

  } catch (error) {
    console.error("Error en ejercicio 4:", error.message);
  }
};
