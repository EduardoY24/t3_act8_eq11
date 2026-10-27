import './LoginPage.css';
import ilustracion from '../assets/ilustracion-login.png';
import { useState } from 'react';
import { loginUser } from '../services/authApi';

function LoginPage({ onLogin }) {
  // Lo que el usuario escribe
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Mensaje de error (si está vacío, no se muestra nada)
  const [error, setError] = useState('');

  // true mientras esperamos la respuesta de la API
  const [cargando, setCargando] = useState(false);

  // Metodo para iniciar sesion, se ejecuta al darle clic a Entrar
  async function handleSubmit(e) {
    e.preventDefault(); // para que la página no se recargue

    // Revisamos que no esten vacios antes de llamar a la API
    if (username.trim() === '' || password.trim() === '') {
      setError('Escribe tu usuario y contraseña');
      return; // aquí se detiene, ya no llama a la API
    }

    // Mandamos los datos a DummyJSON
    try {
      setCargando(true);
      setError('');
      const usuario = await loginUser(username, password);
      onLogin(usuario); // le pasamos el usuario a App para entrar al sistema
    } catch (err) {
      setError(err.message); // "Usuario o contraseña incorrectos"
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="login-page">
      {/* Panel izquierdo */}
      <section className="login-left">
        <div className="login-logo">
          <span className="login-logo-icon">✓</span>
          <span>Habitos</span>
        </div>

        <h1>Gestiona tus tareas y hábitos en un solo lugar.</h1>

        <p>Prioriza, organiza y mantén el ritmo con un sistema pensado para productividad diaria.</p>

        <img src={ilustracion} alt="Ilustración de hábitos" className="login-ilustracion" />
      </section>

      {/* Panel derecho */}
      <section className="login-right">
        <form className="login-card" onSubmit={handleSubmit}>
          <div>
            <h2>Iniciar sesión</h2>
            <p className="login-subtitle">Ingresa tus datos para continuar.</p>
          </div>

          <div className="login-field">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              placeholder="Ej. emilys"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <a href="#" className="login-forgot">¿Olvidaste tu contraseña?</a>

          {/* Solo aparece si hay un error */}
          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-button" disabled={cargando}>
            {cargando ? 'Entrando...' : 'Entrar'}
          </button>

          {/* Separador */}
          <div className="login-divider">
            <span>o continúa con</span>
          </div>

          <button type="button" className="login-google">Continuar con Google</button>
        </form>
      </section>
    </div>
  );
}

export default LoginPage;
