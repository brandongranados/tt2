import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./services/Store";
import InicioSesion from "./components/InicioSesion";
import RestablecerContrasena from "./components/RestablecerContrasena";
import ValidacionUsuarios from "./components/ValidacionUsuarios";
import ValidarUsuario from "./components/ValidarUsuario";
import RegistroUsuario from "./components/RegistroUsuario";
import Solicitudes from "./components/Solicitudes";
import RegistroEstudiante from "./components/RegistroEstudiante";
import ValidarToken from "./components/ValidarToken";

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


      <Route path="/otro" element={<RegistroUsuario/>} />
      
      <Route path="/administrador/validacionUsuarios" element={<ValidacionUsuarios/>} />
      <Route path="/administrador/validarUsuario" element={<ValidarUsuario />} />

      <Route path="/estudiante/solicitudes" element={<Solicitudes />} />
    </Routes>
  );
};

export default App;
