import { createSlice } from '@reduxjs/toolkit';

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
        setExpEstudiante: (state, action) => {
            state.ExpEstudiante = action.payload;
        }
    }
})

export const { getDatosUsuario, setDatosUsuario, setEstudiante, setListaEstudiantes, setExpEstudiante } = DatosUsuarioSlice.actions;

export default DatosUsuarioSlice.reducer;