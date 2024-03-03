import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styled from '@mui/material/styles/styled';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

let FechasAzul = ({ etiqueta, onChange, value, sx, onKeyDown }) => {

    const Fecha = styled(DatePicker)({
        width:"100%",
        ".css-nxo287-MuiInputBase-input-MuiOutlinedInput-input":{
            padding:"8.5px 14px"
        },
        ".css-1d3z3hw-MuiOutlinedInput-notchedOutline":{
            borderColor: "#006699 !important",
            borderWidth:"2px"
        },
        ".css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root":{
            fontSize:"1.6rem !important"
        }
    });

    return(
        <Box sx={sx}>
            <Box sx={{display:"flex", flexDirection:"column"}}>
                <Typography variant={"h7"} 
                    component={"span"} 
                    color={"#006699"}>{etiqueta}</Typography>
                <LocalizationProvider 
                dateAdapter={AdapterDayjs} 
                adapterLocale={'en-gb'}>
                    <DemoContainer sx={{padding:"0px"}} components={['DatePicker']}>
                        <Fecha onChange={onChange} value={dayjs(value)} />
                    </DemoContainer>
                </LocalizationProvider>
            </Box>
        </Box>
    )
};

export default FechasAzul;