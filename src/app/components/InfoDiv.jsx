import React, { useEffect, useRef } from "react";
import { useState } from "react";
//importa css
import { BottomDiv } from "./BottomDiv.jsx";
import BikeIMG from "../../assets/bike_real.png";
import mastercard from "../../assets/mastercard-logo.svg";
import station from "../../assets/station2.png";
import PedalBikeIcon from "@mui/icons-material/PedalBikeRounded.js";
import {
  SvgIcon,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";

export function InfoDiv({ isBottomDivOpen, selected, handlers }) {
  const divRef = useRef();
  const isPhone = window.innerWidth < 768;
  useEffect(() => {
    if (isPhone) {
      if (isBottomDivOpen) {
        divRef.current.classList.add("mb-48");
        console.log("added mb-48");
      } else {
        divRef.current.classList.remove("mb-48");
        console.log("removed mb-48");
      }
    }
    console.log(isBottomDivOpen, isPhone);
  }, [isBottomDivOpen, isPhone]);

  return (
    <>
      <div
        ref={divRef}
        className={
          "absolute bottom-8 right-6 h-auto w-fit rounded-full border bg-slate-300 p-2 shadow-lg transition-all duration-500"
        }
      >
        <PedalBikeIcon style={{ fontSize: "32px" }} />
      </div>
      <BottomDiv isOpen={isBottomDivOpen}>
        {selected?.bikes && <StationInfo selected={selected} />}
        {selected?.battery && (
          <BikeInfo selected={selected} handlers={handlers} />
        )}
      </BottomDiv>
    </>
  );
}

function StationInfo({ selected }) {
  const { prenotaBicicletta, isBikeAvailable, isBikeReserved } =
    useBikeSharing();

  const batteryIcon = (battery) => {
    if (battery < 1) {
      battery = battery * 100;
      battery = Math.round(battery);
    }
    if (battery < 20) {
      return (
        <p className="inline-flex h-fit w-20 flex-row">
          <Battery1BarSharp className="rotate-90 text-red-500" />
          <span className="text-red-500">{battery}%</span>
        </p>
      );
    } else if (battery < 40) {
      return (
        <p className="inline-flex h-fit  flex-row">
          <Battery3BarSharp className="rotate-90 text-orange-500" />
          <span className="text-orange-500">{battery}%</span>
        </p>
      );
    } else if (battery < 60) {
      return (
        <p className="inline-flex h-fit  flex-row">
          <Battery5BarSharp className="rotate-90 text-yellow-500" />
          <span className="text-yellow-500">{battery}%</span>
        </p>
      );
    } else {
      return (
        <p className="inline-flex  flex-row">
          <Battery6BarSharp className="rotate-90 text-green-500" />
          <span className="text-green-500">{battery}%</span>
        </p>
      );
    }
  };

  return (
    <div className="flex flex-col items-stretch justify-between">
      <div className="flex w-full flex-row items-stretch justify-between ">
        <div className="flex flex-col items-start justify-start">
          <p className="text-2xl font-semibold">{selected.id.toUpperCase()}</p>
          <p>
            {
              selected?.bikes.filter((i) => {
                return i.isVisible === true;
              }).length
            }
            <span className="text-md font-light"> bici disponibili</span>
          </p>
        </div>
        <div className="-mt-4 flex flex-col items-end justify-end">
          <img
            src={station}
            className="h-auto w-24 object-contain object-top mix-blend-multiply md:w-28"
            alt="station"
          />
        </div>
      </div>
      <div className="flex max-h-28 !w-full flex-row items-start justify-start overflow-y-scroll ">
        <TableContainer className="w-full rounded-xl border ">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="!py-2 text-left">Bici</TableCell>
                <TableCell className="!py-2 text-left">Batteria</TableCell>
                <TableCell className="!py-2 text-left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selected?.bikes
                .filter((el) => el.isVisible === true)
                .sort((a, b) => {
                  return b.battery - a.battery;
                })
                .map((bike) => {
                  return (
                    <TableRow>
                      <TableCell className="!py-2 text-left">
                        NAPOLI-{bike.id}
                      </TableCell>
                      <TableCell className="!py-2 text-center">
                        <p className="mt-2">{batteryIcon(bike.battery)}</p>
                      </TableCell>
                      <TableCell className="!py-2 text-right">
                        <button
                          className={
                            "flex flex-row items-center justify-center rounded-xl border bg-green-500 p-2 " +
                            (bike.isReserved || !bike.isAvailable
                              ? "hover:bg-red-500"
                              : "hover:bg-green-600")
                          }
                          disabled={
                            bike.isReserved || !bike.isAvailable ? true : false
                          }
                          onClick={() => {
                            prenotaBicicletta(bike.id, 1);
                          }}
                        >
                          <p className="text-md ">Prenota</p>
                          <p className="text-sm "> Inizia corsa</p>
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Table className="w-12">
          <thead>
            <tr>
              <th className="text-left">Bici</th>
              <th className="text-left">Batteria</th>
            </tr>
          </thead>
          <tbody>
            {selected?.bikes
              .filter((el) => el.isVisible === true)
              .map((bike) => {
                return (
                  <tr>
                    <td className="text-left">{bike.id}</td>
                    <td className="text-left">
                      {bike.battery < 1
                        ? (bike.battery * 100).toFixed(0)
                        : bike.battery}
                      %
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table> */}
      </div>
    </div>
  );
}

import {
  Battery1BarSharp,
  Battery3BarSharp,
  Battery5BarSharp,
  Battery6BarSharp,
  ReportProblemSharp,
} from "@mui/icons-material";
import { useBikeSharing } from "../../hooks/ridesHook.jsx";

function BikeInfo({ selected, handlers }) {
  const { prenotaBicicletta, isBikeAvailable } = useBikeSharing();
  useEffect(() => {
    if (selected.battery < 1) {
      selected.battery = selected.battery * 100;
      selected.autonomia = (selected.battery / 2.5).toFixed(0);
    }

    return () => {};
  });

  const batteryIcon = (battery) => {
    if (battery < 1) {
      battery = battery * 100;
      battery = Math.round(battery);
    }
    if (battery < 20) {
      return (
        <p className="inline-flex h-fit w-20 flex-row">
          <Battery1BarSharp className="rotate-90 text-red-500" />
          <span className="text-red-500">{battery}%</span>
        </p>
      );
    } else if (battery < 40) {
      return (
        <p className="inline-flex h-fit  flex-row">
          <Battery3BarSharp className="rotate-90 text-orange-500" />
          <span className="text-orange-500">{battery}%</span>
        </p>
      );
    } else if (battery < 60) {
      return (
        <p className="inline-flex h-fit  flex-row">
          <Battery5BarSharp className="rotate-90 text-yellow-500" />
          <span className="text-yellow-500">{battery}%</span>
        </p>
      );
    } else {
      return (
        <p className="inline-flex  flex-row">
          <Battery6BarSharp className="rotate-90 text-green-500" />
          <span className="text-green-500">{battery}%</span>
        </p>
      );
    }
  };
  console.log(mastercard);

  const [isReserved, setIsReserved] = useState(false);
  const [removePrenota, setRemovePrenota] = useState(true);
  const [removeContainer, setRemoveContainer] = useState(true);

  const handleIsReserved = () => {
    setIsReserved(!isReserved);
  };

  const handleRemovePrenota = () => {
    setRemovePrenota(!removePrenota);
  };

  const handleRemoveContainer = () => {
    setRemoveContainer(!removeContainer);
  };

  return (
    <div>
      {removeContainer && (
        <>
          <div className="flex flex-col items-stretch justify-between ">
            <div className="flex w-full flex-row items-stretch justify-between">
              <div className="flex flex-col items-start justify-start">
                <p className=" text-2xl font-semibold">NAPOLI-{selected.id}</p>
                <div className="flex flex-row items-center justify-start">
                  {batteryIcon(selected.battery)}
                  <p className="ml-2 text-sm font-light text-gray-400">
                    ({selected.autonomia} km di autonomia)
                  </p>
                </div>
                <p className="ml-0 inline-flex flex-row items-center">
                  <img
                    src="https://www.mastercard.it/content/dam/public/mastercardcom/it/it/icons/mc-logo-52.svg"
                    className="ml-0 h-10 w-fit rounded-xl border-2 object-contain object-center p-1"
                  />
                  <span className="ml-2 text-sm text-gray-400">
                    €0.80 per iniziare, poi €0.30/minuto{" "}
                  </span>
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                {/* icona bici */}
                <img
                  src={BikeIMG}
                  className="-mt-2 h-auto w-24 object-contain object-center md:w-28"
                  alt="bike"
                />
                <button className="flex flex-row items-center rounded-xl border bg-gray-300 p-2 ">
                  <ReportProblemSharp className="text-gray-600 " />
                  <p className="ml-1 text-xs text-gray-600">
                    Segnala un problema
                  </p>
                </button>
              </div>
            </div>

            <div className="mt-2 flex w-full flex-row items-center justify-between">
              {removePrenota && (
                <>
                  <button
                    className="flex h-fit w-full flex-col items-center justify-center rounded-2xl bg-green-500 py-1"
                    disabled={!isBikeAvailable(selected.id)}
                    onClick={() => {
                      prenotaBicicletta(selected.id, 1);
                      handleIsReserved();
                      handleRemovePrenota();
                    }}
                  >
                    <p className="text-lg font-semibold">Prenota</p>
                    <p className="text-md font-normal">
                      Gratis i primi 10 minuti
                    </p>
                  </button>
                </>
              )}
              {isReserved && (
                <>
                  <button
                    className="flex h-fit w-full border-spacing-3 flex-col items-center justify-center rounded-2xl bg-green-300 py-1"
                    onClick={handleRemoveContainer}
                  >
                    <p className="font-semibold- text-lg">INIZIA CORSA</p>
                    <p className="text-md font-normal">
                      Scannerizza il codice QR
                    </p>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="startCorsa"></div>
        </>
      )}
    </div>
  );
}
