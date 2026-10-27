import './Pagination.css';

// Opciones de cuantos registros mostrar por pagina
const opcionesLimite = [10, 20, 40, 50];

// Controles de abajo de la tabla: cuantos mostrar, cuantos hay y los numeros de pagina
function Pagination({ currentPage, totalPages, totalRecords, limit, onPageChange, onLimitChange }) {
  // Del registro tal al registro tal, por ejemplo "Mostrando 11-20 de 254"
  const desde = totalRecords === 0 ? 0 : (currentPage - 1) * limit + 1;
  const hasta = Math.min(currentPage * limit, totalRecords);

  // Solo mostramos 5 numeros alrededor de la pagina actual para que no salgan 26 botones
  const paginas = [];
  const inicio = Math.max(1, currentPage - 2);
  const fin = Math.min(totalPages, inicio + 4);
  for (let numero = inicio; numero <= fin; numero++) {
    paginas.push(numero);
  }

  return (
    <div className="pagination">
      <div className="pagination-limite">
        Mostrar
        <select value={limit} onChange={(e) => onLimitChange(Number(e.target.value))}>
          {opcionesLimite.map((opcion) => (
            <option key={opcion} value={opcion}>{opcion}</option>
          ))}
        </select>
        registros
      </div>

      <p className="pagination-info">
        Mostrando {desde}–{hasta} de {totalRecords}
      </p>

      <div className="pagination-paginas">
        <button
          className="pagination-boton"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          ‹
        </button>

        {paginas.map((numero) => (
          <button
            key={numero}
            className={numero === currentPage ? 'pagination-boton actual' : 'pagination-boton'}
            onClick={() => onPageChange(numero)}
          >
            {numero}
          </button>
        ))}

        <button
          className="pagination-boton"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default Pagination;
