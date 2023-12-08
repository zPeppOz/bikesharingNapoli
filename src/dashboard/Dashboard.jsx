import React from "react";
import { MapContainer } from "react-leaflet";

export default function Dashbord() {
  return (
    <div className="dashboard-container">
      {/* Sidebar/Menu */}
      <div className="sidebar">
        <ul>
          <li>Biciclette</li>
          <li>Stazioni</li>
          <li>Ticket</li>
          {/* Aggiungi altri elementi del menu secondo le tue esigenze */}
        </ul>
      </div>

      {/* Contenuto principale */}
      <div className="main-content">
        <h1>Main Content Area</h1>
        {/* Aggiungi il tuo contenuto principale qui */}
      </div>
    </div>
  );
}
