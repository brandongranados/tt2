import { useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Cargando from "./Cargando";
import Navegacion from "./Navegacion";
import InputTextBorderAzul from "../assets/js/InpuTextBorderAzul";
import BotonAzul from "../assets/js/BotonAzul";

let RegistroUsuario = () => {

    const [espera, setEspera] = useState(false);

    const [paterno, setPaterno] = useState("");
    const [materno, setMaterno] = useState("");
    const [nombre, setNombre] = useState("");
    const [boleta, setBoleta] = useState("");
    const [correo, setCorreo] = useState("");
    const [correoConfirma, setCorreoConfirma] = useState("");
    const [usuario, setUsuario] = useState("");
    const [contra, setContra] = useState("");
    const [contraConfirma, setContraConfirma] = useState("");

    const [celular, setCelular] = useState("");
    const [telefono, setTelefono] = useState("");

    let cambiarPaterno = (e) => setPaterno(e.target.value);
    let cambiarMaterno = (e) => setMaterno(e.target.value);
    let cambiarNombre = (e) => setNombre(e.target.value);
    let cambiarBoleta = (e) => setBoleta(e.target.value);
    let cambiarCorreo = (e) => setCorreo(e.target.value);
    let cambiarCorreoConfirma = (e) => setCorreoConfirma(e.target.value);
    let cambiarUsuario = (e) => setUsuario(e.target.value);
    let cambiarContra = (e) => setContra(e.target.value);
    let cambiarContraConfirma = (e) => setContraConfirma(e.target.value);

    let cambiarNumero = (e) => setCelular(e.target.value);
    let cambiarTelefono = (e) => setTelefono(e.target.value);


    return(
        <>
            <Navegacion/>
            <Cargando open={espera} />
            <Grid container >
                <Grid item xs={12}>
                    <Box sx={{margin:"3%"}}>
                        <Typography variant="h4" element="span" fontWeight={"bold"}>
                            Registro de usuario
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{marginLeft:"3%", marginRight:"3%"}}>
                <Grid container>
                <Grid item sm={4} sx={{padding:"1%"}}>
                        <InputTextBorderAzul 
                        etiqueta={"Apellido Paterno"}
                        value={paterno}
                        onChange={ (e) => { cambiarPaterno(e) } } />
                    </Grid>
                    <Grid item sm={4} sx={{padding:"1%"}}>
                        <InputTextBorderAzul 
                        etiqueta={"Apellido Materno"}
                        value={materno}
                        onChange={ (e) => { cambiarMaterno(e) } } />
                    </Grid>
                    <Grid item sm={4} sx={{padding:"1%"}}>
                        <InputTextBorderAzul 
                        etiqueta={"Nombre(s)"}
                        value={nombre}
                        onChange={ (e) => { cambiarNombre(e) } }  />
                    </Grid>
                    <Grid item sm={4} sx={{padding:"1%"}}>
                        <InputTextBorderAzul 
                        etiqueta={"Boleta"}
                        value={boleta}
                        onChange={ (e) => { cambiarBoleta(e) } } />
                    </Grid>
                    <Grid item sm={4} sx={{padding:"1%"}}>
                        <InputTextBorderAzul 
                        etiqueta={"Correo electrónico"}
                        value={correo}
                        onChange={ (e) => { cambiarCorreo(e) } } />
                    </Grid>
                    <Grid item sm={4} sx={{padding:"1%"}}>
                        <InputTextBorderAzul 
                        etiqueta={"Correo electrónico confirma"}
                        value={correoConfirma}
                        onChange={ (e) => { cambiarCorreoConfirma(e) } } />
                    </Grid>
                    <Grid item sm={4} sx={{padding:"1%"}}>
                        <InputTextBorderAzul 
                        etiqueta={"Usuario"}
                        value={usuario}
                        onChange={ (e) => { cambiarUsuario(e) } } />
                    </Grid>
                    <Grid item sm={4} sx={{padding:"1%"}}>
                        <InputTextBorderAzul 
                        etiqueta={"Contraseña"}
                        value={contra}
                        onChange={ (e) => { cambiarContra(e) } } />
                    </Grid>
                    <Grid item sm={4} sx={{padding:"1%"}}>
                        <InputTextBorderAzul 
                        etiqueta={"Contraseña confirma"}
                        value={contraConfirma}
                        onChange={ (e) => { cambiarContraConfirma(e) } } />
                    </Grid>
                    <Grid item sm={4} sx={{padding:"1%"}}>
                        <InputTextBorderAzul 
                        etiqueta={"Número celular"}
                        value={celular}
                        onChange={ (e) => { cambiarNumero(e) } } />
                    </Grid>
                    <Grid item sm={4} sx={{padding:"1%"}}>
                        <InputTextBorderAzul 
                        etiqueta={"Número teléfono"}
                        value={telefono}
                        onChange={ (e) => { cambiarTelefono(e) } } />
                    </Grid>
                </Grid>
            </Box>
            <Grid container>
                <Grid item sm />
                <Grid item sm={6} >
                    <BotonAzul sx={{width:"100%"}}>
                        Registrar
                    </BotonAzul>
                </Grid>
                <Grid item sm />
            </Grid>
        </>
    )
};

export default RegistroUsuario;