import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./services/Store";
import InicioSesion from "./components/InicioSesion";
import RestablecerContrasena from "./components/RestablecerContrasena";
import AltaEstudianteValidacion from "./components/AltaEstudianteValidacion";
import RegistroUsuario from "./components/RegistroUsuario";
import Solicitudes from "./components/Solicitudes";
import RegistroEstudiante from "./components/RegistroEstudiante";
import ValidarToken from "./components/ValidarToken";
import AltaEstudiante from "./components/AltaEstudiante";
import ExpedienteEstudiantil from "./components/ExpedienteEstudiantil";
import AltaEstValEdicion from "./components/AltaEstValEdicion";
import ExpendienteEdicion from "./components/ExpedienteEdicion";
import Bitacora from "./components/Bitacora";

let App = () => {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Inicio />
      </BrowserRouter>
    </Provider>
  );
}

let Inicio = () => {
  return (
    <Routes>
      <Route path="/" element={<InicioSesion />} />
      <Route path="/restablecer" element={<RestablecerContrasena/>} />
      <Route path="/registroEstudiante" element={<RegistroEstudiante/>} />
      <Route path="/validarToken" element={<ValidarToken/>} />

      <Route path="/administrador/altaEstudiante" element={<AltaEstudiante/>} />
      <Route path="/administrador/altaEstudianteValidacion" element={<AltaEstudianteValidacion/>} />
      <Route path="/administrador/altaEstValEdicion" element={<AltaEstValEdicion/>} />
      <Route path="/administrador/expedienteEstudiantil" element={<ExpedienteEstudiantil/>} />
      <Route path="/administrador/expEstEdicion" element={<ExpendienteEdicion/>} />

      <Route path="/auditor/bitacora" element={<Bitacora/>} />
      














      <Route path="/otro" element={<RegistroUsuario/>} />
      
      
      <Route path="/estudiante/solicitudes" element={<Solicitudes />} />
    </Routes>
  );
};

export default App;
