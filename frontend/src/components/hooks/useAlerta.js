import { useState } from "react";
import Swal from "sweetalert2";

import '../../assets/css/useAlerta.css';

let useAlerta = () => {

    let activarAlerta = async(opciones) => {

        let iconoValor = "success";

        switch(opciones.icono)
        {
            case 1:
                iconoValor = "success";
                break;
            case 2:
                iconoValor = "error";
                break;
            case 3:
                iconoValor = "warning";
                break;
            case 4:
                iconoValor = "info";
                break;
            case 5:
                iconoValor = "question";
                break;
            default:
                iconoValor = "success";
                break;
        }

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