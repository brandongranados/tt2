import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DownloadIcon from '@mui/icons-material/Download';

import Navegacion from './Navegacion';

const ValidarConstancia = () => {
    const [datos, setDatos] = useState({
        nombre: "GUERRERO GUTIERREZ LESLIE ITZEL",
        situacion: "Su situación académica se encuentra inscrita en este plantel.",
        curp: "GUCL961205MDFTRS09",
        boleta: "2019530077",
        tipo: "CONSTANCIA DE ESTUDIOS",
        fechaEmision: "2024-02-21",
        carrera: "ING. EN SIST. COMPUTACIONALES",
        promedio: "86.41",
        porcentajeAvance: "69.95%",
        situacionAcademica: "Regular",
        emisora: "DANIELA LOPEZ VEGA DEPARTAMENTO DE GESTIÓN ESCOLAR"
    });

    useEffect(() => {
    }, []);

    return (
        <>
            <Navegacion />
            <Grid container spacing={3} sx={{ marginTop: 2 }}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h1" fontWeight="bold" textAlign="center">
                        Validación de Constancia
                    </Typography>
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Paper elevation={3} sx={{ padding: 2, width: '80%' }}>
                            <Typography variant="body1" component="p" sx={{ mb: 2, textAlign: 'center' }}>
                                El código de seguridad ha sido modificado o la información de la trayectoria del alumno ha sufrido cambios con respecto al documento emitido, por favor solicite una constancia actualizada.
                            </Typography>
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
                            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
                                <strong>Documento emitido por:</strong> {datos.emisora}
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
