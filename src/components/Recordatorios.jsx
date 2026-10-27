import { useState } from 'react';
import './Recordatorios.css';

// Seccion de recordatorios, programa una notificacion del navegador
function Recordatorios() {
  const [texto, setTexto] = useState('');
  const [minutos, setMinutos] = useState(1);
  const [mensaje, setMensaje] = useState('');

  // Metodo para programar el recordatorio, cuando pasan los minutos sale la notificacion
  async function handleSubmit(e) {
    e.preventDefault();

    if (texto.trim() === '') {
      setMensaje('Escribe qué quieres que te recuerde');
      return;
    }

    // Hay navegadores que no tienen notificaciones
    if (!('Notification' in window)) {
      setMensaje('Tu navegador no soporta notificaciones');
      return;
    }

    // Le pedimos permiso al usuario, si ya lo dio antes no vuelve a preguntar
    const permiso = await Notification.requestPermission();
    if (permiso !== 'granted') {
      setMensaje('Tienes que darle permiso al navegador para mandarte notificaciones');
      return;
    }

    const textoGuardado = texto;
    setTimeout(() => {
      new Notification('Habitos', { body: textoGuardado });
    }, minutos * 60 * 1000);

    setMensaje(`Listo, te aviso en ${minutos} minuto(s). No cierres la pestaña.`);
    setTexto('');
  }

  return (
    <form className="recordatorios" onSubmit={handleSubmit}>
      <h2>Nuevo recordatorio</h2>

      <label htmlFor="texto">¿Qué te recuerdo?</label>
      <input
        id="texto"
        type="text"
        placeholder="Ej. Tomar agua"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      <label htmlFor="minutos">¿En cuántos minutos?</label>
      <input
        id="minutos"
        type="number"
        min="1"
        value={minutos}
        onChange={(e) => setMinutos(Number(e.target.value))}
      />

      <button type="submit">Programar recordatorio</button>

      {mensaje && <p className="recordatorios-mensaje">{mensaje}</p>}
    </form>
  );
}

export default Recordatorios;
