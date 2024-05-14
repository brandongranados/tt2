import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Cargando from "./Cargando";
import InputTextBorderAzul from '../assets/js/InpuTextBorderAzul';
import BotonAzul from '../assets/js/BotonAzul';
import Navegacion from './Navegacion';
import FechasAzul from '../assets/js/FechasAzul';
import SelectAzul from '../assets/js/SelectAzul';
import { setDatosUsuario } from '../services/DatosUsuario';

import useAjax from '../services/useAjax';
import useArchivo from "./hooks/useArchivo";
import useAlerta from '../components/hooks/useAlerta';

let AltaEstudiante = () => {

    //estiilos genrales
    const inpuText = {
        marginTop:"1.5%", 
        paddingLeft: "4px", 
        paddingRight: "4px" };

    //SERVICIOS
    const [ archivo, descargaExcelDesdeBase64 ] = useArchivo();
    const ObjAjax = useAjax();
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

    let cambiaApePaterno = (e) => setApePaterno(e.target.value.toUpperCase());
    let cambiaApeMaterno = (e) => setApeMaterno(e.target.value.toUpperCase());
    let cambiaNombres = (e) => setNombres(e.target.value.toUpperCase());
    let cambiaCarrera = (e) => setCarreraSel(e.target.value);
    let cambiaSemestreNivel = (e) => setSemestreNivelSel(e.target.value);

    let cambiaBoleta = (e) => {
        let valor = e.target.value;

        for(let i=0; i<valor.length; i++)
            if( !(valor.charAt(i).charCodeAt() > 47 && valor.charAt(i).charCodeAt() < 58) )
                valor = valor.replace(valor.charAt(i), "");

        if( valor.length > 10 )
            valor = valor.substring(0, 10);

        setBoleta(valor);
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
    };

    //EXCEL

    let cargaDeDocExcel = () => document.getElementById("excelCargar").click();

    let interpretaExcel = async (e) => {
        try {

            let resp = await creaAlerta({
                titulo : "Advertencia",
                mensaje : "?Esta seguro de cargar el excel seleccionado?",
                icono : 5,
                boolBtnCancel: true,
                ColorConfirmar: "#2e7d32",
                ColorCancel : "#d33",
                MensajeConfirmar : "OK",
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

            //let datos = await archivo(e.target.files[0]);
            //let resp = await ObjAjax.interpretarExcelMasivo(datos, setEspera);

            //if( resp.codigo != 200  )
                //throw new Error("sin datos");

            //setDatosExcel(resp.datos);
            peticion(true);

        } catch (error) {
            setDatosExcel([]);
        }
    };

    let ejemplo = async () => console.log("JAJAJAJA");

    //AJAX

    let peticion = async (bool) => {
        try {

            if( bool )
            {
                despacha(setDatosUsuario(datosExcel));
                setEspera(false);
                navegar("/administrador/altaEstudianteValidacion");
                return;
            }

            let obj = validaDatos();

            let resp = await creaAlerta({
                titulo : "Advertencia",
                mensaje : "¿Esta seguro de que su informacion es correcta?",
                icono : 5,
                boolBtnCancel: true,
                ColorConfirmar: "#2e7d32",
                ColorCancel : "#d33",
                MensajeConfirmar : "OK",
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

            despacha(setDatosUsuario([{
                apePaterno:apePaterno,
                apeMaterno:apeMaterno,
                nombre:nombres,
                curp:curp,
                sexo:sexo,
                nacimiento:getFecha(nacimiento),
                boleta:boleta,
                carrera:carreraSel,
                semestre:semestreNivelSel
            }]));

            setEspera(false);
            navegar("/administrador/altaEstudianteValidacion");

        } catch (error) {
            
        }
    };

    let cambiaTamVentana = () => {
        
        if( window.innerWidth < 300 )
            setTamTitulo("h8");
        else if( window.innerWidth < 600 )
            setTamTitulo("h5");
        else
            setTamTitulo("h3");
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

    useEffect( () => {

        try {
            window.removeEventListener('resize', cambiaTamVentana);
        } catch (error) {}
        window.addEventListener('resize', cambiaTamVentana);
    }, [] );

    return(
        <>
            <input type="file" id="excelCargar" 
            onChange={ (e) => { interpretaExcel(e) } }
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
            style={{display:"none"}}/>
            <Cargando bool={espera}/>
            <Navegacion />
            <Grid container >
                <Grid item xs={6}>
                    <Box sx={{marginTop:"4%", marginLeft:"4%"}}>
                        <Typography
                        variant={tamTitulo} 
                        component={"p"}
                        sx={{fontWeight:"bold", marginTop:"4%"}} >
                            Alta estudiante
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{marginTop:"4%", marginLeft:"4%"}}>
                        <BotonAzul sx={{marginLeft:"3%"}} onClick={cargaDeDocExcel}>
                            Cargar excel
                        </BotonAzul>
                        <BotonAzul 
                            sx={{marginLeft:"3%"}}
                            onClick={ejemplo}>
                            Descargar ejemplo
                        </BotonAzul>
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
                            onChange={ (e) => cambiaCarrera(e) } />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4}>
                            <SelectAzul
                            sx={inpuText}
                            etiqueta={"Semestre (Nivel)"}
                            opciones={semestreNivel}
                            onChange={ (e) => cambiaSemestreNivel(e) } />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={3} />
                        <Grid item xs={6}>
                            <BotonAzul
                            sx={{...inpuText, width:"100%"}}
                            onClick={ () => peticion(false) }>
                                Registrar
                            </BotonAzul>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs sm></Grid>
            </Grid>
        </>
    )
};

export default AltaEstudiante;