import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as yup from 'yup';

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import Cargando from "./Cargando";
import Navegacion from './Navegacion';
import InpuTextBorderAzul from '../assets/js/InpuTextBorderAzul';
import FechasV2Azul from '../assets/js/FechasV2Azul';
import SelectAzul from '../assets/js/SelectAzul';
import BotonAzul from '../assets/js/BotonAzul';

import useAjax from '../services/useAjax';
import useAlerta from '../components/hooks/useAlerta';

let AltaEstudiante = () => {
    const inpuText = {
        marginTop: "1.5%", 
        paddingLeft: "4px", 
        paddingRight: "4px" 
    };

    const ObjAjax = useAjax();
    const navegar = useNavigate();
    const usuario = useSelector( state => state.DatosUsuario.DatosUsuario );
    const [creaAlerta] = useAlerta();
    const [espera, setEspera] = useState(false);
    const validacion = yup.object().shape({
        paterno: yup.string().required('El apellido paterno es obligatorio'),
        materno: yup.string().required('El apellido materno es obligatorio'),
        nombre: yup.string().required('El nombre es obligatorio'),
        curp: yup.string().required('El curp es obligatorio').length(18, "El curp no es valido"),
        sexo: yup.string().required('El sexo es obligatorio').length(1, "El sexo no es valido"),
        fechaNacimiento: yup.date().required('La fecha de nacimiento es obligatorioa'),
        boleta: yup.number().required('La boleta es obligatoria'),
        carrera: yup.number().required('La carrera es obligatoria'),
        semestre: yup.number().required('El semestre/nivel es obligatorio'),
        plan: yup.number().required('El plan de estudios es obligatorio'),
        estatus: yup.number().required('Error interno'),
        usuario: yup.string().required('Su usuario es obligatorio').length(88, "El usuario no es valido")
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

    let cambiaBoleta = (e) => {
        let regex = /^[0-9]+$/;
        
        if( !regex.test(e.target.value) )
        {
            e.preventDefault();
            return;
        }

        if(e.target.value.length > 10)
        {
            e.preventDefault();
            return;
        }

        setBoleta(e.target.value);
    };

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

    let getFecha = (fechaCalcula) => {
        try {
            let fecha = new Date(fechaCalcula);
            let ano = (fecha.getFullYear()) + "";
            let mes = (fecha.getMonth() + 1) + "";
            let dia = (fecha.getDate()) + "";
            if(isNaN(ano) || isNaN(mes) || isNaN(dia)) return null;
            mes = mes.length <= 1 ? "0" + mes : mes;
            dia = dia.length <= 1 ? "0" + dia : dia;
            return ano + "-" + mes + "-" + dia;
        } catch (error) {
            return null;
        }
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

    let peticion = async () => {
        let temp = getNumeroCarreraAndPlan();

        let datosFormulario = {
            paterno: apePaterno,
            materno: apeMaterno,
            nombre: nombres,
            curp: curp,
            sexo: sexo,
            fechaNacimiento: getFecha(nacimiento),
            boleta: boleta,
            carrera: temp.carrera,
            semestre: getNivelSemestre(),
            plan: temp.plan,
            estatus: getEstatus(),
            usuario: usuario
        };

        let datos = { estudiantes: [datosFormulario] };

        try {
            await validacion.validate(datosFormulario);
        } catch (error) {
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
        try {

            let resp = await creaAlerta({
                titulo: "Advertencia",
                mensaje: "¿Está seguro de que su información es correcta?",
                icono: 5,
                boolBtnCancel: true,
                ColorConfirmar: "#2e7d32",
                ColorCancel: "#d33",
                MensajeConfirmar: "OK",
                MensajeCancel: "Cancelar"
            });

            if(!resp) {
                await creaAlerta({
                    titulo: "Cancelado",
                    mensaje: "Operación cancelada",
                    icono: 2,
                    boolBtnCancel: false,
                    ColorConfirmar: "#2e7d32",
                    ColorCancel: "#d33",
                    MensajeConfirmar: "OK",
                    MensajeCancel: ""
                });
                return;
            }

            await ObjAjax.altaEstudiantes(datos, setEspera);

        } catch (error) {
            setEspera(false);
        }
    };

    let convertExcelAJSON = async (e) => {

        let pregunta = await creaAlerta({
            titulo : "Advertencia",
            mensaje : "Se visulizaran los estudiantes en otra ventana. La informacion "+
                        "del mapeo de materias por estidnate no se mostrara sin embargo "+
                        "al realizar la carga masiva se cargaran automaticamente.",
            icono : 4,
            boolBtnCancel: true,
            ColorConfirmar: "#2e7d32",
            ColorCancel : "#dc3741",
            MensajeConfirmar : "De acuerdo",
            MensajeCancel : "Cancelar"
        });

        if( !pregunta )
        {
            await creaAlerta({
                titulo : "Cancelado",
                mensaje : "Operación cancelada.",
                icono : 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel : "#dc3741",
                MensajeConfirmar : "OK",
                MensajeCancel : "Cancelar"
            });
            return;
        }
        
        await ObjAjax.convertExcelAJSON(e.target.files[0], setEspera);
    };

    let ejemplo = async () => await ObjAjax.descargarEjemploExcelAltaMasiva(setEspera);

    let cambiaTamVentana = () => {
        if (window.innerWidth < 300)
            setTamTitulo("h8");
        else if (window.innerWidth < 600)
            setTamTitulo("h5");
        else
            setTamTitulo("h3");
    };

    useEffect(() => {
        window.addEventListener('resize', cambiaTamVentana);
        return () => window.removeEventListener('resize', cambiaTamVentana);
    }, []);

    return (
        <>
            <Cargando open={espera}/>
            <Navegacion/>
            <Paper>
                <Box p={3}>
                    <input type="file" id="excelCargar" 
                    onChange={ e => convertExcelAJSON(e) }
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                    style={{display:"none"}}/>
                    <Grid container >
                        <Grid item xs={4}>
                            <Box sx={{marginTop:"4%", marginLeft:"4%"}}>
                                <Typography
                                variant={tamTitulo} 
                                component={"p"}
                                sx={{fontWeight:"bold", marginTop:"4%"}} >
                                    Alta estudiante
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <Box sx={{marginTop:"4%", marginLeft:"4%"}}>
                                <BotonAzul sx={{marginLeft:"3%"}} onClick={ e => { document.getElementById("excelCargar").click() } }>
                                    Alta masiva y mapeo de materia por estudiante
                                </BotonAzul>
                                <BotonAzul 
                                    sx={{marginLeft:"3%"}}
                                    onClick={ejemplo}>
                                    Descargar ejemplo
                                </BotonAzul>
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
                                        value={boleta}
                                        onChange={ (e) => cambiaBoleta(e) } />
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
                                            onClick={peticion}>
                                                Registrar
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

export default AltaEstudiante;
