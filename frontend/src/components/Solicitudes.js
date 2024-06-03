import { useState } from "react";

import { useSelector } from 'react-redux';

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
import useAjax from '../services/useAjax';

let Solicitudes = () => {
    const ObjAjax = useAjax();
    const usuario = useSelector( state => state.DatosUsuario.DatosUsuario );

    const [espera, setEspera] = useState(false);
    const [abrirPdf, setAbrirPdf] = useState(false);
    const [crudoPDF, setCrudoPDF] = useState(null);

    let constancia = async (opc) => {
        let crudo = await ObjAjax.crearConstancia({usuario:usuario}, setEspera, opc);
        
        if( crudo )
        {
            setCrudoPDF(crudo);
            setEspera(false);
            abrirModal();
        }
    };

    let cerrarModal = () => {
        setAbrirPdf(false);
        setCrudoPDF(null);
    }
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
                                component={"p"}
                                onClick={ e => constancia(1) }>
                                    Constancia de estudios
                                </Typography>
                                <Typography 
                                sx={{border:"solid #006699 1px", borderRadius:"4px", cursor:"pointer"}}
                                variant="h6" 
                                component={"p"}
                                onClick={ e => constancia(2) }>
                                    Constancia de inscripci&oacute;n
                                </Typography>
                                <Typography
                                sx={{border:"solid #006699 1px", borderRadius:"4px", cursor:"pointer"}}
                                variant="h6" 
                                component={"p"}
                                onClick={ e => constancia(3) }>
                                    Constancia para becas
                                </Typography>
                                <Typography
                                sx={{border:"solid #006699 1px", borderRadius:"4px", cursor:"pointer"}}
                                variant="h6"
                                component={"p"}
                                onClick={ e => constancia(5) }>
                                    Constancia de servicio social
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </Box>
            <VerPdf open={abrirPdf} cerrarPdf={cerrarModal} base64={crudoPDF} />
        </>
    )
};

export default Solicitudes;