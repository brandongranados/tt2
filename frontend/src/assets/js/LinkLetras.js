import { Box } from "@mui/material";
import { Link } from "react-router-dom";

let LinkLetras = ({ dir, texto, sx }) => {
    return(
        <Box sx={sx}>
            <Link to={dir} style={{color:"#006699", 
            textDecoration:"none", 
            fontWeight:"bold" }} >
                {texto}
            </Link>
        </Box>
    )
};

export default LinkLetras;