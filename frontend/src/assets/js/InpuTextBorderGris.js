import TextField from "@mui/material/TextField";
import styled from '@mui/material/styles/styled';

let InputTextBorderGris = () => {
    const TextoGris = styled(TextField)({
        width: "100%",
        fontFamily:"Arial",
        ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{
            borderStyle:"solid",
            borderColor:"black",
            borderWidth:"2px"
        },
        ".MuiOutlinedInput-notchedOutline.css-1d3z3hw-MuiOutlinedInput-notchedOutline":{
            borderColor:"black",
            borderWidth:"2px"
        },
        ".css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":{
            color:"black"
        },
        ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input":{
            borderStyle:"solid"
        },
        ".MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeSmall MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeSmall MuiInputLabel-outlined css-1pysi21-MuiFormLabel-root-MuiInputLabel-root":{
            border:"solid black"
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

    return(
        <TextoGris
        label="Usuario"
        size="small"
        helperText="Ingrese su usuario" />
    )
};

export default InputTextBorderGris;