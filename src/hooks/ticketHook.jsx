import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../providers/GlobalContext";

export const useTickets = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const addTicket = (ticket) => {
    const lastId = state.ticket[state.ticket.length - 1].id;
    const newTicket = {
      id: lastId + 1,
      ...ticket,
    };
    dispatch({ type: "addTicket", payload: newTicket });
  };

  const removeTicket = (id) => {
    dispatch({ type: "removeTicket", payload: id });
  };

  const updateTicket = (ticket) => {
    dispatch({ type: "updateTicket", payload: ticket });
  };

  const openDialog = () => {
    dispatch({ type: "openTicket" });
  };

  const closeDialog = () => {
    dispatch({ type: "closeTicket" });
  };

  const toggleDialog = () => {
    dispatch({ type: "toggleTicket" });
  };

  const isDialogOpen = state.isTicketOpen;

  return {
    addTicket,
    removeTicket,
    updateTicket,
    isDialogOpen,
    toggleDialog,
  };
};
