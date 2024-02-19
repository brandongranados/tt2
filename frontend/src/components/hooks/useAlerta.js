import { useState } from "react";
import Swal from "sweetalert2";

import '../../assets/css/useAlerta.css';

let useAlerta = () => {
    const [iconoValor, setIconoValor] = useState("success");

    let cambiarIcono = (icono) => {
        switch(icono)
        {
            case 1:
                setIconoValor("success");
                break;
            case 2:
                setIconoValor("error");
                break;
            case 3:
                setIconoValor("warning");
                break;
            case 4:
                setIconoValor("info");
                break;
            case 5:
                setIconoValor("question");
                break;
            default:
                setIconoValor("success");
                break;
        }
    };

    let activarAlerta = async(opciones) => {

        cambiarIcono(opciones.icono);

        return await Swal.fire({
            title: opciones.titulo,
            text: opciones.mensaje,
            icon: iconoValor,
            showCancelButton: opciones.boolBtnCancel,
            confirmButtonColor: opciones.ColorConfirmar,
            cancelButtonColor: opciones.ColorCancel,
            confirmButtonText: opciones.MensajeConfirmar,
            cancelButtonText: opciones.MensajeCancel
          }).then((result) => {
            if ( result.isConfirmed )
                return true;
            else if( result.isDismissed )
                return false;
          });
    };

    return [activarAlerta];
};

export default useAlerta;