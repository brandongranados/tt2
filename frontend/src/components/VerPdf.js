import { useEffect, useState } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

let VerPdf = ({ open, cerrarPdf, base64 }) => {

    const [altura, setAltura] = useState(0);

    useEffect( () => {
        setAltura(window.innerHeight*0.9);
    }, [] )

    return(
        <Modal
        open={open}>
            <Box>
                <Button 
                    onClick={cerrarPdf} 
                    variant="contained" 
                    color="error" >
                        Cerrar documento
                </Button>
                <iframe
                src={"data:application/pdf;base64,"+base64}
                height={altura} />
            </Box>
        </Modal>
    )
};

export default VerPdf;