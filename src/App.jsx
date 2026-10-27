import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

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

  return <DashboardPage user={user} onLogout={handleLogout} />;
}

export default App;
