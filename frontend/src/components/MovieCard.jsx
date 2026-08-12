function MovieCard({ movie, onSelectMovie }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=Sin+Imagen';

  const releaseYear = movie.release_date
    ? movie.release_date.split('-')[0]
    : 'N/A';

  const handleSelect = () => {
    if (onSelectMovie) {
      onSelectMovie(movie.id);
    }
  };

  return (
    <div className="movie-card" onClick={handleSelect}>
      <div className="poster-wrapper">
        <img src={posterUrl} alt={movie.title} className="movie-poster" />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-year">{releaseYear}</p>
        {movie.vote_average !== undefined && (
          <p className="movie-score">⭐ {Number(movie.vote_average).toFixed(1)}</p>
        )}
        <button className="detail-button" onClick={handleSelect}>
          Ver detalle
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
