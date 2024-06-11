import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import InputTextBorderAzul from '../assets/js/InpuTextBorderAzul';
import escom from '../assets/img/escom.png';
import LinkLetras from '../assets/js/LinkLetras';
import BotonAzul from '../assets/js/BotonAzul';
import InputTextOcultaText from '../assets/js/InputTextOcultaText';
import Cargando from "./Cargando";

import useAjax from '../services/useAjax';
import useCadenaUnica from './hooks/useCadenaUnica';
import NavegacionInicioSesion from './NavegacionInicioSesion';

let InicioSesion = () => {

    //HOOKS PERSONALES
    const [crearHash512] = useCadenaUnica();

    const [tamTitulo, setTamTitulo] = useState("h3");
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [espera, setEspera] = useState(false);
    const ObjAjax = useAjax();

    let cambiaTamVentana = () => {
        if( window.innerWidth < 450 )
            setTamTitulo("h5");
        else
            setTamTitulo("h3");
    };

    let iniciar = async () => {
        let datos = {
            usuario : crearHash512(usuario),
            contrasena : crearHash512(contrasena)
        };

        await ObjAjax.iniciarConexion(datos, setEspera);

    };

    let cambiarUsuario = (e) => setUsuario(e.target.value);
    let cambiarContrasena = (e) => setContrasena(e.target.value);

    useEffect( () => {

        try {
            window.removeEventListener('resize', cambiaTamVentana);
        } catch (error) {}
        window.addEventListener('resize', cambiaTamVentana);
    }, [] );

    return(
        <>
            <Cargando open={espera}/>
            <NavegacionInicioSesion />
            <Grid container>
                <Grid item xs sm></Grid>
                <Grid item xs={12} sm={6}>
                    <Typography 
                    textAlign={"center"} 
                    variant={tamTitulo} 
                    component={"p"}
                    sx={{fontWeight:"bold", marginTop:"5%"}} >
                        Inicio de Sesi&oacute;n
                    </Typography>
                    <Box 
                    sx={{
                        height:"25vh", 
                        backgroundImage:`url(${escom})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat:"no-repeat",
                        margin:"2%"
                        }}>
                    </Box>
                    <InputTextBorderAzul 
                    etiqueta={"Usuario"} 
                    sx={{marginTop:"1.5%"}}
                    value={usuario}
                    onChange={ (e) => { cambiarUsuario(e) } } />
                    <InputTextOcultaText 
                    etiqueta={"Contraseña"} 
                    sx={{marginTop:"1.5%"}}
                    value={contrasena}
                    onChange={ (e) => { cambiarContrasena(e) } } />
                    <Box sx={{marginTop:"1.5%", display:"flex"}}>
                        <LinkLetras 
                        sx={{width:"50%", textAlign:"center"}} 
                        dir={"/restablecer"} texto={"Restablecer contraseña"} />
                        <LinkLetras 
                        sx={{width:"50%", textAlign:"center"}} 
                        dir={"/registroEstudiante"} texto={"Registro de estudiante"} />
                    </Box>
                    <BotonAzul 
                    sx={{marginTop:"1.5%", width:"100%"}}
                    onClick={iniciar} >
                        inicio sesi&oacute;n
                    </BotonAzul>
                </Grid>
                <Grid item xs sm></Grid>
            </Grid>
        </>
    )
};

export default InicioSesion;