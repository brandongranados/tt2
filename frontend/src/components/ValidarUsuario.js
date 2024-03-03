import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Cargando from "./Cargando";
import Navegacion from "./Navegacion";
import InputTextBorderAzul from "../assets/js/InpuTextBorderAzul";
import BotonAzul from "../assets/js/BotonAzul";
import { useState } from "react";
import SelectAzul from "../assets/js/SelectAzul";
import FechasAzul from "../assets/js/FechasAzul";


let ValidarUsuario = () => {

    const [paterno, setPaterno] = useState("");
    const [materno, setMaterno] = useState("");
    const [nombre, setNombre] = useState("");
    const [boleta, setBoleta] = useState("");
    const [carreras, setCarreras] = useState(["isc", "lcd"]);
    const [carSel, setCarSel] = useState("");
    const [semestres, setSemestres] = useState([1, 2, 3]);
    const [semestre, setSemestre] = useState("");
    const [curp, setCurp] = useState("");
    const [correo, setCorreo] = useState("");
    const [usuario, setUsuario] = useState("");
    const [celular, setCelular] = useState("");
    const [telefono, setTelefono] = useState("");

    const [espera, setEspera] = useState(false);

    let cambiarPaterno = (e) => setPaterno(e.target.value);
    let cambiarMaterno = (e) => setMaterno(e.target.value);
    let cambiarNombre = (e) => setNombre(e.target.value);
    let cambiarBoleta = (e) => setBoleta(e.target.value);
    let cambiarCurp = (e) => setCurp(e.target.value);
    let cambiarCorreo = (e) => setCorreo(e.target.value);
    let cambiarUsuario = (e) => setUsuario(e.target.value);
    let cambiarNumero = (e) => setCelular(e.target.value);
    let cambiarCarrera = (e) => setCarSel(e.target.value);
    let cambiarSemestre = (e) => setSemestre(e.target.value);
    let cambiarTelefono = (e) => setTelefono(e.target.value);

    return(
        <>
            <Navegacion />
            <Cargando bool={espera} />
            <Grid container >
                <Grid item xs={12}>
                    <Box sx={{margin:"3%"}}>
                        <Typography variant="h4" element="span" fontWeight={"bold"}>
                            Validaci&oacute;n de usuarios
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
                        <SelectAzul 
                        etiqueta={"Carrera"}
                        opciones={carreras}
                        onChange={ (e) => { cambiarCarrera(e) } } />
                    </Grid>
                    <Grid item sm={4} sx={{padding:"1%"}}>
                        <SelectAzul 
                        etiqueta={"Semestre(Nivel)"}
                        opciones={semestres} />
                    </Grid>
                    <Grid item sm={4} sx={{padding:"1%"}}>
                        <InputTextBorderAzul 
                        etiqueta={"CURP"}
                        value={curp}
                        onChange={ (e) => { cambiarCurp(e) } } />
                    </Grid>
                    <Grid item sm={4} sx={{padding:"1%"}}>
                        <SelectAzul 
                        etiqueta={"Sexo"}
                        opciones={["M", "F"]} />
                    </Grid>
                    <Grid item sm={4} sx={{padding:"1%"}}>
                        <FechasAzul etiqueta={"Fecha nacimiento"} value={"2024-01-01"}/>
                    </Grid>
                    <Grid item sm={4} sx={{padding:"1%"}}>
                        <InputTextBorderAzul 
                        etiqueta={"Correo electrónico"}
                        value={correo}
                        onChange={ (e) => { cambiarCorreo(e) } } />
                    </Grid>
                    <Grid item sm={4} sx={{padding:"1%"}}>
                        <InputTextBorderAzul 
                        etiqueta={"Usuario"}
                        value={usuario}
                        onChange={ (e) => { cambiarUsuario(e) } } />
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
                        onChange={ (e) => { cambiarNumero(e) } } />
                    </Grid>
                </Grid>
            </Box>
            <Grid container>
                <Grid item sm />
                <Grid item sm={6} >
                    <BotonAzul sx={{width:"100%"}}>
                        validar usuario
                    </BotonAzul>
                </Grid>
                <Grid item sm />
            </Grid>
        </>
    )
};

export default ValidarUsuario;