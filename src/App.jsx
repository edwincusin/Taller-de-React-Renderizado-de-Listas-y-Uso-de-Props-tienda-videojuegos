import './App.css'
import { useEffect, useState } from 'react'
import data from './data/videojuegos.js'
import Navbar from './components/Navbar.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TablaVideoJuegos from './components/TablaVideojuegos.jsx';
import FormularioVideojuego from './components/FormularioVideojuego.jsx';
import NoEncontrada from './components/NoEncontrado.jsx';
import AlertaNotificacion from './components/AlertaNotificacion.jsx';


//FUNCION PRINCIPAL DE APP
function App() {
  // Estado principal de videojuegos.
  // Al iniciar la aplicación intenta recuperar los datos guardados en localStorage.
  // Si no existen registros almacenados, utiliza los datos iniciales del archivo data.
  const [videoJuegos, setVideojuegos] = useState(() => {
    const datosGuardados = localStorage.getItem("lista_videojuegos");
    return datosGuardados ? JSON.parse(datosGuardados) : data;
  });

  // Persistencia automática.
  // Cada vez que la lista de videojuegos cambie (agregar, editar o eliminar),
  // se actualiza localStorage para conservar la información entre recargas
  useEffect(() => {
    localStorage.setItem(
      "lista_videojuegos",
      JSON.stringify(videoJuegos)
    );
  }, [videoJuegos]);

  //VARIABLE DE ESTADO MENSAJE ALERTA
  const [mensajeAlerta, setMensajeAlerta] = useState("");

  //GUARDAR VIDEO JUEGO
  function guardar(videoJuego) {
    setVideojuegos([...videoJuegos, videoJuego]);
    setMensajeAlerta("Videojuego agregado correctamente");
  }

  //ELIMINAR VIDEO JUEGO 
  function eliminar(id) {
    const filtrados = videoJuegos.filter((vid) => vid.id != id);
    setVideojuegos(filtrados);
    setMensajeAlerta("Videojuego eliminado correctamente");

  }
  //EDITAR VIDEOJUEGO
  function editar(videoJuegoEditado) {
    const actualizados = videoJuegos.map((vid) => { // Recorre todos los videojuegos
      if (vid.id === videoJuegoEditado.id) { // Si encuentra el mismo id
        return videoJuegoEditado; // Reemplaza el objeto viejo por el editado
      } else {
        return vid; // Mantiene los demás videojuegos iguales
      }
    });
    setVideojuegos(actualizados); // Actualiza el estado con el nuevo arreglo
    setMensajeAlerta("Videojuego actualizado correctamente");

  }

  //MANEJO GAURDAR
  function manejarGuardar(videoJuego) {
    const existe = videoJuegos.find((vid) => vid.id === videoJuego.id);

    if (existe) {
      editar(videoJuego);
    } else {
      guardar(videoJuego);
    }
  }

  //RETURN APP PRINCIPAL
  return (

    <BrowserRouter>
      {mensajeAlerta && (
        <AlertaNotificacion
          mensaje={mensajeAlerta}
        />
      )}
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <TablaVideoJuegos
              dataVideoJuegos={videoJuegos}
              onEliminar={eliminar}
            />
          }
        />
        <Route
          path="/nuevo"
          element={
            <FormularioVideojuego
              onGuardar={guardar}
            />
          }
        />
        <Route
          path="/editar"
          element={
            <FormularioVideojuego
              onGuardar={manejarGuardar}
            />
          }
        />

        <Route
          path="*"
          element={
            <NoEncontrada />
          }
        />

      </Routes>
    </BrowserRouter>

  )
}

export default App
