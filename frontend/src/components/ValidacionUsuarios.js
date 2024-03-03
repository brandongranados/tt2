import { useState } from "react";

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

import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

import BotonAzul from "../assets/js/BotonAzul";
import Navegacion from "./Navegacion";
import Cargando from "./Cargando";
import useAjax from '../services/useAjax';
import useArchivo from "./hooks/useArchivo";

let ValidacionUsuarios = () => {

    const [ archivo, descargaExcelDesdeBase64 ] = useArchivo();
    const ObjAjax = useAjax();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [espera, setEspera] = useState(false);
    const [deshabilitar, setDeshabilitar] = useState("none");
    const [datosExcel, setDatosExcel] = useState([]);

    const rows = [
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 2019300476,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 201930043476,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 20193653400476,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 20195343456300476,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 201936435600476,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 201934500476,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 2019364300476,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 204519300476,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 203419300476,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },

        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 2019300476546,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 2463019300476,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 20193004745366,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 2456019300476,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 201930047436456,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 24536019300445676,
            carrera: "Ingnie4ria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 2045193004734566,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 2014563930043643476,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 223019300473246,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 41232019300474126,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 412320193004713246,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 2042319342300432176,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 12432019300476,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 20798193004767,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 2019300479866,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 2079819300476,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 2019307890476,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 2019300786476,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 201699300476,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        },
        { 
            nombre: "Brandon Antonio Casiano Granados",
            boleta: 20193008796476,
            carrera: "Ingnieria en sistemas computacionales",
            semestre: 9
        }
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(10);
        setPage(0);
    };

    let interpretaExcel = async (e) => {
        try {

            let datos = await archivo(e.target.files[0]);
            let resp = await ObjAjax.interpretarExcelMasivo(datos, setEspera);

            if( resp.codigo != 200  )
                throw new Error("sin datos");

            setDatosExcel(resp.datos);
            if( resp.datos.length > 0 )
                setDeshabilitar("block");
            else
                setDeshabilitar("none");

        } catch (error) {
            setDatosExcel([]);
            setDeshabilitar("none");
        }
    };

    let cargarEstudiante = async (e) => await ObjAjax.verificacionMasivaEstudiantes({ datosExcel : datosExcel }, setEspera );

    let ejemplo = async () => await ObjAjax.descargarEjemploExcel(setEspera);

    let cargaDeDocExcel = () => document.getElementById("excelCargar").click();

    let eliminaElementos = (elemento) => {
        let izquierda = datosExcel.filter( (iterador) => iterador.boleta < elemento.boleta );
        let derecha = datosExcel.filter( (iterador) => iterador.boleta > elemento.boleta );

        setDatosExcel([ ...izquierda, ...derecha ]);
    };

    return(
        <>
            <input type="file" id="excelCargar" 
            onChange={ (e) => { interpretaExcel(e) } }
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style={{display:"none"}}/>
            <Cargando bool={espera}/>
            <Navegacion/>
            <Grid container>
                <Card sx={{width:"100%"}}>
                    <CardContent>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography 
                                    variant="h4" 
                                    component={"p"} 
                                    fontWeight={"bold"}>
                                        Validaci&oacute;n de usuarios
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <BotonAzul sx={{marginLeft:"3%"}} onClick={cargaDeDocExcel}>
                                        Cargar excel
                                    </BotonAzul>
                                    <BotonAzul 
                                        sx={{marginLeft:"3%"}}
                                        onClick={ejemplo}>
                                        Descargar ejemplo
                                    </BotonAzul>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper>
                                <TableContainer sx={{maxHeight:"73vh"}}>
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
                                            {rows.map( (iterador) => (
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
                                                        {iterador.nombre}
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
                                                            <BorderColorIcon sx={{color:"black"}}/>
                                                        </Button>
                                                        <Button>
                                                            <DeleteIcon 
                                                            sx={{color:"black"}} 
                                                            onClick={ () => { eliminaElementos(iterador) } } />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ) )}
                                        </TableBody>
                                    </Table>
                                    <TablePagination
                                        rowsPerPageOptions={[10]}
                                        component="div"
                                        count={rows.length}
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
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <BotonAzul 
                    sx={{width:"100%", display:deshabilitar }} 
                    onClick={ (e) => { cargarEstudiante(e) } }>
                        validar
                    </BotonAzul>
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        </>
    )
};

export default ValidacionUsuarios;