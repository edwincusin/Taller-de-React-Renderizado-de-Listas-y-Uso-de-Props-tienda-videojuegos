import { useEffect, useState } from "react";
import "./AlertaNotificacion.css";

function AlertaNotificacion({ mensaje }) { // Componente que recibe el mensaje a mostrar

    const [visible, setVisible] = useState(false); // Controla si la alerta se muestra o no

    useEffect(() => { // Se ejecuta cada vez que cambia el mensaje

        if (!mensaje) return; // Si no hay mensaje, no hace nada
        setVisible(true); // Activa la alerta cuando llega un mensaje nuevo

        const temporizador = setTimeout(() => { // Temporizador de 3 segundos
            setVisible(false); // Oculta la alerta después del tiempo
        }, 3000);

        return () => clearTimeout(temporizador); // Limpia el temporizador si cambia el mensaje

    }, [mensaje]); // Dependencia: se ejecuta cuando cambia el mensaje

    if (!visible) return null; // Si no está visible, no renderiza nada

    return (
        <div className="alerta-notificacion">
            MSM: {mensaje} {/* Muestra el mensaje */}
        </div>
    );
}
export default AlertaNotificacion;