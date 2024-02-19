import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { Provider } from "react-redux";

import { getAutenticacion } from './services/Autenticacion';
import { getDatosUsuario } from './services/DatosUsuario';
import Store from "./services/Store";

import Inicio from "./Inicio";
import { useEffect } from "react";

let App = () => {
  return (
    <BrowserRouter>
      <Envolver/>
    </BrowserRouter>
  );
}

let Envolver = () => {
  return(
    <Provider store={Store}>
      <EnvolverDos/>
    </Provider>
  )
};

let EnvolverDos = () => {

  const despacha = useDispatch();

  useEffect( () => {
    despacha(getAutenticacion());
    despacha(getDatosUsuario());
  }, [] );

  return(
    <Inicio />
  )
};

export default App;
