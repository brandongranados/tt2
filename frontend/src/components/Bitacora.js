import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DownloadIcon from '@mui/icons-material/Download';

import Navegacion from './Navegacion';

const Bitacora = () => {
    const [datos, setDatos] = useState([]);

    useEffect(() => {
        // Aquí puedes hacer una llamada para obtener los datos de la bitácora
        setDatos([
            // Ejemplo de datos
            { id: 1, tipo: 'Solicitud', fecha: '2023-05-01', a: '2024-05-01' },
            { id: 2, tipo: 'Cambio', fecha: '2023-05-01', a: '2024-05-01' },
        ]);
    }, []);

    const handleDownload = (tipo) => {
        // Lógica para manejar la descarga de las bitácoras
        console.log(`Descargando bitácora de ${tipo}`);
    };

    return (
        <>
            <Navegacion />
            <Grid container spacing={3} sx={{ marginTop: 2 }}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h1" fontWeight="bold" textAlign="center">
                        Bitácoras
                    </Typography>
                    <Box display="flex" justifyContent="center" mt={2}>
                        <TextField
                            label="DE"
                            type="date"
                            defaultValue="2023-05-01"
                            InputLabelProps={{ shrink: true }}
                            sx={{ marginRight: 2 }}
                        />
                        <TextField
                            label="A"
                            type="date"
                            defaultValue="2024-05-01"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Box>
                    {datos.map((dato) => (
                        <Box key={dato.id} mt={3}>
                            <Paper elevation={3} sx={{ padding: 2 }}>
                                <Button
                                    variant="outlined"
                                    endIcon={<DownloadIcon />}
                                    sx={{
                                        width: '100%',
                                        justifyContent: 'space-between',
                                        padding: 2,
                                    }}
                                    onClick={() => handleDownload(dato.tipo)}
                                >
                                    Bitácora de {dato.tipo}
                                </Button>
                            </Paper>
                        </Box>
                    ))}
                </Grid>
            </Grid>
        </>
    );
};

export default Bitacora;
