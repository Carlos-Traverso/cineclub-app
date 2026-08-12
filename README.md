# 🎬 CineClub App

CineClub es una plataforma web fullstack donde los amantes del cine pueden buscar sus películas favoritas y gestionar opiniones o reseñas de la comunidad de manera directa. 

El proyecto consta de una arquitectura desacoplada con un servidor backend en **Node.js + Express** (que actúa como proxy seguro para comunicarse con la API de TMDB) y una interfaz frontend moderna construida con **React + Vite**.

---

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu computadora:
- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- Administrador de paquetes `npm` (instalado automáticamente con Node.js)
- Una clave de API de **The Movie Database (TMDB)**. Si no tienes una, puedes registrarte gratis en [themoviedb.org](https://www.themoviedb.org/) y solicitarla en la configuración de tu cuenta.

---

## ⚙️ Instalación y Configuración

Sigue estos pasos detallados para poner en marcha el proyecto en tu entorno local:

### 1. Clonar el repositorio
Abre tu terminal y descarga el proyecto:
```bash
git clone https://github.com/Carlos-Traverso/cineclub-app.git
cd cineclub-app
```

---

### 2. Configurar el Backend 🖥️

1. **Instalar las dependencias:**
   Entra a la carpeta del servidor e instala los paquetes necesarios:
   ```bash
   cd backend
   npm install
   ```

2. **Crear archivo de variables de entorno:**
   Dentro de la carpeta `backend/`, crea un archivo llamado `.env` (este archivo está excluido en el `.gitignore` por seguridad).
   
3. **Definir variables de entorno:**
   Escribe el siguiente contenido en tu archivo `.env`:
   ```env
   PORT=3001
   TMDB_API_KEY=tu_clave_de_tmdb_aqui
   ```
   *(Reemplaza `tu_clave_de_tmdb_aqui` con tu API Key personal de TMDB).*

---

### 3. Configurar el Frontend 💻

1. **Instalar las dependencias:**
   Regresa a la raíz, entra a la carpeta del cliente e instala los paquetes necesarios:
   ```bash
   cd ../frontend
   npm install
   ```

2. **Crear archivo de variables de entorno:**
   Dentro de la carpeta `frontend/`, crea un archivo llamado `.env`.

3. **Definir variables de entorno:**
   Escribe el siguiente contenido en tu archivo `.env`:
   ```env
   VITE_API_URL=http://localhost:3001
   ```
   *(También se incluye un archivo `.env.example` en la carpeta como referencia).*

---

## 🚀 Ejecución del Proyecto

Para correr la aplicación completa de forma local, debes abrir **dos terminales independientes** y ejecutar los siguientes comandos:

### Terminal 1: Iniciar Backend
```bash
cd backend
node server.js
```
El servidor backend se levantará escuchando peticiones en: **`http://localhost:3001`**.

### Terminal 2: Iniciar Frontend (Vite)
```bash
cd frontend
npm run dev
```
La aplicación cliente estará lista y corriendo en: **`http://localhost:5173`** (o el puerto que te asigne Vite por consola).

---

## 🔗 Arquitectura y Rutas de la API Backend

El backend funciona como proxy intermediario para que la aplicación React nunca consulte directamente APIs externas, garantizando la seguridad de la API Key.

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **GET** | `/api/health` | Estado de diagnóstico del servidor. |
| **GET** | `/api/movies/search?q=:query` | Busca películas consumiendo la API de TMDB. |
| **GET** | `/api/movies/:tmdbId` | Retorna detalles de la película, reseñas asociadas y puntaje promedio. |
| **POST** | `/api/movies/:tmdbId/reviews` | Agrega una reseña en memoria (campos: `author`, `score` del 1 al 5 y `comment`). |
| **DELETE** | `/api/reviews/:reviewId` | Elimina una reseña específica en memoria por su ID. |
