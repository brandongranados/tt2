import { useState } from "react";

import dayjs from 'dayjs';

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

import Cargando from "./Cargando";
import Navegacion from "./Navegacion";
import InputTextBorderAzul from "../assets/js/InpuTextBorderAzul";
import SelectAzul from "../assets/js/SelectAzul";
import { Box } from "@mui/material";

let ExpendienteEdicion = () => {

    //DATOS USUARIO
    const [apePaterno, setApePaterno] = useState("");
    const [apeMaterno, setApeMaterno] = useState("");
    const [nombres, setNombres] = useState("");
    const [curp, setCurp] = useState("");
    const [sexo, setSexo] = useState("");
    const [nacimiento, setNacimiento] = useState(dayjs(null));
    const [boleta, setBoleta] = useState("");
    const [carreraOpc, setCarreraOpc] = useState(["uno"]);
    const [carreraSel, setCarreraSel] = useState("");
    const [semestreNivel, setSemestreNivel] = useState(["uno"]);
    const [semestreNivelSel, setSemestreNivelSel] = useState("");
    const [correo, setCorreo] = useState("");

    let cambiaApePaterno = (e) => setApePaterno(e.target.value.toUpperCase());
    let cambiaApeMaterno = (e) => setApeMaterno(e.target.value.toUpperCase());
    let cambiaNombres = (e) => setNombres(e.target.value.toUpperCase());
    let cambiaCarrera = (e) => setCarreraSel(e.target.value);
    let cambiaSemestreNivel = (e) => setSemestreNivelSel(e.target.value);
    let cambiaCorreo = (e) => setCorreo(e.target.value);

    let cambiaBoleta = (e) => {
        let valor = e.target.value;

        for(let i=0; i<valor.length; i++)
            if( !(valor.charAt(i).charCodeAt() > 47 && valor.charAt(i).charCodeAt() < 58) )
                valor = valor.replace(valor.charAt(i), "");

        if( valor.length > 10 )
            valor = valor.substring(0, 10);

        setBoleta(valor);
    };

    let cambiaCurp = (e) => {

        let may = e.target.value.toUpperCase();

        if( may.length > 10 )
            may = may.substring(0, 18);

        setCurp(may);

        if( may.length >= 10 )
        {
            try {
                parseInt(may.substring(4, 10));

                let c = may.substring(4, 10);
                let ano = c[0] == "0" ? "20"+c[0]+c[1] : "19"+c[0]+c[1] ;
                let mes = c[2]+c[3];
                let dia = c[4]+c[5];

                setNacimiento(dayjs(ano+"-"+mes+"-"+dia));
            } catch (error) {}
        }
        else
            setNacimiento(dayjs(null));

        if( may.length >= 11 )
            setSexo(may[10] == "H" ? "HOMBRE" : "MUJER");
        else
            setSexo("");
    };

    return(
        <>
            <Cargando/>
            <Navegacion/>
            <Grid container>
                <Grid item xs={12}>
                    <Paper>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            <Typography
                                            variant="h4" 
                                            component={"p"} 
                                            fontWeight={"bold"}>
                                                Expendiente estudiantil
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            PATERNO
                                        </TableCell>
                                        <TableCell>
                                            <InputTextBorderAzul
                                            value={apePaterno}
                                            onChange={ e => cambiaApePaterno(e) }/>
                                        </TableCell>
                                        <TableCell>
                                            MATERNO
                                        </TableCell>
                                        <TableCell>
                                            <InputTextBorderAzul
                                            value={apeMaterno}
                                            onChange={ e => cambiaApeMaterno(e) }/>
                                        </TableCell>
                                        <TableCell>
                                            NOMBRE(S)
                                        </TableCell>
                                        <TableCell>
                                            <InputTextBorderAzul
                                            value={nombres}
                                            onChange={ e => cambiaNombres(e) }/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            CURP
                                        </TableCell>
                                        <TableCell>
                                            <InputTextBorderAzul
                                            value={curp}
                                            onChange={ e => cambiaCurp(e) }/>
                                        </TableCell>
                                        <TableCell>
                                            SEXO
                                        </TableCell>
                                        <TableCell>
                                            <InputTextBorderAzul
                                            value={sexo}/>
                                        </TableCell>
                                        <TableCell>
                                            FECHA NACIMIENTO
                                        </TableCell>
                                        <TableCell>
                                            <InputTextBorderAzul
                                            value={nacimiento}
                                            onChange={ e => cambiaBoleta(e) }/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            BOLETA
                                        </TableCell>
                                        <TableCell>
                                            <InputTextBorderAzul
                                            value={boleta}/>
                                        </TableCell>
                                        <TableCell>
                                            CARRERA
                                        </TableCell>
                                        <TableCell>
                                            <SelectAzul
                                            opciones={carreraOpc}
                                            value={carreraSel}
                                            onChange={ e => cambiaCarrera(e) }/>
                                        </TableCell>
                                        <TableCell>
                                            SEMESTRE(NIVEL)
                                        </TableCell>
                                        <TableCell>
                                            <SelectAzul
                                            opciones={semestreNivel}
                                            value={semestreNivelSel}
                                            onChange={ e => cambiaSemestreNivel(e) }/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            CORREO ELECTRONICO
                                        </TableCell>
                                        <TableCell colSpan={5}>
                                            <InputTextBorderAzul
                                            value={correo}
                                            onChange={ e => cambiaCorreo(e) }/>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            <Typography
                                            variant="h4" 
                                            component={"p"} 
                                            fontWeight={"bold"}>
                                                Documentos
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={5}>
                                            ACTA DE NACIMIENTO
                                        </TableCell>
                                        <TableCell>
                                            <Box
                                            textAlign={"center"}>
                                                <VisibilityIcon/>
                                                <DeleteIcon/>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
};

export default ExpendienteEdicion;