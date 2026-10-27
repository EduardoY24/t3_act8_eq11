import './Navbar.css';

// Barra de arriba, muestra el titulo de la seccion y los datos del usuario
function Navbar({ titulo, user, onLogout }) {
  return (
    <header className="navbar">
      <h1 className="navbar-titulo">{titulo}</h1>

      <div className="navbar-usuario">
        <img src={user.image} alt="Foto de perfil" className="navbar-foto" />

        <div>
          <p className="navbar-nombre">{user.firstName} {user.lastName}</p>
          <p className="navbar-username">@{user.username}</p>
        </div>

        <button className="navbar-salir" onClick={onLogout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export default Navbar;
