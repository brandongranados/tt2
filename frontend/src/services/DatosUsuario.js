import { createSlice } from '@reduxjs/toolkit';

export const DatosUsuarioSlice = createSlice({
    name: "DatosUsuario",
    initialState: {
        DatosUsuario: [],
        Estudiante: {},
        ListaEstudiantes: [],
        ExpEstudiante: {}
    },
    reducers:{
        setDatosUsuario: (state, action) => {
            state.DatosUsuario = action.payload;
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

export const { setDatosUsuario, setEstudiante, setListaEstudiantes, setExpEstudiante } = DatosUsuarioSlice.actions;

export default DatosUsuarioSlice.reducer;