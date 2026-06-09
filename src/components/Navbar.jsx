import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <span className="navbar__logo">Tienda de Video-Juegos</span>

            <div className="navbar__links">
                <Link className="navbar__link" to="/">
                    VideoJuegos
                </Link>

                <Link className="navbar__link" to="/nuevo">
                    Nuevo_Videojuego
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;