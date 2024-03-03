import { createSlice } from '@reduxjs/toolkit';

export const DatosUsuarioSlice = createSlice({
    name: "DatosUsuario",
    initialState: {
        DatosUsuario: {}
    },
    reducers:{
        getDatosUsuario: state => {
            let cabecera = sessionStorage.getItem("DatosUsuario");

            if( cabecera )
                state.DatosUsuario = cabecera;
            else
                state.DatosUsuario = {};
        },
        setDatosUsuario: (state, action) => {
            state.Autenticacion = action.payload;
            sessionStorage.setItem("DatosUsuario", action.payload);
        }
    }
})

export const {getDatosUsuario, setDatosUsuario} = DatosUsuarioSlice.actions;

export default DatosUsuarioSlice.reducer;