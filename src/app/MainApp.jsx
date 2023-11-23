import React, { useState } from "react";
import MapProvider from "./components/Map.jsx";
import { Map, Marker } from "@vis.gl/react-google-maps";
import biciclette from "./data/biciclette.json";
import stazioni from "./data/stazioni.json";
import { FaUser } from "react-icons/fa";

import "./css/MainApp.css";

export default function MainApp(props) {
  // Stato per gestire la visibilità del menu
  const [isMenuOpen, setMenuOpen] = useState(false);

  // Funzione per gestire il clic sul bottone e cambiare la visibilità del menu
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  //variabile di stato per aprire la finestra delle stazioni
  const [isStazioniOpen, setStazioniOpen] = useState(false);

  //funzione per gestire la visibilità delle stazioni
  const toggleStazioni = () => {
    setStazioniOpen(!isStazioniOpen);
  };

  return (
    <div className="h-screen w-screen">
      <MapProvider>
        <Map
          zoom={5}
          center={{ lat: 22.54992, lng: 0 }}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          {biciclette
            .filter((b) => {
              return b.isVisible === true;
            })
            .map((bicicletta) => {
              return (
                <Marker
                  key={bicicletta.id}
                  position={{
                    lat: bicicletta.lastLat,
                    lng: bicicletta.lastLong,
                  }}
                  icon={{
                    url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                  }}
                />
              );
            })}

          {stazioni
            .filter((stazione) => stazione.isVisible === true)
            .map((stazione) => (
              <div>
                <Marker
                  className="stazioni"
                  key={stazione.id}
                  position={{
                    lat: stazione.lat,
                    lng: stazione.lng,
                  }}
                  title={stazione.nome}
                  //colore marker
                  icon={{
                    url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  }}
                  onClick={toggleStazioni}
                ></Marker>
              </div>
            ))}
        </Map>

        <div className="absolute bottom-0 left-0 right-0 mx-auto mb-4 h-1/4 w-2/3 rounded-lg border border-blue-200 bg-slate-200 p-2 shadow-md"></div>

        <button
          className="absolute left-5 top-5 mx-auto h-12 w-12 rounded-full border border-blue-200 bg-slate-200 p-2 shadow-md"
          onClick={toggleMenu}
        >
          <FaUser style={{ fontSize: "24px", marginRight: "8px" }} />
        </button>

        {isStazioniOpen && (
          <div className="stazioni absolute">
            <ul className="absolute">
              <li>
                <a> biciclette disponibli %D</a>
              </li>
            </ul>
          </div>
        )}

        {isMenuOpen && (
          <div className="hamburger">
            <ul id="menu">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Portfolio</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        )}
      </MapProvider>
    </div>
  );
}
