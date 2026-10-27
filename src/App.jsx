import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

// Titulo que sale en el navbar segun la opcion del menu
const titulos = {
  inicio: 'Inicio',
  agenda: 'Mi agenda',
  recordatorios: 'Recordatorios',
  configuracion: 'Configuración',
};

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

  // Pantalla del sistema: sidebar a la izquierda, navbar arriba y el contenido abajo
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar seccionActiva={seccion} onCambiarSeccion={setSeccion} />

      <div style={{ flex: 1 }}>
        <Navbar titulo={titulos[seccion]} user={user} onLogout={handleLogout} />

        <main style={{ padding: '32px' }}>
          <p>Aquí va el contenido de: {titulos[seccion]}</p>
        </main>
      </div>
    </div>
  );
}

export default App;
