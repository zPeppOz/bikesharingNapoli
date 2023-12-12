import biciclette from "../data/biciclette.json";
import prenotazioni from "../data/prenotazioni.json";
import stazioni from "../data/stazioni.json";
import utenti from "../data/utenti.json";
import ticket from "../data/ticket.json";
import { useEffect, useReducer } from "react";
import { GlobalContext } from "./GlobalContext";

export default function GlobalContextProvider({ children }) {
  const reducer = (state, action) => {
    switch (action.type) {
      case "addStazione":
        return {
          ...state,
          stazioni: {
            ...state.stazioni,
            ...action.payload,
          },
        };
      case "removeStazione":
        state.stazioni.splice(action.payload, 1);
        return {
          ...state,
          stazioni: {
            ...state.stazioni,
          },
        };
      case "updateStazione":
        state.stazioni[action.payload.id] = action.payload;
        return {
          ...state,
          stazioni: {
            ...state.stazioni,
          },
        };
      case "addBici":
        return {
          ...state,
          bici: {
            ...state.bici,
            ...action.payload,
          },
        };
      case "removeBici":
        state.bici?.splice(action.payload, 1);
        return {
          ...state,
          bici: {
            ...state.bici,
          },
        };
      case "updateBici":
        state.bici[action.payload.id] = action.payload;
        return {
          ...state,
          bici: {
            ...state.bici,
          },
        };
      case "addPrenotazione":
        return {
          ...state,
          prenotazioni: {
            ...state.prenotazioni,
            ...action.payload,
          },
        };
      case "removePrenotazione":
        state.prenotazioni.splice(action.payload, 1);
        return {
          ...state,
          prenotazioni: {
            ...state.prenotazioni,
          },
        };
      case "updatePrenotazione":
        state.prenotazioni[action.payload.id] = action.payload;
        return {
          ...state,
          prenotazioni: {
            ...state.prenotazioni,
          },
        };
      case "addUtente":
        return {
          ...state,
          utenti: {
            ...state.utenti,
            ...action.payload,
          },
        };
      case "removeUtente":
        state.utenti.splice(action.payload, 1);
        return {
          ...state,
          utenti: {
            ...state.utenti,
          },
        };
      case "updateUtente":
        state.utenti[action.payload.id] = action.payload;
        return {
          ...state,
          utenti: {
            ...state.utenti,
          },
        };
      case "addTicket":
        return {
          ...state,
          ticket: {
            ...state.ticket,
            ...action.payload,
          },
        };
      case "removeTicket":
        state.ticket.splice(action.payload, 1);
        return {
          ...state,
          ticket: {
            ...state.ticket,
          },
        };
      case "updateTicket":
        state.ticket[action.payload.id] = action.payload;
        return {
          ...state,
          ticket: {
            ...state.ticket,
          },
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    stazioni: stazioni,
    bici: biciclette,
    prenotazioni: prenotazioni,
    utenti: utenti,
    ticket: ticket,
  });

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
