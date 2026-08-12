import { useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import MovieDetail from './components/MovieDetail';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('search'); // 'search' | 'detail'
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovieData, setSelectedMovieData] = useState(null);

  // Estados de carga y manejo de errores para peticiones HTTP
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Manejador para seleccionar película y cambiar a vista detalle
  const handleSelectMovie = (tmdbId) => {
    setSelectedMovieId(tmdbId);
    setCurrentView('detail');
  };

  // Manejador para volver a la vista de búsqueda
  const handleBackToSearch = () => {
    setCurrentView('search');
    setSelectedMovieId(null);
    setSelectedMovieData(null);
    setErrorMessage(null);
  };

  // Manejador simulado de búsqueda (a conectar con backend en el siguiente módulo)
  const handleSearch = (query) => {
    console.log('Buscando película:', query);
  };

  // Manejadores simulados de reseñas (a conectar con backend)
  const handleSubmitReview = (reviewData) => {
    console.log('Enviando reseña:', reviewData);
  };

  const handleDeleteReview = (reviewId) => {
    console.log('Eliminando reseña:', reviewId);
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
            <p>Cargando películas...</p>
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
