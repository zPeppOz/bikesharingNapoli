import React, { useState } from "react";
import { MapContainer } from "react-leaflet";
import "./css/Dashboard.css";
// Importa JSON
import bicicletteData from "../app/data/biciclette.json";
import stazioni from "../app/data/stazioni.json";
import ticket from "../app/data/ticket.json";
import { DataGrid } from "@mui/x-data-grid";

export default function Dashboard() {
  //oggetto per la visualizzazione dei ticket presi dal JSON

  const colonneTicket = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "Bicicleta", headerName: "Bicicleta", width: 150 },
    { field: "data", headerName: "Data", width: 150 },
    { field: "descrizione", headerName: "Descrizione", width: 300 },
  ];

  const [isBicicletteOpen, setBicicletteOpen] = useState(false);
  const [isStazioniOpen, setStazioniOpen] = useState(false);
  const [isTicketOpen, setTicketOpen] = useState(false);

  // Stato per le biciclette
  const [biciclette, setBiciclette] = useState(bicicletteData);

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

  const handleRemoveItemBike = (id) => {
    const updatedBiciclette = biciclette.filter((item) => item.id !== id);
    setBiciclette(updatedBiciclette);
  };

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
            <ul>
              {biciclette.map((item) => (
                <li key={item.id}>
                  <p>
                    ID: <a>{item.id}</a>
                  </p>
                  <p>
                    LATITUDINE: <a>{item.lastLat}</a>
                  </p>
                  <p>
                    LONGITUDINE: <a>{item.lastLong}</a>
                  </p>
                  <p>
                    BATTERIA: <a>{item.battery}</a>
                  </p>
                  <button onClick={() => handleRemoveItemBike(item.id)}>
                    RIMUOVI
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {isStazioniOpen && (
          <div className="stazioni">
            <h1> STAZIONI </h1>
            <ul>
              {stazioni.map((item) => (
                <li key={item.id}>
                  <p>
                    NOME: <a>{item.name}</a>
                  </p>
                  <p>
                    LATITUDINE: <a>{item.lat}</a>
                  </p>
                  <p>
                    LONGITUDINE: <a>{item.lng}</a>
                  </p>
                  <p>N. BICICLETTE:</p>
                  <a>{item.bikes.length}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {isTicketOpen && (
          <div className="ticket">
            <h1> TICKET </h1>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={ticket}
                columns={colonneTicket}
                pageSize={5}
                checkboxSelection
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
