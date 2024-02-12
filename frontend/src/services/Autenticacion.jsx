import { createContext, useContext, useState } from "react";

const ContextoAuten = createContext();

const useAtenticar = () => useContext(ContextoAuten);

const ProveedorAutenticar = ({children}) => {
    const [sesionIniciada, setSesionIniciada] = useState(false);

    let iniciarSesion = () => setSesionIniciada(true);
    let cerrarSesion = () => setSesionIniciada(false);

    return(
        <ContextoAuten.Provider value={{sesionIniciada, iniciarSesion, cerrarSesion}} >
            {children}
        </ContextoAuten.Provider>
    )

};

export { 
    useAtenticar,
    ProveedorAutenticar
};