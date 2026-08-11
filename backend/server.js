// Cargar variables de entorno al inicio
require('dotenv').config();

// Validar clave de la API de TMDB en las variables de entorno
const tmdbKey = process.env.TMDB_API_KEY;
if (!tmdbKey || tmdbKey === 'tu_clave_de_tmdb_aqui') {
  console.warn(
    '\x1b[33m%s\x1b[0m',
    'ADVERTENCIA: La clave API de TMDB (TMDB_API_KEY) no está configurada o contiene el valor por defecto en el archivo .env.'
  );
}


// Importar módulos requeridos
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Inicializar la aplicación Express
const app = express();

// --- MIDDLEWARES GLOBALES ---

// 1. CORS: Habilitar peticiones cross-origin para conectar el frontend
app.use(cors());

// 2. JSON Parser: Parsear el cuerpo de las peticiones en formato JSON
app.use(express.json());

// 3. Logger: Registrar todas las peticiones HTTP entrantes en la consola
app.use(morgan('dev'));

// --- RUTAS ---

// Ruta GET de diagnóstico (health check)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Servidor CineClub activo'
  });
});

// --- INICIALIZACIÓN ---

// Definición del puerto de escucha (prioriza variable de entorno)
const PORT = process.env.PORT || 3001;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
