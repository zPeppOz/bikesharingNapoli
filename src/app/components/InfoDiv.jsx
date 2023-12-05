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

function BikeInfo({ selected }) {
  useEffect(() => {
    selected.battery = selected.battery * 100;
    console.log(selected.battery);
  });

  return (
    <div className="flex flex-col items-stretch justify-between">
      <div className="flex flex-col items-start justify-start">
        <p className=" text-2xl font-semibold">NAPOLI-{selected.id}</p>
        <p>
          {selected.battery * 100 < 20 ? (
            <span className="text-red-500">{selected.battery}%</span>
          ) : selected.battery < 60 ? (
            <span className="text-yellow-500">{selected.battery}%</span>
          ) : (
            <span className="text-green-500">{selected.battery}%</span>
          )}
        </p>
      </div>
      <div className="flex flex-col items-end justify-end">
        {/* icona bici */}
      </div>
    </div>
  );
}
