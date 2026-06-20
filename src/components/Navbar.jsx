import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaStore } from "react-icons/fa";

function Navbar({nombreTienda,onSaludar}) {
    return (
        <nav className="navbar">
            <h2 className="navbar__logo">{<FaStore />} {nombreTienda}</h2>

            <button
                onClick={()=>onSaludar(nombreTienda)}
            >Saludar</button>
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