import apiClient from './api';

export interface ReadingStats {
  librosTerminados: number;
  leyendoAhora: number;
  paginasLeidas: number;
}

interface PaginasLeidasData {
  total_paginas_leidas: number;
  total_lecturas: number;
  promedio_paginas_por_lectura: number;
  usuario_id: number;
  usuario_nombre: string;
}

export interface Lectura {
  idLectura: number;
  idUsuario: number;
  idLibro: number;
  estado: 'no_iniciado' | 'en_progreso' | 'completado' | 'abandonado';
  paginaLeidas: number;
  libro_titulo: string;
  libro_total_paginas: number;
  progreso_porcentaje: number;
  url_firmada: string | null;
  urlPortada: string | null;
}

export const readingService = {
  // Obtener estadísticas del usuario
  getStats: async (): Promise<ReadingStats> => {
    try {
      const [completados, enProgreso, paginasLeidas] = await Promise.all([
        apiClient.get('/lecturas/estado/completados'),
        apiClient.get('/lecturas/estado/en-progreso'),
        apiClient.get('/lecturas/estadisticas/paginas-leidas'),
      ]);

      const paginasData = paginasLeidas.data.data as PaginasLeidasData;

      return {
        librosTerminados: completados.data.count || 0,
        leyendoAhora: enProgreso.data.count || 0,
        paginasLeidas: paginasData?.total_paginas_leidas || 0,
      };
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      return {
        librosTerminados: 0,
        leyendoAhora: 0,
        paginasLeidas: 0,
      };
    }
  },

  // Obtener libros en progreso
  getBooksInProgress: async (): Promise<Lectura[]> => {
    try {
      const response = await apiClient.get('/lecturas/estado/en-progreso');
      return response.data.data || [];
    } catch (error) {
      console.error('Error al obtener libros en progreso:', error);
      return [];
    }
  },

  // Obtener lectura de un libro específico (si existe)
  getReadingByBook: async (bookId: number): Promise<Lectura | null> => {
    try {
      const response = await apiClient.get(`/lecturas/libro/${bookId}`);
      return response.data.data || null;
    } catch (error) {
      // Si no existe la lectura, retornar null (no es un error)
      return null;
    }
  },

  // Crear una nueva lectura
  createReading: async (bookId: number): Promise<{ idLectura: number } | null> => {
    try {
      const response = await apiClient.post('/lecturas', {
        paginaLeidas: 1,
        estado: 'en_progreso',
        idLibro: bookId,
      });
      return response.data.data || null;
    } catch (error) {
      console.error('Error al crear lectura:', error);
      return null;
    }
  },

  // Actualizar una lectura existente
  updateReading: async (
    lecturaId: number,
    paginasLeidas: number,
    estado: 'en_progreso' | 'completado'
  ): Promise<boolean> => {
    try {
      await apiClient.put(`/lecturas/${lecturaId}`, {
        paginaLeidas: paginasLeidas,
        estado,
      });
      return true;
    } catch (error) {
      console.error('Error al actualizar lectura:', error);
      return false;
    }
  },
};

// Servicio de libros
export interface LibroCatalogo {
  idLibro: number;
  titulo: string;
  totalPaginas?: number;
  sinopsis?: string;
  urlLibro?: string | null;
  url_firmada?: string | null;  // URL firmada de S3
  urlPortada?: string | null;
  idEditorial?: number;
  editorial?: {
    nombre: string;
    idEditorial: number;
  };
  autores?: Array<{
    nombre: string;
    idAutor: number;
  }>;
  categorias?: Array<{
    idCategoria: number;
    nombre: string;
  }>;
  lenguajes?: Array<{
    idLenguaje: number;
    nombre: string;
  }>;
}

export interface LibrosResponse {
  data: LibroCatalogo[];
  count: number;
  page: number;
  totalPages: number;
}

export const booksService = {
  // Obtener total de libros usando el endpoint optimizado
  getTotalBooks: async (): Promise<number> => {
    try {
      const response = await apiClient.get('/libros/count');
      return response.data.data?.total_libros || 0;
    } catch (error) {
      console.error('Error al obtener total de libros:', error);
      return 0;
    }
  },

  // Obtener catálogo de libros con paginación
  getBooks: async (page: number = 1, limit: number = 20): Promise<LibrosResponse> => {
    try {
      // Si el backend no soporta paginación con query params, usar offset
      const skip = (page - 1) * limit;
      const [booksResponse, totalBooks] = await Promise.all([
        apiClient.get(`/libros?skip=${skip}&limit=${limit}`),
        booksService.getTotalBooks(),
      ]);
      
      return {
        data: booksResponse.data.data || [],
        count: totalBooks,
        page,
        totalPages: Math.ceil(totalBooks / limit),
      };
    } catch (error) {
      console.error('Error al obtener catálogo de libros:', error);
      return {
        data: [],
        count: 0,
        page: 1,
        totalPages: 0,
      };
    }
  },

  // Obtener detalles de un libro específico
  getBookDetails: async (bookId: number): Promise<LibroCatalogo | null> => {
    try {
      const response = await apiClient.get(`/libros/${bookId}`);
      return response.data.data || null;
    } catch (error) {
      console.error('Error al obtener detalles del libro:', error);
      return null;
    }
  },

  // Obtener libros de un autor
  getBooksByAuthor: async (authorId: number, limit: number = 10): Promise<LibroCatalogo[]> => {
    try {
      const response = await apiClient.get(`/autores/${authorId}/libros?skip=0&limit=${limit}`);
      return response.data.data || [];
    } catch (error) {
      console.error('Error al obtener libros del autor:', error);
      return [];
    }
  },

  // Obtener recomendaciones
  getRecommendations: async (limit: number = 10): Promise<LibroCatalogo[]> => {
    try {
      const response = await apiClient.get(`/recomendaciones?limit=${limit}`);
      return response.data.data || [];
    } catch (error) {
      console.error('Error al obtener recomendaciones:', error);
      return [];
    }
  },
};
