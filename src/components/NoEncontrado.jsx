import './NoEncontrado.css';

function NoEncontrada() {
    return (
        <div className="error-container">
            <div className="error-content">
                <h1 className="error-title">
                    <span>Error 404</span> 
                    Page No Encontrada
                    <span className="error-subtitle"> La URL a la que intentas acceder no existe.</span>
                </h1>
            </div>
        </div>
    );
}

export default NoEncontrada;