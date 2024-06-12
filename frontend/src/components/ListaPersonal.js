import { useEffect, useState } from "react";

import { useSelector } from 'react-redux';

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
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";

import Cargando from "./Cargando";
import Navegacion from "./Navegacion";
import useAjax from "../services/useAjax";

let PersonalGestionEscolar = () => {

    const ObjAjax = useAjax();
    const usuario = useSelector( state => state.DatosUsuario.DatosUsuario );

    // AJAX CARGANDO
    const [espera, setEspera] = useState(false);

    //DATOS
    const [datos, setDatos] = useState([]);
    const [cantDatos, setCantDatos] = useState(0);

    let paginarLista = async (e, valor) => await getListaPersonal(valor);

    let eliminarPersonal = async (personal) => {
        let datos = {
            numeroEmpleado : personal.numero_personal,
            usuario: usuario
        };

        let resp = await ObjAjax.setBajaPersonal(datos, setEspera);

        if( resp )
            window.location.reload();

    };

    let getListaPersonal = async (pagina) => {
        let resp = await ObjAjax.getListaPersonal({paginacion:pagina}, setEspera);

        try {
            let lista = resp.lista;
            let cant = parseInt(resp.cant[0].cant);

            setDatos(lista);
            setCantDatos( cant%100 > 0 ? parseInt(cant/100)+1 : cant/100 );
        } catch (error) {
            setDatos([]);
            setCantDatos(0);
        }

        setEspera(false);
    };

    useEffect( () => {
        let peticion = async () => getListaPersonal(1);
        peticion();
    }, [] );

    return (
        <>
            <Cargando open={espera} />
            <Navegacion />
            <Grid container>
                <Card sx={{ width: "100%" }}>
                    <CardContent>
                        <Grid item xs={12}>
                            <Typography
                                variant="h4"
                                component={"p"}
                                fontWeight={"bold"}>
                                Personal de gestión escolar
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper>
                                <TableContainer>
                                    <Paper style={{overflow:"scroll", height:"73vh"}}>
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
                                                            N&uacute;mero de empleado
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            fontWeight={"bold"}
                                                            textAlign={"center"}>
                                                            Correo electr&oacute;nico
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell />
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {datos.map(iterador => (
                                                    <TableRow key={iterador.numero_personal}>
                                                        <TableCell>
                                                            <Typography
                                                                textAlign={"center"}>
                                                                {iterador.nombre}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography
                                                                textAlign={"center"}>
                                                                {iterador.numero_personal}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography
                                                                textAlign={"center"}>
                                                                {iterador.correo_electronico}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Box sx={{
                                                                display: "flex",
                                                                justifyContent: "center"
                                                            }}>
                                                                <Button onClick={() => eliminarPersonal(iterador)}>
                                                                    <DeleteIcon
                                                                        sx={{ color: "black", cursor: "pointer" }} />
                                                                </Button>
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Paper>
                                    <Paper>
                                        <Box display={"flex"} flexDirection={"row-reverse"}>
                                            <Pagination count={cantDatos} onChange={paginarLista} size="large" />
                                        </Box>
                                    </Paper>
                                </TableContainer>
                            </Paper>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
};

export default PersonalGestionEscolar;
