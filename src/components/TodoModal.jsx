import { useState } from 'react';
import './TodoModal.css';

function TodoModal({ todoToEdit, onClose, onSave }) {
  const isEditing = Boolean(todoToEdit);

  const [title, setTitle] = useState(isEditing ? todoToEdit.todo : '');
  const [status, setStatus] = useState(
    isEditing && todoToEdit.completed ? 'completado' : 'pendiente'
  );
  const [validationError, setValidationError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (title.trim() === '') {
      setValidationError('El nombre de la tarea es obligatorio');
      return;
    }

    setValidationError('');
    setIsSaving(true);
    await onSave({ todo: title.trim(), completed: status === 'completado' });
    setIsSaving(false);
  }

  return (
    <div className="modal-overlay">
      <form className="modal-card" onSubmit={handleSubmit}>
        <div className="modal-header">
          <div>
            <h2>{isEditing ? 'Editar tarea' : 'Nueva tarea'}</h2>
            <p>{isEditing ? 'Modifica los datos de la tarea' : 'Agrega una tarea a tu lista'}</p>
          </div>
          <button type="button" className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-field">
          <label htmlFor="todo-title">Tarea</label>
          <input
            id="todo-title"
            type="text"
            placeholder="Ej. Entregar práctica de React"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          {validationError && <span className="modal-error">{validationError}</span>}
        </div>

        <div className="modal-field">
          <label htmlFor="todo-status">Estado</label>
          <select
            id="todo-status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="pendiente">Pendiente</option>
            <option value="completado">Completado</option>
          </select>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn-primary" disabled={isSaving}>
            {isSaving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TodoModal;