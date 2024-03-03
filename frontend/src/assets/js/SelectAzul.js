import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styled from '@mui/material/styles/styled';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

let SelectAzul = ({ onChange, value, etiqueta, sx, onKeyDown, opciones }) => {
    
    const SelAzul = styled(Select)({
        '@media screen and ( max-width: 575px )':{
            fontSize:"0.9rem"
        },
        '@media screen and ( min-width: 576px ) and (max-width: 767px)':{
            fontSize:"1.1rem"
        },
        '@media screen and (min-width: 768px) and (max-width: 991px)':{
            fontSize:"1.3rem"
        },
        '@media screen and (min-width: 992px) and (max-width: 1199px)':{
            fontSize:"1.4rem"
        },
        '@media screen and (min-width: 1200px)':{
            fontSize:"1.6rem"
        },
        ".MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline":{
            borderColor: "#006699 !important",
            borderWidth:"2px"
        },
        "&:hover .css-1fr493r-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#006699 !important",
            borderWidth:"2px"
        },
        ".css-1d3z3hw-MuiOutlinedInput-notchedOutline":{
            borderColor: "#006699 !important",
            borderWidth:"2px"
        },
        ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":{
            padding:"8.5px 14px"
        }
    });

    const ItemSelect = styled(MenuItem)({
        '@media screen and ( max-width: 575px )':{
            fontSize:"0.9rem"
        },
        '@media screen and ( min-width: 576px ) and (max-width: 767px)':{
            fontSize:"1.1rem"
        },
        '@media screen and (min-width: 768px) and (max-width: 991px)':{
            fontSize:"1.3rem"
        },
        '@media screen and (min-width: 992px) and (max-width: 1199px)':{
            fontSize:"1.4rem"
        },
        '@media screen and (min-width: 1200px)':{
            fontSize:"1.6rem"
        }
    });

    return(
        <Box sx={sx}>
            <Box sx={{display:"flex", flexDirection:"column"}}>
                <Typography variant={"h7"} 
                component={"span"} 
                color={"#006699"}>{etiqueta}</Typography>
                <SelAzul onChange={onChange} value={value}>
                {
                    opciones.map( (iterador) => {
                        return(
                            <ItemSelect 
                            key={iterador} 
                            value={iterador}>
                                {iterador}
                            </ItemSelect>
                        )
                    } )
                }
                </SelAzul>
            </Box>
        </Box>
    )
};

export default SelectAzul;