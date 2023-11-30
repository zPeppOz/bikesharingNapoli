import React, { useEffect, useRef, useState } from "react";
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
import biciclette from "./data/biciclette.json";
import stazioni from "./data/stazioni.json";
import PedalBikeIcon from "@mui/icons-material/PedalBikeRounded.js";
import { FaUser } from "react-icons/fa";

import "./css/MainApp.css";
import { Button } from "@mui/material";
// import Marker from "./components/Marker.jsx";

import "./css/MainApp.css";
import { BottomDiv } from "./components/BottomDiv.jsx";
import ShowMarkers from "./components/ShowMarkers.jsx";

export default function MainApp(props) {
  // Stato per gestire la visibilità del menu
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
  const [isBottomDivOpen, setBottomDivOpen] = useState(false);

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
    setSelected(marker);
  };

  const handleMarkerClose = () => {
    setSelected(null);
  };

  const bikeIcon = new L.DivIcon(
    {
      html: (
        <p>
          <PedalBikeIcon />
        </p>
      ),
    },
    { className: "bike-icon" }
  );

  return (
    <div className="h-screen w-screen overflow-hidden">
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
        />
        {stazioni.map((stazione) => {
          return (
            <Marker position={[stazione.lat, stazione.lng]} icon={bikeIcon}>
              <Popup>{stazione.id}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <button
        className="absolute left-5 top-5 z-auto mx-auto h-12 w-12 rounded-full border border-blue-200 bg-slate-200 p-2 shadow-md"
        onClick={toggleMenu}
      >
        <FaUser style={{ fontSize: "24px", marginRight: "8px" }} />
      </button>
      {/* <MapProvider>
        <Map
          zoom={5}
          center={center}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId={"2793768722fef41"}
        >
          {stazioni
            .filter((s) => s.isVisible === true)
            .map((stazione) => {
              return (
                <MarkerInfo
                  stazione={stazione}
                  handleCloseStationInfoWindow={handleCloseStationInfoWindow}
                  isOpen={selected === stazione.id}
                  click={() => {
                    if (!BottomDiv) {
                      toggleBottomDiv();
                    }
                    setCenterPosition({ lat: stazione.lat, lng: stazione.lng });
                    setTimeout(() => {
                      handleMarkerClick(stazione.id);
                    }, 100);
                  }}
                />
              );
            })}
        </Map>
      </MapProvider> */}

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

// function MarkerInfo({ stazione, handleCloseStationInfoWindow, isOpen, click }) {
//   const [markerRef, marker] = useMarkerRef();
//   const [isInfoWindowOpen, setInfoWindowOpen] = useState(false);

//   useEffect(() => {
//     if (isOpen) {
//       setInfoWindowOpen(true);
//       console.log(stazione.id + " aperto");
//     }
//     if (!isOpen) {
//       setInfoWindowOpen(false);
//       console.log(stazione.id + " chiuso");
//     }
//   }, [isOpen]);

//   useEffect(() => {
//     return () => {
//       setInfoWindowOpen(false);
//     };
//   }, []);

//   const closeInfoWindow = () => {
//     setInfoWindowOpen(false);
//   };
//   console.log(marker, markerRef);
//   return (
//     <AdvancedMarker
//       key={stazione.id}
//       ref={markerRef}
//       position={{
//         lat: stazione.lat,
//         lng: stazione.lng,
//       }}
//       onClick={() => {
//         click();
//       }}
//     >
//       {/* {isInfoWindowOpen && (
//         <InfoWindow
//           anchor={marker}
//           onCloseClick={() => {
//             closeInfoWindow();
//           }}
//         >
//           <div className="flex">
//             <p>
//               Biciclette disponibili:{" "}
//               {
//                 stazione.bikes.filter((b) => {
//                   return b.isReserved === false;
//                 }).length
//               }
//             </p>
//           </div>
//         </InfoWindow>
//       )} */}
//       <p className="h-fit w-fit rounded-full border border-black p-1 ">
//         <PedalBikeIcon viewBox="0 0 23 23" />
//       </p>
//     </AdvancedMarker>
//   );
// }
