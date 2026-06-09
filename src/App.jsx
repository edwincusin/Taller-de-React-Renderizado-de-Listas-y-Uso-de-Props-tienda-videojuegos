import './App.css'
import { useState } from 'react'
import data from './data/videojuegos.js'
import Navbar from './components/Navbar.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TablaVideoJuegos from './components/TablaVideojuegos.jsx';
import FormularioVideojuego from './components/FormularioVideojuego.jsx';

//FUNCION PRINCIPAL DE APP
function App() {
  //variable de estado del data
  const [videoJuegos, setVideojuegos] = useState(data);

  //GUARDAR VIDEO JUEGO
  function guardar(videoJuego) {
    setVideojuegos([...videoJuegos, videoJuego]);
  }

  //ELIMINAR VIDEO JUEGO 
  function eliminar(id) {
    const filtrados = videoJuegos.filter((vid) => vid.id != id);
    setVideojuegos(filtrados);
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

      </Routes>
    </BrowserRouter>

  )
}

export default App
