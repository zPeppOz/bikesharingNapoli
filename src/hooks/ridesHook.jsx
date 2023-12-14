import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";

export const useBikeSharing = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const prenotaBicicletta = (idBici, idUtente) => {
    const nuovaPrenotazione = {
      id: generateUniqueID(),
      biciId: idBici,
      utenteId: idUtente,
      inizio: new Date(),
    };

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
    dispatch({ type: "updateBici", payload: { ...biciInUso, inUso: true } });
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
      payload: { ...state.bici[prenotazione.biciId], inUso: false },
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

  return { prenotaBicicletta, iniziaCorsa, terminaCorsa };
};
