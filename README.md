# t3_act8_eq11 - Habitos

Mini sistema web en React con login, sidebar, navbar y una tabla de tareas con filtros, paginación y acciones CRUD. Está basado en el mockup de Figma de la Actividad 7.

## Integrantes

- Mendoza Martinez Eduardo Yael
- Ruiz Chavez Youri Jorkaeff

## APIs utilizadas

- Login: DummyJSON Auth (https://dummyjson.com/auth/login)
- Tabla de datos: DummyJSON Todos (https://dummyjson.com/todos)

## Proyecto desplegado en el VPS

http://18.224.58.147/t3_act8_eq11/

Respaldo en GitHub Pages: https://eduardoy24.github.io/t3_act8_eq11/


## Funcionalidades

- Login con validación de campos vacíos y mensaje de error si los datos son incorrectos.
- Vista del sistema protegida: sin iniciar sesión no se puede ver.
- Sidebar con 4 secciones (Inicio, Agenda, Recordatorios y Configuración) y navbar con foto, nombre del usuario y botón de cerrar sesión.
- Inicio: tarjetas de resumen (total, pendientes y completadas).
- Agenda: tabla con búsqueda por texto, filtro por estado, paginación con selector de 10, 20, 40 o 50 registros y página reflejada en la URL (?page=2&limit=20).
- CRUD: agregar, editar y eliminar tareas, con confirmación antes de editar y eliminar.
- Diseño responsive para pantallas chicas.

## Usuario de prueba

- Usuario: emilys
- Contraseña: emilyspass

## Cómo ejecutarlo en tu computadora

    npm install
    npm run dev

Abrir http://localhost:5173/t3_act8_eq11/

## Estructura del proyecto

    src/components   Sidebar, Navbar, TodosTable, TodoModal, Pagination...
    src/pages        LoginPage y DashboardPage
    src/services     Llamadas a la API (authApi.js y todosApi.js)

## Nota sobre la API

DummyJSON simula las escrituras: el POST, PUT y DELETE responden como si se hubiera guardado, pero no persiste. Por eso cada acción hace primero la petición real a la API y después refleja el cambio en el estado local (useState) para que la tabla se actualice.