import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import BotonAzul from "../assets/js/BotonAzul";
import Navegacion from "./Navegacion";
import Cargando from "./Cargando";

import { setEstudiante } from "../services/DatosUsuario";

let AltaEstudianteValidacion = () => {

    //DATOS ESTUDIANTES NUEVOS
    const estudiantes = useSelector( state => state.DatosUsuario.DatosUsuario );
    const despacha = useDispatch();
    const navegar = useNavigate();

    //PAGINACION
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [espera, setEspera] = useState(false);

    //DATOS DE EXCEL DESPLEGADOS
    const [registro, setRegistro] = useState([]);

    let handleChangePage = (event, newPage) => setPage(newPage);

    let handleChangeRowsPerPage = (event) => {
        setRowsPerPage(10);
        setPage(0);
    };

    let editarEstudiante = (estudiante) => {
        despacha(setEstudiante(estudiante));
        navegar("/administrador/altaEstValEdicion");
    };

    useEffect( () => {
        setRegistro(estudiantes);
    }, [] );

    return(
        <>
            <Cargando bool={espera}/>
            <Navegacion/>
            <Grid container>
                <Card sx={{width:"100%"}}>
                    <CardContent>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography 
                                    variant="h4" 
                                    component={"p"} 
                                    fontWeight={"bold"}>
                                        Alta estudiante
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper>
                                <TableContainer sx={{maxHeight:"71vh"}}>
                                    <Table stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell />
                                                <TableCell>
                                                    <p 
                                                    style={{fontWeight:"bold"}}>
                                                        Nombre
                                                    </p>
                                                </TableCell>
                                                <TableCell>
                                                    <p 
                                                    style={{fontWeight:"bold",
                                                    textAlign:"center"}}>
                                                        N&uacute;mero de boleta
                                                    </p>
                                                </TableCell>
                                                <TableCell>
                                                    <p 
                                                    style={{fontWeight:"bold",
                                                    textAlign:"center"}}>
                                                        Carrera
                                                    </p>
                                                </TableCell>
                                                <TableCell>
                                                    <p 
                                                    style={{fontWeight:"bold",
                                                    textAlign:"center"}}>
                                                        Semestre/Nivel
                                                    </p>
                                                </TableCell>
                                                <TableCell ></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody sx={{overflow:"scroll"}}>
                                            {registro.map( (iterador) => (
                                                <TableRow key={iterador.boleta}>
                                                    <TableCell>
                                                        <Checkbox
                                                            sx={{
                                                                color: "black",
                                                                '&.Mui-checked': {
                                                                color: "black",
                                                                },
                                                            }}/>
                                                    </TableCell>
                                                    <TableCell>
                                                        {iterador.apePaterno+" "+iterador.apeMaterno+" "+iterador.nombre}
                                                    </TableCell>
                                                    <TableCell>
                                                        <p style={{textAlign:"center"}}>
                                                            {iterador.boleta}
                                                        </p>
                                                    </TableCell>
                                                    <TableCell>
                                                        <p style={{textAlign:"center"}}>
                                                            {iterador.carrera}
                                                        </p>
                                                    </TableCell>
                                                    <TableCell>
                                                        <p style={{textAlign:"center"}}>
                                                            {iterador.semestre}
                                                        </p>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button>
                                                            <CheckCircleOutlineIcon 
                                                            sx={{color:"black"}} 
                                                            onClick={ () => { editarEstudiante(iterador) } } />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ) )}
                                        </TableBody>
                                    </Table>
                                    <TablePagination
                                        rowsPerPageOptions={[10]}
                                        component="div"
                                        count={registro.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </TableContainer>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={3} />
                                <Grid item xs={6} >
                                    <BotonAzul
                                        sx={{width:"100%", marginTop:"2%"}}>
                                        registrar
                                    </BotonAzul>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </>
    )
};

export default AltaEstudianteValidacion;