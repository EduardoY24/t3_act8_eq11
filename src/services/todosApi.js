const API_URL = 'https://dummyjson.com';
const JSON_HEADERS = { 'Content-Type': 'application/json' };

// GET: trae todas las tareas (limit=0 devuelve las 254)
export async function getTodos() {
  const response = await fetch(`${API_URL}/todos?limit=0`);

  if (!response.ok) {
    throw new Error('No se pudieron cargar las tareas');
  }

  const data = await response.json();
  return data.todos;
}

// POST: agrega una tarea (la API solo simula que la guarda)
export async function createTodo(todo, completed, userId) {
  const response = await fetch(`${API_URL}/todos/add`, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify({ todo, completed, userId }),
  });

  if (!response.ok) {
    throw new Error('No se pudo agregar la tarea');
  }

  return response.json();
}

// PUT: edita una tarea existente
export async function updateTodo(id, todo, completed) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PUT',
    headers: JSON_HEADERS,
    body: JSON.stringify({ todo, completed }),
  });

  if (!response.ok) {
    throw new Error('No se pudo editar la tarea');
  }

  return response.json();
}

// DELETE: elimina una tarea
export async function deleteTodo(id) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('No se pudo eliminar la tarea');
  }

  return response.json();
}