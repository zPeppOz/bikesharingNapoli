import { useEffect, useState } from "react";
import Marker from "./Marker";

export default function ShowMarkers(props) {
  const [selected, setSelected] = useState(null);

  const handleMarkerClick = (marker) => {
    setSelected(marker);
  };

  const handleMarkerClose = () => {
    setSelected(null);
  };

  useEffect(() => {}, [selected]);

  return (
    <>
      {props.data.map((m) => {
        console.log(m);
        return (
          <>
            <Marker
              markerProps={{
                key: m.id,
              }}
              position={{
                lat: m.lastLat || m.lat,
                lng: m.lastLong || m.lng,
              }}
              pinProps={props.type === "biciclette" ? biciStyle : stazioniStyle}
              isOpen={selected === m.id}
              onClick={() => {
                handleMarkerClick(m.id);
                props.showBottomDiv({
                  lat: m.lastLat || m.lat,
                  lng: m.lastLong || m.lng,
                });
              }}
              closeInfoWindow={() => {
                handleMarkerClose();
                props.hideBottomDiv();
              }}
            >
              <p>{m.id}</p>
            </Marker>
          </>
        );
      })}
    </>
  );
}

const biciStyle = {};

const stazioniStyle = {
  background: "#FBBC04",
  glyphColor: "#000",
  borderColor: "#000",
};
