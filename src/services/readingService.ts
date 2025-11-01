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
};
