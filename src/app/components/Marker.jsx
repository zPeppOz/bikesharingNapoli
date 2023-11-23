import React, { useState } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

export default function Marker(props) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [isInfoWindowOpen, setInfoWindowOpen] = useState(false);

  const toggleInfoWindow = () => {
    setInfoWindowOpen(!isInfoWindowOpen);
    props.onClick();
  };

  const closeInfoWindow = () => {
    setInfoWindowOpen(false);
  };
  console.log(props);

  return (
    <>
      <AdvancedMarker
        {...props.markerProps}
        ref={markerRef}
        position={props.position}
        onClick={toggleInfoWindow}
      >
        <Pin {...props.pinProps} />
        {isInfoWindowOpen && (
          <InfoWindow anchor={marker} onCloseClick={closeInfoWindow}>
            <div>{props.children}</div>
          </InfoWindow>
        )}
      </AdvancedMarker>
    </>
  );
}

const pinStyle = {
  background: "red",
};
