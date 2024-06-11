import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import { setAutenticacion } from './Autenticacion';
import { setDatosUsuario, setRol, setMasivas } from './DatosUsuario';
import { getAutenticacion } from './Autenticacion';
import { getDatosUsuario, getRol } from './DatosUsuario';

import useAlerta from '../components/hooks/useAlerta';
import useArchivo from '../components/hooks/useArchivo';

const rutas = {
    URL : "http://localhost:9090",
    INICIO_SESION : "/login",
    RESTABLECER : "/registroRestablecer",
    VALIDAR_TOKEN_RESTABLECER: "/validaRestablecer",

    VERIFICACION_MASIVA_ESTUDIANTES : "/verificarMasivaEstudiante",
    VALIDAR_ESTUDIANTE : "/validarEstudiante",
    REGISTRO_ESTUDIANTE: "/registroEstudiante",
    

    CONSTANCIA_ESTUDIOS: "/estudiante/getConstanciaEstudios",
    CONSTANCIA_INSCRIPCION: "/estudiante/getConstanciaInscripcion",
    CONSTANCIA_BECAS: "/estudiante/getConstanciaBecas",
    CONSTANCIA_SERVICIO: "/estudiante/getConstanciaServicio",
    VERIFICA_DOCUMENTO: "/estudiante/getVerificarConstancia",

    ALTA_ESTUDIANTES: "/personalGestionEscolar/altaMasivaEstudiantes",
    EDICION_ESTUDIANTES: "/personalGestionEscolar/edicionMasivaEstudiantes",
    BAJA_ESTUDIANTES: "/personalGestionEscolar/bajaMasivaEstudiantes",
    MAPEO_MATERIAS_ESTUDIANTES: "/personalGestionEscolar/mapeoMateriasEstudiantes",
    LISTA_ESTUDIANTES: "/personalGestionEscolar/getListaEstudiantes",
    EXPEDIENTE_ESTUDIANTE: "/personalGestionEscolar/getExpedienteEstudiante",

    ALTA_PERSONAL: "/admin/setPersonalApoyo",
    LISTA_PERSONAL: "/admin/setListaPersonalApoyo",
    BAJA_PERSONAL: "/admin/setBajaPersonalApoyo",

    EJEMPLO_EXCEL_MASIVA_EST : "/personalGestionEscolar/ejemploCargaMasiva",
    LEER_EXCEL_VERIFICACION_MASIVA_ESTUDIANTES : "/personalGestionEscolar/cargaMasivaEstudiantes"
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
        despacha(getRol());
    }, [] );

    //AJAX INICIO DE SESION

    let iniciarConexion = async (datos, setEspera) => {

        setEspera(true);
        try {
            let resp = await ajax.post(rutas.INICIO_SESION, datos);
            let dat = await resp.data;
            let roles = JSON.parse(dat.rol);

            despacha(setAutenticacion("Bearer "+dat.token));
            despacha(setDatosUsuario(datos.usuario));
            despacha(setRol(roles[0].role));

            switch(roles[0].role)
            {
                case "ROLE_ESTUDIANTE":
                    navegar("/estudiante/solicitudes");
                break;
                case "ROLE_PAAE":
                    navegar("/personalGestion/expedienteEstudiantil");
                break;
                case "ROLE_ADMIN":
                    navegar("/personalGestion/expedienteEstudiantil");
                break;
                case "ROLE_AUDITOR":
                    navegar("/personalGestion/expedienteEstudiantil");
                break;
                default:
                    navegar("/estudiante/solicitudes");
                break;
            }

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
                mensaje : "Se envió un token a su direccion de correo electronico que dio de alta. Favor de ingresarlo en la ventana a donde se redireccionara.",
                icono : 1,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel : "",
                MensajeConfirmar : "OK",
                MensajeCancel : ""
            });
            navegar("/validarToken");

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

    let convertExcelAJSON = async (arch, setEspera) => {

        setEspera(true);
        
        try {

            let leido = await archivo(arch);
            let datos = { docuemnto : leido.archBase64 };
            
            let resp = await ajax.post(rutas.LEER_EXCEL_VERIFICACION_MASIVA_ESTUDIANTES, 
                datos, {
                    headers:{
                        'Content-Type': 'application/json',
                        Authorization: Authorization
                    }
            });

            let json = await resp.data;

            despacha(setMasivas(json));
            setEspera(false);
            navegar("/administrador/altaEstudianteValidacion");

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

    //EJMEPLO DE EXCEL ALTA MASIVA

    let descargarEjemploExcelAltaMasiva = async (setEspera) => {
        setEspera(true);
        try {

            let resp = await ajax.post(rutas.EJEMPLO_EXCEL_MASIVA_EST, {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: Authorization
                }
            });

            descargaExcelDesdeBase64(await resp.data.documento);

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

            await ajax.post(rutas.VALIDAR_TOKEN_RESTABLECER, datos, {
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
     //alta estudiante   
     let altaEstudiantes = async (datos, setEspera) => {
        setEspera(true);
        try {
            let resp = await ajax.post(rutas.ALTA_ESTUDIANTES, datos, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            setEspera(false);
    
            await creaAlerta({
                titulo: "Éxito",
                mensaje: "Alta de estudiantes realizada correctamente.",
                icono: 1,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel: "",
                MensajeConfirmar: "OK",
                MensajeCancel: ""
            });
    
        } catch (error) {
            setEspera(false);
            await creaAlerta({
                titulo: "Error",
                mensaje: "No se pudo realizar el alta de estudiantes.",
                icono: 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel: "",
                MensajeConfirmar: "OK",
                MensajeCancel: ""
            });
        }
    };
    
    //ALTA MASIVA Y MAPEO DE MATERIAS DESDE EXCEL
    let altaMasivaEstuMaterias = async (datos, datos2, setEspera) => {
        setEspera(false);

        try {

            let pregunta = await creaAlerta({
                titulo : "Advertencia",
                mensaje : "Está seguro de continuar.",
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

            await ajax.post(rutas.ALTA_ESTUDIANTES, datos, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            setEspera(false);

            await creaAlerta({
                titulo: "Éxito",
                mensaje: "Alta de estudiantes realizada correctamente.",
                icono: 1,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel: "",
                MensajeConfirmar: "OK",
                MensajeCancel: ""
            });
        } catch (error) {
            setEspera(false);
            await creaAlerta({
                titulo: "Error",
                mensaje: "No se pudo realizar el alta de estudiantes.",
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

            await ajax.post(rutas.MAPEO_MATERIAS_ESTUDIANTES, datos2, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            setEspera(false);
    
            await creaAlerta({
                titulo: "Éxito",
                mensaje: "Alta materias por estudiante realizada correctamente.",
                icono: 1,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel: "",
                MensajeConfirmar: "OK",
                MensajeCancel: ""
            });
    
        } catch (error) {
            setEspera(false);
            await creaAlerta({
                titulo: "Error",
                mensaje: "No se pudo realizar el alta de materias por estudiante pruebe mediante reinscripcion.",
                icono: 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel: "",
                MensajeConfirmar: "OK",
                MensajeCancel: ""
            });
        }

            navegar("/personalGestion/altaEstudiante");
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

            return null;
        }
    };
    // edición masiva de estudiantes
    let edicionMasivaEstudiantes = async (datos, setEspera) => {

        let msm = await creaAlerta({
            titulo: "Advertencia",
            mensaje: "Esta seguro de continuar?.",
            icono: 5,
            boolBtnCancel: true,
            ColorConfirmar: "#2e7d32",
            ColorCancel: "#DD3333",
            MensajeConfirmar: "OK",
            MensajeCancel: "Cancelar"
        });

        if( !msm )
        {
            await creaAlerta({
                titulo: "Cancelado",
                mensaje: "Operacion cancelada.",
                icono: 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel: "",
                MensajeConfirmar: "OK",
                MensajeCancel: ""
            });
            return;
        }

        setEspera(true);

        try {
            let resp = await ajax.post(rutas.EDICION_ESTUDIANTES, datos, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            setEspera(false);

            await creaAlerta({
                titulo: "Ok",
                mensaje: "Se actulizo con exito.",
                icono: 1,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel: "",
                MensajeConfirmar: "OK",
                MensajeCancel: ""
            });

        } catch (error) {
            setEspera(false);
            await creaAlerta({
                titulo: "Error",
                mensaje: "No se pudo realizar la edición masiva de estudiantes.",
                icono: 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel: "",
                MensajeConfirmar: "OK",
                MensajeCancel: ""
            });
        }
    };

// baja masiva de estudiantes
    let bajaMasivaEstudiantes = async (datos, setEspera) => {
        console.log("Baja masiva de estudiantes", datos);
        setEspera(true);
        try {
            let resp = await ajax.post(rutas.BAJA_ESTUDIANTES, datos, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log("Respuesta del servidor", resp.data);
            setEspera(false);
            return resp.data;
        } catch (error) {
            console.error("Error en la petición", error);
            setEspera(false);
            await creaAlerta({
                titulo: "Error",
                mensaje: "No se pudo realizar la baja masiva de estudiantes.",
                icono: 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel: "",
                MensajeConfirmar: "OK",
                MensajeCancel: ""
            });
        }
    };

// mapeo de materias de estudiantes
    let mapeoMateriasEstudiantes = async (datos, setEspera) => {
        setEspera(true);
        try {
            let resp = await ajax.post(rutas.MAPEO_MATERIAS_ESTUDIANTES, datos, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            setEspera(false);
            return resp.data;
        } catch (error) {
            setEspera(false);
            await creaAlerta({
                titulo: "Error",
                mensaje: "No se pudo realizar el mapeo de materias de estudiantes.",
                icono: 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel: "",
                MensajeConfirmar: "OK",
                MensajeCancel: ""
            });
        }
    };

// obtener la lista de estudiantes
    let getListaEstudiantes = async (datos, setEspera) => {
        setEspera(true);
        try {
            let resp = await ajax.post(rutas.LISTA_ESTUDIANTES, datos, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return resp.data;
        } catch (error) {
            setEspera(false);
            await creaAlerta({
                titulo: "Error",
                mensaje: "No se pudo obtener la lista de estudiantes.",
                icono: 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel: "",
                MensajeConfirmar: "OK",
                MensajeCancel: ""
            });
        }
    };

// obtener el expediente de un estudiante
    let getExpedienteEstudiante = async (datos, setEspera) => {
        setEspera(true);
        try {
            let resp = await ajax.post(rutas.EXPEDIENTE_ESTUDIANTE, datos, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            setEspera(false);
            return resp.data;
        } catch (error) {
            setEspera(false);
            await creaAlerta({
                titulo: "Error",
                mensaje: "No se pudo obtener el expediente del estudiante.",
                icono: 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel: "",
                MensajeConfirmar: "OK",
                MensajeCancel: ""
            });
            return null;
        }
    };

    //ALTA DE PAAE

    let altaPersonal = async (datos, setEspera) => {
        setEspera(true);
        try {
            await ajax.post(rutas.ALTA_PERSONAL, datos, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            setEspera(false);
    
            await creaAlerta({
                titulo: "Éxito",
                mensaje: "Alta de personal realizada correctamente.",
                icono: 1,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel: "",
                MensajeConfirmar: "OK",
                MensajeCancel: ""
            });
    
        } catch (error) {
            setEspera(false);
            await creaAlerta({
                titulo: "Error",
                mensaje: "No se pudo realizar el alta del personal.",
                icono: 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel: "",
                MensajeConfirmar: "OK",
                MensajeCancel: ""
            });
        }
    };

    //LISTA DE PERSONAL
    let getListaPersonal = async (datos, setEspera) => {
        setEspera(true);
        try {
            let resp = await ajax.post(rutas.LISTA_PERSONAL, datos, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return await resp.data;
        } catch (error) {
            setEspera(false);
            await creaAlerta({
                titulo: "Error",
                mensaje: "No se pudo obtener la lista de personal.",
                icono: 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel: "",
                MensajeConfirmar: "OK",
                MensajeCancel: ""
            });
            return null;
        }
    };

    //BAJA DE PERSONAL
    let setBajaPersonal = async (datos, setEspera) => {

        let pregunta = await creaAlerta({
            titulo : "Advertencia",
            mensaje : "Está seguro de eliminar al personal.",
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
            return false;
        }

        setEspera(true);

        try {
            await ajax.post(rutas.BAJA_PERSONAL, datos, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            setEspera(false);

            await creaAlerta({
                titulo: "Éxito",
                mensaje: "Baja de personal realizada correctamente.",
                icono: 1,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel: "",
                MensajeConfirmar: "OK",
                MensajeCancel: ""
            });

            return true;
            
        } catch (error) {
            setEspera(false);
            await creaAlerta({
                titulo: "Error",
                mensaje: "No se pudo dar de baja al personal.",
                icono: 2,
                boolBtnCancel: false,
                ColorConfirmar: "#2e7d32",
                ColorCancel: "",
                MensajeConfirmar: "OK",
                MensajeCancel: ""
            });
            return false;
        }
    };
    
    
    return {
        iniciarConexion,
        restablecerContrasena,
        convertExcelAJSON,
        verificacionMasivaEstudiantes,
        descargarEjemploExcelAltaMasiva,
        cargarEstudiante,
        registrarEstudiante,
        registrarEstudianteToken,
        altaEstudiantes,
        crearConstancia,
        verificarDocumento,
        edicionMasivaEstudiantes,
        bajaMasivaEstudiantes,
        mapeoMateriasEstudiantes,
        getListaEstudiantes,
        getExpedienteEstudiante,
        altaMasivaEstuMaterias,
        altaPersonal,
        getListaPersonal,
        setBajaPersonal
    };
};



export default useAjax;