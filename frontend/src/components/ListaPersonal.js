import { useState } from "react";

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
import TablePagination from "@mui/material/TablePagination";
import Checkbox from "@mui/material/Checkbox";
import TableBody from "@mui/material/TableBody";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import Cargando from "./Cargando";
import Navegacion from "./Navegacion";

let PersonalGestionEscolar = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [datos, setDatos] = useState([
        {
            nombre: "Brandon Antonio",
            apePaterno: "Casiano",
            apeMaterno: "Granados",
            noEmpleado: "2017900023",
            correo: "brandon@gmail.com"
        },
        {
            nombre: "Leslie Itzel",
            apePaterno: "Guerrero",
            apeMaterno: "Gutiérrez",
            noEmpleado: "2017900024",
            correo: "leslie@gmail.com"
        },
        {
            nombre: "Jesús Enrique",
            apePaterno: "Lazcano",
            apeMaterno: "Pérez",
            noEmpleado: "2017900025",
            correo: "enrique@gmail.com"
        }
    ]);

    let handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    let handleChangeRowsPerPage = (event) => {
        setRowsPerPage(10);
        setPage(0);
    };

    let editarPersonal = (persona) => {
        // Lógica para editar personal
        console.log("Editar personal:", persona);
    };

    let eliminarPersonal = (persona) => {
        // Lógica para eliminar personal
        console.log("Eliminar personal:", persona);
    };

    return (
        <>
            <Cargando />
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
                                    <Table stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell />
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
                                                        Número de empleado
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography
                                                        fontWeight={"bold"}
                                                        textAlign={"center"}>
                                                        Correo electrónico
                                                    </Typography>
                                                </TableCell>
                                                <TableCell />
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {datos.map(iterador => (
                                                <TableRow key={iterador.noEmpleado}>
                                                    <TableCell>
                                                        <Checkbox
                                                            sx={{
                                                                color: "black",
                                                                '&.Mui-checked': {
                                                                    color: "black",
                                                                },
                                                            }} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            textAlign={"center"}>
                                                            {iterador.apePaterno + " " + iterador.apeMaterno + " " + iterador.nombre}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            textAlign={"center"}>
                                                            {iterador.noEmpleado}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            textAlign={"center"}>
                                                            {iterador.correo}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box sx={{
                                                            display: "flex",
                                                            justifyContent: "center"
                                                        }}>
                                                            <Button onClick={() => editarPersonal(iterador)}>
                                                                <CreateIcon
                                                                    sx={{ color: "black", cursor: "pointer" }} />
                                                            </Button>
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
                                    <TablePagination
                                        rowsPerPageOptions={[10]}
                                        component="div"
                                        count={datos.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
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
