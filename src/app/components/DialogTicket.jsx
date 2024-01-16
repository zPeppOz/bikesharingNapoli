import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useTickets } from "../../hooks/ticketHook.jsx";
import { useEffect, useState } from "react";

export default function DialogTicket({ bike }) {
  const { isDialogOpen, toggleDialog, addTicket } = useTickets();
  const [descrizione, setDescrizione] = useState("");
  let ticket = {
    Bicicletta: 0,

    data: "",
  };

  const handleSubmit = () => {
    // ticket = {
    //   ...ticket,
    //   Bicicletta: bike.id,
    //   data: new Date().toISOString().slice(0, 10),
    // };
    ticket = {
      ...ticket,
      Bicicletta: bike.id,
      descrizione: descrizione,
      data: new Date().toISOString().slice(0, 10),
    };
    addTicket(ticket);
    alert("Ticket inviato!");
    toggleDialog();
  };

  useEffect(() => {
    // clean up
    return () => {
      ticket = {
        Bicicletta: 0,
        data: "",
      };
      setDescrizione("");
    };
  }, [isDialogOpen]);

  return (
    <Dialog open={isDialogOpen} onClose={toggleDialog}>
      <DialogContent className="w-fit max-w-md">
        <div className="flex flex-col items-center justify-center px-4 py-2">
          <h1 className="text-2xl font-semibold">Segnala un problema</h1>
          <div className="mt-4 flex flex-col items-center justify-center gap-4">
            <textarea
              className="h-32 w-full rounded-xl border-2 p-2"
              placeholder="Raccontaci cosa è successo"
              value={ticket.descrizione}
              onChange={(e) => {
                setDescrizione(e.target.value);
              }}
            />
            <Button
              variant="contained"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Invia
            </Button>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleDialog}>Chiudi</Button>
      </DialogActions>
    </Dialog>
  );
}
