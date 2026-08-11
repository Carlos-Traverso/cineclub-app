// Cargar variables de entorno al inicio
require('dotenv').config();

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
