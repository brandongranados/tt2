import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import tt from '../assets/img/tt.png';

let NavegacionInicioSesion = () => {

    return(
        <AppBar position="static" sx={{backgroundColor:"#006699", height:"8vh"}}>
            <Grid container>
                <Grid item xs={12}>
                    <Box>
                        <img src={tt} style={{ paddingLeft:"2%", height:"7vh"}} />
                    </Box>
                </Grid>
            </Grid>
        </AppBar>
    )
};

export default NavegacionInicioSesion;