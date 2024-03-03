import { styled } from '@mui/material/styles';
import Button from "@mui/material/Button";

let BotonAzul = ({onClick, children, onChange, sx}) => {
    const BotonAzul = styled(Button)({
        border:"solid #006699 3px",
        color:"#006699",
        fontFamily:"Arial",
        fontSize:"1rem",
        fontWeight:"bold",
        textTransform:"capitalize",
        '&:hover':{
            border:"solid #006699 3px",
            fontFamily:"Arial",
            fontSize:"1rem",
            fontWeight:"bold",
            textTransform:"capitalize",
        }
    });

    return(
        <BotonAzul
        sx={sx}
        variant="outlined" size="medium" 
        onClick={onClick}
        onChange={onChange} >
            {children}
        </BotonAzul>
    )
};

export default BotonAzul;