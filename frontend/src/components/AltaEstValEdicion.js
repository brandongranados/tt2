import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import * as yup from 'yup';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";

import Cargando from "./Cargando";
import SelectAzul from '../assets/js/SelectAzul';
import Navegacion from './Navegacion';
import BotonAzul from '../assets/js/BotonAzul';
import InpuTextBorderAzul from '../assets/js/InpuTextBorderAzul';
import FechasV2Azul from '../assets/js/FechasV2Azul';

import useAlerta from '../components/hooks/useAlerta';

import { setMasivas } from '../services/DatosUsuario';

let AltaEstValEdicion = () => {
    const despacha = useDispatch();
    const [creaAlerta] = useAlerta();
    const navegar = useNavigate();

    const inpuText = {
        marginTop: "1.5%", 
        paddingLeft: "4px", 
        paddingRight: "4px" 
    };

    const masivas = useSelector( state => state.DatosUsuario.Masivas );
    const estudianteEdicion = useSelector( state => state.DatosUsuario.Estudiante );
    const [espera, setEspera] = useState(false);
    const validacion = yup.object().shape({
        paterno: yup.string().required('El apellido paterno es obligatorio'),
        materno: yup.string().required('El apellido materno es obligatorio'),
        nombre: yup.string().required('El nombre es obligatorio'),
        curp: yup.string().required('El curp es obligatorio').length(18, "El curp no es válido"),
        sexo: yup.string().required('El sexo es obligatorio').length(1, "El sexo no es válido"),
        fechaNacimiento: yup.date().required('La fecha de nacimiento es obligatoria'),
        boleta: yup.number().required('La boleta es obligatoria'),
        carrera: yup.number().required('La carrera es obligatoria'),
        semestre: yup.number().required('El semestre/nivel es obligatorio'),
        plan: yup.number().required('El plan de estudios es obligatorio'),
        estatus: yup.number().required('Error interno')
      });

    const [tamTitulo, setTamTitulo] = useState("h3");
    const [apePaterno, setApePaterno] = useState("");
    const [apeMaterno, setApeMaterno] = useState("");
    const [nombres, setNombres] = useState("");
    const [curp, setCurp] = useState("");
    const [sexo, setSexo] = useState("");
    const [nacimiento, setNacimiento] = useState("");
    const [boleta, setBoleta] = useState("");
    const [carreraSel, setCarreraSel] = useState("");
    const [semestreNivelSel, setSemestreNivelSel] = useState("");
    const [selEstatus, setSelEstatus] = useState("");

    let cambiaApePaterno = (e) => setApePaterno(e.target.value.toUpperCase());
    let cambiaApeMaterno = (e) => setApeMaterno(e.target.value.toUpperCase());
    let cambiaNombres = (e) => setNombres(e.target.value.toUpperCase());
    let cambiaCarrera = (e) => setCarreraSel(e.target.value);
    let cambiaSemestreNivel = (e) => setSemestreNivelSel(e.target.value);
    let cambiaEstatus = e => setSelEstatus(e.target.value);

    let cambiaCurp = (e) => {
        let may = e.target.value.toUpperCase();
        if(may.length > 18) may = may.substring(0, 18);
        setCurp(may);
        if(may.length >= 10) {
            try {
                let c = may.substring(4, 10);
                let ano = c[0] === "0" ? "20" + c[0] + c[1] : "19" + c[0] + c[1];
                let mes = c[2] + c[3];
                let dia = c[4] + c[5];
                setNacimiento(`${ano}-${mes}-${dia}`);
            } catch (error) {}
        } else {
            setNacimiento("");
        }
        if(may.length >= 11) 
            setSexo(may[10] === "H" ? "M" : "F");
        else 
            setSexo("");
    };
    
    let getNumeroCarreraAndPlan = () => {
        let retorno = {};

        switch(carreraSel)
        {
            case "Ingeniería en Sistemas Computacionales-2009":
                retorno.carrera = 1;
                retorno.plan = 1;
            break;
            case "Ingeniería en Sistemas Computacionales-2020":
                retorno.carrera = 2;
                retorno.plan = 2;
            break;
            case "Ingeniería en Inteligencia Artificial-2020":
                retorno.carrera = 3;
                retorno.plan = 2;
            break;
            case "Licenciatura en Ciencia de Datos-2020":
                retorno.carrera = 4;
                retorno.plan = 2;
            break;
        }

        return retorno;
    };

    let getNombreCarreraAndPlan = (numero) => {
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

    let getNivelSemestre = () => {
        switch(semestreNivelSel)
        {
            case 'Nivel 1':
            return 1;
            case 'Nivel 2':
            return 2;
            case 'Nivel 3':
            return 3;
            case 'Nivel 4':
            return 4;
            case 'Nivel 5':
            return 5;
            case 'Semestre 1':
            return 6;
            case 'Semestre 2' :
            return 7;
            case 'Semestre 3':
            return 8;
            case 'Semestre 4':
            return 9;
            case 'Semestre 5':
            return 10;
            case 'Semestre 6':
            return 11;
            case 'Semestre 7':
            return 12;
            case 'Semestre 8' :
            return 13;
            case 'Semestre 9':
            return 14;
        }
    };

    let getNombreNivelSemestre = (numero) => {

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

    let getEstatus = () => {
        switch(selEstatus)
        {
            case "Regular":
            return 1;
            case "Irregular":
            return 2;
            case "Baja temporal":
            return 3;
        }
    };

    let getNombreEstatus = (numero) => {
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

    let actualizarEstudiante = async () => {
        setEspera(true);

        let temp = getNumeroCarreraAndPlan();
        let restoArray = masivas.docEstudiante.filter( iterador => iterador.boleta != boleta );
        let meterias = masivas.mapeoMateriaEstudiante;
        let nuevoEstudiante = {
            materno : apeMaterno,
            paterno : apePaterno,
            estatus : getEstatus(),
            fechaNacimiento : nacimiento,
            boleta : boleta,
            sexo : sexo == 'M' ? 0 : 1,
            carrera : temp.carrera,
            semestre : getNivelSemestre(),
            nombre : nombres,
            plan : temp.plan,
            curp : curp
        };

        restoArray.push(nuevoEstudiante);

        try {
            await validacion.validate(nuevoEstudiante);
        } catch (error) {
            setEspera(false);
            await creaAlerta({
                titulo: "Revise el formulario",
                mensaje: error.message,
                icono: 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel: "",
                MensajeConfirmar: "OK",
                MensajeCancel: ""
            });
            return;
        }

        despacha(setMasivas({docEstudiante:restoArray, mapeoMateriaEstudiante: meterias}));
        setEspera(false);
        navegar("/administrador/altaEstudianteValidacion");
        return;
    };

    let cambiaTamVentana = () => {
        if (window.innerWidth < 300)
            setTamTitulo("h8");
        else if (window.innerWidth < 600)
            setTamTitulo("h5");
        else
            setTamTitulo("h3");
    };

    useEffect(() => {
        try {
            window.removeEventListener('resize', cambiaTamVentana);
        } catch (error) {}
        window.addEventListener('resize', cambiaTamVentana);

        setApePaterno(estudianteEdicion.paterno.toUpperCase());
        setApeMaterno(estudianteEdicion.materno.toUpperCase());
        setNombres(estudianteEdicion.nombre.toUpperCase());
        setCurp(estudianteEdicion.curp.toUpperCase());
        setSexo( estudianteEdicion.sexo == 0 ? 'M' : 'F' );
        setNacimiento(estudianteEdicion.fechaNacimiento);
        setBoleta(parseFloat(estudianteEdicion.boleta));
        setCarreraSel(getNombreCarreraAndPlan(parseInt(estudianteEdicion.carrera)));
        setSemestreNivelSel(getNombreNivelSemestre(parseInt(estudianteEdicion.semestre)));
        setSelEstatus(getNombreEstatus(parseInt(estudianteEdicion.estatus)));
    }, []);

    return (
        <>
            <Cargando open={espera}/>
            <Navegacion/>
            <Paper>
                <Box p={3}>
                    <Grid container >
                        <Grid item xs={12}>
                            <Box sx={{marginTop:"4%", marginLeft:"4%"}}>
                                <Typography
                                variant={tamTitulo} 
                                component={"p"}
                                sx={{fontWeight:"bold", marginTop:"4%"}} >
                                    Alta Estudiante Edici&oacute;n
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box pt={5}>
                        <Grid container>
                            <Grid item xs sm></Grid>
                            <Grid item xs={10}>
                                <Grid container>
                                    <Grid item xs={12} sm={4}>
                                        <InpuTextBorderAzul 
                                        etiqueta={"Apellido Paterno"}
                                        sx={inpuText}
                                        value={apePaterno}
                                        onChange={ (e) => cambiaApePaterno(e) } />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InpuTextBorderAzul
                                        etiqueta={"Apellido Materno"}
                                        sx={inpuText}
                                        value={apeMaterno}
                                        onChange={ (e) => cambiaApeMaterno(e) } />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InpuTextBorderAzul 
                                        etiqueta={"Nombre(s)"}
                                        sx={inpuText}
                                        value={nombres}
                                        onChange={ (e) => cambiaNombres(e) } />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InpuTextBorderAzul
                                        etiqueta={"CURP"}
                                        sx={inpuText}
                                        value={curp}
                                        onChange={ (e) => cambiaCurp(e) } />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InpuTextBorderAzul
                                        etiqueta={"Sexo (autorellenado del CURP)"}
                                        sx={inpuText}
                                        value={sexo} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FechasV2Azul
                                        etiqueta={"Fecha nacimiento (autorellenado del CURP)"}
                                        sx={inpuText}
                                        value={nacimiento} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <InpuTextBorderAzul
                                        etiqueta={"Boleta"}
                                        sx={inpuText}
                                        value={boleta} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <SelectAzul
                                        sx={inpuText}
                                        etiqueta={"Carrera"}
                                        opciones={[
                                            "Ingeniería en Sistemas Computacionales-2009",
                                            "Ingeniería en Sistemas Computacionales-2020",
                                            "Ingeniería en Inteligencia Artificial-2020",
                                            "Licenciatura en Ciencia de Datos-2020"
                                        ]}
                                        onChange={ (e) => cambiaCarrera(e) }
                                        value={carreraSel} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <SelectAzul
                                        sx={inpuText}
                                        etiqueta={"Semestre (Nivel)"}
                                        opciones={[
                                            'Nivel 1', 'Nivel 2', 'Nivel 3', 
                                            'Nivel 4', 'Nivel 5', 'Semestre 1',
                                            'Semestre 2', 'Semestre 3', 'Semestre 4',
                                            'Semestre 5', 'Semestre 6', 'Semestre 7',
                                            'Semestre 8', 'Semestre 9'
                                        ]}
                                        onChange={ (e) => cambiaSemestreNivel(e) }
                                        value={semestreNivelSel} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <SelectAzul
                                        sx={inpuText}
                                        etiqueta={"Estatus estudiante"}
                                        opciones={[
                                            "Regular",
                                            "Irregular",
                                            "Baja temporal"
                                        ]}
                                        onChange={ (e) => cambiaEstatus(e) }
                                        value={selEstatus} />
                                    </Grid>
                                </Grid>
                                <Box pt={5}>
                                    <Grid container>
                                        <Grid item xs={3} />
                                        <Grid item xs={6}>
                                            <BotonAzul
                                            sx={{...inpuText, width:"100%"}}
                                            onClick={actualizarEstudiante}>
                                                Actualizar
                                            </BotonAzul>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item xs sm></Grid>
                        </Grid>
                    </Box>
                </Box>
            </Paper>
        </>
    );
};

export default AltaEstValEdicion;