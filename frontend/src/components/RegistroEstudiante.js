import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom';

import InputTextBorderAzul from '../assets/js/InpuTextBorderAzul';
import BotonAzul from '../assets/js/BotonAzul';
import Navegacion from './Navegacion';
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
    //FORMULARIO
    const [boleta, setBoleta] = useState("");
    const [usuario, setUsuario] = useState("");
    const [correo, setCorreo] = useState("");
    const [conCorreo, setConCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [conContrasena, setConContrasena] = useState("");

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

    let cambiaBoleta = (e) => {
        let valor = e.target.value;

        for(let i=0; i<valor.length; i++)
            if( !(valor.charAt(i).charCodeAt() > 47 && valor.charAt(i).charCodeAt() < 58) )
                valor = valor.replace(valor.charAt(i), "");

        if( valor.length > 10 )
            valor = valor.substring(0, 10);

        setBoleta(valor);
    };

    let validaFormulario = () => {

        let retorna = { error:"", bool:true };
        const expCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if( boleta.length != 10 )
        {
            retorna.bool = false;
            retorna.error += "Ingrese un boleta valida. ";
        }

        if( expCorreo.test( correo ) )
            retorna.error += "Ingrese un correo valido. ";

        if( expCorreo.test( conCorreo ) )
            retorna.error += "Ingrese un correo valido en la confirmacion. ";

        if( correo != conCorreo )
        {
            retorna.bool = false;
            retorna.error += "Los correos ingresados no son iguales. ";
        }

        if( contrasena != conContrasena )
        {
            retorna.bool = false;
            retorna.error += "Las contraseñas ingresadas no son iguales. ";
        }

        if( usuario.replace(" ", "").length == 0 )
        {
            retorna.bool = false;
            retorna.error += "El usuario no puede estar vacio. ";
        }
        
        retorna.bool = expCorreo.test( correo );
        retorna.bool = expCorreo.test( conCorreo );

        return retorna;

    };

    let ejecutaPeticion = async (e) => {

        let datos = 
        {
            boleta: boleta,
            usuario: crearHash512(usuario),
            correo: correo,
            conCorreo: conCorreo,
            contrasena: crearHash512(contrasena),
            conContrasena: crearHash512(conContrasena)
        };

        let validacion = validaFormulario();

        if( !validacion.bool )
        {
            e.preventDefault();
            await creaAlerta({
                titulo : "Error",
                mensaje : validacion.error,
                icono : 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel : "",
                MensajeConfirmar : "OK",
                MensajeCancel : ""
            });
            return;
        }

        if( !await ObjAjax.registrarEstudiante(datos, setEspera) )
        {
            await creaAlerta({
                titulo : "Error",
                mensaje : "Error interno",
                icono : 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel : "",
                MensajeConfirmar : "OK",
                MensajeCancel : ""
            });

            navegar("/");
            return;
        }

        navegar("/validarToken");

    };

    let cambiaUsuario = (e) => setUsuario(e.target.value);
    let cambiarCorreo = (e) => setCorreo(e.target.value);
    let cambiarConCorreo = (e) => setConCorreo(e.target.value);
    let cambiaContrasena = (e) => setContrasena(e.target.value);
    let cambiaConContrasena = (e) => setConContrasena(e.target.value);
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
            <Navegacion />
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
                            value={boleta}
                            onChange={ (e) => { cambiaBoleta(e) } }/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputTextBorderAzul 
                            etiqueta={"Nombre del usuario"} 
                            sx={{marginTop:"1.5%", paddingLeft: "4px", paddingRight: "4px"}}
                            value={usuario}
                            onChange={ (e) => { cambiaUsuario(e) } }/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputTextBorderAzul 
                            etiqueta={"Correo electrónico"} 
                            sx={{marginTop:"1.5%", paddingLeft: "4px", paddingRight: "4px"}}
                            onCopy={ (e) => { evitaCopiaPega(e) } }
                            onPaste={ (e) => { evitaCopiaPega(e) } }
                            onChange={ (e) => { cambiarCorreo(e) } }
                            value={correo}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputTextBorderAzul 
                            etiqueta={"Confirma correo electrónico"} 
                            sx={{marginTop:"1.5%", paddingLeft: "4px", paddingRight: "4px"}}
                            onCopy={ (e) => { evitaCopiaPega(e) } }
                            onPaste={ (e) => { evitaCopiaPega(e) } }
                            onChange={ (e) => { cambiarConCorreo(e) } }
                            value={conCorreo}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputTextOcultaText 
                            etiqueta={"Contraseña"} 
                            sx={{marginTop:"1.5%", paddingLeft: "4px", paddingRight: "4px"}}
                            onCopy={ (e) => { evitaCopiaPega(e) } }
                            onPaste={ (e) => { evitaCopiaPega(e) } }
                            onChange={ (e) => { cambiaContrasena(e) } }
                            value={contrasena}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputTextOcultaText 
                            etiqueta={"Confirma contraseña"} 
                            sx={{marginTop:"1.5%", paddingLeft: "4px", paddingRight: "4px"}}
                            onCopy={ (e) => { evitaCopiaPega(e) } }
                            onPaste={ (e) => { evitaCopiaPega(e) } }
                            onChange={ (e) => { cambiaConContrasena(e) } }
                            value={conContrasena}/>
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