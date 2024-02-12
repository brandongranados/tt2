import { createContext, useContext, useEffect, useState } from "react";

const DatosUsuarioContexto = createContext();

const useDatosUsuario = () => useContext(DatosUsuarioContexto);

const ProvedorDatosUsuario = ({children}) => {
    const [datos, setDatos] = useState({});

    let ActualizarDato = (variable, valor) => {
        const arrayFiltrado = Object.entries(datos).filter(([llave]) => llave !== variable);
        const DatosFiltrados = Object.fromEntries(arrayFiltrado);
        let obj = {};

        obj[variable] = valor;

        setDatos({ ...obj, ...DatosFiltrados });
        sessionStorage.setItem("datos", atob(JSON.stringify({ ...obj, ...DatosFiltrados })));
    };

    let Actualizar = (obj) => {
        setDatos(obj);
        sessionStorage.setItem("datos", obj);
    };

    useEffect( () => {
        let actulizando =  sessionStorage.getItem("datos");
        if( actulizando == null )
            setDatos({});
        else
            setDatos(JSON.parse(btoa(actulizando)));
    }, [] );

    return(
        <DatosUsuarioContexto.Provider value={{datos, ActualizarDato, Actualizar}}>
            {children}
        </DatosUsuarioContexto.Provider>
    )

};

export {
    useDatosUsuario,
    ProvedorDatosUsuario
};