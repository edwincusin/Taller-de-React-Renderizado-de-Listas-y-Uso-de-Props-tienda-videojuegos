import './App.css'
import { useState } from 'react'
import data from './data/videojuegos.js'
//IMPORTACION DEL COMPONENTE TABLAVIDEOJUEGOS
import TablaVideoJuegos from './components/TablaVideojuegos.jsx'
import FormularioVideojuego from './components/FormularioVideojuego.jsx';

//FUNCION PRINCIPAL DE APP
function App() {
  //variable de estado del data
  const [videoJuegos, setVideojuegos] = useState(data);

  //GUARDAR VIDEO JUEGO
  function guardar(videoJuego){
    setVideojuegos([...videoJuegos,videoJuego]);
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



  //RETURN APP PRINCIPAL
  return (
    <>
      <h1>Tienda de Video-Juegos</h1>
      {/* <TablaVideoJuegos
        dataVideoJuegos={videoJuegos}
        onEliminar={eliminar}
      /> */}
      <FormularioVideojuego
        onGuardar={guardar}
      ></FormularioVideojuego>

    </>
  )
}

export default App
