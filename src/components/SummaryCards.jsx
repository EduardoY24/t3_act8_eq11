import { useEffect, useState } from 'react';
import { getTodos } from '../services/todosApi';
import './SummaryCards.css';

// Tarjetas de resumen de la seccion Inicio: total, pendientes y completadas
function SummaryCards() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  // Traer las tareas de la API al abrir la seccion
  useEffect(() => {
    async function loadTodos() {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch {
        setLoadError('No se pudo cargar el resumen. Revisa tu conexión e intenta de nuevo.');
      } finally {
        setIsLoading(false);
      }
    }

    loadTodos();
  }, []);

  if (isLoading) {
    return <p className="summary-message">Cargando resumen...</p>;
  }

  if (loadError) {
    return <p className="summary-message summary-message-error">{loadError}</p>;
  }

  const totalTodos = todos.length;
  const completedTodos = todos.filter((item) => item.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <p className="summary-label">Total de tareas</p>
        <p className="summary-number summary-number-total">{totalTodos}</p>
      </div>

      <div className="summary-card">
        <p className="summary-label">Pendientes</p>
        <p className="summary-number summary-number-pending">{pendingTodos}</p>
      </div>

      <div className="summary-card">
        <p className="summary-label">Completados</p>
        <p className="summary-number summary-number-done">{completedTodos}</p>
      </div>
    </div>
  );
}

export default SummaryCards;