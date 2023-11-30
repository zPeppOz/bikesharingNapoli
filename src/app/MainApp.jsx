import React, { useState } from "react";
import MapProvider from "./components/Map.jsx";
import { Map } from "@vis.gl/react-google-maps";
import biciclette from "./data/biciclette.json";
import stazioni from "./data/stazioni.json";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import { FaUser } from "react-icons/fa";
import { InfoWindow } from "@vis.gl/react-google-maps";
import SectionMenu from "./components/SectionMenu.jsx";
import "./css/MainApp.css";
import { Button } from "@mui/material";
import Marker from "./components/Marker.jsx";

import "./css/MainApp.css";
import { BottomDiv } from "./components/BottomDiv.jsx";
import { ControlPointDuplicate } from "@mui/icons-material";

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

  const [selectedBack, setSelectedBack] = useState(false);

  const toggleBack = () => {
    setSelectedBack(!selectedBack);
    setSelectedSection(false);
    setMenuOpen(true);
  };

  const [selectedSection, setSelectedSection] = useState(null);

  const handleSectionClick = (section) => {
    console.log("Clicked section:", section);
    setSelectedSection(section);
    setSelectedBack(true);
  };

  // Stato per gestire la visibilità del menu
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [center, setCenter] = useState({ lat: 22.54992, lng: 0 });
  // Funzione per gestire il clic sul bottone e cambiare la visibilità del menu

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  //variabile di stato per aprire la finestra delle stazioni
  const [isStazioniOpen, setStazioniOpen] = useState(false);

  //funzione per gestire la visibilità delle stazioni

  //variaible di stato per la finestra home
  const [isHomeOpen, setHomeOpen] = useState(false);

  //funzione per gestire la visibilità della finestra home
  const toggleHome = () => {
    setHomeOpen(!isHomeOpen);
  };
  const [isBottomDivOpen, setBottomDivOpen] = useState(false);

  //funzione per gestire la visibilità della finestra bottom
  const showBottomDiv = (position) => {
    setBottomDivOpen(true);
    setCenter(position);
  };

  //funzione per chiude le finestre al click sulla mappa
  const handleMapClick = () => {
    //chiude il menu e la home se sono aperti
    if (isMenuOpen) {
      toggleMenu(false);
    }
    if (isHomeOpen) {
      toggleHome(false);
    }
    if (isBottomDivOpen) {
      setBottomDivOpen(false);
    }
    if (isStazioniOpen) {
      setStazioniOpen(false);
    }

    if (selectedBack) {
      setSelectedBack(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <MapProvider>
        <Map
          zoom={5}
          center={center}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId={"2793768722fef41"}
          onClick={handleMapClick}
        ></Map>

        <div>
          <button className="buttonMenu" onClick={toggleMenu}>
            <FaUser style={{ fontSize: "24px", marginRight: "8px" }} />
          </button>

          {selectedBack && (
            <button className="buttonSection" onClick={toggleBack}>
              <img src="https://img.icons8.com/ios-filled/50/000000/undo.png" />
            </button>
          )}
        </div>

        {isMenuOpen && (
          <div className="hamburger">
            <ul id="menu">
              {menuSections.map((section) => (
                <li key={section.id}>
                  <a onClick={() => handleSectionClick()}>{section.label}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Rendi condizionalmente SectionMenu */}
        {selectedSection && <SectionMenu data={selectedSection.data} />}
      </MapProvider>
    </div>
  );
}
