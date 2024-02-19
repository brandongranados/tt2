import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import BotonNegro from "../assets/js/BotonNegro";

import '../assets/css/Solicitudes.css';

let Solicitiudes = () => {

    return(
        <section className="globalSolicitudes">
            <Grid container >
                <Grid item xs={12}>
                    <Typography component={"p"} variant="p" 
                            textAlign={"left"} fontWeight={"bold"}
                            sx={{borderBottom:"solid", paddingBottom:"2%" }}
                            className="msm-solitar-constancia" >
                        Solicitar Constancia
                    </Typography>
                    <Typography component={"p"} variant="p" 
                            textAlign={"left"} fontWeight={"bold"}
                            sx={{paddingTop:"2%" }}
                            className="msm-constancias" >
                        Constancias
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={8}>
                                    <Typography variant="p" 
                                                component={"span"} 
                                                className="msm-btn-opcion-solicitar" >
                                        Incripci&oacute;n
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <BotonNegro>
                                        <span className="msm-btn-opcion-solicitar">Solicitar</span>
                                    </BotonNegro>   
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={8}>
                                    <Typography variant="p" 
                                                component={"span"}
                                                className="msm-btn-opcion-solicitar">
                                        Estudios
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <BotonNegro>
                                        <span className="msm-btn-opcion-solicitar">Solicitar</span>
                                    </BotonNegro>  
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={8}>
                                    <Typography variant="p" 
                                                component={"span"}
                                                className="msm-btn-opcion-solicitar">
                                        Becas
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <BotonNegro>
                                        <span className="msm-btn-opcion-solicitar">Solicitar</span>
                                    </BotonNegro>  
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={8}>
                                    <Typography variant="p" 
                                                component={"span"}
                                                className="msm-btn-opcion-solicitar">
                                        Periodo vacacional
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <BotonNegro>
                                        <span className="msm-btn-opcion-solicitar">Solicitar</span>
                                    </BotonNegro>  
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </section>
    )
};

export default Solicitiudes;