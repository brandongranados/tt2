import { createSlice } from '@reduxjs/toolkit';
import { json } from 'react-router';

export const DatosUsuarioSlice = createSlice({
    name: "DatosUsuario",
    initialState: {
        DatosUsuario: null,
        Estudiante: {},
        ListaEstudiantes: [],
        ExpEstudiante: {}
    },
    reducers:{
        setDatosUsuario: (state, action) => {
            state.DatosUsuario = action.payload;
            sessionStorage.setItem("DatosUsuario", state.DatosUsuario);
        },
        getDatosUsuario: (state) => {
            let usuario = sessionStorage.getItem("DatosUsuario");

            if( usuario )
                state.DatosUsuario = usuario;
            else
                state.DatosUsuario = null;
        },
        setEstudiante: (state, action) => {
            state.Estudiante = action.payload;
        },
        setListaEstudiantes: (state, action) => {
            state.ListaEstudiantes = action.payload;
        },
        getExpEstudiante: (state, action) => {
            let ExpEstudiante = JSON.parse(sessionStorage.getItem("ExpEstudiante"));

            if( ExpEstudiante )
                state.ExpEstudiante = ExpEstudiante;
            else
                state.ExpEstudiante = null;
        },
        setExpEstudiante: (state, action) => {
            state.ExpEstudiante = action.payload;
            sessionStorage.setItem("ExpEstudiante", JSON.stringify(state.ExpEstudiante));
        }
    }
})

export const { 
                getDatosUsuario, 
                setDatosUsuario, 
                setEstudiante, 
                setListaEstudiantes,
                getExpEstudiante,
                setExpEstudiante
             } = DatosUsuarioSlice.actions;

export default DatosUsuarioSlice.reducer;