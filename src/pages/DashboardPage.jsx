import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import TodosTable from '../components/TodosTable';
import './DashboardPage.css';

// Titulo que sale en el navbar segun la opcion del menu
const titulos = {
  inicio: 'Inicio',
  agenda: 'Mi agenda',
  recordatorios: 'Recordatorios',
  configuracion: 'Configuración',
};

// Pantalla del sistema: sidebar a la izquierda, navbar arriba y el contenido abajo
function DashboardPage({ user, onLogout }) {
  // Opcion del menu que esta seleccionada
  const [seccion, setSeccion] = useState('agenda');

  // Pagina de la tabla y cuantos registros se ven por pagina
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Metodo para cambiar cuantos registros se ven, regresa a la pagina 1
  function handleLimitChange(nuevoLimite) {
    setLimit(nuevoLimite);
    setPage(1);
  }

  return (
    <div className="dashboard">
      <Sidebar seccionActiva={seccion} onCambiarSeccion={setSeccion} />

      <div className="dashboard-derecha">
        <Navbar titulo={titulos[seccion]} user={user} onLogout={onLogout} />

        <main className="dashboard-contenido">
          {seccion === 'agenda' ? (
            <TodosTable
              page={page}
              limit={limit}
              onPageChange={setPage}
              onLimitChange={handleLimitChange}
              userId={user.id}
            />
          ) : (
            <p className="dashboard-vacio">Esta sección todavía está en construcción.</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
