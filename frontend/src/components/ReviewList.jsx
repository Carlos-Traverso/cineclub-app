function ReviewList({ reviews = [], onDeleteReview }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="no-reviews">
        <p>Aún no hay reseñas para esta película. ¡Sé el primero en opinar!</p>
      </div>
    );
  }

  return (
    <div className="review-list">
      <h3>Reseñas de la comunidad ({reviews.length})</h3>
      <div className="reviews-container">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <span className="review-author">👤 {review.author}</span>
              <span className="review-score">{"⭐".repeat(review.score)} ({review.score}/5)</span>
            </div>
            <p className="review-comment">"{review.comment}"</p>
            <div className="review-footer">
              <small className="review-date">
                {new Date(review.createdAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </small>
              {onDeleteReview && (
                <button
                  className="delete-review-button"
                  onClick={() => onDeleteReview(review.id)}
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewList;
