// Ejercicio 3: Buscar publicación por ID
// Recibe un ID, busca la publicación y cuenta sus comentarios.

export const buscarPublicacionPorId = async (id) => {
  try {
    // 1. Traer todas las publicaciones
    const postsResponse = await fetch("http://localhost:3000/posts");
    const posts = await postsResponse.json();

    // 2. Buscar la publicación específica
    // Convertimos ambos valores a número para evitar problemas de tipo
    const publicacion = posts.find(post => Number(post.id) === Number(id));

    if (!publicacion) {
      throw new Error("La publicación no fue encontrada.");
    }

    // 3. Traer todos los comentarios
    const commentsResponse = await fetch("http://localhost:3000/comments");
    const comments = await commentsResponse.json();

    // 4. Filtrar los comentarios que pertenecen a la publicación
    const comentariosPublicacion = comments.filter(c => Number(c.postId) === Number(id));

    // 5. Contar cuántos comentarios tiene
    const cantidadComentarios = comentariosPublicacion.length;

    // 6. Armar el objeto de salida
    const resultado = {
      titulo: publicacion.title,       // título del post
      contenido: publicacion.body,     // contenido del post
      numeroComentarios: cantidadComentarios // cantidad de comentarios asociados
    };

    return resultado;

  } catch (error) {
    console.error("Error en ejercicio 3:", error.message);
  }
};
