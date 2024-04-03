import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Cargando from "./Cargando";
import InputTextBorderAzul from '../assets/js/InpuTextBorderAzul';
import FechasAzul from '../assets/js/FechasAzul';
import SelectAzul from '../assets/js/SelectAzul';
import Navegacion from './Navegacion';
import BotonAzul from '../assets/js/BotonAzul';

import { setDatosUsuario } from '../services/DatosUsuario';

import useAlerta from '../components/hooks/useAlerta';

let AltaEstValEdicion = () => {

    //estiilos genrales
    const inpuText = {
        marginTop:"1.5%", 
        paddingLeft: "4px", 
        paddingRight: "4px" };

    //ESTUDIANTE STORE
    const estudiantes = useSelector( state => state.DatosUsuario.DatosUsuario );
    const estudiante = useSelector( state => state.DatosUsuario.Estudiante );
    const despacha = useDispatch();
    const navegar = useNavigate();
    const [creaAlerta] = useAlerta();

    //AJAX CARGANDO
    const [espera, setEspera] = useState(false);
    //tamano de titulo
    const [tamTitulo, setTamTitulo] = useState("h3");
    //DATOS USUARIO
    const [apePaterno, setApePaterno] = useState("");
    const [apeMaterno, setApeMaterno] = useState("");
    const [nombres, setNombres] = useState("");
    const [curp, setCurp] = useState("");
    const [sexo, setSexo] = useState("");
    const [nacimiento, setNacimiento] = useState(dayjs(null));
    const [boleta, setBoleta] = useState("");
    const [carreraOpc, setCarreraOpc] = useState(["uno"]);
    const [carreraSel, setCarreraSel] = useState("");
    const [semestreNivel, setSemestreNivel] = useState(["uno"]);
    const [semestreNivelSel, setSemestreNivelSel] = useState("");
    //EXCEL
    const [datosExcel, setDatosExcel] = useState([]);

    //DATOS
    let cambiaApePaterno = (e) => {
        setApePaterno(e.target.value.toUpperCase());
        cambiarJson();
    };
    let cambiaApeMaterno = (e) => {
        setApeMaterno(e.target.value.toUpperCase());
        cambiarJson();
    };

    let cambiaNombres = (e) => {
        setNombres(e.target.value.toUpperCase());
        cambiarJson();
    };

    let cambiaCarrera = (e) => {
        setCarreraSel(e.target.value);
        cambiarJson();
    };

    let cambiaSemestreNivel = (e) => {
        setSemestreNivelSel(e.target.value);
        cambiarJson();
    };

    let cambiarJson = () => {
        let nac = getFecha();

        if( !nac )
            return;
    };
    
    let cambiaBoleta = (e) => {
        let valor = e.target.value;

        for(let i=0; i<valor.length; i++)
            if( !(valor.charAt(i).charCodeAt() > 47 && valor.charAt(i).charCodeAt() < 58) )
                valor = valor.replace(valor.charAt(i), "");

        if( valor.length > 10 )
            valor = valor.substring(0, 10);

        setBoleta(valor);
        cambiarJson();
    };

    let cambiaCurp = (e) => {

        let may = e.target.value.toUpperCase();

        if( may.length > 10 )
            may = may.substring(0, 18);

        setCurp(may);

        if( may.length >= 10 )
        {
            try {
                parseInt(may.substring(4, 10));

                let c = may.substring(4, 10);
                let ano = c[0] == "0" ? "20"+c[0]+c[1] : "19"+c[0]+c[1] ;
                let mes = c[2]+c[3];
                let dia = c[4]+c[5];

                setNacimiento(dayjs(ano+"-"+mes+"-"+dia));
            } catch (error) {}
        }
        else
            setNacimiento(dayjs(null));

        if( may.length >= 11 )
            setSexo(may[10] == "H" ? "HOMBRE" : "MUJER");
        else
            setSexo("");

        cambiarJson();
    };

    let cambiaTamVentana = () => {
        
        if( window.innerWidth < 300 )
            setTamTitulo("h8");
        else if( window.innerWidth < 600 )
            setTamTitulo("h5");
        else
            setTamTitulo("h3");
    };

    //ACTULIZAR DATOS
    
    let actualizar = async (e) => {

        let obj = validaDatos();

        try {

            let resp = await creaAlerta({
                titulo : "Advertencia",
                mensaje : "?Esta seguro de actualizar la informacion?",
                icono : 5,
                boolBtnCancel: true,
                ColorConfirmar: "#2e7d32",
                ColorCancel : "#d33",
                MensajeConfirmar : "Guardar",
                MensajeCancel : "Cancelar"
            });

            if( !resp )
            {
                await creaAlerta({
                    titulo : "Cancelado",
                    mensaje : "Operacion cancelada",
                    icono : 2,
                    boolBtnCancel: false,
                    ColorConfirmar: "#2e7d32",
                    ColorCancel : "#d33",
                    MensajeConfirmar : "OK",
                    MensajeCancel : ""
                });

                setEspera(false);
    
                return;
            }

            setEspera(true);

            if( !obj.bool )
            {
                setEspera(false);

                await creaAlerta({
                    titulo : "Revise el formulario",
                    mensaje : obj.msm,
                    icono : 2,
                    boolBtnCancel: false,
                    ColorConfirmar: "#2e7d32",
                    ColorCancel : "",
                    MensajeConfirmar : "OK",
                    MensajeCancel : ""
                });
    
                return;
            }

            actualizarLista();
            setEspera(false);
            navegar("/administrador/altaEstudianteValidacion");

        } catch (error) {
            
        }
    };

    //OTROS

    let getFecha = (fechaCalcula) => {

        try {
            let fecha = new Date(fechaCalcula);

            let ano = (fecha.getFullYear())+"";
            let mes = (fecha.getMonth()+1)+"";
            let dia = (fecha.getDate())+"";

            if( isNaN(ano) || isNaN(mes) || isNaN(dia) )
                return null;

            mes = mes.length <= 1 ? "0"+mes : mes;
            dia = dia.length <= 1 ? "0"+dia : dia;

            return ano+"-"+mes+"-"+dia;
        } catch (error) {
            return null;
        }
    };

    let validaDatos = () => {

        let respuesta = { bool:true, msm:"" };

        if( apePaterno.trim().length == 0 )
        {
            respuesta.bool = false;
            respuesta.msm += "Le falta el apellido paterno. ";
        }

        if( apeMaterno.trim().length == 0 )
        {
            respuesta.bool = false;
            respuesta.msm += "Le falta el apellido materno. ";
        }

        if( nombres.trim().length == 0 )
        {
            respuesta.bool = false;
            respuesta.msm += "Le falta el nombre(s). ";
        }

        if( curp.trim().length == 0 )
        {
            respuesta.bool = false;
            respuesta.msm += "Le falta el CURP. ";
        }

        if( sexo.trim().length == 0 )
        {
            respuesta.bool = false;
            respuesta.msm += "Le falta el sexo. ";
        }

        if( getFecha(nacimiento) == null )
        {
            respuesta.bool = false;
            respuesta.msm += "Le falta la fecha de nacimiento. ";
        }

        if( boleta.trim().length == 0 )
        {
            respuesta.bool = false;
            respuesta.msm += "Le falta la boleta. ";
        }

        if( carreraSel.trim().length == 0 )
        {
            respuesta.bool = false;
            respuesta.msm += "Le falta la carrera. ";
        }

        if( semestreNivelSel.trim().length == 0 )
        {
            respuesta.bool = false;
            respuesta.msm += "Le falta el semestre o nivel. ";
        }

        return respuesta;
    };

    let actualizarLista = () => {
        let izq = estudiantes.filter( iterador => estudiante.boleta < iterador.boleta );
        let der = estudiantes.filter( iterador => estudiante.boleta > iterador.boleta );

        despacha(setDatosUsuario([ ...izq, {
            apePaterno:apePaterno,
            apeMaterno:apeMaterno,
            nombre:nombres,
            curp:curp,
            sexo:sexo,
            nacimiento:getFecha(nacimiento),
            boleta:boleta,
            carrera:carreraSel,
            semestre:semestreNivelSel
        },...der ]));
    };

    useEffect( () => {

        try {
            window.removeEventListener('resize', cambiaTamVentana);
        } catch (error) {}
        window.addEventListener('resize', cambiaTamVentana);

        setApePaterno(estudiante.apePaterno);
        setApeMaterno(estudiante.apeMaterno);
        setNombres(estudiante.nombre);

        cambiaCurp({target:{value:estudiante.curp}});

        setBoleta(estudiante.boleta);
        setSemestreNivelSel(estudiante.semestre);
        setCarreraSel(estudiante.carrera);
    }, [] );

    return(
        <>
            <Navegacion/>
            <Cargando bool={espera}/>
            <Grid container >
                <Grid item xs={12}>
                    <Box sx={{marginTop:"4%", marginLeft:"4%"}}>
                        <Typography
                        variant={tamTitulo} 
                        component={"p"}
                        sx={{fontWeight:"bold", marginTop:"4%"}} >
                            Alta estudiante
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs sm></Grid>
                <Grid item xs={10}>
                    <Grid container>
                        <Grid item xs={12} sm={4}>
                            <InputTextBorderAzul 
                            etiqueta={"Apellido Paterno"}
                            sx={inpuText}
                            value={apePaterno}
                            onChange={ (e) => cambiaApePaterno(e) } />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <InputTextBorderAzul
                            etiqueta={"Apellido Materno"}
                            sx={inpuText}
                            value={apeMaterno}
                            onChange={ (e) => cambiaApeMaterno(e) } />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <InputTextBorderAzul 
                            etiqueta={"Nombre(s)"}
                            sx={inpuText}
                            value={nombres}
                            onChange={ (e) => cambiaNombres(e) } />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4}>
                            <InputTextBorderAzul
                            etiqueta={"CURP"}
                            sx={inpuText}
                            value={curp}
                            onChange={ (e) => cambiaCurp(e) } />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={4}>
                            <InputTextBorderAzul
                            etiqueta={"Sexo (autorellenado del CURP)"}
                            sx={inpuText}
                            value={sexo} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FechasAzul 
                            etiqueta={"Fecha nacimiento (autorellenado del CURP)"}
                            sx={inpuText}
                            value={nacimiento} />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4}>
                            <InputTextBorderAzul
                            etiqueta={"Boleta"}
                            sx={inpuText}
                            value={boleta}
                            onChange={ (e) => cambiaBoleta(e) } />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4}>
                            <SelectAzul
                            sx={inpuText}
                            etiqueta={"Carrera"}
                            opciones={carreraOpc}
                            onChange={ (e) => cambiaCarrera(e) }
                            value={carreraSel} />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4}>
                            <SelectAzul
                            sx={inpuText}
                            etiqueta={"Semestre (Nivel)"}
                            opciones={semestreNivel}
                            onChange={ (e) => cambiaSemestreNivel(e) }
                            value={semestreNivelSel} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs sm></Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={3} />
                        <Grid item xs={6} >
                            <BotonAzul
                                sx={{width:"100%", marginTop:"2%"}}
                                onClick={ e => actualizar(e) }>
                                actualizar
                            </BotonAzul>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
};

export default AltaEstValEdicion;