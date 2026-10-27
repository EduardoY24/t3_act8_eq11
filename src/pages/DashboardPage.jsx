import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import TodosTable from '../components/TodosTable';
import SummaryCards from '../components/SummaryCards';
import './DashboardPage.css';

// Titulo que sale en el navbar segun la opcion del menu
const titulos = {
  inicio: 'Inicio',
  agenda: 'Mi agenda',
  recordatorios: 'Recordatorios',
  configuracion: 'Configuración',
};

// Lee la pagina y el limite que vienen en la url, por ejemplo ?page=2&limit=20
// Si no vienen o estan mal usa pagina 1 y 10 registros
function leerDeLaURL() {
  const params = new URLSearchParams(window.location.search);
  const page = Number(params.get('page')) || 1;
  let limit = Number(params.get('limit')) || 10;
  if (![10, 20, 40, 50].includes(limit)) {
    limit = 10;
  }
  return { page, limit };
}

// Pantalla del sistema: sidebar a la izquierda, navbar arriba y el contenido abajo
function DashboardPage({ user, onLogout }) {
  // Opcion del menu que esta seleccionada
  const [seccion, setSeccion] = useState('agenda');

  // Pagina de la tabla y cuantos registros se ven por pagina, empiezan con lo que diga la URL
  const [page, setPage] = useState(() => leerDeLaURL().page);
  const [limit, setLimit] = useState(() => leerDeLaURL().limit);

  // Cada vez que cambia la pagina o el limite, lo escribimos en la URL
  useEffect(() => {
    const nuevaURL = `?page=${page}&limit=${limit}`;
    if (window.location.search !== nuevaURL) {
      window.history.pushState(null, '', nuevaURL);
    }
  }, [page, limit]);

  // Si el usuario le da al boton de regresar del navegador volvemos a leer la URL
  useEffect(() => {
    function alRegresar() {
      const datos = leerDeLaURL();
      setPage(datos.page);
      setLimit(datos.limit);
    }

    window.addEventListener('popstate', alRegresar);
    return () => window.removeEventListener('popstate', alRegresar);
  }, []);

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
          {seccion === 'inicio' && <SummaryCards />}

          {seccion === 'agenda' && (
            <TodosTable
              page={page}
              limit={limit}
              onPageChange={setPage}
              onLimitChange={handleLimitChange}
              userId={user.id}
            />
          )}

          {(seccion === 'recordatorios' || seccion === 'configuracion') && (
            <p className="dashboard-vacio">Esta sección todavía está en construcción.</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
