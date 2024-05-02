import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Navegacion from "./Navegacion";
import InputTextBorderAzul from "../assets/js/InpuTextBorderAzul";
import BotonAzul from "../assets/js/BotonAzul";
import Cargando from "./Cargando";

import useAjax from '../services/useAjax';
import useCadenaUnica from './hooks/useCadenaUnica';

let RestablecerContrasena = () => {

    //HOOKS PERSONALES
    const [crearHash512] = useCadenaUnica();

    const [usuario, setUsuario] = useState("");
    const [tamTitulo, setTamTitulo] = useState("h3");
    const [espera, setEspera] = useState(false);
    const ObjAjax = useAjax();

    let cambiaTamVentana = () => {
        
        if( window.innerWidth < 300 )
            setTamTitulo("h8");
        else if( window.innerWidth < 600 )
            setTamTitulo("h5");
        else
            setTamTitulo("h3");
    };

    let iniciar = async () => await ObjAjax.restablecerContrasena({ usuario : crearHash512(usuario) }, setEspera);

    let cambiarUsuario = (e) => setUsuario(e.target.value);

    useEffect( () => {

        try {
            window.removeEventListener('resize', cambiaTamVentana);
        } catch (error) {}
        window.addEventListener('resize', cambiaTamVentana);
    }, [] );

    return(
        <>
            <Cargando bool={espera}/>
            <Navegacion />
            <Grid container>
                <Grid item xs={12}>
                    <Box sx={{marginTop:"3%"}}>
                        <Typography 
                        variant={tamTitulo} 
                        textAlign={"left"}
                        component={"p"}
                        sx={{fontWeight:"bold"}}>
                            Restablecer contraseña
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{marginTop:"2%"}}>
                        <InputTextBorderAzul
                        etiqueta={"Usuario"}
                        value={usuario}
                        onChange={ (e) => { cambiarUsuario(e) } } />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{marginTop:"2%"}}>
                        <BotonAzul
                        sx={{width:"100%"}}
                        onClick={iniciar} >
                            Restablecer contraseña
                        </BotonAzul>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
};

export default RestablecerContrasena;