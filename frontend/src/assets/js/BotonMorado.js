import { styled } from '@mui/material/styles';
import Button from "@mui/material/Button";

let BotonMorado = (obj) => {
    const BotonMorado = styled(Button)({
        width:"100%",
        border:"solid #c28bcd 3px",
        color:"#c28bcd",
        fontFamily:"Arial",
        fontSize:"1rem",
        fontWeight:"bold",
        textTransform:"capitalize",
        '&:hover':{
            border:"solid #c28bcd 3px",
            fontFamily:"Arial",
            fontSize:"1rem",
            fontWeight:"bold",
            textTransform:"capitalize",
        }
    });

    return(
        <BotonMorado variant="outlined" size="medium" 
                        onClick={obj.onClick}
                        onChange={obj.onChange} >
            {obj.children}
        </BotonMorado>
    )
};

export default BotonMorado;