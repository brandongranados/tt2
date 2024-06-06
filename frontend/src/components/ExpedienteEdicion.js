import React, { useState, useEffect } from "react";

import { useSelector } from 'react-redux';

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
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
import useAjax from '../services/useAjax';  
import InpuTextBorderAzul from '../assets/js/InpuTextBorderAzul';
import FechasV2Azul from '../assets/js/FechasV2Azul';
import SelectAzul from '../assets/js/SelectAzul';
import BotonAzul from '../assets/js/BotonAzul';

let ExpendienteEdicion = () => {
    const estudiante = useSelector( state => state.DatosUsuario.ExpEstudiante );
    const usuario = useSelector( state => state.DatosUsuario.DatosUsuario );
    const ObjAjax = useAjax(); 

    const [cargando, setCargando] = useState(false); 
    const [datos, setDatos] = useState({});
    const [docs, setDocs] = useState([]);

    let cambiaNombres = (e) => {
        let dat = {
            nom_periodo : datos.nom_periodo,
            num_boleta : datos.num_boleta,
            correo_electronico : datos.correo_electronico,
            nom_carrera_num : datos.nom_carrera_num,
            nom_periodo_num : datos.nom_periodo_num,
            nombre_plan_numero : datos.nombre_plan_numero,
            fecha_nacimiento : datos.fecha_nacimiento,
            nom_carrera : datos.nom_carrera,
            sexo : datos.sexo,
            nombre : e.target.value.toUpperCase(),
            nombre_plan : datos.nombre_plan,
            curp : datos.curp
        };
        setDatos(dat);
    };
    let cambiaCarrera = (e) => {
        let asignado = e.target.value.split("-");
        let temp = 0;
        switch(e.target.value)
        {
            case "Ingenieria en Sistemas Computacionales-2009":
                temp = 1;
                break;
            case "Ingenieria en Sistemas Computacionales-2020":
                temp = 2;
                break;
            case "Ingenieria en Inteligencia Artificial-2020":
                temp = 2;
                break;
            default :
                temp = 2;
                break;
        }
        let dat = {
            nom_periodo : datos.nom_periodo,
            num_boleta : datos.num_boleta,
            correo_electronico : datos.correo_electronico,
            nom_carrera_num : datos.nom_carrera_num,
            nom_periodo_num : datos.nom_periodo_num,
            nombre_plan_numero : temp,
            fecha_nacimiento : datos.fecha_nacimiento,
            nom_carrera : asignado[0],
            sexo : datos.sexo,
            nombre : datos.nombre,
            nombre_plan : asignado[1],
            curp : datos.curp
        };
        setDatos(dat);
    };
    let cambiaSemestreNivel = (e) => {
        let dat = {};
        switch(e.target.value)
        {
            case "Nivel 1":
                dat.nom_carrera_num = 1;
                break;
            case "Nivel 2":
                dat.nom_carrera_num = 2;
                break;
            case "Nivel 3":
                dat.nom_carrera_num = 3;
                break;
            case "Nivel 4":
                dat.nom_carrera_num = 4;
                break;
            case "Nivel 5":
                dat.nom_carrera_num = 5;
                break;
            case "Semestre 1":
                dat.nom_carrera_num = 6;
                break;
            case "Semestre 2":
                dat.nom_carrera_num = 7;
                break;
            case "Semestre 3":
                dat.nom_carrera_num = 8;
                break;
            case "Semestre 4":
                dat.nom_carrera_num = 9;
                break;
            case "Semestre 5":
                dat.nom_carrera_num = 10;
                break;
            case "Semestre 6":
                dat.nom_carrera_num = 11;
                break;
            case "Semestre 7":
                dat.nom_carrera_num = 12;
                break;
            case "Semestre 8":
                dat.nom_carrera_num = 13;
                break;
            case "Semestre 9":
                dat.nom_carrera_num = 14;
                break;
        }
        let datNUevo = {
            nom_periodo : e.target.value,
            num_boleta : datos.num_boleta,
            correo_electronico : datos.correo_electronico,
            nom_carrera_num : dat.nom_carrera_num,
            nom_periodo_num : datos.nom_periodo_num,
            nombre_plan_numero : datos.nombre_plan_numero,
            fecha_nacimiento : datos.fecha_nacimiento,
            nom_carrera : datos.nom_carrera,
            sexo : datos.sexo,
            nombre : datos.nombre,
            nombre_plan : datos.nombre_plan,
            curp : datos.curp
        };
        setDatos(datNUevo);
    };
    let cambiaCorreo = (e) => {
        let datNuevo = {
            nom_periodo : datos.nom_periodo,
            num_boleta : datos.num_boleta,
            correo_electronico : e.target.value,
            nom_carrera_num : datos.nom_carrera_num,
            nom_periodo_num : datos.nom_periodo_num,
            nombre_plan_numero : datos.nombre_plan_numero,
            fecha_nacimiento : datos.fecha_nacimiento,
            nom_carrera : datos.nom_carrera,
            sexo : datos.sexo,
            nombre : datos.nombre,
            nombre_plan : datos.nombre_plan,
            curp : datos.curp
        };
        setDatos(datNuevo);
    };

    let cambiaCurp = (e) => {
        let may = e.target.value.toUpperCase();
        let fecha = null;
        let sexo = null;

        if( may.length > 10 )
            may = may.substring(0, 18);

        if( may.length >= 10 ) {
            try {
                parseInt(may.substring(4, 10));
                let c = may.substring(4, 10);
                let ano = c[0] == "0" ? "20"+c[0]+c[1] : "19"+c[0]+c[1];
                let mes = c[2]+c[3];
                let dia = c[4]+c[5];
                parseInt(c[0]);
                parseInt(c[1]);
                parseInt(c[2]);
                parseInt(c[3]);
                parseInt(c[4]);
                parseInt(c[5]);
                fecha = ano+"-"+mes+"-"+dia;
            } catch (error) {}
        }

        if( may.length >= 11 )
            sexo = may[10] == "H" ? "M" : "F";

        let dat = {
            nom_periodo : datos.nom_periodo,
            num_boleta : datos.num_boleta,
            correo_electronico : datos.correo_electronico,
            nom_carrera_num : datos.nom_carrera_num,
            nom_periodo_num : datos.nom_periodo_num,
            nombre_plan_numero : datos.nombre_plan_numero,
            fecha_nacimiento : fecha,
            nom_carrera : datos.nom_carrera,
            sexo : sexo,
            nombre : datos.nombre,
            nombre_plan : datos.nombre_plan,
            curp : may
        };
        setDatos(dat);
    };

    let cambiaNacimiento = (e) => {
        try {
            let obj = new Date(e.target.value);
            let dat = {
                nom_periodo : datos.nom_periodo,
                num_boleta : datos.num_boleta,
                correo_electronico : datos.correo_electronico,
                nom_carrera_num : datos.nom_carrera_num,
                nom_periodo_num : datos.nom_periodo_num,
                nombre_plan_numero : datos.nombre_plan_numero,
                fecha_nacimiento : e.target.value,
                nom_carrera : datos.nom_carrera,
                sexo : datos.sexo,
                nombre : datos.nombre,
                nombre_plan : datos.nombre_plan,
                curp : datos.curp
            };
            setDatos(dat);
        } catch (error) {}
    };

    let cambiaSexo = e => {
        let dat = {
            nom_periodo : datos.nom_periodo,
            num_boleta : datos.num_boleta,
            correo_electronico : datos.correo_electronico,
            nom_carrera_num : datos.nom_carrera_num,
            nom_periodo_num : datos.nom_periodo_num,
            nombre_plan_numero : datos.nombre_plan_numero,
            fecha_nacimiento : datos.fecha_nacimiento,
            nom_carrera : datos.nom_carrera,
            sexo : e.target.value,
            nombre : datos.nombre,
            nombre_plan : datos.nombre_plan,
            curp : datos.curp
        };
        setDatos(dat);
    };

    let handleActualizar = async () => {
        let ajaxDatos = {
            boleta: datos.num_boleta,
            carrera: datos.nom_carrera_num,
            plan: datos.nombre_plan_numero,
            turno: 1,
            estatus: 1,
            usuarioAlta: usuario
        };

        await ObjAjax.edicionMasivaEstudiantes({estudiantes:[ajaxDatos]}, setCargando);
    };

    useEffect( () => {
        let peticion = async () => {
            let expe = await ObjAjax.getExpedienteEstudiante({boleta:estudiante.num_boleta}, setCargando);
            for( let i = 0; i < expe.dcos.length; i++ )
                expe.dcos[i] = { ...expe.dcos[i], key:i };
            expe.datos.nombre_plan = expe.datos.nombre_plan.replace("Plan ", "");
            setDatos(expe.datos);
            setDocs(expe.dcos);
        };
        peticion();
    }, [] );

    return (
        <>
            <Cargando open={cargando} />
            <Navegacion />
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
                                        <InpuTextBorderAzul
                                            onChange={cambiaNombres}
                                            etiqueta={"Nombre(s)"}
                                            value={datos.nombre}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InpuTextBorderAzul
                                            etiqueta={"CURP"}
                                            value={datos.curp}
                                            onChange={cambiaCurp}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <SelectAzul
                                            etiqueta={"Sexo"}
                                            value={datos.sexo}
                                            opciones={['F', 'M']}
                                            onChange={cambiaSexo}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FechasV2Azul
                                            etiqueta={"Fecha de Nacimiento"}
                                            value={datos.fecha_nacimiento}
                                            onChange={cambiaNacimiento}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InpuTextBorderAzul
                                            etiqueta={"Boleta"}
                                            value={datos.num_boleta}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <SelectAzul
                                            etiqueta={"Carrera"}
                                            value={datos.nom_carrera+"-"+datos.nombre_plan}
                                            onChange={cambiaCarrera}
                                            opciones={[
                                                'Ingenieria en Sistemas Computacionales-2009', 
                                                'Ingenieria en Sistemas Computacionales-2020',
                                                'Ingenieria en Inteligencia Artificial-2020',
                                                'Licenciatura en Ciencia de Datos-2020'
                                            ]}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <SelectAzul
                                            etiqueta={"Semestre (Nivel)"}
                                            value={datos.nom_periodo}
                                            onChange={cambiaSemestreNivel}
                                            opciones={[
                                                'Nivel 1', 'Nivel 2', 'Nivel 3', 
                                                'Nivel 4', 'Nivel 5', 'Semestre 1',
                                                'Semestre 2', 'Semestre 3', 'Semestre 4',
                                                'Semestre 5', 'Semestre 6', 'Semestre 7',
                                                'Semestre 8', 'Semestre 9'
                                            ]}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <InpuTextBorderAzul
                                            etiqueta={"Correo Electrónico"}
                                            value={datos.correo_electronico}
                                            onChange={cambiaCorreo}
                                        />
                                    </Grid>
                                    <Grid item xs={12} display="flex" justifyContent="center">
                                        <BotonAzul onClick={handleActualizar}>
                                            Actualizar
                                        </BotonAzul>
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
                                            {
                                                docs.map( iterador => {
                                                    return(
                                                        <div key={iterador.key}>
                                                            <TableCell>{iterador.nombre_solicitud}</TableCell>
                                                            <TableCell align="center">
                                                                <VisibilityIcon style={{ cursor: 'pointer' }} 
                                                                onClick={ e => { console.log(iterador.ruta) }}/>
                                                            </TableCell>
                                                        </div>
                                                    )
                                                } )
                                            }
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
