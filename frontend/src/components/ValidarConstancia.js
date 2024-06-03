import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import useAjax from '../services/useAjax';
import NavegacionInicioSesion from './NavegacionInicioSesion';
import Cargando from './Cargando';

const ValidarConstancia = () => {
    const ObjAjax = useAjax();

    const [espera, setEspera] = useState(false);
    const [datos, setDatos] = useState({
        nombre: null,
        situacion: null,
        curp: null,
        boleta: null,
        tipo: null,
        fechaEmision: null,
        carrera: null,
        promedio: null,
        porcentajeAvance: null
    });

    useEffect(() => {

        let url = window.location.href;
        let token = url.split("=")[1];

        let verifica = async () => {
            
            let resp = await ObjAjax.verificarDocumento({documento:token}, setEspera);
            let cadena = resp.documento.replace("<br>", "").replace("\n", "");
            let array = cadena.split("|");
            setDatos({
                nombre: array[7],
                situacion: "Su situación académica se encuentra inscrita en este plantel.",
                curp: array[8],
                boleta: array[6],
                tipo: array[5],
                fechaEmision: array[24],
                carrera: array[10],
                promedio: "86.41",
                porcentajeAvance: "69.95%",
                situacionAcademica: array[18]
            });

        };

        verifica();
    }, []);

    return (
        <>
            <NavegacionInicioSesion />
            <Cargando bool={espera}/>
            <Grid container spacing={3} sx={{ marginTop: 2 }}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h1" fontWeight="bold" textAlign="center">
                        Validación de Constancia
                    </Typography>
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Paper elevation={3} sx={{ padding: 2, width: '80%' }}>
                            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
                                <strong>Nombre del estudiante:</strong> {datos.nombre}
                            </Typography>
                            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
                                <strong>Situación académica:</strong> {datos.situacion}
                            </Typography>
                            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
                                <strong>CURP:</strong> {datos.curp}
                            </Typography>
                            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
                                <strong>Boleta:</strong> {datos.boleta}
                            </Typography>
                            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
                                <strong>Tipo de constancia:</strong> {datos.tipo}
                            </Typography>
                            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
                                <strong>Fecha de emisión del documento:</strong> {datos.fechaEmision}
                            </Typography>
                            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
                                <strong>Carrera:</strong> {datos.carrera}
                            </Typography>
                            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
                                <strong>Promedio:</strong> {datos.promedio}
                            </Typography>
                            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
                                <strong>Porcentaje de avance:</strong> {datos.porcentajeAvance}
                            </Typography>
                            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
                                <strong>Situación académica:</strong> {datos.situacionAcademica}
                            </Typography>
                            <Box mt={3} display="flex" justifyContent="center">
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default ValidarConstancia;
