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
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import Cargando from "./Cargando";
import Navegacion from "./Navegacion";
import { Box, Button } from "@mui/material";

let Bitacora = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [datos, setDatos] = useState([{
            nombre: "Brandon Antonio",
            apePaterno: "Casiano",
            apeMaterno: "Granados",
            curp : "CAGB980704HMCSRR07",
            sexo : "HOMBRE",
            nacimiento : "1998-07-04",
            boleta: 201930043476,
            carrera: "uno",
            semestre: "uno"
    }]);

    let handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    let handleChangeRowsPerPage = (event) => {
        setRowsPerPage(10);
        setPage(0);
    };

    let editarExpediente = (iterador) => {
        
    };

    return(
        <>
            <Cargando />
            <Navegacion />
            <Grid container>
                <Card sx={{width:"100%"}}>
                    <CardContent>
                        <Grid item xs={12}>
                            <Typography
                            variant="h4" 
                            component={"p"} 
                            fontWeight={"bold"}>
                                Bit&aacute;cora
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper>
                                <TableContainer>
                                    <Table stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell/>
                                                <TableCell>
                                                    <Typography
                                                    fontWeight={"bold"}
                                                    textAlign={"center"}>
                                                        Estudiante 
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography
                                                    fontWeight={"bold"}
                                                    textAlign={"center"}>
                                                        Fecha
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography
                                                    fontWeight={"bold"}
                                                    textAlign={"center"}>
                                                        Hora
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography
                                                    fontWeight={"bold"}
                                                    textAlign={"center"}>
                                                        Editor
                                                    </Typography>
                                                </TableCell>
                                                <TableCell/>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                datos.map( iterador => {
                                                    return(
                                                        <TableRow key={iterador.boleta}>
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
                                                                    {iterador.apePaterno+" "+iterador.apeMaterno+" "+iterador.nombre}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography
                                                                textAlign={"center"}>
                                                                    {iterador.boleta}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography
                                                                textAlign={"center"}>
                                                                    {iterador.carrera}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography
                                                                textAlign={"center"}>
                                                                    {iterador.semestre}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Box sx={{
                                                                    display:"flex",
                                                                    justifyContent:"center"
                                                                }}>
                                                                    <Button onClick={ editarExpediente(iterador) }>
                                                                        <PictureAsPdfIcon
                                                                        sx={{color:"black", cursor:"pointer"}}/>
                                                                    </Button>
                                                                    <Button>
                                                                        <DeleteIcon
                                                                        sx={{color:"black", cursor:"pointer"}} />
                                                                    </Button>
                                                                </Box>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                } )
                                            }
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
    )
};

export default Bitacora;