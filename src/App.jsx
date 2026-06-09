import './App.css'
import { useState } from 'react'
import data from './data/videojuegos.js'
//IMPORTACION DEL COMPONENTE TABLAVIDEOJUEGOS
import TablaVideoJuegos from './components/TablaVideojuegos.jsx'

//FUNCION PRINCIPAL DE APP
function App() {
  //variable de estado del data
  const [videoJuegos, setVideojuegos] = useState(data);
  return (
    <div>
      <h1>Tienda de Video-Juegos</h1>
      <h4>Listado</h4>
      <TablaVideoJuegos dataVideoJuegos={videoJuegos}></TablaVideoJuegos>      
    </div>
  )
}

export default App
