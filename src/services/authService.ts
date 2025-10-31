import apiClient from './api';
import { AUTH_ENDPOINTS } from '../config/api';
import type { LoginCredentials, RegisterData, AuthResponse, Usuario, ApiResponse } from '../types/auth';

export const authService = {
  // Iniciar sesión
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, credentials);
    return response.data;
  },

  // Registrarse
  register: async (data: RegisterData): Promise<ApiResponse<Usuario>> => {
    const response = await apiClient.post<ApiResponse<Usuario>>(AUTH_ENDPOINTS.REGISTER, data);
    return response.data;
  },

  // Guardar token y datos del usuario
  saveAuthData: (token: string, expiresIn: number) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('token_expires_at', (Date.now() + expiresIn * 1000).toString());
  },

  // Obtener token
  getToken: (): string | null => {
    return localStorage.getItem('access_token');
  },

  // Verificar si está autenticado
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('access_token');
    const expiresAt = localStorage.getItem('token_expires_at');
    
    if (!token || !expiresAt) {
      return false;
    }

    return Date.now() < parseInt(expiresAt);
  },

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_expires_at');
    localStorage.removeItem('user');
  },

  // Obtener usuario actual
  getCurrentUser: async (): Promise<Usuario> => {
    const response = await apiClient.get<ApiResponse<Usuario>>('/usuarios/me');
    return response.data.data;
  },
};
