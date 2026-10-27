import { useState } from 'react';
import LoginPage from './pages/LoginPage';

function App() {
  // Aqui guardamos al usuario que inicio sesion (null = nadie ha entrado)
  const [user, setUser] = useState(null);

  // Metodo para cerrar sesion, borra al usuario y regresa al login
  function handleLogout() {
    setUser(null);
  }

  // Si no hay usuario solo se ve el login, asi nadie entra sin iniciar sesion
  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  // Pantalla temporal del sistema, luego la cambiamos por el sidebar, navbar y la tabla
  return (
    <div style={{ padding: '32px' }}>
      <img src={user.image} alt="Foto de perfil" width="64" />
      <h1>Hola, {user.firstName} {user.lastName}</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default App;
