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
        const indexStazione = state.stazioni.findIndex(
          (stazione) => stazione.id === action.payload.id
        );
        state.stazioni[indexStazione] = action.payload;
        return {
          ...state,
          stazioni: [
            ...state.stazioni,
            {
              ...action.payload,
            },
          ],
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
        // remove by id
        state.bici.filter((bici) => bici.id !== action.payload);
        return {
          ...state,
          bici: {
            ...state.bici,
          },
        };

      case "updateBici":
        const indexBici = state.bici.findIndex(
          (bici) => bici.id === action.payload.id
        );
        state.bici[indexBici] = action.payload;
        return {
          ...state,
          bici: [...state.bici],
        };
      case "addPrenotazione":
        return {
          ...state,
          prenotazioni: [
            ...state.prenotazioni,
            {
              ...action.payload,
            },
          ],
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
        const indexPrenotazione = state.prenotazioni.findIndex(
          (prenotazione) => prenotazione.id === action.payload.id
        );
        state.prenotazioni[indexPrenotazione] = action.payload;
        return {
          ...state,
          prenotazioni: [
            ...state.prenotazioni,
            {
              ...action.payload,
            },
          ],
        };
      case "addUtente":
        return {
          ...state,
          utenti: [
            ...state.utenti,
            {
              ...action.payload,
            },
          ],
        };
      case "removeUtente":
        state.utenti.splice(action.payload, 1);
        return {
          ...state,
          utenti: {
            ...state.utenti,
          },
        };
      case "loginUtente":
        return {
          ...state,
          loggedUser: action.payload,
        };
      case "updateUtente":
        return {
          ...state,
          utenti: [
            ...state.utenti,
            {
              ...action.payload,
            },
          ],
        };
      case "addTicket":
        return {
          ...state,
          ticket: [
            ...state.ticket,
            {
              ...action.payload,
            },
          ],
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
        const indexTicket = state.ticket.findIndex(
          (ticket) => ticket.id === action.payload.id
        );
        state.ticket[indexTicket] = action.payload;
        return {
          ...state,
          ticket: [
            ...state.ticket,
            {
              ...action.payload,
            },
          ],
        };
      case "addCorsa":
        return {
          ...state,
          corse: [
            ...state.corse,
            {
              ...action.payload,
            },
          ],
        };
      case "removeCorsa":
        state.corse.splice(action.payload, 1);
        return {
          ...state,
          corse: {
            ...state.corse,
          },
        };
      case "updateCorsa":
        // find index of object
        const corsa = state.corse.find(
          (corsa) => corsa.id === action.payload.id
        );
        return {
          ...state,
          corse: [...state.corse, { ...corsa, ...action.payload }],
        };
      case "addNotifica":
        return {
          ...state,
          notifiche: [
            ...state.notifiche,
            {
              ...action.payload,
            },
          ],
        };
      case "removeNotifica":
        state.notifiche.splice(action.payload, 1);
        return {
          ...state,
          notifiche: {
            ...state.notifiche,
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
    loggedUser: null,
    corse: [],
    notifiche: [],
  });

  useEffect(() => {
    console.log(state);
  }, [state, biciclette, stazioni, prenotazioni, utenti, ticket]);

  return (
    <GlobalContext.Provider
      value={{
        state,
        ...state,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
