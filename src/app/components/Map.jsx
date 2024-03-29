import { useState, useEffect } from "react";
import {
  Marker,
  Popup,
  useMapEvents,
  useMap,
  TileLayer,
  Circle,
} from "react-leaflet";
import L from "leaflet";
import bikeSVG from "../../assets/bike.svg";
import station from "../../assets/ev-station.svg";
import { Bounds } from "leaflet";
import MapMarker from "./Marker";

export default function Map({ biciclette, stazioni, handlers }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const map = useMap();

  const events = useMapEvents({
    load: (e) => {
      !isLoading && map.locate();
    },
    click: (e) => {
      handlers.setSelected(null);
      handlers.hideBottomDiv();
      handlers.toggleMenu(false);
    },
  });

  useEffect(() => {
    if (!isLoading) {
      map.locate({ setView: true, maxZoom: 16 }).on("locationfound", (e) => {
        setUserLocation(e.latlng); // Aggiorna lo stato con la posizione dell'utente
        map.flyTo(e.latlng, 16); // Zooma sulla posizione dell'utente
      });
    }
  }, [isLoading, map]);

  useEffect(() => {
    if (biciclette && stazioni) {
      setIsLoading(false);
    }
  }, [biciclette, stazioni]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        zIndex={0}
      />
      {userLocation && (
        <Marker position={userLocation} icon={userLocationIcon}></Marker>
      )}
      {stazioni.map((stazione) => {
        return (
          <MapMarker
            obj={stazione}
            eventHandlers={{
              click: () => {
                handlers.handleMarkerClick(stazione);
              },
              dblclick: () => {
                map.setView([stazione.lat, stazione.lng], 25);
                // map.invalidateSize();
              },
            }}
            icon={stationIcon}
          />
        );
      })}
      {biciclette
        // .filter((el) => el.isVisible === true)
        ?.map((bicicletta) => {
          return (
            <MapMarker
              obj={{
                lat: bicicletta.lastLat,
                lng: bicicletta.lastLong,
                ...bicicletta,
              }}
              eventHandlers={{
                click: () => {
                  handlers.handleMarkerClick(bicicletta);
                },
                dblclick: () => {
                  map.setView([bicicletta.lastLat, bicicletta.lastLong], 25);
                  // map.invalidateSize();
                },
              }}
              icon={bikeIcon}
            />
          );
        })}
    </>
  );
}

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

const userLocationIcon = L.divIcon({
  html: '<div style="background-color: #007bff; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>',
  className: "",
  iconSize: [12, 12],
});
