# Pilates Reformer App

Este proyecto es una aplicación web para la gestión de clases de pilates reformer, desarrollada con React, Vite y Tailwind CSS.

## Requisitos previos

- Node.js >= 18
- pnpm (o npm/yarn)

## Instalación

1. **Clona el repositorio:**

   ```sh
   git clone <URL_DEL_REPOSITORIO>
   cd pilates-reformer-app
   ```

2. **Instala las dependencias:**

   ```sh
   pnpm install
   # o
   npm install
   # o
   yarn install
   ```

3. **Configura las variables de entorno:**
   - Copia el archivo `.env.example` a `.env` y completa los valores necesarios.

   ```sh
   cp .env.example .env
   ```

4. **Inicia el servidor de desarrollo:**

   ```sh
   pnpm dev
   # o
   npm run dev
   # o
   yarn dev
   ```

5. **Abre la app:**
   - Ve a [http://localhost:5173](http://localhost:5173) en tu navegador.

## Estructura del proyecto

- `src/` — Código fuente principal
  - `components/` — Componentes reutilizables y de UI
  - `pages/` — Páginas principales de la app
  - `hooks/` — Custom hooks
  - `lib/` — Utilidades y configuración
  - `services/` — Servicios para lógica de negocio y API
  - `assets/` — Imágenes y recursos estáticos
- `public/` — Archivos públicos
- `dist/` — Carpeta de build (no se sube a git)

## Scripts útiles

- `pnpm dev` — Inicia el servidor de desarrollo
- `pnpm build` — Genera la build de producción
- `pnpm preview` — Previsualiza la build
- `pnpm lint` — Linting del código

## Buenas prácticas

- No subas archivos `.env` con credenciales reales.
- Usa ramas para nuevas features o fixes.
- Haz commits claros y descriptivos.

## Licencia

[MIT](LICENSE)
