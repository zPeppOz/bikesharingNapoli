import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";

export default function QRReaderDialog({
  showQrDialog,
  setShowQrDialog,
  onResult,
}) {
  const isPhone = window.innerWidth < 768;

  return (
    <>
      <Dialog
        fullScreen={isPhone}
        className="!border-0 !bg-transparent !p-0 "
        open={showQrDialog}
        onClose={() => {
          setShowQrDialog(false);
        }}
      >
        <DialogContent
          className="h-full w-full overflow-hidden !overflow-y-hidden !border-0 !p-0"
          dividers
        >
          <QrReader
            onError={(err) => {
              console.error(err);
            }}
            onResult={onResult}
            constraints={{
              facingMode: "environment",
            }}
            videoContainerStyle={{
              height: "650px",
              width: "400px",
              overflow: "hidden",
              display: "flex",
              alignItems: "start",
              justifyContent: "flex-start",
              paddingTop: "0",
            }}
            videoStyle={{
              display: "flex",

              objectFit: "cover",
              objectAlign: "center",
              objectPosition: "center",
              position: "relative",
            }}
            className="h-full w-full"
          />
          <div className="absolute z-[1000] h-full w-full backdrop-blur"></div>
        </DialogContent>
      </Dialog>
    </>
  );
}
