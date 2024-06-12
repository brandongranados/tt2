import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom';

import InputTextBorderAzul from '../assets/js/InpuTextBorderAzul';
import BotonAzul from '../assets/js/BotonAzul';
import NavegacionInicioSesion from './NavegacionInicioSesion';
import Cargando from "./Cargando";

import useAjax from '../services/useAjax';
import useCadenaUnica from './hooks/useCadenaUnica';

import useAlerta from './hooks/useAlerta';

let ValidarTokenNuevoEstudiante = () => {

    //HOOKS PERSONALES
    const [crearHash512] = useCadenaUnica();

    //AJAX CARGANDO
    const [espera, setEspera] = useState(false);
    //tamano de titulo
    const [tamTitulo, setTamTitulo] = useState("h3");
    //FORMULARIO
    const [usuario, setUsuario] = useState("");
    const [token, setToken] = useState("");

    const ObjAjax = useAjax();
    const navegar = useNavigate();
    const [creaAlerta] = useAlerta();

    let cambiaUsuario = (e) => setUsuario(e.target.value);
    let cambiaToken = (e) => setToken(e.target.value);

    let ejecutaPeticion = async (e) => {

        let datos = {
            usuario: crearHash512(usuario),
            token: token
        };

        if( usuario.replace(" ", "").length == 0 )
        {
            e.preventDefault();
            await creaAlerta({
                titulo : "Error",
                mensaje : "El usuario no puede estar vacío.",
                icono : 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel : "",
                MensajeConfirmar : "OK",
                MensajeCancel : ""
            });
            return;
        }

        await ObjAjax.registrarEstudianteValidaToken(datos, setEspera);
        navegar("/");

    }; 
    
    return(
        <>
            <Cargando open={espera}/>
            <NavegacionInicioSesion />
            <Grid container >
                <Grid item xs={12}>
                    <Box sx={{margin:"%"}}>
                        <Typography
                        textAlign={"center"}
                        variant={tamTitulo} 
                        component={"p"}
                        sx={{fontWeight:"bold", marginTop:"5%"}} >
                            Autentificaci&oacute;n
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs sm></Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container>
                        <Grid item xs={12}>
                            <InputTextBorderAzul 
                            etiqueta={"Usuario"} 
                            sx={{marginTop:"1.5%", paddingLeft: "4px", paddingRight: "4px"}}
                            value={usuario}
                            onChange={ (e) => { cambiaUsuario(e) } }/>
                        </Grid>
                        <Grid item xs={12}>
                            <InputTextBorderAzul 
                            etiqueta={"Token"} 
                            sx={{marginTop:"1.5%", paddingLeft: "4px", paddingRight: "4px"}}
                            value={token}
                            onChange={ (e) => { cambiaToken(e) } }/>
                        </Grid>
                    </Grid>
                    <BotonAzul 
                    onClick={ (e) => { ejecutaPeticion(e) } }
                    sx={{marginTop:"1.5%", width:"100%", paddingLeft: "4px", paddingRight: "4px"}}>
                        Autentificar
                    </BotonAzul>
                </Grid>
                <Grid item xs sm></Grid>
            </Grid>
        </>
    )
};

export default ValidarTokenNuevoEstudiante;