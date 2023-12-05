import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import L from "leaflet";
import Map from "./components/Map.jsx";
import { MapContainer } from "react-leaflet";

import biciclette from "./data/biciclette.json";
import stazioni from "./data/stazioni.json";
import PedalBikeIcon from "@mui/icons-material/PedalBikeRounded.js";
import { FaUser } from "react-icons/fa";
import SectionMenu from "./components/SectionMenu.jsx";

import "./css/MainApp.css";
import { Button, SvgIcon } from "@mui/material";
// import Marker from "./components/Marker.jsx";

import "./css/MainApp.css";
import ShowMarkers from "./components/ShowMarkers.jsx";
import { InfoDiv } from "./components/InfoDiv.jsx";

export default function MainApp(props) {
  const menuSections = [
    {
      id: 1,
      label: "Home",
      data: ["Dati 1", "Dati 2", "Dati 3", "Dati 4", "Dati 5"],
    },

    {
      id: 2,
      label: "About Us",
      data: ["Dati A", "Dati B", "Dati C"],
    },
    {
      id: 3,
      label: "Services",
      data: ["Servizio 1", "Servizio 2", "Servizio 3"],
    },
    {
      id: 4,
      label: "Portfolio",
      data: ["Progetto A", "Progetto B", "Progetto C"],
    },
    {
      id: 5,
      label: "Contact",
      data: ["Contatto 1", "Contatto 2", "Contatto 3"],
    },
    // Aggiungi altre sezioni del menu come necessario
  ];

  //variabile per la lvisualizzazione del SectionMenu
  const [isSectionMenuOpen, setSectionMenuOpen] = useState(false);

  //finzione per gestire la visibilità del SectionMenu
  const toggleSectionMenu = () => {
    setSectionMenuOpen(true);
  };

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

  const [isSectionIndex, setSectionIndex] = useState(0);

  const [isBottomDivOpen, setBottomDivOpen] = useState(false);
  const [bottomDivData, setBottomDivData] = useState(null);

  //variabile contatore per capire se un marker è stato cliccato
  const [isMarkerClicked, setMarkerClicked] = useState(0);

  const toggleBottomDiv = () => {
    //se è aperto lo chiude
    if (isMarkerClicked === 0) {
      setMarkerClicked(1);
      setBottomDivOpen(true);
    }
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

      <button
        className="absolute left-5 top-5 z-auto mx-auto h-12 w-12 rounded-full border border-blue-200 bg-slate-200 p-2 shadow-md"
        onClick={toggleMenu}
      >
        <FaUser style={{ fontSize: "24px", marginRight: "8px" }} />
      </button>

      {isMenuOpen && (
        <div className="hamburger">
          <ul id="menu">
            {menuSections.map((section, index) => (
              <li key={section.id}>
                <a
                  onClick={() => {
                    //chiude il menu
                    toggleMenu();
                    toggleSectionMenu();
                    setSectionIndex(index);
                  }}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {isSectionMenuOpen && <SectionMenu data={menuSections[i].data} />}
    </div>
  );
}
