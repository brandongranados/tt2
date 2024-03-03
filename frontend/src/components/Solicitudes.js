import { useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import Cargando from "./Cargando";
import Navegacion from "./Navegacion";
import VerPdf from './VerPdf';

let Solicitudes = () => {

    const [espera, setEspera] = useState(false);
    const [abrirPdf, setAbrirPdf] = useState(false);

    let cerrarModal = () => setAbrirPdf(false);
    let abrirModal = () => setAbrirPdf(true);

    return(
        <>
            <Navegacion />
            <Cargando bool={espera} />
            <Grid container >
                <Grid item xs={12}>
                    <Box sx={{margin:"3%"}}>
                        <Typography variant="h4" element="span" fontWeight={"bold"}>
                            Solicitar documento
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{marginLeft:"3%", marginRight:"3%"}}>
                <Grid container>
                    <Grid item xs={12}>
                        <Accordion>
                            <AccordionSummary 
                            sx={{border:"solid #006699 3px", borderRadius:"4px"}}
                            expandIcon={<KeyboardArrowDownIcon/>} >
                                <Typography variant="h5" element="span" fontWeight={"bold"}>
                                    Constancia
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography 
                                sx={{border:"solid #006699 1px", borderRadius:"4px", cursor:"pointer"}} 
                                variant="h6" 
                                component={"p"}>
                                    Constancia de estudios
                                </Typography>
                                <Typography 
                                sx={{border:"solid #006699 1px", borderRadius:"4px", cursor:"pointer"}}
                                variant="h6" 
                                component={"p"}>
                                    Constancia de inscripci&oacute;n
                                </Typography>
                                <Typography
                                sx={{border:"solid #006699 1px", borderRadius:"4px", cursor:"pointer"}}
                                variant="h6" 
                                component={"p"}>
                                    Constancia para becas
                                </Typography>
                                <Typography
                                sx={{border:"solid #006699 1px", borderRadius:"4px", cursor:"pointer"}}
                                variant="h6"
                                component={"p"}>
                                    Constancia de periodo vacacional de estudios
                                </Typography>
                                <Typography
                                sx={{border:"solid #006699 1px", borderRadius:"4px", cursor:"pointer"}}
                                variant="h6"
                                component={"p"}>
                                    Constancia de servicio social
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={12} sx={{marginTop:"0.3%"}}>
                        <Accordion>
                            <AccordionSummary
                            sx={{border:"solid #006699 3px", borderRadius:"4px", cursor:"pointer"}}
                            expandIcon={<KeyboardArrowDownIcon/>}>
                                <Typography variant="h5" element="span" fontWeight={"bold"}>
                                    Boleta
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography 
                                sx={{border:"solid #006699 1px", borderRadius:"4px", cursor:"pointer"}} 
                                variant="h6" 
                                component={"p"}>
                                    Boleta global
                                </Typography>
                                <Typography 
                                sx={{border:"solid #006699 1px", borderRadius:"4px", cursor:"pointer"}}
                                variant="h6" 
                                component={"p"}>
                                    Boleta certificada
                                </Typography>
                                <Typography
                                sx={{border:"solid #006699 1px", borderRadius:"4px", cursor:"pointer"}}
                                variant="h6" 
                                component={"p"}>
                                    Boleta informativa
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </Box>
            <VerPdf open={abrirPdf} cerrarPdf={cerrarModal} base64={""} />
        </>
    )
};

export default Solicitudes;