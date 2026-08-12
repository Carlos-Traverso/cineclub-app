import MovieCard from './MovieCard';

function MovieGrid({ movies = [], onSelectMovie }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="empty-grid-message">
        <p>No se encontraron películas. Realiza una búsqueda para comenzar.</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </div>
  );
}

export default MovieGrid;
