import { useState, useEffect, useCallBack } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";

export default function MapProvider({ children }) {
  return (
    <APIProvider apiKey="AIzaSyDVjNJ-hbplvSejenb2HvTNE5ZLQ-UlPFM">
      {children}
    </APIProvider>
  );
}
