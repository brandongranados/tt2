import { createSlice } from '@reduxjs/toolkit';

export const AutenticacionSlice = createSlice({
    name: "Autenticacion",
    initialState: {
        Autenticacion: ""
    },
    reducers:{
        getAutenticacion: state => {
            let cabecera = sessionStorage.getItem("Authorization");

            if( cabecera )
                state.Autenticacion = cabecera;
            else
                state.Autenticacion = "";
        },
        setAutenticacion: (state, action) => {
            state.Autenticacion = action.payload;
            sessionStorage.setItem("Authorization", action.payload);
        }
    }
})

export const {getAutenticacion, setAutenticacion} = AutenticacionSlice.actions;

export default AutenticacionSlice.reducer;