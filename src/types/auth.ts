export interface Usuario {
  idUsuario: number;
  registro: string;
  nombre: string;
  email: string;
  telefono?: string;
  estado: 'activo' | 'inactivo' | 'suspendido';
  creado_en: string;
  actualizado_en: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  registro: string;
  nombre: string;
  email: string;
  telefono?: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    access_token: string;
    token_type: string;
    expires_in: number;
  };
  message: string;
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
  count?: number; // Cantidad de elementos devueltos en arrays
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}
