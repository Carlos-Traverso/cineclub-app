import { useState } from 'react';

function ReviewForm({ onSubmitReview }) {
  const [author, setAuthor] = useState('');
  const [score, setScore] = useState(5);
  const [comment, setComment] = useState('');
  const [warningMessage, setWarningMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación local de campos vacíos
    if (!author.trim() || !comment.trim()) {
      setWarningMessage('Por favor, completa todos los campos (nombre y comentario) antes de enviar.');
      return;
    }

    setWarningMessage(null);

    if (onSubmitReview) {
      onSubmitReview({
        author: author.trim(),
        score: Number(score),
        comment: comment.trim()
      });
    }

    setAuthor('');
    setScore(5);
    setComment('');
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>Escribir una reseña</h3>

      {warningMessage && (
        <div className="warning-banner">
          ⚠️ {warningMessage}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="author">Nombre/Autor:</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
            if (warningMessage) setWarningMessage(null);
          }}
          placeholder="Tu nombre"
        />
      </div>

      <div className="form-group">
        <label htmlFor="score">Puntaje (1 al 5):</label>
        <select
          id="score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        >
          <option value={1}>⭐ 1 - Muy mala</option>
          <option value={2}>⭐⭐ 2 - Mala</option>
          <option value={3}>⭐⭐⭐ 3 - Regular</option>
          <option value={4}>⭐⭐⭐⭐ 4 - Buena</option>
          <option value={5}>⭐⭐⭐⭐⭐ 5 - Excelente</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="comment">Comentario:</label>
        <textarea
          id="comment"
          rows="4"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            if (warningMessage) setWarningMessage(null);
          }}
          placeholder="Escribe tu opinión sobre la película..."
        />
      </div>

      <button type="submit" className="submit-button">
        Enviar Reseña
      </button>
    </form>
  );
}

export default ReviewForm;
