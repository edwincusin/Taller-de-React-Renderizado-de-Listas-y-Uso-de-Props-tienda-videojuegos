import { Link } from 'react-router-dom';
function Navbar() {
    return (
        <nav>
            <span>Tienda de Video-Juegos</span>
            <div>
                <Link to="/">Tabla VideoJuegos</Link>
                <Link to="/nuevo">Form nuevo Videojuego</Link>
            </div>
        </nav>

    )
}

export default Navbar;