import React, { useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import L from "leaflet";
import Map from "./components/Map.jsx";
import { MapContainer } from "react-leaflet";
import { GlobalContext } from "../providers/GlobalContext.jsx";
// import biciclette from "./data/biciclette.json";
// import stazioni from "./data/stazioni.json";
import PedalBikeIcon from "@mui/icons-material/PedalBikeRounded.js";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { FaUser } from "react-icons/fa";
import SectionMenu from "./components/SectionMenu.jsx";

import "./css/MainApp.css";
import { Button, SvgIcon } from "@mui/material";
// import Marker from "./components/Marker.jsx";

import "./css/MainApp.css";
import ShowMarkers from "./components/ShowMarkers.jsx";
import { InfoDiv } from "./components/InfoDiv.jsx";

export default function MainApp(props) {
  const { biciclette, stazioni } = useContext(GlobalContext);
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

  const toggleBottomDiv = () => {
    setBottomDivOpen(!isBottomDivOpen);
  };

  const setCenterPosition = (position) => {
    setCenter(position);
  };

  const hideBottomDiv = () => {
    setBottomDivOpen(false);
  };
  const showBottomDiv = () => {
    setBottomDivOpen(true);
  };

  const [selected, setSelected] = useState(null);

  const handleMarkerClick = (marker) => {
    console.log(selected, marker);
    if (selected === marker) {
      setSelected(null);
      hideBottomDiv();
      return;
    }
    setSelected(marker);
    !isBottomDivOpen && showBottomDiv();
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
        attributionControl={false}
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

      <InfoDiv isBottomDivOpen={isBottomDivOpen} selected={selected} />
      <div className="h-full w-fit ">
        <button
          className="absolute left-5 top-5 z-50 mx-auto h-12 w-12 rounded-full border border-blue-200 bg-slate-200 p-2 shadow-md"
          onClick={toggleMenu}
        >
          <FaUser style={{ fontSize: "24px", marginRight: "8px" }} />
        </button>
        {isMenuOpen && (
          <div className="absolute left-0 top-0 flex h-full w-fit !min-w-[20rem] flex-col items-start justify-start bg-white px-4 py-4">
            <div className="ml-16 mt-1 flex w-full flex-row items-center justify-between align-baseline">
              <p className="mt-1">Ciao </p>
              <div className=" mr-16 flex flex-col items-center justify-center rounded-full border bg-slate-200 p-2 shadow-md">
                <div className="absolute mb-7 ml-7 h-5 w-5 items-center rounded-full border bg-red-500">
                  <p className="ap-px text-center text-xs font-extralight text-white">
                    3
                  </p>
                </div>
                <NotificationsNoneIcon
                  style={{
                    fontSize: "24px",
                  }}
                />
              </div>
            </div>
            <div className="ml-2 mt-16 flex flex-col items-start justify-start gap-6">
              {/* <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p>
              <p>Test</p> */}
              {menuSections.map((section, index) => (
                <div
                  key={section.id}
                  className=" flex flex-row items-center justify-start"
                >
                  <button
                    onClick={() => {
                      //chiude il menu
                      toggleMenu();
                      toggleSectionMenu();
                      setSectionIndex(index);
                    }}
                    className="flex flex-row items-center justify-start"
                  >
                    <p className="text-lg font-semibold ">{section.label}</p>
                  </button>
                </div>
              ))}

              {isSectionMenuOpen && <SectionMenu data={menuSections[i].data} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
