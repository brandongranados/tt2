import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import dayjs from 'dayjs';

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";

import Cargando from "./Cargando";
import Navegacion from './Navegacion';
import { setDatosUsuario } from '../services/DatosUsuario';
import useAjax from '../services/useAjax';
import useArchivo from "./hooks/useArchivo";
import useAlerta from '../components/hooks/useAlerta';

let AltaEstudiante = () => {
    const inpuText = {
        marginTop: "1.5%", 
        paddingLeft: "4px", 
        paddingRight: "4px" 
    };

    const [ archivo, descargaExcelDesdeBase64 ] = useArchivo();
    const ObjAjax = useAjax();
    const despacha = useDispatch();
    const navegar = useNavigate();
    const [creaAlerta] = useAlerta();

    const [espera, setEspera] = useState(false);
    const [tamTitulo, setTamTitulo] = useState("h3");
    const [apePaterno, setApePaterno] = useState("");
    const [apeMaterno, setApeMaterno] = useState("");
    const [nombres, setNombres] = useState("");
    const [curp, setCurp] = useState("");
    const [sexo, setSexo] = useState("");
    const [nacimiento, setNacimiento] = useState("");
    const [boleta, setBoleta] = useState("");
    const [carreraOpc, setCarreraOpc] = useState([
        { id: 1, nombre: "Ingeniería en Sistemas Computacionales" },
        { id: 2, nombre: "Ingeniería en Sistemas Computacionales" },
        { id: 3, nombre: "Ingeniería en Inteligencia Artificial" },
        { id: 4, nombre: "Licenciatura en Ciencia de Datos" }
    ]);
    const [carreraSel, setCarreraSel] = useState("");
    const [semestreNivel, setSemestreNivel] = useState(["1", "2", "3"]);
    const [semestreNivelSel, setSemestreNivelSel] = useState("");

    const [datosExcel, setDatosExcel] = useState([]);

    let cambiaApePaterno = (e) => setApePaterno(e.target.value.toUpperCase());
    let cambiaApeMaterno = (e) => setApeMaterno(e.target.value.toUpperCase());
    let cambiaNombres = (e) => setNombres(e.target.value.toUpperCase());
    let cambiaCarrera = (e) => setCarreraSel(e.target.value);
    let cambiaSemestreNivel = (e) => setSemestreNivelSel(e.target.value);

    let cambiaBoleta = (e) => {
        let valor = e.target.value;
        for(let i = 0; i < valor.length; i++) {
            if(!(valor.charAt(i).charCodeAt() > 47 && valor.charAt(i).charCodeAt() < 58)) {
                valor = valor.replace(valor.charAt(i), "");
            }
        }
        if(valor.length > 10) valor = valor.substring(0, 10);
        setBoleta(valor);
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
        if(may.length >= 11) setSexo(may[10] === "H" ? "M" : "F");
        else setSexo("");
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

    let validaDatos = () => {
        let respuesta = { bool: true, msm: "" };

        if(apePaterno.trim().length === 0) {
            respuesta.bool = false;
            respuesta.msm += "Le falta el apellido paterno. ";
        }

        if(apeMaterno.trim().length === 0) {
            respuesta.bool = false;
            respuesta.msm += "Le falta el apellido materno. ";
        }

        if(nombres.trim().length === 0) {
            respuesta.bool = false;
            respuesta.msm += "Le falta el nombre(s). ";
        }

        if(curp.trim().length === 0) {
            respuesta.bool = false;
            respuesta.msm += "Le falta el CURP. ";
        }

        if(sexo.trim().length === 0) {
            respuesta.bool = false;
            respuesta.msm += "Le falta el sexo. ";
        }

        if(getFecha(nacimiento) === null) {
            respuesta.bool = false;
            respuesta.msm += "Le falta la fecha de nacimiento. ";
        }

        if(boleta.trim().length === 0) {
            respuesta.bool = false;
            respuesta.msm += "Le falta la boleta. ";
        }

        if(carreraSel === "") {
            respuesta.bool = false;
            respuesta.msm += "Le falta la carrera. ";
        }

        if(semestreNivelSel.trim().length === 0) {
            respuesta.bool = false;
            respuesta.msm += "Le falta el semestre o nivel. ";
        }

        return respuesta;
    };

    let peticion = async () => {
        try {
            let obj = validaDatos();

            if (!obj.bool) {
                setEspera(false);
                await creaAlerta({
                    titulo: "Revise el formulario",
                    mensaje: obj.msm,
                    icono: 2,
                    boolBtnCancel: false,
                    ColorConfirmar: "#2e7d32",
                    ColorCancel: "",
                    MensajeConfirmar: "OK",
                    MensajeCancel: ""
                });
                return;
            }

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
                setEspera(false);
                return;
            }

            setEspera(true);

            const datosFormulario = {
                paterno: apePaterno,
                materno: apeMaterno,
                nombre: nombres,
                curp: curp,
                sexo: sexo,
                fechaNacimiento: getFecha(nacimiento),
                boleta: boleta.toString(), // Cambiar a cadena
                carrera: carreraSel.toString(), // Cambiar a cadena
                semestre: semestreNivelSel.toString(), // Cambiar a cadena
                plan: "1", // Usar cadena
                estatus: "1", // Usar cadena
                usuario: "Itzel" // Usar cadena
            };
            


            const datos = { estudiantes: [datosFormulario] };

            const resultado = await ObjAjax.altaEstudiantes(datos, setEspera);
            console.log("el resltado es:",resultado);

            if (resultado) {
                await creaAlerta({
                    titulo: "Éxito",
                    mensaje: "El estudiante ha sido registrado correctamente.",
                    icono: 1,
                    boolBtnCancel: false,
                    ColorConfirmar: "#2e7d32",
                    ColorCancel: "",
                    MensajeConfirmar: "OK",
                    MensajeCancel: ""
                });

                navegar("/administrador/altaEstudianteValidacion");
            }
        } catch (error) {
            setEspera(false);
        }
    };

    const cambiaTamVentana = () => {
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
            <Cargando bool={espera}/>
            <Navegacion/>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={10}>
                    <Paper>
                        <Box p={3}>
                            <Typography variant="h4" component="p" fontWeight="bold" align="center" gutterBottom mb={6}>
                                Alta Estudiante
                            </Typography>
                            
                            <Box mb={4}>
                                <Grid container spacing={3} justifyContent="center">
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Apellido Paterno"
                                            value={apePaterno}
                                            onChange={cambiaApePaterno}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Apellido Materno"
                                            value={apeMaterno}
                                            onChange={cambiaApeMaterno}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Nombre(s)"
                                            value={nombres}
                                            onChange={cambiaNombres}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="CURP"
                                            value={curp}
                                            onChange={cambiaCurp}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Sexo"
                                            value={sexo}
                                            onChange={(e) => setSexo(e.target.value)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Fecha de Nacimiento"
                                            type="date"
                                            value={nacimiento}
                                            onChange={(e) => setNacimiento(e.target.value)}
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Boleta"
                                            value={boleta}
                                            onChange={cambiaBoleta}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            select
                                            label="Carrera"
                                            value={carreraSel}
                                            onChange={cambiaCarrera}
                                            fullWidth
                                        >
                                            {carreraOpc.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.nombre}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            select
                                            label="Semestre (Nivel)"
                                            value={semestreNivelSel}
                                            onChange={cambiaSemestreNivel}
                                            fullWidth
                                        >
                                            {semestreNivel.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} display="flex" justifyContent="center">
                                        <Button variant="contained" color="primary" onClick={peticion}>
                                            Registrar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default AltaEstudiante;
