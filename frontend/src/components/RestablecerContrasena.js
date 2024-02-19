import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import BotonMorado from "../assets/js/BotonMorado";
import InputTextBorderGris from "../assets/js/InpuTextBorderGris";
import useAlerta from "./hooks/useAlerta";

import '../assets/css/RestablecerContrasena.css';

let RestablecerContrasena = () => {
    const opc = {
        titulo: "Advertencia hgwbxfgwugfw fwgnygfuwgbfuxbgexfu",
        mensaje: "Esta seguro chbwakuvgwjabgcuwqgfucyqwgu cwfhaesgfywgcfiuwbgcfiew cbwefugheygfeyugheyucfew",
        icono : 1,
        boolBtnCancel: true,
        ColorConfirmar: "green",
        ColorCancel: "red",
        MensajeConfirmar: "Ok",
        MensajeCancel: "Cancelar"
    };

    const [activar] = useAlerta();

    let jajaja = async () => {
        let resp = await activar(opc);
        console.log(resp);
    };

    return(
        <Box sx={{margin:"3%"}}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography component={"p"} variant="h2" 
                            fontWeight={"bold"}
                            sx={{borderBottom:"solid", paddingBottom:"2%" }}
                            className="titulo-restablecer-contrasena" >
                        Restablecimiento de contraseña
                    </Typography>
                </Grid>
                <Grid item xs={12} />
                <Grid item xs={12} />
                <Grid item xs={12}>
                    <InputTextBorderGris />
                </Grid>
                <Grid item xs={12}>
                    <BotonMorado onClick={jajaja} >recuperar contraseña</BotonMorado>
                </Grid>
            </Grid>
        </Box>
    )
};

export default RestablecerContrasena;