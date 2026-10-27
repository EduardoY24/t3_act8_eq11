import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import Sidebar from './components/Sidebar';

function App() {
  // Aqui guardamos al usuario que inicio sesion (null = nadie ha entrado)
  const [user, setUser] = useState(null);

  // Opcion del menu que esta seleccionada
  const [seccion, setSeccion] = useState('agenda');

  // Metodo para cerrar sesion, borra al usuario y regresa al login
  function handleLogout() {
    setUser(null);
  }

  // Si no hay usuario solo se ve el login, asi nadie entra sin iniciar sesion
  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  // Pantalla temporal del sistema, luego le agregamos el navbar y la tabla
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar seccionActiva={seccion} onCambiarSeccion={setSeccion} />

      <main style={{ padding: '32px' }}>
        <img src={user.image} alt="Foto de perfil" width="64" />
        <h1>Hola, {user.firstName} {user.lastName}</h1>
        <p>Estás en: {seccion}</p>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </main>
    </div>
  );
}

export default App;
