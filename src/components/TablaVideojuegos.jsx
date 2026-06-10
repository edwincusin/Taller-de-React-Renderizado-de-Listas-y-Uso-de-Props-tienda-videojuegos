import './TablaVideojuegos.css'
import { useNavigate } from "react-router-dom";
import { FaGamepad, FaTrash, FaEdit, FaPlus, FaEye  } from "react-icons/fa";

function TablaVideoJuegos({onEliminar,dataVideoJuegos}) {

    const navigate = useNavigate();

    function manejarEditar(vid) {
        navigate('/editar', { state: { videoJuego: vid } });
    }

    return (
        <div className="tabla-container">
            
            <h1>{<FaGamepad/>} Lista de VideoJuegos {<FaGamepad/>}</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>TÍTULO</th>
                        <th>GÉNERO</th>
                        <th>PLATAFORMA</th>
                        <th>LANZAMIENTO</th>
                        <th>PRECIO</th>
                        <th>CALF. CRITICA</th>
                        <th>SINOPSIS</th>
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
                            <td>{(videoJuego.precio).toFixed(2)}</td>
                            <td>{videoJuego.calificacion}</td>
                            <td>{videoJuego.sinopsis}</td>
                            <td>
                                <span style={{ color: videoJuego.disponible ? 'green' : 'red' }}>
                                    {videoJuego.disponible ? "Si" : "No"}
                                </span>
                            </td>

                            <td>
                                <progress
                                    value={(videoJuego.progreso) * 100}
                                    max="100">
                                </progress>
                                {Math.round((videoJuego.progreso) * 100)}%
                            </td>

                            <td>
                                <div className="acciones">
                                    <button 
                                        onClick={()=>manejarEditar(videoJuego)}
                                    >
                                        {<FaEdit/>}
                                    </button>

                                    <button
                                        className="btn-eliminar"
                                        onClick={() => onEliminar(videoJuego.id)}>
                                        <FaTrash />
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