import { useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import MovieDetail from './components/MovieDetail';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function App() {
  const [currentView, setCurrentView] = useState('search'); // 'search' | 'detail'
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovieData, setSelectedMovieData] = useState(null);

  // Estados de carga y manejo de errores para peticiones HTTP
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // 1. Búsqueda de Películas
  const handleSearch = async (query) => {
    if (!query || !query.trim()) return;

    // Limpieza de estado de error previo e inicio de carga
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/movies/search?q=${encodeURIComponent(query.trim())}`
      );

      // Verificación de respuesta ok
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Ocurrió un error en el servidor');
      }

      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error.message);
      setErrorMessage(error.message || 'Ocurrió un error al buscar las películas');
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Detalle de Película (Función interna)
  const fetchMovieDetails = async (tmdbId) => {
    // Limpieza de estado de error previo e inicio de carga
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/movies/${tmdbId}`);

      // Verificación de respuesta ok
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Ocurrió un error en el servidor');
      }

      const data = await response.json();
      setSelectedMovieData(data);
    } catch (error) {
      console.error(`Error al cargar la película ${tmdbId}:`, error.message);
      setErrorMessage(error.message || 'No se pudo obtener el detalle de la película');
    } finally {
      setIsLoading(false);
    }
  };

  // Manejador para seleccionar película y cambiar a vista detalle
  const handleSelectMovie = async (tmdbId) => {
    setSelectedMovieId(tmdbId);
    setCurrentView('detail');
    await fetchMovieDetails(tmdbId);
  };

  // Manejador para volver a la vista de búsqueda
  const handleBackToSearch = () => {
    setCurrentView('search');
    setSelectedMovieId(null);
    setSelectedMovieData(null);
    setErrorMessage(null);
  };

  // 3. Crear Reseña
  const handleSubmitReview = async (reviewData) => {
    if (!selectedMovieId) return;

    // Limpieza de estado de error previo e inicio de carga
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/movies/${selectedMovieId}/reviews`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reviewData)
        }
      );

      // Verificación de respuesta ok
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Ocurrió un error en el servidor');
      }

      // Refrescar los detalles para recalcular avgScore y mostrar la nueva reseña
      await fetchMovieDetails(selectedMovieId);
    } catch (error) {
      console.error('Error al enviar la reseña:', error.message);
      setErrorMessage(error.message || 'Ocurrió un error al enviar tu reseña');
      setIsLoading(false);
    }
  };

  // 4. Eliminar Reseña
  const handleDeleteReview = async (reviewId) => {
    if (!selectedMovieId || !reviewId) return;

    // Limpieza de estado de error previo e inicio de carga
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/reviews/${reviewId}`, {
        method: 'DELETE'
      });

      // Verificación de respuesta ok
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Ocurrió un error en el servidor');
      }

      // Refrescar los detalles para recalcular avgScore y actualizar la lista
      await fetchMovieDetails(selectedMovieId);
    } catch (error) {
      console.error(`Error al eliminar reseña ${reviewId}:`, error.message);
      setErrorMessage(error.message || 'Ocurrió un error al eliminar la reseña');
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 onClick={handleBackToSearch} style={{ cursor: 'pointer' }}>
          🎬 CineClub
        </h1>
        <p className="subtitle">Explora películas y comparte tus opiniones</p>
      </header>

      <main className="app-main">
        {/* Banner visual de error */}
        {errorMessage && (
          <div className="error-banner">
            <span>❌ {errorMessage}</span>
            <button onClick={() => setErrorMessage(null)} className="close-error">
              ✕
            </button>
          </div>
        )}

        {/* Indicador visual de carga */}
        {isLoading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Cargando información...</p>
          </div>
        )}

        {currentView === 'search' ? (
          <div className="search-view">
            <SearchBar onSearch={handleSearch} />
            <MovieGrid movies={movies} onSelectMovie={handleSelectMovie} />
          </div>
        ) : (
          <div className="detail-view">
            <MovieDetail
              movieData={selectedMovieData}
              onBack={handleBackToSearch}
              onSubmitReview={handleSubmitReview}
              onDeleteReview={handleDeleteReview}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
