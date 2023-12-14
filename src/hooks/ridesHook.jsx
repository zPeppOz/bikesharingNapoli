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

  const prenotaBicicletta = (idBici, idUtente) => {
    const nuovaPrenotazione = {
      id: generateUniqueID(),
      biciId: idBici,
      utenteId: idUtente,
      oraPrenotazione: new Date(),
    };
    console.log(nuovaPrenotazione);
    const bici = state.bici.find((bici) => bici.id === idBici);
    const utente = state.utenti.find((utente) => utente.id === idUtente);
    dispatch({
      type: "updateBici",
      payload: { ...bici, isReserved: true },
    });
    dispatch({
      type: "updateUtente",
      payload: {
        ...utente,
        prenotazioni: [...utente.prenotazioni, nuovaPrenotazione.id],
      },
    });
    dispatch({ type: "addPrenotazione", payload: nuovaPrenotazione });
  };

  const iniziaCorsa = (idPrenotazione) => {
    // dispatch({
    //   type: "updatePrenotazione",
    //   payload: { id: idPrenotazione, inizioCorsa: new Date() },
    // });
    const prenotazione = state.prenotazioni.find((prenotazione) => {
      return prenotazione.id === idPrenotazione;
    });
    const newCorsa = {
      ...corsa,
      id: generateUniqueID(),
      biciId: prenotazione.biciId,
      utenteId: prenotazione.utenteId,
      prenotazioneId: prenotazione.id,
      inizio: new Date(),
      inizioCorsa: new Date(),
    };
    const biciInUso = state.bici.find(
      (bici) => bici.id === state.prenotazioni[idPrenotazione].biciId
    );
    dispatch({ type: "addCorsa", payload: newCorsa });
    dispatch({
      type: "updateBici",
      payload: { ...biciInUso, isAvailable: false },
    });
  };

  const terminaCorsa = (idCorsa, costo) => {
    const fineCorsa = new Date();
    const durata = (fineCorsa - new Date(prenotazione.inizioCorsa)) / 1000;
    dispatch({
      type: "updateCorsa",
      payload: { id: idCorsa, fineCorsa, costo, durata },
    });
    dispatch({
      type: "updateBici",
      payload: { id: prenotazione.biciId, isAvailable: true },
    });
  };

  const generateUniqueID = () => {
    // Implementa una logica per generare un ID unico
    const id = Math.floor(Math.random() * 1000000);
    return id;
  };

  return {
    prenotaBicicletta,
    iniziaCorsa,
    terminaCorsa,
    isBikeAvailable,
    isBikeReserved,
  };
};
