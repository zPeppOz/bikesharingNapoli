import React, { useState, useContext, useEffect } from "react";
import "./css/Dashboard.css";
import DataGridComponent from "./components/DataGridComponent";
import { GlobalContext } from "../providers/GlobalContext";

///array per i ticket preso dal globalcontext

//oggetto per la visualizzazione dei ticket presi dal JSON

export default function Dashboard() {
  const { bici, stazioni, ticket, dispatch } = useContext(GlobalContext);
  const [isBicicletteOpen, setBicicletteOpen] = useState(false);
  const [isStazioniOpen, setStazioniOpen] = useState(false);
  const [isTicketOpen, setTicketOpen] = useState(false);
  const value = useContext(GlobalContext);

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

  // Stato per le biciclette

  const toggleBiciclette = () => {
    setBicicletteOpen(true);
    setStazioniOpen(false);
    setTicketOpen(false);
  };

  const toggleStazioni = () => {
    setStazioniOpen(true);
    setBicicletteOpen(false);
    setTicketOpen(false);
  };

  const toggleTicket = () => {
    setTicketOpen(true);
    setBicicletteOpen(false);
    setStazioniOpen(false);
  };

  // const handleRemoveItemBike = (id) => {
  //   const index = bici.findIndex((item) => item.id === id);
  //   dispatch({ type: "removeBici", payload: index });
  // };

  // useEffect(() => {
  //   console.log("Bici", bici);
  // }, [bici]);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <ul>
          <li>Utenti</li>
          <li onClick={toggleBiciclette}>Biciclette</li>
          <li onClick={toggleStazioni}>Stazioni</li>
          <li onClick={toggleTicket}>Ticket</li>
        </ul>
      </div>

      <div className="navbar">
        <input type="text" placeholder="Cerca..." />
      </div>

      <div className="maincontent">
        {isBicicletteOpen && (
          <div className="biciclette">
            <h1> BICICLETTE </h1>
            <div style={{ height: "100%", width: "90%" }}>
              <DataGridComponent rows={bici} columns={colonneBiciclette} />
            </div>
          </div>
        )}

        {isStazioniOpen && (
          <div className="stazioni">
            <h1> STAZIONI </h1>
            <div style={{ height: "100%", width: "90%" }}>
              <DataGridComponent rows={stazioni} columns={colonneStazioni} />
            </div>
          </div>
        )}

        {isTicketOpen && (
          <div className="ticket">
            <h1> TICKET </h1>
            <div style={{ height: "100%", width: "90%" }}>
              {/* Richiama il componente DataGridComponent con i dati del ticket */}
              <DataGridComponent rows={ticket} columns={colonneTicket} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
