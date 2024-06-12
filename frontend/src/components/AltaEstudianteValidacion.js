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
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import BotonAzul from "../assets/js/BotonAzul";
import Navegacion from "./Navegacion";
import Cargando from "./Cargando";
import useAjax from '../services/useAjax';

import { setEstudiante } from "../services/DatosUsuario";

let AltaEstudianteValidacion = () => {

    //DATOS ESTUDIANTES NUEVOS
    const ObjAjax = useAjax();
    const masivas = useSelector( state => state.DatosUsuario.Masivas );
    const despacha = useDispatch();
    const navegar = useNavigate();
    const usuario = useSelector( state => state.DatosUsuario.DatosUsuario );

    const [espera, setEspera] = useState(false);

    //DATOS DE EXCEL DESPLEGADOS
    const [registro, setRegistro] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [cantDatos, setCantDatos] = useState(0);
    const [registroPagina, setRegistroPagina] = useState([]);

    let editarEstudiante = (estudiante) => {
        despacha(setEstudiante(estudiante));
        navegar("/administrador/altaEstValEdicion");
    };

    let getNumeroCarreraAndPlan = (numero) => {
        switch(numero)
        {
            case 1:
            return "Ingeniería en Sistemas Computacionales-2009";
            case 2:
            return "Ingeniería en Sistemas Computacionales-2020";
            case 3:
            return "Ingeniería en Inteligencia Artificial-2020";
            case 4:
            return "Licenciatura en Ciencia de Datos-2020";
        }
    };

    let getNivelSemestre = (numero) => {

        switch(numero)
        {
            case 1:
            return 'Nivel 1';
            case 2:
            return 'Nivel 2';
            case 3:
            return 'Nivel 3';
            case 4:
            return 'Nivel 4';
            case 5:
            return 'Nivel 5';
            case 6:
            return 'Semestre 1';
            case 7:
            return 'Semestre 2';
            case 8:
            return 'Semestre 3';
            case 9:
            return 'Semestre 4';
            case 10:
            return 'Semestre 5';
            case 11:
            return 'Semestre 6';
            case 12:
            return 'Semestre 7';
            case 13:
            return 'Semestre 8';
            case 14:
            return 'Semestre 9';
        }

    };

    let getEstatus = (numero) => {
        switch(numero)
        {
            case 1:
            return "Regular";
            case 2:
            return "Irregular";
            case 3:
            return "Baja temporal";
        }
    };

    let paginarLista = (e, pagina) => setRegistroPagina(registro.slice( (100*( pagina - 1) ) ,(100*pagina) ));

    let ejecutarAltaMasiva = async () => {
        setEspera(true);

        let array = [];
        let array2 = [];
        let datos = {};
        let datos2 = {};

        registro.forEach( iterador => {
            let obj = {
                paterno: iterador.paterno.toUpperCase(),
                materno: iterador.materno.toUpperCase(),
                nombre: iterador.nombre.toUpperCase(),
                curp: iterador.curp.toUpperCase(),
                sexo: iterador.sexo == 0 ? 'M' : 'F',
                fechaNacimiento: iterador.fechaNacimiento,
                boleta: parseFloat(iterador.boleta),
                carrera: parseFloat(iterador.carrera),
                semestre: parseFloat(iterador.semestre),
                plan: parseInt(parseFloat(iterador.plan)) == 2009 ? 1 : 2,
                estatus: parseFloat(iterador.estatus),
                usuario: usuario
            };

            array.push(obj);
        } );

        materias.forEach( iterador => {
            let obj2 = {
                boleta: parseFloat(iterador.boleta),
                unidadAprendizaje: iterador.unidad_aprendizaje,
                grupo: iterador.grupo,
                usuarioAlta: usuario
            };

            array2.push(obj2);
        } );
        
        datos = { estudiantes : array };
        datos2 = { estudiantes : array2 };

        await ObjAjax.altaMasivaEstuMaterias(datos, datos2, setEspera);

        setEspera(false);
    };

    useEffect( () => {

        try {
            if( masivas == null || masivas == undefined )
                return;

            setEspera(true);

            let estu = masivas.docEstudiante;
            let mat = masivas.mapeoMateriaEstudiante;
            let paginas = estu.length%100 > 0 ? estu.length/100+1 : estu.length/100; 
    
            setRegistro(estu);
            setMaterias(mat);
            setCantDatos(paginas);
            setRegistroPagina(estu.slice( 0 ,100));
        } catch (error) {
            setRegistro([]);
            setMaterias([]);
        }

        setEspera(false);
    }, [] );

    return(
        <>
            <Cargando open={espera}/>
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
                                        Alta estudiantes
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper>
                                <TableContainer sx={{maxHeight:"66vh"}}>
                                    <Table stickyHeader>
                                        <TableHead>
                                            <TableRow>
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
                                                <TableCell>
                                                    <p 
                                                    style={{fontWeight:"bold",
                                                    textAlign:"center"}}>
                                                        Estatus estudiante
                                                    </p>
                                                </TableCell>
                                                <TableCell>
                                                    <p 
                                                    style={{fontWeight:"bold",
                                                    textAlign:"center"}}>
                                                        Fecha nacimiento
                                                    </p>
                                                </TableCell>
                                                <TableCell>
                                                    <p 
                                                    style={{fontWeight:"bold",
                                                    textAlign:"center"}}>
                                                        CURP
                                                    </p>
                                                </TableCell>
                                                <TableCell ></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody sx={{overflow:"scroll"}}>
                                            {registroPagina.map( (iterador) => (
                                                <TableRow key={iterador.boleta}>
                                                    <TableCell>
                                                        {(iterador.nombre+" "+iterador.paterno+" "+iterador.materno).toUpperCase()}
                                                    </TableCell>
                                                    <TableCell>
                                                        <p style={{textAlign:"center"}}>
                                                            {parseFloat(iterador.boleta)}
                                                        </p>
                                                    </TableCell>
                                                    <TableCell>
                                                        <p style={{textAlign:"center"}}>
                                                            {getNumeroCarreraAndPlan(parseInt(iterador.carrera))}
                                                        </p>
                                                    </TableCell>
                                                    <TableCell>
                                                        <p style={{textAlign:"center"}}>
                                                            {getNivelSemestre(parseInt(iterador.semestre))}
                                                        </p>
                                                    </TableCell>
                                                    <TableCell>
                                                        <p style={{textAlign:"center"}}>
                                                            {getEstatus(parseInt(iterador.estatus))}
                                                        </p>
                                                    </TableCell>
                                                    <TableCell>
                                                        <p style={{textAlign:"center"}}>
                                                            {iterador.fechaNacimiento}
                                                        </p>
                                                    </TableCell>
                                                    <TableCell>
                                                        <p style={{textAlign:"center"}}>
                                                            {iterador.curp.toUpperCase()}
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
                                </TableContainer>
                            </Paper>
                            <Paper>
                                <Box display={"flex"} flexDirection={"row-reverse"}>
                                    <Pagination count={cantDatos} onChange={paginarLista} size="large" />
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={3} />
                                <Grid item xs={6} >
                                    <BotonAzul
                                        sx={{width:"100%", marginTop:"2%"}}
                                        onClick={ejecutarAltaMasiva}>
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