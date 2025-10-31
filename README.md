# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

# Frontend - Ingeniería en Calidad

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
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── HomePage.tsx
│   ├── services/          # Servicios y lógica de negocio
│   │   ├── api.ts         # Configuración de Axios
│   │   └── authService.ts # Servicio de autenticación
│   ├── types/             # Definiciones de TypeScript
│   │   └── auth.ts
│   ├── config/            # Configuraciones
│   │   └── api.ts         # Configuración de API
│   ├── utils/             # Utilidades y helpers
│   ├── App.tsx            # Componente principal
│   ├── App.css            # Estilos globales
│   ├── main.tsx           # Punto de entrada
│   └── index.css          # Estilos base
├── .github/               # Configuraciones de GitHub
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
- `/home` - Página principal (protegida, requiere autenticación)

## 🔒 Rutas Protegidas

Las rutas protegidas utilizan un componente `ProtectedRoute` que verifica la autenticación del usuario mediante el `authService`. Si el usuario no está autenticado, se redirige automáticamente a `/login`.

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

- **LoginPage**: Formulario de inicio de sesión
- **RegisterPage**: Formulario de registro
- **HomePage**: Dashboard principal para usuarios autenticados

## 🔌 API Configuration

La configuración de la API se encuentra en:

- `src/config/api.ts` - URLs base y configuración
- `src/services/api.ts` - Instancia de Axios configurada
- `src/services/authService.ts` - Métodos de autenticación

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

Crear un archivo `.env` en la raíz del proyecto con:

```env
VITE_API_URL=http://localhost:3000/api
```

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

## 📄 Licencia

Este proyecto es parte del curso de Ingeniería en Calidad.

---

Desarrollado con ❤️ para Ingeniería en Calidad

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
