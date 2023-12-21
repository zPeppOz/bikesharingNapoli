import React from "react";
import { Button, Dialog, DialogContent, DialogActions } from "@mui/material";
import { formattaData } from "../MainApp.jsx";

export function DialogCorse({ handlers, data }) {
  const { isCorseOpen, setCorseOpen } = handlers;
  const { corse, loggedUser } = data;

  return (
    <Dialog open={isCorseOpen} onClose={() => setCorseOpen(false)}>
      <DialogContent>
        <div
          className="flex flex-col items-center justify-center"
          style={{
            gap: "0.75rem",
          }}
        >
          <p className="text-lg font-semibold">Le tue corse</p>
          <div className="flex flex-col items-center justify-center gap-4">
            {corse.length > 0 ? (
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Inizio</th>
                    <th className="px-4 py-2">Fine</th>
                    <th className="px-4 py-2">Costo</th>
                  </tr>
                </thead>
                <tbody>
                  {corse
                    .filter((c) => c.utenteId === loggedUser.id)
                    .map((corsa) => {
                      return (
                        <tr>
                          <td className="border px-4 py-2">
                            {formattaData(corsa.inizioCorsa)}
                          </td>
                          <td className="border px-4 py-2">
                            {formattaData(corsa.fineCorsa)}
                          </td>
                          <td className="border px-4 py-2">€{corsa.costo}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) : (
              <p>Non hai ancora effettuato nessuna corsa</p>
            )}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setCorseOpen(false)}>Chiudi</Button>
      </DialogActions>
    </Dialog>
  );
}
