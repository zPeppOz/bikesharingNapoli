import React from "react";
import MapProvider from "./components/Map.jsx";
import { Map } from "@vis.gl/react-google-maps";

export default function MainApp(props) {
  return (
    <div className="h-screen w-screen">
      <MapProvider>
        <Map
          zoom={3}
          center={{ lat: 22.54992, lng: 0 }}
          gestureHandling={"greedy"}
          disableDefaultUI={false}
        />
      </MapProvider>
    </div>
  );
}
