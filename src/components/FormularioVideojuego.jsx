import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './FormularioVideojuego.css';
import { FaGamepad, FaEdit, FaPlus, FaCalendarAlt, FaDollarSign, FaCheckSquare, FaPercent, FaStar, FaAlignLeft } from "react-icons/fa";

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
    const [sinopsis, setSinopsis] = useState('');
    const [calificacion, setClificacion] = useState(0);

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
            setSinopsis(videoJuegoRecuperado.sinopsis);
            setClificacion(videoJuegoRecuperado.calificacion);
        } else {
            setTitulo("");
            setGenero("");
            setPlataforma("");
            setLanzamiento("");
            setPrecio(0.0);
            setDisponible(true);
            setProgreso(0.0);
            setSinopsis('');
            setClificacion(0);

        }
    }, [videoJuegoRecuperado]); // Se ejecuta nuevamente cuando cambia el videojuego recuperado.


    //FUNCION MANEJAR GUARDAR
    function manejarGuardar() {

        if (validacionFomulario()) {
            return;
        }
        // Se construye un objeto con los datos del formulario
        const videoJuego = {
            // Si estamos editando, conserva el id existente.
            // Si es un nuevo registro, genera un id usando la fecha actual.
            id: videoJuegoRecuperado !== null && videoJuegoRecuperado !== undefined ? videoJuegoRecuperado.id : Date.now(),
            titulo: titulo,
            genero: genero,
            plataforma: plataforma,
            lanzamiento: lanzamiento,
            precio: Number(precio),
            disponible: disponible,  // Valor booleano del checkbox
            progreso: Number(progreso) / 100, // Convierte el progreso a número
            sinopsis:sinopsis,
            calificacion:Number(calificacion)
            // Datos capturados desde los estados del formulario
        };
        onGuardar(videoJuego); // Envía el objeto videojuego al componente padre
        setTimeout(() => {
            navigate("/");
        }, 100);
    }

    //MANEJAR CANCELAR
    function manejarCancelar() {
        navigate('/');

    }

    //VALIDACION Y MANEJO DE ERRORES
    const [errores, setErrores] = useState({});

    function validacionFomulario() {

        let erroresActivos = {};
        //validar titulo
        if (!titulo.trim()) {
            erroresActivos.titulo = "El titulo es obligatorio";
        }
        //validar calificacion 
        if (calificacion < 1 || calificacion > 100) {
            erroresActivos.calificacion = "Rango calificacion no permitida"
        }
        //validar texto de sinopsis
        if (sinopsis.trim().length < 10 || sinopsis.trim().length > 250) {
            erroresActivos.sinopsis = "La sinopsis debe tener entre 10 y 250 caracteres"
        }
        
        if (Object.keys(erroresActivos).length > 0) {
            setErrores(erroresActivos);
            return true;
        } else {
            setErrores({});//limpia
            return false;
        }
    }

  return (
        <div className="form-container">
            <h1 className="form-title">
                {videoJuegoRecuperado ? <><FaEdit /> Editar Videojuego</> : <><FaGamepad /> Nuevo Videojuego</>}
            </h1>

            <div className="form-grid">
                <div className="form-group">
                    <label><FaGamepad /> Título</label>
                    <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ejm: Minecraft" />
                    {errores.titulo && <span className="error-mensaje">{errores.titulo}</span>}
                </div>

                <div className="form-group">
                    <label><FaGamepad /> Género</label>
                    <select value={genero} onChange={(e) => setGenero(e.target.value)}>
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
                    <label><FaGamepad /> Plataforma</label>
                    <select value={plataforma} onChange={(e) => setPlataforma(e.target.value)}>
                        <option value="">Selecciona...</option>
                        <option value="Nintendo Switch">Nintendo Switch</option>
                        <option value="PlayStation 5">PlayStation 5</option>
                        <option value="PC">PC</option>
                        <option value="Xbox Series X">Xbox Series X</option>
                    </select>
                </div>

                <div className="form-group">
                    <label><FaCalendarAlt /> Fecha lanzamiento</label>
                    <input type="date" value={lanzamiento} onChange={(e) => setLanzamiento(e.target.value)} max={new Date().toISOString().split("T")[0]} required />
                </div>

                <div className="form-group">
                    <label><FaDollarSign /> Precio</label>
                    <input type="number" step="0.01" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                </div>

                <div className="form-group checkbox">
                    <label className="checkbox-label">
                        <input type="checkbox" checked={disponible} onChange={(e) => setDisponible(e.target.checked)} />
                        <span className="custom-checkbox"><FaCheckSquare /> Disponible</span>
                    </label>
                </div>

                <div className="form-group">
                    <label><FaPercent /> Progreso ((0-100))</label>
                    <input type="number" min="0" max="100" value={progreso} onChange={(e) => setProgreso(e.target.value)} />
                </div>

                <div className="form-group">
                    <label><FaStar /> Calificación crítica (1-100)</label>
                    <input type="number" min="0" max="100" value={calificacion} onChange={(e) => setClificacion(e.target.value)} />
                    {errores.calificacion && <span className="error-mensaje">{errores.calificacion}</span>}
                </div>

                {/* Textarea de Sinopsis expandido a doble columna mediante CSS */}
                <div className="form-group full-width">
                    <label><FaAlignLeft /> Sinopsis</label>
                    <textarea value={sinopsis} onChange={(e) => setSinopsis(e.target.value)} placeholder="Escribe una breve descripción del juego..." />
                    {errores.sinopsis && <span className="error-mensaje">{errores.sinopsis}</span>}
                </div>
            </div>

            <div className="form-actions">
                <button className="btn-cancel" onClick={manejarCancelar}>Cancelar</button>
                <button className="btn-save" onClick={manejarGuardar}>
                    {videoJuegoRecuperado ? <><FaEdit /> Guardar Cambios</> : <><FaPlus /> Guardar Nuevo</>}
                </button>
            </div>
        </div>
    );
}

export default FormularioVideojuego;