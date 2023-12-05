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

  return (
    <div className="flex flex-col items-stretch justify-between">
      <div className="flex flex-col items-start justify-start">
        <p className=" text-2xl font-semibold">NAPOLI-{selected.id}</p>
        <p className="inline-flex flex-row">
          {selected.battery * 100 < 20 ? (
            <>
              <Battery2BarSharp className="rotate-90 text-red-500" />
              <span className="text-red-500">{selected.battery}%</span>
            </>
          ) : selected.battery < 60 ? (
            <>
              <Battery6BarSharp className="rotate-90 text-yellow-500" />
              <span className="text-yellow-500">{selected.battery}%</span>
            </>
          ) : (
            <>
              <BatteryFullSharp className="rotate-90 text-green-500" />
              <span className="text-green-500">{selected.battery}%</span>
            </>
          )}
        </p>
      </div>
      <div className="flex flex-col items-end justify-end">
        {/* icona bici */}
      </div>
    </div>
  );
}
