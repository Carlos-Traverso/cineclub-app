import './App.css'

function App() {
  const apiUrl = import.meta.env.VITE_API_URL || 'No configurada';

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎬 CineClub</h1>
        <p className="subtitle">Plataforma de Películas y Reseñas</p>
      </header>

      <main className="app-content">
        <div className="status-card">
          <h2>Estado de la Configuración</h2>
          <p>
            <strong>URL del Backend (VITE_API_URL):</strong>{' '}
            <code className="env-badge">{apiUrl}</code>
          </p>
        </div>
      </main>
    </div>
  )
}

export default App
