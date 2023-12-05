import React, { useEffect } from "react";
import { BottomDiv } from "./BottomDiv.jsx";

export function InfoDiv({ isBottomDivOpen, selected }) {
  return (
    <BottomDiv isOpen={isBottomDivOpen}>
      {selected?.bikes && <StationInfo selected={selected} />}
      {selected?.battery && <BikeInfo selected={selected} />}
    </BottomDiv>
  );
}

function StationInfo({ selected }) {
  return (
    <div className="flex flex-row items-stretch justify-between">
      <div className="flex flex-col items-start justify-start">
        <h2>{selected.id}</h2>
        <p>
          {
            selected?.bikes.filter((i) => {
              return i.isVisible === true;
            }).length
          }
        </p>
      </div>
    </div>
  );
}

import {
  Battery2BarSharp,
  Battery6BarSharp,
  BatteryFullSharp,
} from "@mui/icons-material";

function BikeInfo({ selected }) {
  useEffect(() => {
    if (selected.battery < 1) {
      selected.battery = selected.battery * 100;
    }

    return () => {};
  });

  const batteryIcon = (battery) => {
    if (battery < 1) {
      battery = battery * 100;
    }
    if (battery < 20) {
      return (
        <p className="inline-flex flex-row">
          <Battery2BarSharp className="rotate-90 text-red-500" />
          <span className="text-red-500">{battery}%</span>
        </p>
      );
    } else if (battery < 60) {
      return (
        <p className="inline-flex flex-row">
          <Battery6BarSharp className="rotate-90 text-yellow-500" />
          <span className="text-yellow-500">{battery}%</span>
        </p>
      );
    } else {
      return (
        <p className="ml-1 inline-flex scale-125 flex-row">
          <BatteryFullSharp className="rotate-90 text-green-500" />
          <span className="text-green-500">{battery}%</span>
        </p>
      );
    }
  };

  return (
    <div className="flex flex-col items-stretch justify-between">
      <div className="flex flex-col items-start justify-start">
        <p className=" text-2xl font-semibold">NAPOLI-{selected.id}</p>
        {batteryIcon(selected.battery)}
      </div>
      <div className="flex flex-col items-end justify-end">
        {/* icona bici */}
      </div>
    </div>
  );
}
