import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';

let BotonNegro = (obj) => {
    const BotonNegro = styled(Button)({
        borderStyle:"solid",
        borderColor:"black",
        color:"black",
        fontFamily:"Arial",
        fontSize:"1.3rem",
        textTransform:"capitalize",
        '&:hover':{
            borderStyle:"solid",
            borderColor:"black"
        }
    });

    return(
        <BotonNegro variant="outlined" size="small"
                    onClick={obj.onClick}
                    onChange={obj.onChange} >
            {obj.children}
        </BotonNegro>
    )
};

export default BotonNegro;