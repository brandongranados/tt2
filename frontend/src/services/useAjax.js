import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import { getAutenticacion, setAutenticacion } from './Autenticacion';
import { getDatosUsuario, setDatosUsuario } from './DatosUsuario';

import useAlerta from '../components/hooks/useAlerta';
import useArchivo from '../components/hooks/useArchivo';

const rutas = {
    URL : "http://localhost:9090",
    INICIO_SESION : "/login",
    RESTABLECER : "/restablecer",
    VERIFICACION_MASIVA_ESTUDIANTES : "/verificarMasivaEstudiante",
    LEER_EXCEL_VERIFICACION_MASIVA_ESTUDIANTES : "/leerExcelVerificarMasivaEstudiante",
    EJEMPLO_EXCEL_MASIVA_EST : "/ejemploExcelMasivaEst",
    VALIDAR_ESTUDIANTE : "/validarEstudiante",
    REGISTRO_ESTUDIANTE: "/registroEstudiante",
    REGISTRO_ESTUDIANTE_TOKEN: "/registroEstudianteToken",
    CONSTANCIA_ESTUDIOS: "/estudiante/getConstanciaEstudios",
    CONSTANCIA_INSCRIPCION: "/estudiante/getConstanciaInscripcion",
    CONSTANCIA_BECAS: "/estudiante/getConstanciaBecas",
    CONSTANCIA_SERVICIO: "/estudiante/getConstanciaServicio",
    VERIFICA_DOCUMENTO: "/estudiante/getVerificarConstancia"
};

const ajax = axios.create({
    baseURL : rutas.URL
});

let useAjax = () => {

    const despacha = useDispatch();
    const [creaAlerta] = useAlerta();
    const [ archivo, descargaExcelDesdeBase64 ] = useArchivo();
    const Authorization = useSelector( state => state.Autenticacion.Autenticacion );
    const navegar = useNavigate();

    useEffect( () => {
        despacha(getAutenticacion());
        despacha(getDatosUsuario());
    }, [] );

    //AJAX INICIO DE SESION

    let iniciarConexion = async (datos, setEspera) => {

        setEspera(true);
        try {
            let resp = await ajax.post(rutas.INICIO_SESION, datos);
            let dat = await resp.data;
            let roles = JSON.parse(dat.rol);

            switch(roles[0].role)
            {
                case "ROLE_ESTUDIANTE":
                    navegar("/estudiante/solicitudes");
                break;
            }

            despacha(setAutenticacion(dat.token));
            despacha(setDatosUsuario(datos.usuario));

            setEspera(false);

        } catch (error) {
            setEspera(false);
            await creaAlerta({
                titulo : "Error",
                mensaje : "Usuario o contraseña incorrectos",
                icono : 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel : "",
                MensajeConfirmar : "OK",
                MensajeCancel : ""
            });
        }
    };

    //AJAX RESTABLECER CONTRASENAS

    let restablecerContrasena = async (datos, setEspera) => {
        setEspera(true);
        try {
            let resp = await ajax.post(rutas.RESTABLECER, datos, {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: Authorization
                }
            });
            let correo = await resp.data;

            setEspera(false);
            await creaAlerta({
                titulo : "OK",
                mensaje : "Se envió un correo a "+correo.correo,
                icono : 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel : "",
                MensajeConfirmar : "OK",
                MensajeCancel : ""
            });

        } catch (error) {
            setEspera(false);
            await creaAlerta({
                titulo : "Error",
                mensaje : "Usuario incorrecto",
                icono : 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel : "",
                MensajeConfirmar : "OK",
                MensajeCancel : ""
            });
        }
    };

    //AJAX VERIFICACION DESDE EXCEL ESTUDIANTES

    let verificacionMasivaEstudiantes = async (datos, setEspera) => {

        setEspera(true);
        try {

            let resp = await ajax.post(rutas.VERIFICACION_MASIVA_ESTUDIANTES, 
                datos,{
                    headers:{
                        'Content-Type': 'application/json',
                        Authorization: Authorization
                    }
            });

            let datos = await resp.data;

            setEspera(false);

            return datos;

        } catch (error) {
            setEspera(false);
            await creaAlerta({
                titulo : "Error",
                mensaje : "Ocurrio un error interno contactar a sistemas",
                icono : 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel : "",
                MensajeConfirmar : "OK",
                MensajeCancel : ""
            });
        }
    };

    let interpretarExcelMasivo = async (datos, setEspera) => {

        let retorno = null;

        setEspera(true);
        try {
            
            let resp = await ajax.post(rutas.LEER_EXCEL_VERIFICACION_MASIVA_ESTUDIANTES, 
                datos, {
                    headers:{
                        'Content-Type': 'application/json',
                        Authorization: Authorization
                    }
            });

            retorno = { codigo: 200, datos: await resp.data };

            setEspera(false);

        } catch (error) {
            retorno = { codigo: 400, datos: null };
            setEspera(false);
        }

        return retorno;
    };

    let descargarEjemploExcel = async (setEspera) => {
        setEspera(true);
        try {

            let resp = await ajax.post(rutas.EJEMPLO_EXCEL_MASIVA_EST, null, {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: Authorization
                }
            });

            descargaExcelDesdeBase64(await resp.data);

            setEspera(false);

        } catch (error) {
            setEspera(false);
            await creaAlerta({
                titulo : "Error",
                mensaje : "No fue posible descargar archivo",
                icono : 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel : "",
                MensajeConfirmar : "OK",
                MensajeCancel : ""
            });
        }
    };

    //AJAX ESTUDIANTE INDIVIDUAL

    let cargarEstudiante = async (datos, setEspera) => {
        
        try {

            let pregunta = await creaAlerta({
                titulo : "Advertencia",
                mensaje : "Está seguro de la modificación.",
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

            setEspera(true);

            await ajax.post(rutas.VALIDAR_ESTUDIANTE, datos, {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: Authorization
                }
            });

            await creaAlerta({
                titulo : "OK",
                mensaje : "Usuario registrado correctamente.",
                icono : 1,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel : "",
                MensajeConfirmar : "OK",
                MensajeCancel : ""
            });

            setEspera(false);

        } catch (error) {
            setEspera(false);

            await creaAlerta({
                titulo : "Error",
                mensaje : "Datos incorrectos",
                icono : 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel : "",
                MensajeConfirmar : "OK",
                MensajeCancel : ""
            });
        }
    };

    //REGISTRAR USUARIO Y VALIDACION DE TOKEN

    let registrarEstudiante = async (datos, setEspera) => {
        try {

            let pregunta = await creaAlerta({
                titulo : "Advertencia",
                mensaje : "Está seguro de enviar la informacion.",
                icono : 4,
                boolBtnCancel: true,
                ColorConfirmar: "#2e7d32",
                ColorCancel : "#dc3741",
                MensajeConfirmar : "Continuar",
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

            setEspera(true);

            await ajax.post(rutas.REGISTRO_ESTUDIANTE, datos, {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: Authorization
                }
            });

            setEspera(false);

            await creaAlerta({
                titulo : "OK",
                mensaje : "Se envio un token a la direccion de correo electronico registrada. "
                            +"Debera ingresar el token en la ventana donde se le redireccionara para verificar la direccion de correo electronico. ",
                icono : 1,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel : "",
                MensajeConfirmar : "OK",
                MensajeCancel : ""
            });

            return true;

        } catch (error) {
            setEspera(false);

            await creaAlerta({
                titulo : "Error",
                mensaje : "Datos incorrectos",
                icono : 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel : "",
                MensajeConfirmar : "OK",
                MensajeCancel : ""
            });

            return false;
        }
    };

    let registrarEstudianteToken = async (datos, setEspera) => {
        try {

            let pregunta = await creaAlerta({
                titulo : "Advertencia",
                mensaje : "Está seguro de enviar la informacion.",
                icono : 4,
                boolBtnCancel: true,
                ColorConfirmar: "#2e7d32",
                ColorCancel : "#dc3741",
                MensajeConfirmar : "Continuar",
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

            setEspera(true);

            await ajax.post(rutas.REGISTRO_ESTUDIANTE_TOKEN, datos, {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: Authorization
                }
            });

            setEspera(false);

            await creaAlerta({
                titulo : "OK",
                mensaje : "Se auntentico el correo electronico correctamente ya puede iniciar sesion. ",
                icono : 1,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel : "",
                MensajeConfirmar : "OK",
                MensajeCancel : ""
            });

            return true;

        } catch (error) {
            setEspera(false);

            await creaAlerta({
                titulo : "Error",
                mensaje : "Usuario o token incorrectos o token expirado",
                icono : 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel : "",
                MensajeConfirmar : "OK",
                MensajeCancel : ""
            });

            return false;
        }
    };

    //AJAX CREAR CONSTANCIAS.
    let crearConstancia = async (datos, setEspera, opc) => {
        try {

            let liga = "";

            setEspera(true);

            switch(opc)
            {
                case 1:
                    liga = rutas.CONSTANCIA_ESTUDIOS;
                break;
                case 2:
                    liga = rutas.CONSTANCIA_INSCRIPCION;
                break;
                case 3:
                    liga = rutas.CONSTANCIA_BECAS;
                break;
                case 5:
                    liga = rutas.CONSTANCIA_SERVICIO;
                break;
                default:
                    liga = rutas.CONSTANCIA_ESTUDIOS;
                break;
            }

            let data = await ajax.post(liga, datos, {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: Authorization
                }
            });

            return await data.data.documento;

        } catch (error) {
            setEspera(false);

            await creaAlerta({
                titulo : "Error",
                mensaje : "No fue posible crear su constancia inrentelo de nuevo mas tarde.",
                icono : 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel : "",
                MensajeConfirmar : "OK",
                MensajeCancel : ""
            });

            return null;
        }
    };

    let verificarDocumento = async (datos, setEspera) => {
        setEspera(true);
        try {

            let respuesta = await ajax.post(rutas.VERIFICA_DOCUMENTO, datos, {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: Authorization
                }
            });

            setEspera(false);
            return respuesta.data;

        } catch (error) {
            setEspera(false);

            await creaAlerta({
                titulo : "Error",
                mensaje : "Documento corrupto.",
                icono : 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel : "",
                MensajeConfirmar : "OK",
                MensajeCancel : ""
            });

            navegar("/");

            return false;
        }
    };

    return {
        iniciarConexion,
        restablecerContrasena,
        interpretarExcelMasivo,
        verificacionMasivaEstudiantes,
        descargarEjemploExcel,
        cargarEstudiante,
        registrarEstudiante,
        registrarEstudianteToken,
        crearConstancia,
        verificarDocumento
    };
};



export default useAjax;