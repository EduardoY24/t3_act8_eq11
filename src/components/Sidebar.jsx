import './Sidebar.css';

// Opciones del menu, cada una con su icono (el dibujo del icono es el "d" del svg)
const opciones = [
  { id: 'inicio', texto: 'Inicio', icono: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
  { id: 'agenda', texto: 'Agenda', icono: 'M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM16 2v4M8 2v4M3 10h18' },
  { id: 'recordatorios', texto: 'Recordatorios', icono: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0' },
  { id: 'configuracion', texto: 'Configuración', icono: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6' },
];

// Menu lateral, recibe cual opcion esta seleccionada y el metodo para cambiarla
function Sidebar({ seccionActiva, onCambiarSeccion }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="sidebar-logo-icon">✓</span>
        <span>Habitos</span>
      </div>

      <nav className="sidebar-menu">
        {opciones.map((opcion) => (
          <button
            key={opcion.id}
            className={seccionActiva === opcion.id ? 'sidebar-item activo' : 'sidebar-item'}
            onClick={() => onCambiarSeccion(opcion.id)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={opcion.icono} />
            </svg>
            {opcion.texto}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
