import { useEffect, useState } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/todosApi';
import TodoModal from './TodoModal';
import Pagination from './Pagination';
import './TodosTable.css';

// page, limit y las funciones onPageChange / onLimitChange las manda la
// DashboardPage de Eduardo (ahi se leen y se guardan en la URL)
function TodosTable({ page = 1, limit = 10, onPageChange, onLimitChange, userId = 1 }) {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [actionError, setActionError] = useState('');

  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState(null);

  // Cargar las tareas de la API al abrir la tabla
  useEffect(() => {
    async function loadTodos() {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch {
        setLoadError('No se pudieron cargar las tareas. Revisa tu conexión e intenta de nuevo.');
      } finally {
        setIsLoading(false);
      }
    }

    loadTodos();
  }, []);

  // ---------- Filtros ----------
  const filteredTodos = todos.filter((item) => {
    const matchesText = item.todo.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus =
      statusFilter === 'todos' ||
      (statusFilter === 'completado' && item.completed) ||
      (statusFilter === 'pendiente' && !item.completed);

    return matchesText && matchesStatus;
  });

  // ---------- Paginación (local) ----------
  const totalPages = Math.max(1, Math.ceil(filteredTodos.length / limit));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * limit;
  const visibleTodos = filteredTodos.slice(startIndex, startIndex + limit);

  function handleSearchChange(event) {
    setSearchText(event.target.value);
    onPageChange(1);
  }

  function handleStatusFilterChange(event) {
    setStatusFilter(event.target.value);
    onPageChange(1);
  }

  // ---------- Modal ----------
  function handleOpenCreateModal() {
    setTodoToEdit(null);
    setIsModalOpen(true);
  }

  function handleOpenEditModal(item) {
    setTodoToEdit(item);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setTodoToEdit(null);
  }

  function getNextLocalId() {
    return todos.length > 0 ? Math.max(...todos.map((item) => item.id)) + 1 : 1;
  }

  // ---------- CRUD ----------
  // Agregar y editar usan el mismo formulario (TodoModal)
  async function handleSaveTodo(formData) {
    setActionError('');

    try {
      if (todoToEdit) {
        // EDITAR: primero se pide confirmación
        const confirmed = window.confirm('¿Seguro que deseas guardar los cambios de esta tarea?');
        if (!confirmed) return;

        // Las tareas creadas aquí no existen de verdad en DummyJSON (daría 404),
        // por eso solo se llama a la API si la tarea viene de la API
        if (!todoToEdit.isLocal) {
          const apiResponse = await updateTodo(todoToEdit.id, formData.todo, formData.completed);
          console.log('Respuesta PUT:', apiResponse);
        }

        setTodos((current) =>
          current.map((item) =>
            item.id === todoToEdit.id
              ? { ...item, todo: formData.todo, completed: formData.completed }
              : item
          )
        );
      } else {
        // AGREGAR: POST a la API y luego se agrega al estado local
        const apiResponse = await createTodo(formData.todo, formData.completed, userId);
        console.log('Respuesta POST:', apiResponse);

        // DummyJSON siempre responde con el mismo id, por eso se crea uno propio
        const newTodo = {
          id: getNextLocalId(),
          todo: formData.todo,
          completed: formData.completed,
          userId: userId,
          isLocal: true,
        };

        setTodos((current) => [newTodo, ...current]);
      }

      handleCloseModal();
    } catch {
      setActionError('No se pudo guardar la tarea. Intenta de nuevo.');
      handleCloseModal();
    }
  }

  async function handleDeleteTodo(item) {
    // ELIMINAR: primero se pide confirmación
    const confirmed = window.confirm(`¿Seguro que deseas eliminar la tarea "${item.todo}"?`);
    if (!confirmed) return;

    setActionError('');

    try {
      if (!item.isLocal) {
        const apiResponse = await deleteTodo(item.id);
        console.log('Respuesta DELETE:', apiResponse);
      }

      setTodos((current) => current.filter((todo) => todo.id !== item.id));
    } catch {
      setActionError('No se pudo eliminar la tarea. Intenta de nuevo.');
    }
  }

  // ---------- Pantalla ----------
  if (isLoading) {
    return <p className="todos-message">Cargando tareas...</p>;
  }

  if (loadError) {
    return <p className="todos-message todos-message-error">{loadError}</p>;
  }

  return (
    <div className="todos-card">
      {actionError && <p className="todos-banner-error">{actionError}</p>}

      <div className="todos-toolbar">
        <input
          type="text"
          className="todos-search"
          placeholder="Buscar tarea..."
          value={searchText}
          onChange={handleSearchChange}
        />

        <select
          className="todos-select"
          value={statusFilter}
          onChange={handleStatusFilterChange}
        >
          <option value="todos">Estado: Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="completado">Completado</option>
        </select>

        <button type="button" className="btn-primary todos-new-button" onClick={handleOpenCreateModal}>
          + Nueva tarea
        </button>
      </div>

      <div className="todos-table-wrapper">
        <table className="todos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>TAREA</th>
              <th>USUARIO</th>
              <th>ESTADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {visibleTodos.length === 0 ? (
              <tr>
                <td colSpan="5" className="todos-empty">
                  No se encontraron tareas
                </td>
              </tr>
            ) : (
              visibleTodos.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td className="todos-title">{item.todo}</td>
                  <td>{item.userId}</td>
                  <td>
                    <span className={item.completed ? 'badge badge-done' : 'badge badge-pending'}>
                      {item.completed ? 'Completado' : 'Pendiente'}
                    </span>
                  </td>
                  <td>
                    <div className="todos-actions">
                      <button
                        type="button"
                        className="icon-button"
                        title="Editar"
                        onClick={() => handleOpenEditModal(item)}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                          <path d="m15 5 4 4" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="icon-button icon-button-danger"
                        title="Eliminar"
                        onClick={() => handleDeleteTodo(item)}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalRecords={filteredTodos.length}
        limit={limit}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />

      {isModalOpen && (
        <TodoModal
          key={todoToEdit ? todoToEdit.id : 'nueva'}
          todoToEdit={todoToEdit}
          onClose={handleCloseModal}
          onSave={handleSaveTodo}
        />
      )}
    </div>
  );
}

export default TodosTable;