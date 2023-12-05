import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import L from "leaflet";
import Map from "./components/Map.jsx";
import { MapContainer } from "react-leaflet";

import biciclette from "./data/biciclette.json";
import stazioni from "./data/stazioni.json";
import PedalBikeIcon from "@mui/icons-material/PedalBikeRounded.js";
import { FaUser } from "react-icons/fa";

import "./css/MainApp.css";
import { Button, SvgIcon } from "@mui/material";
// import Marker from "./components/Marker.jsx";

import "./css/MainApp.css";
import ShowMarkers from "./components/ShowMarkers.jsx";
import { InfoDiv } from "./components/InfoDiv.jsx";

export default function MainApp(props) {
  // Stato per gestire la visibilità del menu
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [center, setCenter] = useState([40.8517746, 14.2681244]);
  // Funzione per gestire il clic sul bottone e cambiare la visibilità del menu
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  //variaible di stato per la finestra home
  const [isHomeOpen, setHomeOpen] = useState(false);

  //funzione per gestire la visibilità della finestra home
  const toggleHome = () => {
    setHomeOpen(!isHomeOpen);
  };
  const [isBottomDivOpen, setBottomDivOpen] = useState(false);
  const [bottomDivData, setBottomDivData] = useState(null);

  const toggleBottomDiv = () => {
    setBottomDivOpen(!isBottomDivOpen);
  };

  const setCenterPosition = (position) => {
    setCenter(position);
  };

  const hideBottomDiv = () => {
    setBottomDivOpen(false);
  };

  const [selected, setSelected] = useState(null);

  const handleMarkerClick = (marker) => {
    // se il marker cliccato è diverso da quello selezionato e la finestra è aperta, cambia il marker selezionato e
    if (selected !== marker && isBottomDivOpen) {
      setSelected(marker);
    }
    // se il marker cliccato è uguale a quello selezionato e la finestra è aperta, chiudi la finestra
    else if (selected === marker && isBottomDivOpen) {
      setSelected(null);
      toggleBottomDiv();
    }
    // se il marker cliccato è diverso da quello selezionato e la finestra è chiusa, apri la finestra
    else if (selected !== marker && !isBottomDivOpen) {
      setSelected(marker);
      toggleBottomDiv();
    }
  };

  const handleMarkerClose = () => {
    setSelected(null);
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <MapContainer
        center={center}
        zoom={13}
        className=" h-full w-full"
        touchZoom={true}
        zoomControl={false}
        scrollWheelZoom={true}
      >
        <Map
          stazioni={stazioni}
          biciclette={biciclette}
          handlers={{
            handleMarkerClick,
            handleMarkerClose,
            toggleBottomDiv,
            hideBottomDiv,
            setSelected,
          }}
        />
      </MapContainer>

      <button
        className="absolute left-5 top-5 z-auto mx-auto h-12 w-12 rounded-full border border-blue-200 bg-slate-200 p-2 shadow-md"
        onClick={toggleMenu}
      >
        <FaUser style={{ fontSize: "24px", marginRight: "8px" }} />
      </button>

      <InfoDiv isBottomDivOpen={isBottomDivOpen} selected={selected} />

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
    </div>
  );
}
