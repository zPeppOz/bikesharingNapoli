import { useContext, useState } from "react";
import { GlobalContext } from "../providers/GlobalContext";

const corsa = {
  id: 1,
  biciId: 1,
  utenteId: 1,
  prenotazioneId: 1,
  inizio: null,
  inizioCorsa: null,
  durata: null,
  fineCorsa: null,
  costo: 0,
};

export const useBikeSharing = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const isBikeAvailable = (idBici) => {
    return state.bici[idBici].isAvailable;
  };

  const isBikeReserved = (idBici) => {
    return state.bici[idBici].isReserved;
  };

  const iniziaCorsa = (idBici, idUtente) => {
    // dispatch({
    //   type: "updatePrenotazione",
    //   payload: { id: idPrenotazione, inizioCorsa: new Date() },
    // });

    const newCorsa = {
      ...corsa,
      id: generateUniqueID(),
      biciId: idBici,
      utenteId: idUtente,

      inizio: new Date(),
      inizioCorsa: new Date(),
    };
    const biciInUso = state.bici.find((bici) => bici.id === idBici);
    dispatch({ type: "addCorsa", payload: newCorsa });
    dispatch({
      type: "updateBici",
      payload: { ...biciInUso, isAvailable: false },
    });
    return newCorsa;
  };

  const terminaCorsa = (idCorsa, costo) => {
    const fineCorsa = new Date();
    let corsa = state.corse.find((corsa) => corsa.id === idCorsa);
    // calcola la durata in secondi
    const durata = (
      (fineCorsa.getTime() - corsa.inizioCorsa.getTime()) /
      1000
    ).toFixed(0);
    corsa = { ...corsa, fineCorsa, costo, durata };
    dispatch({
      type: "updateCorsa",
      payload: corsa,
    });
    dispatch({
      type: "updateBici",
      payload: { id: corsa.biciId, isAvailable: true },
    });
  };

  const generateUniqueID = () => {
    // Implementa una logica per generare un ID unico
    const id = Math.floor(Math.random() * 1000000);
    return id;
  };

  return {
    // prenotaBicicletta,
    iniziaCorsa,
    terminaCorsa,
    isBikeAvailable,
    isBikeReserved,
  };
};
