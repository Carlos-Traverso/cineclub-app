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
const axios = require('axios');

// Inicializar la aplicación Express
const app = express();

// Almacenamiento en memoria para las reseñas
let reviews = [];

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

// Endpoint 1: Búsqueda de películas en TMDB
app.get('/api/movies/search', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({
      error: "El parámetro de búsqueda 'q' es requerido"
    });
  }

  try {
    const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query: query,
        language: 'es-ES'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error al buscar películas en TMDB:', error.message);
    res.status(500).json({
      error: 'Error al comunicarse con la API de TMDB'
    });
  }
});

// Endpoint 2: Detalle de una película específica estructurado con cálculo de reseñas
app.get('/api/movies/:tmdbId', async (req, res) => {
  const { tmdbId } = req.params;

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        language: 'es-ES'
      }
    });

    // Obtener las reseñas correspondientes a esta película
    const movieReviews = reviews.filter(r => r.tmdbId === tmdbId);

    // Calcular el promedio redondeado a 1 decimal
    let avgScore = 0;
    if (movieReviews.length > 0) {
      const totalScore = movieReviews.reduce((sum, review) => sum + review.score, 0);
      avgScore = Number((totalScore / movieReviews.length).toFixed(1));
    }

    // Estructura de respuesta unificada requerida por el frontend
    res.json({
      movie: response.data,
      reviews: movieReviews,
      avgScore: avgScore
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        error: 'Película no encontrada en TMDB'
      });
    }

    console.error(`Error al obtener detalle de película ${tmdbId}:`, error.message);
    res.status(500).json({
      error: 'Error al comunicarse con la API de TMDB'
    });
  }
});

// Endpoint 3: Crear una reseña para una película
app.post('/api/movies/:tmdbId/reviews', (req, res) => {
  const { tmdbId } = req.params;
  const { author, score, comment } = req.body;

  // Validación de campos obligatorios
  if (
    author === undefined || author === null ||
    score === undefined || score === null ||
    comment === undefined || comment === null ||
    String(author).trim() === '' ||
    String(comment).trim() === ''
  ) {
    return res.status(400).json({
      error: 'Todos los campos (author, score, comment) son obligatorios'
    });
  }

  // Validación de tipo de dato, finitud y rango para el puntaje (score)
  const parsedScore = Number(score);
  if (isNaN(parsedScore) || !Number.isFinite(parsedScore) || parsedScore < 1 || parsedScore > 5) {
    return res.status(400).json({
      error: 'El puntaje debe ser un número entre 1 y 5'
    });
  }


  // Creación del objeto de reseña
  const newReview = {
    id: Date.now().toString(),
    tmdbId: tmdbId,
    author: String(author).trim(),
    score: parsedScore,
    comment: String(comment).trim(),
    createdAt: new Date().toISOString()
  };

  reviews.push(newReview);

  res.status(201).json(newReview);
});

// Endpoint 4: Eliminar una reseña específica por ID
app.delete('/api/reviews/:reviewId', (req, res) => {
  const { reviewId } = req.params;

  const reviewIndex = reviews.findIndex(r => r.id === reviewId);

  if (reviewIndex === -1) {
    return res.status(404).json({
      error: 'Reseña no encontrada'
    });
  }

  reviews.splice(reviewIndex, 1);

  res.json({
    message: 'Reseña eliminada correctamente',
    reviewId: reviewId
  });
});



// --- INICIALIZACIÓN ---

// Definición del puerto de escucha (prioriza variable de entorno)
const PORT = process.env.PORT || 3001;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
