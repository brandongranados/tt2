import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import * as Yup from 'yup';

import { useNavigate } from 'react-router-dom';

import InputTextBorderAzul from '../assets/js/InpuTextBorderAzul';
import BotonAzul from '../assets/js/BotonAzul';
import NavegacionInicioSesion from './NavegacionInicioSesion';
import InputTextOcultaText from '../assets/js/InputTextOcultaText';
import Cargando from "./Cargando";

import useAjax from '../services/useAjax';
import useCadenaUnica from './hooks/useCadenaUnica';

import useAlerta from '../components/hooks/useAlerta';

let RegistroEstudiante = () => {

    //HOOKS PERSONALES
    const [crearHash512] = useCadenaUnica();
    //AJAX CARGANDO
    const [espera, setEspera] = useState(false);
    //tamano de titulo
    const [tamTitulo, setTamTitulo] = useState("h3");
    //VALIDACION
    const valida = Yup.object().shape({
        boleta: Yup.number().required("Ingrese un boleta valida."),
        usuario: Yup.string()
                    .required("El usuario no puede estar vacio."),
        correo: Yup.string().email("Correo electrónico no válido")
                    .required("El correo no puede estar vacio."),
        conCorreo: Yup.string().email("Correo electrónico no válido")
                    .required("El correo de confirmacion no puede estar vacio."),
        contrasena: Yup.string()
                    .required("La contrasena no puede estar vacia."),
        conContrasena: Yup.string()
                    .required("La contrasena de confirmacion no puede estar vacia.")
    });

    //FORMULARIO
    const [formulario, setFormulario] = useState({
        boleta: "",
        usuario: "",
        correo: "",
        conCorreo: "",
        contrasena: "",
        conContrasena: ""
    });

    const ObjAjax = useAjax();
    const navegar = useNavigate();
    const [creaAlerta] = useAlerta();

    let cambiaTamVentana = () => {
        
        if( window.innerWidth < 300 )
            setTamTitulo("h8");
        else if( window.innerWidth < 600 )
            setTamTitulo("h5");
        else
            setTamTitulo("h3");
    };

    let ejecutaPeticion = async (e) => {
        let usuario = crearHash512(formulario.usuario);
        let contra = crearHash512(formulario.contrasena);
        let contra2 = crearHash512(formulario.conContrasena);

        try {
            await valida.validate(formulario);
        } catch (error) {
            e.preventDefault();
            await creaAlerta({
                titulo : "Error",
                mensaje : error.errors,
                icono : 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel : "",
                MensajeConfirmar : "OK",
                MensajeCancel : ""
            });
            return;
        }

        if( !await ObjAjax.registrarEstudiante({
            boleta: formulario.boleta,
            usuario: usuario,
            correo: formulario.correo,
            conCorreo: formulario.conCorreo,
            contrasena: contra,
            conContrasena: contra2
        }, setEspera) )
        {
            navegar("/");
            return;
        }

        navegar("/validarToken");

    };

    let cambiaBoleta = (e) => {
        let valor = e.target.value;
        let expresion = /^\d+$/;

        if( valor.length > 10 || !expresion.test(valor) )
        {
            e.preventDefault();
            return;
        }

        setFormulario({
            boleta: valor, 
            usuario: formulario.usuario,
            correo: formulario.correo, 
            conCorreo: formulario.conCorreo,
            contrasena: formulario.contrasena,
            conContrasena: formulario.conContrasena
        });
    };

    let cambiaUsuario = (e) => setFormulario({
        boleta: formulario.boleta,
        usuario: e.target.value,
        correo: formulario.correo,
        conCorreo: formulario.conCorreo,
        contrasena: formulario.contrasena,
        conContrasena: formulario.conContrasena
    });
    let cambiarCorreo = (e) => setFormulario({
        boleta: formulario.boleta,
        usuario: formulario.usuario,
        correo: e.target.value,
        conCorreo: formulario.conCorreo,
        contrasena: formulario.contrasena,
        conContrasena: formulario.conContrasena
    });
    let cambiarConCorreo = (e) => setFormulario({
        boleta: formulario.boleta,
        usuario: formulario.value,
        correo: formulario.correo,
        conCorreo: e.target.value,
        contrasena: formulario.contrasena,
        conContrasena: formulario.conContrasena
    });
    let cambiaContrasena = (e) => setFormulario({
        boleta: formulario.boleta,
        usuario: formulario.value,
        correo: formulario.correo,
        conCorreo: formulario.conCorreo,
        contrasena: e.target.value,
        conContrasena: formulario.conContrasena
    });
    let cambiaConContrasena = (e) => setFormulario({
        boleta: formulario.boleta,
        usuario: formulario.value,
        correo: formulario.correo,
        conCorreo: formulario.conCorreo,
        contrasena: formulario.contrasena,
        conContrasena: e.target.value
    });
    let evitaCopiaPega = (e) =>  e.preventDefault();

    useEffect( () => {

        try {
            window.removeEventListener('resize', cambiaTamVentana);
        } catch (error) {}
        window.addEventListener('resize', cambiaTamVentana);
    }, [] );

    return(
        <>
            <Cargando bool={espera}/>
            <NavegacionInicioSesion />
            <Grid container >
                <Grid item xs={12}>
                    <Box sx={{margin:"3%"}}>
                        <Typography
                        variant={tamTitulo} 
                        component={"p"}
                        sx={{fontWeight:"bold", marginTop:"5%"}} >
                            Registro de nuevo usuario
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs sm></Grid>
                <Grid item xs={12} sm={8}>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <InputTextBorderAzul 
                            etiqueta={"Boleta"} 
                            sx={{marginTop:"1.5%", paddingLeft: "4px", paddingRight: "4px"}}
                            value={formulario.boleta}
                            onChange={ (e) => { cambiaBoleta(e) } }/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputTextBorderAzul 
                            etiqueta={"Nombre del usuario"} 
                            sx={{marginTop:"1.5%", paddingLeft: "4px", paddingRight: "4px"}}
                            value={formulario.usuario}
                            onChange={ (e) => { cambiaUsuario(e) } }/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputTextBorderAzul 
                            etiqueta={"Correo electrónico"} 
                            sx={{marginTop:"1.5%", paddingLeft: "4px", paddingRight: "4px"}}
                            onCopy={ (e) => { evitaCopiaPega(e) } }
                            onPaste={ (e) => { evitaCopiaPega(e) } }
                            onChange={ (e) => { cambiarCorreo(e) } }
                            value={formulario.correo}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputTextBorderAzul 
                            etiqueta={"Confirma correo electrónico"} 
                            sx={{marginTop:"1.5%", paddingLeft: "4px", paddingRight: "4px"}}
                            onCopy={ (e) => { evitaCopiaPega(e) } }
                            onPaste={ (e) => { evitaCopiaPega(e) } }
                            onChange={ (e) => { cambiarConCorreo(e) } }
                            value={formulario.conCorreo}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputTextOcultaText 
                            etiqueta={"Contraseña"} 
                            sx={{marginTop:"1.5%", paddingLeft: "4px", paddingRight: "4px"}}
                            onCopy={ (e) => { evitaCopiaPega(e) } }
                            onPaste={ (e) => { evitaCopiaPega(e) } }
                            onChange={ (e) => { cambiaContrasena(e) } }
                            value={formulario.contrasena}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputTextOcultaText 
                            etiqueta={"Confirma contraseña"} 
                            sx={{marginTop:"1.5%", paddingLeft: "4px", paddingRight: "4px"}}
                            onCopy={ (e) => { evitaCopiaPega(e) } }
                            onPaste={ (e) => { evitaCopiaPega(e) } }
                            onChange={ (e) => { cambiaConContrasena(e) } }
                            value={formulario.conContrasena}/>
                        </Grid>
                    </Grid>
                    <BotonAzul 
                    onClick={ (e) => { ejecutaPeticion(e) } }
                    sx={{marginTop:"1.5%", width:"100%", paddingLeft: "4px", paddingRight: "4px"}}>
                        registrar
                    </BotonAzul>
                </Grid>
                <Grid item xs sm></Grid>
            </Grid>
        </>
    )
};

export default RegistroEstudiante;