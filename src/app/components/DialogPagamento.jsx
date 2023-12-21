import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

export function DialogPagamento({ handlers }) {
  const { isDialogOpen, setDialogOpen, setPaymentDone } = handlers;

  return (
    <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogContent>
        <div
          className="flex flex-col items-center justify-center"
          style={{
            gap: "0.75rem",
          }}
        >
          <p className="text-lg font-semibold">
            Inserisci un metodo di pagamento
          </p>
          <TextField
            label="Numero carta"
            name="numeroCarta"
            fullWidth
            variant="outlined"
            inputProps={{
              maxLength: 16,
              pattern: "[0-9]{16}",
            }}
          />
          <div className="flex flex-row items-center justify-center gap-4">
            <TextField label="MM/YY" name="mese" variant="outlined" />
            <TextField label="CVV" name="cvv" fullWidth variant="outlined" />
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <TextField label="Nome" name="nome" variant="outlined" />
            <TextField label="Cognome" name="cognome" variant="outlined" />
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <TextField label="Indirizzo" name="indirizzo" variant="outlined" />
            <TextField label="Città" name="citta" variant="outlined" />
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <RadioGroup row name="tipoCarta">
              <FormControlLabel
                value="mastercard"
                control={<Radio />}
                label={
                  <img
                    src="https://www.mastercard.it/content/dam/public/mastercardcom/it/it/icons/mc-logo-52.svg"
                    className="ml-0 h-10 w-fit rounded-xl border-2 object-contain object-center p-1"
                  />
                }
              />
              <FormControlLabel
                value="visa"
                control={<Radio />}
                label={
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png"
                    className="ml-0 h-10 w-fit rounded-xl border-2 object-contain object-center p-1"
                  />
                }
              />
              <FormControlLabel
                value="paypal"
                control={<Radio />}
                label={
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png"
                    className="ml-0 h-10 w-fit rounded-xl border-2 object-contain object-center p-1"
                  />
                }
              />
            </RadioGroup>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>Annulla</Button>
        <Button
          variant="contained"
          onClick={() => {
            setPaymentDone(true);
            setDialogOpen(false);
          }}
        >
          Salva
        </Button>
      </DialogActions>
    </Dialog>
  );
}
