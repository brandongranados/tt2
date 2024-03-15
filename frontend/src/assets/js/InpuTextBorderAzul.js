import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styled from '@mui/material/styles/styled';
import { useState } from "react";

let InputTextBorderAzul = ( { etiqueta, value, onChange, onKeyDown, sx, onCopy, onPaste } ) => {

    const TextoAzul = styled(TextField)({
        width: "100%",
        fontFamily:"Arial",
        "&:hover":{
            borderColor:"#006699",
        },
        ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{
            borderStyle:"solid",
            borderColor:"#006699",
            borderWidth:"2px"
        },
        ".MuiOutlinedInput-notchedOutline.css-1d3z3hw-MuiOutlinedInput-notchedOutline":{
            borderColor:"#006699",
            borderWidth:"2px"
        },
        ".css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":{
            color:"#006699"
        },
        ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input":{
            borderStyle:"solid"
        },
        ".MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeSmall MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeSmall MuiInputLabel-outlined css-1pysi21-MuiFormLabel-root-MuiInputLabel-root":{
            border:"solid #006699"
        },
        '@media screen and ( max-width: 575px )':{
            ".css-1pysi21-MuiFormLabel-root-MuiInputLabel-root":{
                fontSize:"0.9rem"
            },
            ".css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":{
                fontSize:"0.9rem"
            },
            ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root":{
                fontSize:"0.9rem"
            }
        },
        '@media screen and ( min-width: 576px ) and (max-width: 767px)':{
            ".css-1pysi21-MuiFormLabel-root-MuiInputLabel-root":{
                fontSize:"1.1rem"
            },
            ".css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":{
                fontSize:"1.1rem"
            },
            ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root":{
                fontSize:"1.1rem"
            }
        },
        '@media screen and (min-width: 768px) and (max-width: 991px)':{
            ".css-1pysi21-MuiFormLabel-root-MuiInputLabel-root":{
                fontSize:"1.3rem"
            },
            ".css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":{
                fontSize:"1.3rem"
            },
            ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root":{
                fontSize:"1.3rem"
            }
        },
        '@media screen and (min-width: 992px) and (max-width: 1199px)':{
            ".css-1pysi21-MuiFormLabel-root-MuiInputLabel-root":{
                fontSize:"1.4rem"
            },
            ".css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":{
                fontSize:"1.4rem"
            },
            ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root":{
                fontSize:"1.4rem"
            }
        },
        '@media screen and (min-width: 1200px)':{
            ".css-1pysi21-MuiFormLabel-root-MuiInputLabel-root":{
                fontSize:"1.6rem"
            },
            ".css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":{
                fontSize:"1.6rem"
            },
            ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root":{
                fontSize:"1.6rem"
            }
        }
    });
    const [foco, setFoco] = useState(false);

    let cambiarFoco = (bool) => setFoco(bool);

    return(
        <Box sx={sx}>
            <Typography variant={"h7"} 
            component={"span"} 
            color={"#006699"}>{etiqueta}</Typography>
            <TextoAzul size="small"
                value={value} 
                onChange={onChange}
                onKeyDown={onKeyDown}
                onClick={ () => { cambiarFoco(true) } }
                onBlur={ () => { cambiarFoco(false) } }
                autoFocus={foco}
                onCopy={onCopy}
                onPaste={onPaste} />
        </Box>
    )
};

export default InputTextBorderAzul;