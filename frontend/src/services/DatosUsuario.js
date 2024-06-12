import { createSlice } from '@reduxjs/toolkit';

export const DatosUsuarioSlice = createSlice({
    name: "DatosUsuario",
    initialState: {
        DatosUsuario: null,
        Rol: null,
        Estudiante: {},
        ListaEstudiantes: [],
        ExpEstudiante: {},
        Masivas: null
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
        getExpEstudiante: (state) => {
            let ExpEstudiante = JSON.parse(sessionStorage.getItem("ExpEstudiante"));

            if( ExpEstudiante )
                state.ExpEstudiante = ExpEstudiante;
            else
                state.ExpEstudiante = null;
        },
        setExpEstudiante: (state, action) => {
            state.ExpEstudiante = action.payload;
            sessionStorage.setItem("ExpEstudiante", JSON.stringify(state.ExpEstudiante));
        },
        getRol: (state) => {
            let rol = sessionStorage.getItem("Rol");

            if( rol )
                state.Rol = rol;
            else
                state.Rol = null;
        },
        setRol: (state, action) => {
            state.Rol = action.payload;
            sessionStorage.setItem("Rol", state.Rol);
        },
        setMasivas: (state, action) => {
            state.Masivas = action.payload;
        }
    }
})

export const { 
                getDatosUsuario, 
                setDatosUsuario, 
                setEstudiante, 
                setListaEstudiantes,
                getExpEstudiante,
                setExpEstudiante,
                getRol,
                setRol,
                setMasivas
             } = DatosUsuarioSlice.actions;

export default DatosUsuarioSlice.reducer;