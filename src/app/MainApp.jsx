import React from "react";
import MapProvider from "./components/Map.jsx";
import { Map, Marker } from "@vis.gl/react-google-maps";
import biciclette from "./data/biciclette.json";
import stazioni from "./data/stazioni.json";

export default function MainApp(props) {
  return (
    <div className="h-screen w-screen">
      <MapProvider>
        <Map
          zoom={3}
          center={{ lat: 22.54992, lng: 0 }}
          gestureHandling={"greedy"}
          disableDefaultUI={false}
        >
          {/* {biciclette
            .filter((b) => {
              return b.isVisible === true;
            })
            .map((bicicletta) => {
              return (
                <Marker
                  position={{
                    lat: bicicletta.lastLat,
                    lng: bicicletta.lastLong,
                  }}
                />
              );
            })} */}
          {stazioni.map((stazione) => {
            return (
              <Marker
                position={{
                  lat: stazione.lat,
                  lng: stazione.long,
                }}
                title={stazione.nome}
              />
            );
          })}
        </Map>
      </MapProvider>
      {/* <div className="absolute bottom-0 left-0 right-0 mx-auto mb-4 h-1/4 w-2/3 rounded-lg border border-blue-200 bg-slate-200 p-2 shadow-md"></div>
      <div className="absolute left-5 top-5 mx-auto h-12 w-12 rounded-full border border-blue-200 bg-slate-200 p-2 shadow-md"></div>
      <div className="absolute bottom-5 right-5 mx-auto h-12 w-12 rounded-full border border-blue-200 bg-slate-200 p-2 shadow-md"></div> */}
    </div>
  );
}
