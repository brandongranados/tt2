import { configureStore } from '@reduxjs/toolkit';
import AutenticacionReducer from './Autenticacion';
import DatosUsuarioReducer from './DatosUsuario';


export default configureStore({
    reducer: {
        Autenticacion: AutenticacionReducer,
        DatosUsuario: DatosUsuarioReducer
    }
});