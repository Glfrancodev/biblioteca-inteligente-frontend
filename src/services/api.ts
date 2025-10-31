import axios from 'axios';
import { API_BASE_URL } from '../config/api';

// Crear instancia de axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a todas las peticiones
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const reqUrl: string | undefined = error.config?.url;
      const isLoginCall = !!reqUrl && reqUrl.includes('/auth/login');
      const onLoginPage = typeof window !== 'undefined' && window.location.pathname === '/login';

      // Para errores de credenciales en /auth/login o si ya estamos en /login,
      // no forzamos redirección (evita refresco). Solo propagamos el error.
      if (isLoginCall || onLoginPage) {
        return Promise.reject(error);
      }

      // Para otros 401, limpiar sesión y redirigir a /login
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      if (!onLoginPage) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
