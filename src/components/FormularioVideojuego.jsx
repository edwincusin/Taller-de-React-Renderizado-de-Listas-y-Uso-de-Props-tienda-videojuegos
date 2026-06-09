import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './FormularioVideojuego.css';

function FormularioVideojuego({ onGuardar }) {

    const navigate = useNavigate();
    // Recupera el videojuego enviado desde la pantalla anterior.
    // Si existe location.state, obtiene el objeto videoJuego.
    // Si no existe, asigna null para indicar que es un nuevo registro.
    const location = useLocation();
    const videoJuegoRecuperado = location.state?.videoJuego || null;

    const [titulo, setTitulo] = useState("");
    const [genero, setGenero] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [lanzamiento, setLanzamiento] = useState("");
    const [precio, setPrecio] = useState(0.0);
    const [disponible, setDisponible] = useState(true);
    const [progreso, setProgreso] = useState(0);

    // Se ejecuta cada vez que cambia el videojuego recuperado.
    // Si existe un videojuego, carga sus datos en los estados
    // para mostrar la información en el formulario de edición.
    // Si no existe un videojuego, limpia los campos y establece
    // valores por defecto para crear un nuevo registro.
    useEffect(() => {
        if (videoJuegoRecuperado) {
            setTitulo(videoJuegoRecuperado.titulo);
            setGenero(videoJuegoRecuperado.genero);
            setPlataforma(videoJuegoRecuperado.plataforma);
            setLanzamiento(videoJuegoRecuperado.lanzamiento);
            setPrecio(videoJuegoRecuperado.precio);
            setDisponible(videoJuegoRecuperado.disponible);
            setProgreso(videoJuegoRecuperado.progreso);
        } else {
            setTitulo("");
            setGenero("");
            setPlataforma("");
            setLanzamiento("");
            setPrecio(0.0);
            setDisponible(true);
            setProgreso(0.0);
        }
    }, [videoJuegoRecuperado]); // Se ejecuta nuevamente cuando cambia el videojuego recuperado.


    //FUNCION MANEJAR GUARDAR
    function manejarGuardar() {
        // Se construye un objeto con los datos del formulario
        const videoJuego = {
            // Si estamos editando, conserva el id existente.
            // Si es un nuevo registro, genera un id usando la fecha actual.
            id: videoJuegoRecuperado !== null && videoJuegoRecuperado !== undefined ? videoJuegoRecuperado.id : Date.now(),
            titulo: titulo,
            genero: genero,
            plataforma: plataforma,
            lanzamiento: Number(lanzamiento),
            precio: Number(precio),
            disponible: disponible,  // Valor booleano del checkbox
            progreso: Number(progreso) / 100 // Convierte el progreso a número
            // Datos capturados desde los estados del formulario
        };
        onGuardar(videoJuego); // Envía el objeto videojuego al componente padre
        navigate('/');
    }

    //MANEJAR CANCELAR
    function manejarCancelar() {
        navigate('/');

    }

    return (
        <div className="form-container">
            <h2 className="form-title">
                {videoJuegoRecuperado ? "Editar Videojuego" : "Nuevo VideoJuego"}
            </h2>

            <div className="form-grid">

                <div className="form-group">
                    <label>Título</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Ejm: Minecraft"
                    />
                </div>

                <div className="form-group">
                    <label>Género</label>
                    <select
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                    >
                        <option value="">Selecciona...</option>
                        <option value="Aventura">Aventura</option>
                        <option value="Acción">Acción</option>
                        <option value="Sandbox">Sandbox</option>
                        <option value="RPG">RPG</option>
                        <option value="Deportes">Deportes</option>
                        <option value="Carreras">Carreras</option>
                        <option value="Terror">Terror</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Plataforma</label>
                    <select
                        value={plataforma}
                        onChange={(e) => setPlataforma(e.target.value)}
                    >
                        <option value="">Selecciona...</option>
                        <option value="Nintendo Switch">Nintendo Switch</option>
                        <option value="PlayStation 5">PlayStation 5</option>
                        <option value="PC">PC</option>
                        <option value="Xbox Series X">Xbox Series X</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Lanzamiento</label>
                    <input
                        type="number"
                        value={lanzamiento}
                        onChange={(e) => setLanzamiento(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Precio</label>
                    <input
                        type="number"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />
                </div>

                <div className="form-group checkbox">
                    <label>
                        <input
                            type="checkbox"
                            checked={disponible}
                            onChange={(e) => setDisponible(e.target.checked)}
                        />
                        Disponible
                    </label>
                </div>

                <div className="form-group">
                    <label>Progreso (%)</label>
                    <input
                        type="number"
                        min="0"
                        max="100"
                        value={progreso}
                        onChange={(e) => setProgreso(e.target.value)}
                    />
                </div>

            </div>

            <div className="form-actions">
                <button className="btn-save" onClick={manejarGuardar}>
                    {videoJuegoRecuperado ? "Guardar Cambios" : "Guardar Nuevo"}
                </button>

                <button className="btn-cancel" onClick={manejarCancelar}>
                    Cancelar
                </button>
            </div>
        </div>
    );
}

export default FormularioVideojuego;