import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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