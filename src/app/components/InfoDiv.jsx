import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
//importa css
import { BottomDiv } from "./BottomDiv.jsx";
import BikeIMG from "../../assets/bike_real.png";
import mastercard from "../../assets/mastercard-logo.svg";
import station from "../../assets/station2.png";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
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
  const { state } = useContext(GlobalContext);
  const divRef = useRef();
  const isPhone = window.innerWidth < 768;
  const [showQrDialog, setShowQrDialog] = useState(false);

  const handleShowQrDialog = () => {
    setShowQrDialog(!showQrDialog);
  };

  useEffect(() => {
    if (isPhone) {
      if (isBottomDivOpen) {
        divRef.current.classList.add("mb-48");
      } else {
        divRef.current.classList.remove("mb-48");
      }
    }
  }, [isBottomDivOpen, isPhone]);

  function onResult(obj) {
    if (obj) {
      const bicicletta = JSON.parse(obj);
      let bici = state.bici.find((b) => (b.id = bicicletta.biciId));
      handlers.setSelected(bici);
      setShowQrDialog(false);
      handlers.showBottomDiv();
    }
  }

  return (
    <>
      <div
        ref={divRef}
        className={
          "absolute bottom-8 right-6 h-auto w-fit rounded-full border border-green-400 bg-green-400 p-2 shadow-lg transition-all duration-500"
        }
        onClick={() => {
          handleShowQrDialog();
        }}
      >
        <QrCodeScannerIcon
          style={{ fontSize: "32px" }}
          className="cursor-pointer"
        />
      </div>
      <BottomDiv isOpen={isBottomDivOpen}>
        {selected?.bikes && (
          <StationInfo selected={selected} handlers={handlers} />
        )}
        {selected?.battery && (
          <BikeInfo selected={selected} handlers={handlers} />
        )}
      </BottomDiv>

      <QRReaderDialog
        showQrDialog={showQrDialog}
        setShowQrDialog={setShowQrDialog}
        hideDialog={handleShowQrDialog}
        onResult={onResult}
        data={{}}
      />
    </>
  );
}

function StationInfo({ selected, handlers }) {
  const batteryIcon = (battery) => {
    if (battery < 1) {
      battery = battery * 100;
      battery = Math.round(battery);
    }
    if (battery < 20) {
      return (
        <p className="inline-flex h-20 w-20 flex-row">
          <Battery1BarSharp className="rotate-90 text-red-500" />
          <span className="text-red-500">{battery}%</span>
        </p>
      );
    } else if (battery < 40) {
      return (
        <p className="inline-flex h-20 w-20 flex-row">
          <Battery3BarSharp className="rotate-90 text-orange-500" />
          <span className="text-orange-500">{battery}%</span>
        </p>
      );
    } else if (battery < 60) {
      return (
        <p className="inline-flex h-20  flex-row">
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
                          disabled={bike.isAvailable}
                          onClick={() => {
                            handlers.setSelected(bike);
                          }}
                        >
                          <p className="text-md ">Prenota</p>
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
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
  EuroSharp,
} from "@mui/icons-material";
import TimerSharpIcon from "@mui/icons-material/TimerSharp";
import { useBikeSharing } from "../../hooks/ridesHook.jsx";
import { GlobalContext } from "../../providers/GlobalContext.jsx";
import QRReaderDialog from "./QRReaderDialog.jsx";

function BikeInfo({ selected, handlers }) {
  const { iniziaCorsa, isBikeAvailable, terminaCorsa } = useBikeSharing();
  const { state, loggedUser } = useContext(GlobalContext);

  useEffect(() => {
    if (selected.battery < 1) {
      selected.battery = selected.battery * 100;
      selected.autonomia = (selected.battery / 2.5).toFixed(0);
    }

    return () => {};
  });

  function BatteryIcon({ battery, variant }) {
    if (battery < 1) {
      battery = battery * 100;
      battery = Math.round(battery);
    }
    if (battery < 20) {
      return (
        <p
          className={
            "inline-flex h-fit w-fit items-center justify-center " +
            (variant === "row" ? "flex-row" : "flex-col")
          }
        >
          <Battery1BarSharp className="!h-48 !w-auto rotate-90 text-red-500" />
          <span className="text-red-500">{battery}%</span>
        </p>
      );
    } else if (battery < 40) {
      return (
        <p
          className={
            "inline-flex h-fit w-fit items-center justify-center " +
            (variant === "row" ? "flex-row" : "flex-col")
          }
        >
          <Battery3BarSharp className="!h-12 !w-auto rotate-90 text-orange-500" />
          <span className="text-orange-500">{battery}%</span>
        </p>
      );
    } else if (battery < 60) {
      return (
        <p
          className={
            "inline-flex h-fit w-fit items-center justify-center " +
            (variant === "row" ? "flex-row" : "flex-col")
          }
        >
          <Battery5BarSharp className="!h-12 !w-auto rotate-90 text-yellow-500" />
          <span className="text-yellow-500">{battery}%</span>
        </p>
      );
    } else {
      return (
        <p
          className={
            "inline-flex h-fit w-fit items-center justify-center " +
            (variant === "row" ? "flex-row" : "flex-col")
          }
        >
          <Battery6BarSharp className="!h-12 !w-auto rotate-90 text-green-500" />
          <span className="text-green-500">{battery}%</span>
        </p>
      );
    }
  }

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
  const [corsa, setCorsa] = useState({});
  const [tempo, setTempo] = useState("00:00");
  const [costo, setCosto] = useState("0.00");

  const handleTerminaCorsa = () => {
    terminaCorsa(corsa.id, costo);
    setCorsa({});
    setTempo("00:00");
    setCosto("0.00");
    handleRemoveContainer();
    handleIsReserved();
    handleRemovePrenota();
  };

  const handleIniziaCorsa = () => {
    let c = iniziaCorsa(selected.id, 1);
    setCorsa(c);
    handleRemoveContainer();
  };

  const calcolaTempo = () => {
    let ora = new Date();
    let diff = ora - corsa.inizioCorsa;
    let minuti = Math.floor(diff / 60000);
    let secondi = Math.floor((diff - minuti * 60000) / 1000);
    // 00:00
    if (minuti < 10) {
      minuti = "0" + minuti;
    }
    if (secondi < 10) {
      secondi = "0" + secondi;
    }
    setTempo(minuti + ":" + secondi);
  };

  const calcolaCosto = () => {
    let costo = 0.8;
    let ora = new Date();
    let diff = ora - corsa.inizioCorsa;
    let minuti = Math.floor(diff / 60000);
    // tariffa 0.30/minuto, gratis i primi 2 minuti
    if (minuti > 2) {
      minuti -= 2;
    } else {
      minuti = 0;
    }
    costo += minuti * 0.3;
    setCosto(costo.toFixed(2));
  };

  useEffect(() => {
    if (corsa && corsa.inizioCorsa) {
      // calcola il tempo ogni secondo
      const interval = setInterval(() => {
        calcolaTempo();
        calcolaCosto();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [corsa]);

  return (
    <div>
      {removeContainer && (
        <>
          <div className="flex flex-col items-stretch justify-between ">
            <div className="flex w-full flex-row items-stretch justify-between">
              <div className="flex flex-col items-start justify-start">
                <p className=" text-2xl font-semibold">NAPOLI-{selected.id}</p>
                <div className="flex flex-row items-center justify-start">
                  <BatteryIcon battery={selected.battery} variant="row" />
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
                <ReportButton bike={selected} />
              </div>
            </div>

            <div className="mt-2 flex w-full flex-row items-center justify-between">
              {removePrenota && (
                <>
                  <button
                    className="flex h-fit w-full flex-col items-center justify-center rounded-2xl bg-green-500 py-1"
                    disabled={!isBikeAvailable(selected.id) && loggedUser}
                    onClick={() => {
                      if (
                        state.utenti.find(
                          (utente) => utente.id === loggedUser.id
                        ).pagamento
                      ) {
                        handleIsReserved();
                        handleRemovePrenota();
                      } else {
                        alert("Aggiungi un metodo di pagamento");
                        handlers.setDialogOpen(true);
                      }
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
                <button
                  className="flex h-fit w-full border-spacing-3 flex-col items-center justify-center rounded-2xl bg-green-300 py-1"
                  onClick={() => {
                    handleIniziaCorsa();
                  }}
                >
                  <p className="font-semibold- text-lg">
                    Premi per iniziare la corsa
                  </p>
                </button>
              )}
            </div>
          </div>
        </>
      )}
      {!removeContainer && (
        <div className="flex h-full w-full flex-col items-center justify-evenly gap-4 p-2">
          <div className="flex w-full flex-row items-center justify-evenly gap-2">
            <p className="flex flex-col items-center justify-center">
              <BatteryIcon battery={selected.battery} variant="col" />
            </p>
            <p className="flex flex-col items-center justify-center">
              <TimerSharpIcon className="!h-12 !w-auto text-gray-600" />
              {tempo}
            </p>
            <p className="flex flex-col items-center justify-center">
              <EuroSharp className="!h-12 !w-auto text-gray-600" />€{costo}
            </p>
          </div>
          <div className="flex h-full w-full flex-row items-center justify-around">
            <ReportButton className="w-full justify-center" bike={selected} />
            <button
              className="flex h-full w-full flex-row items-center justify-center rounded-xl border bg-red-500 p-2"
              onClick={() => {
                // ferma la corsa
                handleTerminaCorsa();
              }}
            >
              <p className="text-md  text-gray-200">Interrompi Corsa</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import { useTickets } from "../../hooks/ticketHook.jsx";

function ReportButton(props) {
  const { toggleDialog } = useTickets();
  return (
    <button
      className={
        "flex flex-row items-center rounded-xl border bg-gray-300 p-2 " +
        (props.className && props.className)
      }
      onClick={() => {
        toggleDialog();
      }}
    >
      <ReportProblemSharp className="text-gray-600 " />
      <p className="ml-1 text-xs text-gray-600">Segnala un problema</p>
    </button>
  );
}
