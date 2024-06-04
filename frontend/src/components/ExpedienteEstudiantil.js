import { useEffect, useState } from "react";
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
import Modal from '@mui/material/Modal';

import Cargando from "./Cargando";
import Navegacion from "./Navegacion";
import useAjax from '../services/useAjax';
import ExpendienteEdicion from './ExpedienteEdicion';  // Importar el componente del modal

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

let ExpedienteEstudiantil = () => {
    const ObjAjax = useAjax();

    const [datos, setDatos] = useState([]);
    const [cantDatos, setCantDatos] = useState([]);
    const [espera, setEspera] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedEstudiante, setSelectedEstudiante] = useState(null);

    let paginarLista = async (e, valor) => await listaEstudiantes(valor);

    let listaEstudiantes = async (pagina) => {
        let resp = await ObjAjax.getListaEstudiantes({paginacion:pagina}, setEspera);
        setDatos(resp.lista);
        console.log('datos Expediente ', resp.lista);
        setCantDatos( parseInt(resp.cant.cant/100)+1 );
    };

    useEffect(() => {
        let ajax = async () => {
            await listaEstudiantes(1);
        };
        ajax();
    }, []);

    const handleOpen = (estudiante) => {
        setSelectedEstudiante(estudiante);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

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
                    <Paper>
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
                                <TableBody sx={{height:"66vh", scrollBehavior:"smooth", overflow:"scroll"}}>
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
                                                    <Button onClick={() => handleOpen(iterador)}>
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
                            <Box display={"flex"} flexDirection={"row-reverse"}>
                                <Pagination count={cantDatos} onChange={paginarLista} size="large" />
                            </Box>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {selectedEstudiante && (
                        <ExpendienteEdicion estudiante={selectedEstudiante} />
                    )}
                </Box>
            </Modal>
        </>
    )
};

export default ExpedienteEstudiantil;
