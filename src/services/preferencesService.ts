import apiClient from './api';
import type { 
  Nivel, 
  Lenguaje, 
  Categoria, 
  Preferencia, 
  PreferenciaCreate,
  ApiResponse 
} from '../types/preferences';

export const preferencesService = {
  // Obtener niveles disponibles
  getNiveles: async (): Promise<Nivel[]> => {
    const response = await apiClient.get<ApiResponse<Nivel[]>>('/niveles');
    return response.data.data;
  },

  // Obtener lenguajes disponibles
  getLenguajes: async (): Promise<Lenguaje[]> => {
    const response = await apiClient.get<ApiResponse<Lenguaje[]>>('/lenguajes');
    return response.data.data;
  },

  // Obtener categorías disponibles
  getCategorias: async (): Promise<Categoria[]> => {
    const response = await apiClient.get<ApiResponse<Categoria[]>>('/categorias');
    return response.data.data;
  },

  // Obtener preferencias del usuario actual
  getMyPreferences: async (): Promise<Preferencia | null> => {
    try {
      const response = await apiClient.get<ApiResponse<Preferencia>>('/preferencias/me');
      return response.data.data;
    } catch (error: any) {
      // Si el usuario no tiene preferencias, el backend devuelve 404
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  // Crear preferencias del usuario
  createPreferences: async (data: PreferenciaCreate): Promise<Preferencia> => {
    const response = await apiClient.post<ApiResponse<Preferencia>>('/preferencias', data);
    return response.data.data;
  },

  // Actualizar preferencias del usuario
  updatePreferences: async (data: Partial<PreferenciaCreate>): Promise<Preferencia> => {
    const response = await apiClient.put<ApiResponse<Preferencia>>('/preferencias/me', data);
    return response.data.data;
  },

  // Eliminar preferencias del usuario
  deletePreferences: async (): Promise<void> => {
    await apiClient.delete('/preferencias/me');
  },
};
