import React, { useState } from "react";
import MapProvider from "./components/Map.jsx";
import { Map } from "@vis.gl/react-google-maps";
import biciclette from "./data/biciclette.json";
import stazioni from "./data/stazioni.json";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import { FaUser } from "react-icons/fa";
import { InfoWindow } from "@vis.gl/react-google-maps";

import "./css/MainApp.css";
import { Button } from "@mui/material";
import Marker from "./components/Marker.jsx";

import "./css/MainApp.css";
import { BottomDiv } from "./components/BottomDiv.jsx";

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

  const handleCloseStationInfoWindow = () => {
    setSelectedStation(null);
  };

  //variaible di stato per la finestra home
  const [isHomeOpen, setHomeOpen] = useState(false);

  //funzione per gestire la visibilità della finestra home
  const toggleHome = () => {
    setHomeOpen(!isHomeOpen);
  const [isBottomDivOpen, setBottomDivOpen] = useState(false);

  const showBottomDiv = () => {
    setBottomDivOpen(!isBottomDivOpen);
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <MapProvider>
        <Map
          zoom={5}
          center={{ lat: 22.54992, lng: 0 }}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId={"2793768722fef41"}
        >
          {biciclette
            .filter((b) => {
              return b.isVisible === true;
            })
            .map((bicicletta) => {
              return (
                <Marker
                  markerProps={{
                    key: bicicletta.id,
                  }}
                  icon={{
                    url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                  }}
                  position={{
                    lat: bicicletta.lastLat,
                    lng: bicicletta.lastLong,
                  }}
                  pinProps={
                    {
                      // glyph: <PedalBikeIcon />,
                    }
                  }
                >
                  <p>{bicicletta.id}</p>
                </Marker>
              );
            })}

          {stazioni
            .filter((stazione) => stazione.isVisible === true)
            .map((stazione) => {
              return (
                <Marker
                  markerProps={{
                    key: stazione.id,
                  }}
                  position={{
                    lat: stazione.lat,
                    lng: stazione.lng,
                  }}
                  pinProps={{
                    // glyph: <PedalBikeIcon />,
                    background: "#FBBC04",
                    glyphColor: "#000",

                    borderColor: "#000",
                  }}
                  onClick={showBottomDiv}
                >
                  <h2>
                    Numero biciclette:{" "}
                    {
                      stazione.bikes.filter((b) => {
                        return b.isReserved === false;
                      }).length
                    }
                  </h2>
                </Marker>
              );
            })}
        </Map>

        <BottomDiv isOpen={isBottomDivOpen}>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-3xl">
                Biciclette disponibili:{" "}
                {
                  biciclette.filter((b) => {
                    return b.isVisible === true;
                  }).length
                }
              </p>
              <p className="text-3xl">
                Stazioni:{" "}
                {
                  stazioni.filter((s) => {
                    return s.isVisible === true;
                  }).length
                }
              </p>
            </div>
          </div>
        </BottomDiv>

        <button
          className="absolute left-5 top-5 mx-auto h-12 w-12 rounded-full border border-blue-200 bg-slate-200 p-2 shadow-md"
          onClick={toggleMenu}
        >
          <FaUser style={{ fontSize: "24px", marginRight: "8px" }} />
        </button>

        {isMenuOpen && (
          <div className="hamburger">
            <ul id="menu">
              <li>
                <a
                  onClick={() => {
                    toggleMenu();
                    toggleHome();
                  }}
                >
                  Home
                </a>
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

        {isHomeOpen && (
          <div className="home absolute">
            <ul id="menu">
              <button
                id="back"
                onClick={() => {
                  toggleMenu();
                  toggleHome();
                }}
              >
                INDIETRO
              </button>
              <li>dati</li>
              <li>dati 2</li>
              <li>dati</li>
              <li>dati 2</li>
            </ul>
          </div>
        )}
      </MapProvider>
    </div>
  );
}
