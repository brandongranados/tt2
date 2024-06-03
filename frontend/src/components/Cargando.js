import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";

let Cargando = ({ open }) => {

    const [tam, setTam] = useState(300);

    let cambiarTamano = () => {
        if (window.innerWidth < 575)
            setTam(100);
        else if (window.innerWidth >= 575 && window.innerWidth < 768)
            setTam(150);
        else if (window.innerWidth >= 768 && window.innerWidth < 991)
            setTam(200);
        else if (window.innerWidth >= 991 && window.innerWidth < 1200)
            setTam(250);
        else
            setTam(300);
    };

    useEffect(() => {
        try {
            window.removeEventListener("resize", cambiarTamano);
        } catch (error) {}

        window.addEventListener("resize", cambiarTamano);

    }, []);

    return (
        <Modal open={open} >
            <Box sx={{
                height: "100vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }} >
                <CircularProgress size={tam} />
            </Box>
        </Modal>
    )
};

export default Cargando;
