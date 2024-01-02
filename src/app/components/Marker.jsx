import React, { useState, useEffect } from "react";
import L from "leaflet";
import { Marker, Popup, useMapEvents, useMap, Circle } from "react-leaflet";

export default function MapMarker({ obj, eventHandlers, icon }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (obj) {
      setIsLoading(false);
    }
  }, [obj]);

  if (isLoading) {
    return null;
  }

  return (
    <>
    
      <Marker
        position={[obj.lat, obj.lng]}
        icon={icon}
        eventHandlers={eventHandlers}
      >
        <Popup>{obj.id}</Popup>
        <Circle
          center={[obj.lat, obj.lng]}
          radius={30}
          color={obj.battery ? "#2596be" : "#38E443"}
        />
      </Marker>
    </>
  );
}
