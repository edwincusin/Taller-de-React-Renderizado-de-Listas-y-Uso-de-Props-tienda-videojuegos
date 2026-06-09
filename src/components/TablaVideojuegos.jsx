import './TablaVideojuegos.css'

function TablaVideoJuegos({ dataVideoJuegos, onEliminar }) {

    
    return (
        <div className="tabla-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>TÍTULO</th>
                        <th>GÉNERO</th>
                        <th>PLATAFORMA</th>
                        <th>LANZAMIENTO</th>
                        <th>PRECIO</th>
                        <th>DISPONIBLE</th>
                        <th>PROGRESO</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>

                <tbody>
                    {dataVideoJuegos.map((videoJuego) => (
                        <tr key={videoJuego.id}>
                            <td>{videoJuego.id}</td>
                            <td>{videoJuego.titulo}</td>
                            <td>{videoJuego.genero}</td>
                            <td>{videoJuego.plataforma}</td>
                            <td>{videoJuego.lanzamiento}</td>
                            <td>${videoJuego.precio.toFixed(2)}</td>

                            <td>
                                <span style={{ color: videoJuego.disponible ? 'green' : 'red' }}>
                                    {videoJuego.disponible ? "Si" : "No"}
                                </span>
                            </td>

                            <td>
                                <progress
                                    value={videoJuego.progreso * 100}
                                    max="100">
                                </progress>
                                {Math.round(videoJuego.progreso * 100)}%
                            </td>

                            <td>
                                <div className="acciones">
                                    <button className="btn-editar">
                                    Editar
                                    </button>

                                    <button
                                        className="btn-eliminar"
                                        onClick={() => onEliminar(videoJuego.id)}>
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TablaVideoJuegos;