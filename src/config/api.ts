// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://biblioteca-inteligente-backend-production.up.railway.app';

// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
};

// User endpoints
export const USER_ENDPOINTS = {
  ME: '/usuarios/me',
  LIST: '/usuarios',
};

// Book endpoints
export const BOOK_ENDPOINTS = {
  LIST: '/libros',
  DETAIL: (id: number) => `/libros/${id}`,
};

// Reading endpoints
export const READING_ENDPOINTS = {
  LIST: '/lecturas',
  CREATE: '/lecturas',
  UPDATE: (id: number) => `/lecturas/${id}`,
  DELETE: (id: number) => `/lecturas/${id}`,
};

// Preferences endpoints
export const PREFERENCE_ENDPOINTS = {
  MY: '/preferencias/me',
  CREATE: '/preferencias',
  UPDATE: '/preferencias/me',
};

// Other endpoints
export const OTHER_ENDPOINTS = {
  LEVELS: '/niveles',
  LANGUAGES: '/lenguajes',
  CATEGORIES: '/categorias',
  AUTHORS: '/autores',
  PUBLISHERS: '/editoriales',
};
