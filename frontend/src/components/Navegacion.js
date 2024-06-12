import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setAutenticacion } from '../services/Autenticacion';
import { setDatosUsuario, setEstudiante, setListaEstudiantes, setExpEstudiante } from '../services/DatosUsuario';

import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import tt from '../assets/img/tt.png';

let Navegacion = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const abierto = Boolean(anchorEl);
    const navegar = useNavigate();
    const despacha = useDispatch();
    const [ventanas, setVentanas] = useState([]);

    let abrirMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    let cerrar = () => {
        setAnchorEl(null);
    };

    let cerarSesion = () => {
        despacha(setAutenticacion(null));
        despacha(setDatosUsuario(null));
        despacha(setEstudiante(null));
        despacha(setListaEstudiantes(null));
        despacha(setExpEstudiante(null));
        sessionStorage.clear();
        navegar("/");
    };

    let dirigir = ruta => navegar(ruta);

    useEffect( () => {
        try {
            let rol = sessionStorage.getItem("Rol");
            switch(rol)
            {
                case "ROLE_ESTUDIANTE":
                    setVentanas([]);
                break;
                case "ROLE_PAAE":
                    setVentanas([
                        {
                            key: 1,
                            ruta:"/personalGestion/expedienteEstudiantil",
                            ruta_nombre: "Lista de estudiantes"
                        },
                        {
                            key: 2,
                            ruta:"/personalGestion/altaEstudiante",
                            ruta_nombre: "Alta estudiante"
                        }
                    ]);
                break;
                case "ROLE_ADMIN":
                    setVentanas([
                        {
                            key: 1,
                            ruta:"/personalGestion/expedienteEstudiantil",
                            ruta_nombre: "Lista de estudiantes"
                        },
                        {
                            key: 2,
                            ruta:"/personalGestion/altaEstudiante",
                            ruta_nombre: "Alta estudiante"
                        },
                        {
                            key: 3,
                            ruta:"/administrador/altaPersonal",
                            ruta_nombre: "Alta personal"
                        },
                        {
                            key: 4,
                            ruta:"/administrador/listaPersonal",
                            ruta_nombre: "Lista personal"
                        }
                    ]);
                break;
                case "ROLE_AUDITOR":
                    setVentanas([]);
                break;
                default:
                    setVentanas([]);
                break;
            }
        } catch (error) {}
    }, [] );

    return(
        <AppBar position="static" sx={{backgroundColor:"#006699", height:"8vh"}}>
            <Grid container>
                <Grid item xs={6}>
                    <Box>
                        <img src={tt} style={{ paddingLeft:"2%", height:"7vh"}} />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box 
                    display="flex"
                    flexDirection="row-reverse" >
                        <Tooltip title="Opciones">
                            <Button
                            aria-controls={ abierto ? 'basic-menu': undefined }
                            aria-haspopup="true"
                            aria-expanded={ abierto ? 'truearia' : undefined }
                            onClick={ abrirMenu } >
                                <AccountCircleOutlinedIcon 
                                color="disabled"
                                sx={{ color: "black", fontSize: 45 }}
                                    />
                            </Button>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            open={abierto}
                            onClose={cerrar}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}>
                            {
                                ventanas.map( iterador => {
                                    return(
                                        <MenuItem key={iterador.key} onClick={ e => { dirigir(iterador.ruta) } } >
                                            <Typography variant='p' component={"span"} >
                                                {
                                                    iterador.ruta_nombre
                                                }
                                            </Typography>
                                        </MenuItem>
                                    )
                                } )
                            }
                            <MenuItem onClick={ cerrar } >
                                <Typography variant='p' component={"span"} >
                                    <Button variant="contained" color="error" onClick={cerarSesion}>
                                        Cerrar Sesi&oacute;n
                                    </Button>
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Grid>
            </Grid>
        </AppBar>
    )
};

export default Navegacion;