const API_URL = 'https://dummyjson.com';

export async function loginUser(username, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Usuario o contraseña incorrectos');
  }

  return response.json();
}