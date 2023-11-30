import React, { useEffect, useState } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

export default function Marker(props) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);

  // useEffect(() => {
  //   if (props.isOpen) {
  //     setIsInfoWindowOpen(true);
  //   }
  //   if (!props.isOpen) {
  //     setIsInfoWindowOpen(false);
  //   }
  // }, [props.isOpen]);

  console.log(props.isOpen, props.markerProps.key);

  console.log(props.children);

  return (
    <>
      <AdvancedMarker
        {...props.markerProps}
        ref={markerRef}
        position={props.position}
        onClick={() => {
          // setIsInfoWindowOpen(!isInfoWindowOpen);
          props.onClick();
        }}
      >
        <Pin {...props.pinProps} />
        {props.isOpen && (
          <InfoWindow anchor={marker} onCloseClick={props.closeInfoWindow}>
            {props.children}
          </InfoWindow>
        )}
      </AdvancedMarker>
      {/* <AdvancedMarker
        {...props.markerProps}
        ref={markerRef}
        position={props.position}
        onClick={props.onClick}
      >
        <Pin {...props.pinProps} />
        {props.isInfoWindowOpen && (
          <InfoWindow anchor={marker} onCloseClick={props.closeInfoWindow}>
            {props.children}
          </InfoWindow>
        )}
      </AdvancedMarker> */}
    </>
  );
}
