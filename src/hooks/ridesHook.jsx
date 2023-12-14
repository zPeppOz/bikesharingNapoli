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

  // const prenotaBicicletta = (idBici, idUtente) => {
  //   const nuovaPrenotazione = {
  //     id: generateUniqueID(),
  //     biciId: idBici,
  //     utenteId: idUtente,
  //     oraPrenotazione: new Date(),
  //   };
  //   console.log(nuovaPrenotazione);
  //   const bici = state.bici.find((bici) => bici.id === idBici);
  //   console.log(state.utenti);
  //   const utente = state.utenti.find((utente) => utente.id === idUtente);

  //   utente.prenotazioni.push(nuovaPrenotazione.id);
  //   dispatch({
  //     type: "updateBici",
  //     payload: { ...bici, isReserved: true },
  //   });
  //   dispatch({
  //     type: "updateUtente",
  //     payload: {
  //       utente,
  //     },
  //   });
  //   dispatch({ type: "addPrenotazione", payload: nuovaPrenotazione });
  // };

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
  };

  const terminaCorsa = (idCorsa, costo) => {
    const fineCorsa = new Date();
    const corsa = state.corse.find((corsa) => corsa.id === idCorsa);
    const durata = (fineCorsa - new Date(corsa.inizioCorsa)) / 1000;
    dispatch({
      type: "updateCorsa",
      payload: { id: idCorsa, fineCorsa, costo, durata },
    });
    dispatch({
      type: "updateBici",
      payload: { id: corsa.biciId, isAvailable: true },
    });
    console.log(state);
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
