import { useContext, useState } from "react";
import { GlobalContext } from "../providers/GlobalContext";

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
      inizio: new Date(),
    };
    console.log(nuovaPrenotazione);
    const bici = state.bici.find((bici) => bici.id === idBici);
    dispatch({
      type: "updateBici",
      payload: { ...bici, isReserved: true },
    });
    dispatch({ type: "addPrenotazione", payload: nuovaPrenotazione });
  };

  const iniziaCorsa = (idPrenotazione) => {
    dispatch({
      type: "updatePrenotazione",
      payload: { id: idPrenotazione, inizioCorsa: new Date() },
    });

    const biciInUso = state.bici.find(
      (bici) => bici.id === state.prenotazioni[idPrenotazione].biciId
    );
    dispatch({
      type: "updateBici",
      payload: { ...biciInUso, isAvailable: false },
    });
  };

  const terminaCorsa = (idPrenotazione) => {
    const fineCorsa = new Date();
    const prenotazione = state.prenotazioni[idPrenotazione];
    const durata = (fineCorsa - new Date(prenotazione.inizioCorsa)) / 1000;
    const costo = calcolaCosto(durata);

    dispatch({
      type: "updatePrenotazione",
      payload: { ...prenotazione, fineCorsa, costo },
    });
    dispatch({
      type: "updateBici",
      payload: { ...state.bici[prenotazione.biciId], isAvailable: true },
    });
  };

  const calcolaCosto = (durata) => {
    // Logica di calcolo basata sulla durata
    // Esempio: 0.10€ al minuto
    return (durata / 60) * 0.1;
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
