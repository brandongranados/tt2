import { useEffect, useState } from "react";

import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Typography from "@mui/material/Typography";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";

import Cargando from "./Cargando";
import Navegacion from "./Navegacion";
import useAjax from '../services/useAjax';
import { getExpEstudiante, setExpEstudiante } from '../services/DatosUsuario';

let ExpedienteEstudiantil = () => {
    const ObjAjax = useAjax();
    const navegar = useNavigate();
    const despacha = useDispatch();

    const [datos, setDatos] = useState([]);
    const [cantDatos, setCantDatos] = useState([]);
    const [espera, setEspera] = useState(false);

    let paginarLista = async (e, valor) => await listaEstudiantes(valor);

    let listaEstudiantes = async (pagina) => {
        let resp = await ObjAjax.getListaEstudiantes({paginacion:pagina}, setEspera);
        setDatos(resp.lista);
        setCantDatos( parseInt(resp.cant.cant/100)+1 );
        setEspera(false);
    };

    const editar = (estudiante) => {
        despacha(setExpEstudiante(estudiante));
        despacha(getExpEstudiante());
        navegar("/personalGestion/expEstEdicion");
    };

    useEffect(() => {
        let ajax = async () => {
            await listaEstudiantes(1);
        };
        ajax();
    }, []);

    return (
        <>
            <Cargando bool={espera}/>
            <Navegacion />
            <Grid container>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography
                            variant="h4" 
                            component={"p"} 
                            fontWeight={"bold"}>
                                Estudiantes
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{height:"73vh", scrollBehavior:"smooth", overflow:"scroll"}}>
                        <TableContainer>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography
                                            fontWeight={"bold"}
                                            textAlign={"center"}>
                                                Nombre
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                            fontWeight={"bold"}
                                            textAlign={"center"}>
                                                Numero de boleta
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                            fontWeight={"bold"}
                                            textAlign={"center"}>
                                                Carrera
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                            fontWeight={"bold"}
                                            textAlign={"center"}>
                                                Semestre
                                            </Typography>
                                        </TableCell>
                                        <TableCell/>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {datos.map(iterador => (
                                    <TableRow key={iterador.boleta}>
                                        <TableCell>
                                            <Typography textAlign={"center"}>
                                                {iterador.nombre}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography textAlign={"center"}>
                                                {iterador.num_boleta}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography textAlign={"center"}>
                                                {iterador.nom_carrera}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography textAlign={"center"}>
                                                {iterador.nom_periodo}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{display:"flex", justifyContent:"center"}}>
                                                <Button onClick={() => editar(iterador)}>
                                                    <CreateIcon sx={{color:"black", cursor:"pointer"}}/>
                                                </Button>
                                                <Button>
                                                    <DeleteIcon sx={{color:"black", cursor:"pointer"}} />
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    <Paper>
                        <Box display={"flex"} flexDirection={"row-reverse"}>
                            <Pagination count={cantDatos} onChange={paginarLista} size="large" />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
};

export default ExpedienteEstudiantil;
