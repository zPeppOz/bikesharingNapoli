import React, { useState, useContext, useEffect } from "react";
import "./css/Dashboard.css";
import DataGridComponent from "./components/DataGridComponent";
import { GlobalContext } from "../providers/GlobalContext";
//immprta logo da assets
import logo from "../assets/easyLogo2.png";

///array per i ticket preso dal globalcontext

//oggetto per la visualizzazione dei ticket presi dal JSON

export default function Dashboard() {
  const { bici, stazioni, ticket, utenti, dispatch } =
  useContext(GlobalContext);
  const [isUtentiOpen, setUtentiOpen] = useState(false);
  const [isBicicletteOpen, setBicicletteOpen] = useState(false);
  const [isStazioniOpen, setStazioniOpen] = useState(false);
  const [isTicketOpen, setTicketOpen] = useState(false);
  const value = useContext(GlobalContext);

  const colonneUtenti = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "nome", headerName: "Nome", width: 150 },
    { field: "cognome", headerName: "Cognome", width: 150 },
    { field: "username", headerName: "Username", width: 300 },
    { field: "password", headerName: "Password", width: 300 },
    { field: "prenotazioni", headerName: "Prenotazioni", width: 300 },
    { field: "corse", headerName: "Corse", width: 300 },
    { field: "ruolo", headerName: "Ruolo", width: 300 },
  ];

  const colonneBiciclette = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "lastLat", headerName: "Latitudine", width: 150 },
    { field: "lastLong", headerName: "Longitudine", width: 150 },
    { field: "battery", headerName: "battery", width: 300 },
  ];

  const colonneStazioni = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Nome", width: 150 },
    { field: "lat", headerName: "Latitudine", width: 150 },
    { field: "lng", headerName: "Longitudine", width: 300 },
  ];

  const colonneTicket = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "Bicicleta", headerName: "Bici", width: 150 },
    { field: "data", headerName: "Data", width: 150 },
    { field: "descrizione", headerName: "descrizione", width: 300 },
  ];

  const toggleUtenti = () => {
    setUtentiOpen(true);
    setBicicletteOpen(false);
    setStazioniOpen(false);
    setTicketOpen(false);
  };

  // Stato per le biciclette

  const toggleBiciclette = () => {
    setBicicletteOpen(true);
    setStazioniOpen(false);
    setTicketOpen(false);
    setUtentiOpen(false);
  };

  const toggleStazioni = () => {
    setStazioniOpen(true);
    setBicicletteOpen(false);
    setTicketOpen(false);
    setUtentiOpen(false);
  };

  const toggleTicket = () => {
    setTicketOpen(true);
    setBicicletteOpen(false);
    setStazioniOpen(false);
    setUtentiOpen(false);
  };

  const handleRemoveItemBike = (id) => {
    dispatch({ type: "removeBici", payload: id });
  };

  // useEffect(() => {
  //   console.log("Bici", bici);
  // }, [bici]);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <img src={logo} alt="logo" />
        <ul>
          <li onClick={toggleUtenti}>Utenti</li>
          <li onClick={toggleBiciclette}>Biciclette</li>
          <li onClick={toggleStazioni}>Stazioni</li>
          <li onClick={toggleTicket}>Ticket</li>
        </ul>
      </div>

      <div className="maincontent">
        {isUtentiOpen && (
          <div>
            <h1> UTENTI </h1>
            <div style={{ height: "100%", width: "100%" }}>
              <DataGridComponent rows={utenti} columns={colonneUtenti} />
            </div>
          </div>
        )}

        {isBicicletteOpen && (
          <div>
            <h1> BICICLETTE </h1>
            <div style={{ height: "100%", width: "100%" }}>
              <DataGridComponent rows={bici} columns={colonneBiciclette} />
            </div>
          </div>
        )}

        {isStazioniOpen && (
          <div>
            <h1> STAZIONI </h1>
            <div style={{ height: "100%", width: "100%" }}>
              <DataGridComponent rows={stazioni} columns={colonneStazioni} />
            </div>
          </div>
        )}

        {isTicketOpen && (
          <div>
            <h1> TICKET </h1>
            <div style={{ height: "100%", width: "100%" }}>
              {/* Richiama il componente DataGridComponent con i dati del ticket */}
              <DataGridComponent rows={ticket} columns={colonneTicket} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
