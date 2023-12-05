import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import L from "leaflet";
import {
  Map,
  AdvancedMarker,
  InfoWindow,
  Pin,
  useMarkerRef,
} from "@vis.gl/react-google-maps";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ImageOverlay,
} from "react-leaflet";
import bikeSVG from "../assets/bike.svg";
import station from "../assets/ev-station.svg";
import biciclette from "./data/biciclette.json";
import stazioni from "./data/stazioni.json";
import PedalBikeIcon from "@mui/icons-material/PedalBikeRounded.js";
import { FaUser } from "react-icons/fa";
import SectionMenu from "./components/SectionMenu.jsx";

import "./css/MainApp.css";
import { Button, SvgIcon } from "@mui/material";
// import Marker from "./components/Marker.jsx";

import "./css/MainApp.css";
import { BottomDiv } from "./components/BottomDiv.jsx";
import ShowMarkers from "./components/ShowMarkers.jsx";

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
  const [center, setCenter] = useState([22.54992, -3]);
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

  const handleCloseStationInfoWindow = () => {};

  //variaible di stato per la finestra home
  const [isHomeOpen, setHomeOpen] = useState(false);

  //funzione per gestire la visibilità della finestra home
  const toggleHome = () => {
    setHomeOpen(!isHomeOpen);
  };

  const [isSectionIndex, setSectionIndex] = useState(0);

  const [isBottomDivOpen, setBottomDivOpen] = useState(false);

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
    setSelected(marker);
  };

  const handleMarkerClose = () => {
    setSelected(null);
  };

  const bikeIcon = L.divIcon({
    html: '<img src="' + bikeSVG + '"  />',
    iconSize: [40, 40],
    className: "border rounded-full p-1 border-black !w-12 !h-12 bg-white ",
  });

  const stationIcon = L.divIcon({
    html: '<img src="' + station + '"  />',
    iconSize: [40, 40],
    className: "border rounded-full p-1 border-black !w-12 !h-12 bg-green-300 ",
  });

  return (
    <div className="h-screen w-screen overflow-hidden">
      {isLoading && (
        <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-white">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
        </div>
      )}
      <MapContainer
        center={center}
        zoom={5}
        className=" h-full w-full"
        touchZoom={true}
        zoomControl={false}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          zIndex={0}
          eventHandlers={{
            load: () => {
              setIsLoading(false);
            },
          }}
        />
        {stazioni.map((stazione) => {
          return (
            <Marker
              position={[stazione.lat, stazione.lng]}
              icon={stationIcon}
              eventHandlers={{
                click: () => {
                  handleMarkerClick(stazione);
                  toggleBottomDiv();
                },
              }}
            >
              <Popup>{stazione.id}</Popup>
            </Marker>
          );
        })}
        {biciclette.map((bicicletta) => {
          return (
            <Marker
              position={[bicicletta.lastLat, bicicletta.lastLong]}
              icon={bikeIcon}
            >
              <Popup>{bicicletta.id}</Popup>
            </Marker>
          );
        })}
      </MapContainer>

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
