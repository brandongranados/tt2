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
        <>
            <Modal
            open={open}>
                
                <Box sx={{width:"100%", display:"flex", 
                            justifyContent:"center", 
                            alignItems:"center",
                            flexDirection:"column"}}>
                    <Button
                        onClick={cerrarPdf} 
                        variant="contained" 
                        color="error"
                        sx={{paddingTop:"1%"}} >
                            Cerrar documento
                    </Button>
                    <Box
                    sx={{paddingTop:"1%", width:"100%",
                    display:"flex", 
                    justifyContent:"center", 
                    alignItems:"center"
                    }}>
                        <iframe
                            width={"95%"}
                            src={"data:application/pdf;base64,"+base64}
                            height={altura}/>
                    </Box>
                </Box>
            </Modal>
        </>
    )
};

export default VerPdf;