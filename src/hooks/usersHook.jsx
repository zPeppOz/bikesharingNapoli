import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../providers/GlobalContext";

/*
    Esempio di utente: 
    {
        "id": "1",
        "nome": "Giuseppe",
        "cognome": "Setaro",
        "username": "giuseppe.setaro",
        "password": "test1"
    },
*/

export const useUsers = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const registerUser = (user) => {
    const lastId = state.utenti[state.utenti.length - 1].id;
    const newUser = {
      id: lastId + 1,
      ...user,
    };
    dispatch({ type: "addUser", payload: newUser });
    dispatch({ type: "loginUser", payload: newUser });
  };

  const loginUser = (username, password) => {
    const user = state.utenti.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      dispatch({ type: "loginUtente", payload: user });
      return true;
    } else {
      return false;
    }
  };

  return { registerUser, loginUser };
};
