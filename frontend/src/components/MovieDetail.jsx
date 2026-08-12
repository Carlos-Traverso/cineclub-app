import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';

function MovieDetail({
  movieData,
  onBack,
  onSubmitReview,
  onDeleteReview
}) {
  if (!movieData || !movieData.movie) {
    return (
      <div className="movie-detail-loading">
        <p>Cargando información de la película...</p>
        <button onClick={onBack} className="back-button">
          ← Volver a la búsqueda
        </button>
      </div>
    );
  }

  const { movie, reviews = [], avgScore = 0 } = movieData;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=Sin+Imagen';

  return (
    <div className="movie-detail-container">
      <button onClick={onBack} className="back-button">
        ← Volver a la búsqueda
      </button>

      <div className="movie-detail-hero">
        <img src={posterUrl} alt={movie.title} className="detail-poster" />
        <div className="detail-info">
          <h2>{movie.title}</h2>
          {movie.tagline && <p className="movie-tagline"><em>"{movie.tagline}"</em></p>}
          <p className="movie-overview">{movie.overview || 'Sin descripción disponible.'}</p>

          <div className="movie-meta">
            <p><strong>Fecha de estreno:</strong> {movie.release_date || 'Desconocida'}</p>
            {movie.runtime && <p><strong>Duración:</strong> {movie.runtime} min</p>}
            {movie.genres && movie.genres.length > 0 && (
              <p>
                <strong>Géneros:</strong>{' '}
                {movie.genres.map((g) => g.name).join(', ')}
              </p>
            )}
            <p className="average-score-badge">
              <strong>Promedio CineClub:</strong> ⭐ {avgScore > 0 ? avgScore : 'Sin reseñas'}
            </p>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <ReviewList reviews={reviews} onDeleteReview={onDeleteReview} />
        <ReviewForm onSubmitReview={onSubmitReview} />
      </div>
    </div>
  );
}

export default MovieDetail;
