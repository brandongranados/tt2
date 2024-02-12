import { BrowserRouter, Routes, Route } from "react-router-dom";

import Inicio from "./Inicio";
import { ProveedorAutenticar } from "./services/Autenticacion";
import { ProvedorDatosUsuario } from "./services/DatosUsuario";

let App = () => {
  return (
    <BrowserRouter>
      <Envolver/>
    </BrowserRouter>
  );
}

let Envolver = () => {
  return(
    <ProveedorAutenticar>
      <EnvolverDos/>
    </ProveedorAutenticar>
  )
};

let EnvolverDos = () => {
  return(
    <ProvedorDatosUsuario>
      <Inicio />
    </ProvedorDatosUsuario>
  )
};

export default App;
