export interface Nivel {
  idNivel: number;
  nombre: string;
}

export interface Lenguaje {
  idLenguaje: number;
  nombre: string;
}

export interface Categoria {
  idCategoria: number;
  nombre: string;
}

export interface Preferencia {
  idPreferencias: number;
  idUsuario: number;
  idNivel: number | null;
  creada_en: string;
  lenguajes: Lenguaje[];
  categorias: Categoria[];
  nivel: Nivel | null;
}

export interface PreferenciaCreate {
  nivel_id: number | null;
  lenguajes_ids: number[];
  categorias_ids: number[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
  count?: number; // Cantidad de elementos devueltos en arrays
}
