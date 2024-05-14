import { useState } from "react";
import dayjs from 'dayjs';

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import VisibilityIcon from '@mui/icons-material/Visibility';

import Cargando from "./Cargando";
import Navegacion from "./Navegacion";

let ExpendienteEdicion = () => {
    // Datos ficticios
    const [apePaterno, setApePaterno] = useState("Casiano");
    const [apeMaterno, setApeMaterno] = useState("Granados");
    const [nombres, setNombres] = useState("Brandon");
    const [curp, setCurp] = useState("GULK123456HDFKD09");
    const [sexo, setSexo] = useState("M");
    const [nacimiento, setNacimiento] = useState(dayjs("1999-10-13"));
    const [boleta, setBoleta] = useState("2018670098");
    const [carreraOpc, setCarreraOpc] = useState(["INGENIERIA EN SISTEMAS"]);
    const [carreraSel, setCarreraSel] = useState("INGENIERIA EN SISTEMAS");
    const [semestreNivel, setSemestreNivel] = useState(["1", "2", "3"]);
    const [semestreNivelSel, setSemestreNivelSel] = useState("3");
    const [correo, setCorreo] = useState("JCAJSDNOINC@GMAIL.COM");

    let cambiaApePaterno = (e) => setApePaterno(e.target.value.toUpperCase());
    let cambiaApeMaterno = (e) => setApeMaterno(e.target.value.toUpperCase());
    let cambiaNombres = (e) => setNombres(e.target.value.toUpperCase());
    let cambiaCarrera = (e) => setCarreraSel(e.target.value);
    let cambiaSemestreNivel = (e) => setSemestreNivelSel(e.target.value);
    let cambiaCorreo = (e) => setCorreo(e.target.value);

    let cambiaBoleta = (e) => {
        let valor = e.target.value;
        for(let i=0; i<valor.length; i++)
            if( !(valor.charAt(i).charCodeAt() > 47 && valor.charCodeAt(i) < 58) )
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
        if( may.length >= 10 ) {
            try {
                parseInt(may.substring(4, 10));
                let c = may.substring(4, 10);
                let ano = c[0] == "0" ? "20"+c[0]+c[1] : "19"+c[0]+c[1];
                let mes = c[2]+c[3];
                let dia = c[4]+c[5];
                setNacimiento(dayjs(ano+"-"+mes+"-"+dia));
            } catch (error) {}
        } else {
            setNacimiento(dayjs(null));
        }
        if( may.length >= 11 )
            setSexo(may[10] == "H" ? "M" : "F");
        else
            setSexo("");
    };

    let cambiaNacimiento = (e) => {
        setNacimiento(dayjs(e.target.value));
    };

    return (
        <>
            <Cargando/>
            <Navegacion/>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={10}>
                    <Paper>
                        <Box p={3}>
                            <Typography variant="h4" component="p" fontWeight="bold" align="center" gutterBottom mb={6}>
                                Expediente Digital
                            </Typography>
                            
                            <Box mb={4}>
                                <Grid container spacing={3} justifyContent="center">
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Apellido Paterno"
                                            value={apePaterno}
                                            onChange={cambiaApePaterno}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Apellido Materno"
                                            value={apeMaterno}
                                            onChange={cambiaApeMaterno}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Nombre(s)"
                                            value={nombres}
                                            onChange={cambiaNombres}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="CURP"
                                            value={curp}
                                            onChange={cambiaCurp}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Sexo"
                                            value={sexo}
                                            onChange={(e) => setSexo(e.target.value)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Fecha de Nacimiento"
                                            type="date"
                                            value={nacimiento.format('YYYY-MM-DD')}
                                            onChange={cambiaNacimiento}
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Boleta"
                                            value={boleta}
                                            onChange={cambiaBoleta}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            select
                                            label="Carrera"
                                            value={carreraSel}
                                            onChange={cambiaCarrera}
                                            fullWidth
                                        >
                                            {carreraOpc.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            select
                                            label="Semestre (Nivel)"
                                            value={semestreNivelSel}
                                            onChange={cambiaSemestreNivel}
                                            fullWidth
                                        >
                                            {semestreNivel.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <TextField
                                            label="Correo Electrónico"
                                            value={correo}
                                            onChange={cambiaCorreo}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} display="flex" justifyContent="center">
                                        <Button variant="contained" color="primary">
                                            Actualizar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box>
                                <Typography variant="h4" component="p" fontWeight="bold" align="center" gutterBottom>
                                    Documentos
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Documento</TableCell>
                                                <TableCell align="center">Acciones</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Acta de nacimiento</TableCell>
                                                <TableCell align="center">
                                                    <VisibilityIcon style={{ cursor: 'pointer' }} />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default ExpendienteEdicion;
