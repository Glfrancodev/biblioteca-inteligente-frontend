# BiblioTech - Frontend

Sistema inteligente de recomendación de libros técnicos con gestión de progreso de lectura.

Aplicación web frontend desarrollada con React, TypeScript y Vite para el curso de Ingeniería en Calidad.

## 🚀 Tecnologías Utilizadas

- **React 19.1.1** - Biblioteca de interfaz de usuario
- **TypeScript 5.9.3** - Superset tipado de JavaScript
- **Vite 7.1.7** - Build tool y dev server ultrarrápido
- **React Router DOM 7.9.5** - Navegación y enrutamiento
- **Axios 1.13.1** - Cliente HTTP para peticiones API
- **Lucide React 0.552.0** - Biblioteca de iconos
- **ESLint** - Linter para mantener calidad de código

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn

## 🔧 Instalación

1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd Frontend
```

2. Instalar dependencias

```bash
npm install
```

## 🏃 Ejecutar el Proyecto

### Modo Desarrollo

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:5173/`

### Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`

### Vista Previa del Build

```bash
npm run preview
```

### Linter

```bash
npm run lint
```

## 📁 Estructura del Proyecto

```
Frontend/
├── public/                 # Archivos estáticos
├── src/
│   ├── assets/            # Imágenes, fuentes y otros recursos
│   ├── components/        # Componentes reutilizables
│   │   └── landing/       # Componentes de la landing page
│   │       ├── Navbar.tsx
│   │       ├── Hero.tsx
│   │       ├── Features.tsx
│   │       ├── HowItWorks.tsx
│   │       ├── Stats.tsx
│   │       ├── CTA.tsx
│   │       └── Footer.tsx
│   ├── pages/             # Páginas de la aplicación
│   │   ├── LandingPage.tsx      # Página de inicio pública
│   │   ├── LoginPage.tsx        # Inicio de sesión
│   │   ├── RegisterPage.tsx     # Registro de usuarios
│   │   ├── OnboardingPage.tsx   # Configuración inicial de preferencias
│   │   └── HomePage.tsx         # Dashboard principal
│   ├── services/          # Servicios y lógica de negocio
│   │   ├── api.ts               # Configuración de Axios
│   │   ├── authService.ts       # Servicio de autenticación
│   │   └── preferencesService.ts # Servicio de preferencias
│   ├── types/             # Definiciones de TypeScript
│   │   ├── auth.ts              # Tipos para autenticación
│   │   └── preferences.ts       # Tipos para preferencias
│   ├── config/            # Configuraciones
│   │   └── api.ts         # Configuración de API
│   ├── utils/             # Utilidades y helpers
│   ├── App.tsx            # Componente principal
│   ├── App.css            # Estilos globales
│   ├── main.tsx           # Punto de entrada
│   └── index.css          # Estilos base
├── index.html             # HTML principal
├── vite.config.ts         # Configuración de Vite
├── tsconfig.json          # Configuración de TypeScript
├── eslint.config.js       # Configuración de ESLint
└── package.json           # Dependencias y scripts
```

## 🛣️ Rutas de la Aplicación

- `/` - Landing Page (página de inicio pública)
- `/login` - Página de inicio de sesión
- `/register` - Página de registro
- `/onboarding` - Configuración inicial de preferencias (protegida)
- `/home` - Dashboard principal (protegida, requiere autenticación y preferencias configuradas)

## 🔒 Rutas Protegidas

Las rutas protegidas utilizan un componente `ProtectedRoute` que verifica la autenticación del usuario mediante el `authService`. Si el usuario no está autenticado, se redirige automáticamente a `/login`.

## 🎯 Flujo de Onboarding

Cuando un usuario inicia sesión por primera vez, se verifica si tiene preferencias configuradas:

1. **Sin preferencias**: El usuario es redirigido a `/onboarding` para completar 3 pasos:

   - **Paso 1**: Seleccionar nivel de experiencia (Principiante, Intermedio, Avanzado)
   - **Paso 2**: Seleccionar lenguajes de programación de interés (mínimo 1)
   - **Paso 3**: Seleccionar temas de interés (mínimo 1)

2. **Con preferencias**: El usuario accede directamente al `/home`

Los datos para el onboarding son obtenidos dinámicamente desde el backend:

- Niveles desde `/niveles`
- Lenguajes desde `/lenguajes`
- Categorías desde `/categorias`

## 🎨 Componentes Principales

### Landing Page

- **Navbar**: Barra de navegación con enlaces y botones de acción
- **Hero**: Sección principal con título y CTA
- **Features**: Características principales del producto
- **HowItWorks**: Explicación del funcionamiento
- **Stats**: Estadísticas e indicadores
- **CTA**: Call-to-action para conversión
- **Footer**: Pie de página con información y enlaces

### Autenticación

- **LoginPage**: Formulario de inicio de sesión con validación
- **RegisterPage**: Formulario de registro con validación
- **OnboardingPage**: Configuración de preferencias en 3 pasos con datos dinámicos
- **HomePage**: Dashboard principal para usuarios autenticados con verificación de preferencias

## 🔌 API Configuration

La configuración de la API se encuentra en:

- `src/config/api.ts` - URLs base y endpoints definidos
- `src/services/api.ts` - Instancia de Axios configurada con interceptores
- `src/services/authService.ts` - Métodos de autenticación (login, register, logout)
- `src/services/preferencesService.ts` - Métodos para gestionar preferencias del usuario

## 🛠️ Scripts Disponibles

| Script            | Descripción                                    |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo con HMR       |
| `npm run build`   | Compila TypeScript y construye para producción |
| `npm run lint`    | Ejecuta ESLint para verificar el código        |
| `npm run preview` | Previsualiza el build de producción localmente |

## 📦 Dependencias Principales

### Producción

- `react` - Biblioteca para construir interfaces
- `react-dom` - Renderizado de React en el DOM
- `react-router-dom` - Sistema de enrutamiento
- `axios` - Cliente HTTP
- `lucide-react` - Iconos modernos

### Desarrollo

- `typescript` - Lenguaje tipado
- `vite` - Build tool
- `@vitejs/plugin-react` - Plugin de React para Vite
- `eslint` - Herramienta de linting
- `typescript-eslint` - Reglas de ESLint para TypeScript

## 🌐 Variables de Entorno

### Configuración Inicial

1. Copiar el archivo de ejemplo:

```bash
# Windows
copy .env.example .env

# Linux/Mac
cp .env.example .env
```

2. Editar `.env` con tus configuraciones:

```env
# Desarrollo local
VITE_API_BASE_URL=http://localhost:8000

# Producción (ejemplo)
# VITE_API_BASE_URL=https://api.biblioficct.vercel.app
```

### Variables Disponibles

| Variable            | Descripción              | Valor por defecto       |
| ------------------- | ------------------------ | ----------------------- |
| `VITE_API_BASE_URL` | URL base del backend API | `http://localhost:8000` |

**Nota Importante**:

- El archivo `.env` está en `.gitignore` y NO se debe subir al repositorio
- Usa `.env.example` como referencia para configurar tu entorno local
- En producción, configura las variables de entorno en tu plataforma de hosting (Vercel, Netlify, etc.)

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Notas de Desarrollo

- El proyecto utiliza **Hot Module Replacement (HMR)** para actualizaciones rápidas durante el desarrollo
- TypeScript está configurado en modo estricto para mejor seguridad de tipos
- ESLint está configurado con reglas para React Hooks y React Refresh
- Los estilos CSS están organizados por componente (archivos `.css` junto a cada `.tsx`)

## 🔗 Integración con Backend

Este frontend se conecta con el backend de FastAPI. Asegúrate de:

1. **Tener el backend corriendo** en `http://localhost:8000`
2. **Poblar la base de datos** ejecutando `python -m app.seed_data` en el backend
3. **Configurar CORS** en el backend para permitir peticiones desde el frontend

Ver documentación del backend en `../Backend/README.md`

## 🆕 Características Implementadas

✅ Sistema de autenticación con JWT  
✅ Registro de nuevos usuarios  
✅ Onboarding con 3 pasos personalizables  
✅ Carga dinámica de niveles, lenguajes y categorías desde el backend  
✅ Validación de preferencias antes de acceder al dashboard  
✅ Rutas protegidas con redirección automática  
✅ Diseño responsive y moderno  
✅ Manejo de errores y estados de carga  
✅ Almacenamiento seguro de tokens en localStorage

## 📄 Licencia

Este proyecto es parte del curso de Ingeniería en Calidad.

---

Desarrollado con ❤️ para Ingeniería en Calidad
