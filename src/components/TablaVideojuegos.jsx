//PROPS
function TablaVideoJuegos({ dataVideoJuegos }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>TITULO</th>
            <th>GENERO</th>
            <th>PLATAFORMA</th>
            <th>LANZAMIENTO</th>
            <th>PRECIO</th>
            <th>DISPONIBLE</th>
            <th>PROGRESO</th>
          </tr>
        </thead>
        <tbody>
            {dataVideoJuegos.map((videoJuego)=>{
              return (
                <tr>
                  <td>{videoJuego.id}</td>
                  <td>{videoJuego.titulo}</td>
                  <td>{videoJuego.genero}</td>
                  <td>{videoJuego.plataforma}</td>
                  <td>{videoJuego.lanzamiento}</td>
                  <td>{videoJuego.precio}</td>
                  <td>{videoJuego.disponible}</td>
                  <td>
                    <progress
                      value={videoJuego.progreso*100}
                      max={100}
                    ></progress>
                    {Math.round(videoJuego.progreso*100)}%
                  </td>
                </tr>
              )
            })}          
        </tbody>
      </table>
    </div>

  )
}

export default TablaVideoJuegos;