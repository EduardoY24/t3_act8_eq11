import './LoginPage.css';
import ilustracion from '../assets/ilustracion-login.png';

function LoginPage() {
  return (
    <div className="login-page">
      <section className="login-left">
  <div className="login-logo">
    <span className="login-logo-icon">✓</span>
    <span>Habitos</span>
  </div>

  <h1>Gestiona tus tareas y hábitos en un solo lugar.</h1>

  <p>Prioriza, organiza y mantén el ritmo con un sistema pensado para productividad diaria.</p>

  <img src={ilustracion} alt="Ilustración de hábitos" className="login-ilustracion" />
</section>
<section className="login-right">
    <form className="login-card">
        <div>
    <h2>Iniciar sesión</h2>
    <p className="login-subtitle">Ingresa tus datos para continuar.</p>
    </div>

    <div className="login-field">
      <label htmlFor="username">Usuario</label>
      <input id="username" type="text" placeholder="Usuario" />
      </div>

      <div className= "login-field">
      <label htmlFor="password">Contraseña</label>
      <input id="password" type="password" placeholder="*******" />
      </div>
      <a href="#" className="login-forgot">¿Olvidaste tu contraseña?</a>
      
      <button type="submit" className="login-button">Entrar</button>

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