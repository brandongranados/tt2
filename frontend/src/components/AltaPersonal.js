import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as yup from 'yup';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Cargando from "./Cargando";
import InputTextBorderAzul from '../assets/js/InpuTextBorderAzul';
import BotonAzul from '../assets/js/BotonAzul';
import Navegacion from './Navegacion';

import useAjax from '../services/useAjax';
import useAlerta from '../components/hooks/useAlerta';
import useCadenaUnica from './hooks/useCadenaUnica';

let AltaPersonal = () => {
    // Estilos generales
    const inpuText = {
        marginTop: "1.5%", 
        paddingLeft: "4px", 
        paddingRight: "4px"
    };

    // Servicios
    const ObjAjax = useAjax();
    const navegar = useNavigate();
    const [creaAlerta] = useAlerta();
    const [crearHash512] = useCadenaUnica();
    const usuario = useSelector( state => state.DatosUsuario.DatosUsuario );
    const validacion = yup.object().shape({
        paterno: yup.string().required('El apellido paterno es obligatorio'),
        materno: yup.string().required('El apellido materno es obligatorio'),
        nombre: yup.string().required('El nombre es obligatorio'),
        numeroEmpleado: yup.string().required('El número de empleado es obligatorio'),
        correo: yup.string().email("Correo electrónico no válido").required("El correo no puede estar vacío."),
        usuarioPersonal: yup.string().required('El usuario es obligatorio').length(88, "El usuario no es válido"),
        usuario: yup.string().required('El usuario es obligatorio').length(88, "El usuario no es válido")
      });

    // AJAX CARGANDO
    const [espera, setEspera] = useState(false);
    // Tamaño del título
    const [tamTitulo, setTamTitulo] = useState("h3");
    // DATOS PERSONAL
    const [apePaterno, setApePaterno] = useState("");
    const [apeMaterno, setApeMaterno] = useState("");
    const [nombres, setNombres] = useState("");
    const [noEmpleado, setNoEmpleado] = useState("");
    const [correo, setCorreo] = useState("");

    let cambiaApePaterno = (e) => setApePaterno(e.target.value.toUpperCase());
    let cambiaApeMaterno = (e) => setApeMaterno(e.target.value.toUpperCase());
    let cambiaNombres = (e) => setNombres(e.target.value.toUpperCase());
    let cambiaNoEmpleado = (e) => setNoEmpleado(e.target.value);
    let cambiaCorreo = (e) => setCorreo(e.target.value);

    // AJAX
    let peticion = async () => {
        setEspera(true);
        let datos= {
            paterno: apePaterno,
            materno: apeMaterno,
            nombre: nombres,
            numeroEmpleado: noEmpleado,
            correo: correo,
            usuarioPersonal: crearHash512(noEmpleado),
            usuario : usuario
        };

        try {
            await validacion.validate(datos);
        } catch (error) {
            setEspera(false);
            await creaAlerta({
                titulo: "Revise el formulario",
                mensaje: error.message,
                icono: 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel: "",
                MensajeConfirmar: "OK",
                MensajeCancel: ""
            });
            return;
        }
        try {
            setEspera(false);
            let resp = await creaAlerta({
                titulo: "Advertencia",
                mensaje: "¿Está seguro de que su información es correcta?",
                icono: 5,
                boolBtnCancel: true,
                ColorConfirmar: "#2e7d32",
                ColorCancel: "#d33",
                MensajeConfirmar: "OK",
                MensajeCancel: "Cancelar"
            });

            if (!resp) {
                await creaAlerta({
                    titulo: "Cancelado",
                    mensaje: "Operación cancelada",
                    icono: 2,
                    boolBtnCancel: false,
                    ColorConfirmar: "#2e7d32",
                    ColorCancel: "#d33",
                    MensajeConfirmar: "OK",
                    MensajeCancel: ""
                });

                setEspera(false);
                return;
            }

            setEspera(true);

            await ObjAjax.altaPersonal(datos, setEspera);

            setEspera(false);
            navegar("/administrador/listaPersonal");

        } catch (error) {}
    };

    useEffect(() => {
        try {
            window.removeEventListener('resize', cambiaTamVentana);
        } catch (error) {}
        window.addEventListener('resize', cambiaTamVentana);
    }, []);

    let cambiaTamVentana = () => {
        if (window.innerWidth < 300)
            setTamTitulo("h8");
        else if (window.innerWidth < 600)
            setTamTitulo("h5");
        else
            setTamTitulo("h3");
    };

    return (
        <>
            <Cargando open={espera} />
            <Navegacion />
            <Grid container>
                <Grid item xs={12}>
                    <Box sx={{ marginTop: "4%", marginLeft: "4%" }}>
                        <Typography
                            variant={tamTitulo}
                            component={"p"}
                            sx={{ fontWeight: "bold", marginTop: "4%" }}>
                            Alta de personal
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs sm></Grid>
                <Grid item xs={10}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <InputTextBorderAzul
                                etiqueta={"Apellido Paterno"}
                                sx={inpuText}
                                value={apePaterno}
                                onChange={(e) => cambiaApePaterno(e)} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputTextBorderAzul
                                etiqueta={"Apellido Materno"}
                                sx={inpuText}
                                value={apeMaterno}
                                onChange={(e) => cambiaApeMaterno(e)} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <InputTextBorderAzul
                                etiqueta={"Nombre(s)"}
                                sx={inpuText}
                                value={nombres}
                                onChange={(e) => cambiaNombres(e)} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputTextBorderAzul
                                etiqueta={"No. de empleado"}
                                sx={inpuText}
                                value={noEmpleado}
                                onChange={(e) => cambiaNoEmpleado(e)} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <InputTextBorderAzul
                                etiqueta={"Correo electrónico"}
                                sx={inpuText}
                                value={correo}
                                onChange={(e) => cambiaCorreo(e)} />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={3} />
                        <Grid item xs={6}>
                            <BotonAzul
                                sx={{ ...inpuText, width: "100%" }}
                                onClick={peticion}>
                                Registrar
                            </BotonAzul>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs sm></Grid>
            </Grid>
        </>
    );
};

export default AltaPersonal;
