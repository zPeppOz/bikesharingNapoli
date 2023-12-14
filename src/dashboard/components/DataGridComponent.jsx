import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

export default function DataGridComponent(props) {
  const [rows, setRows] = useState(props.rows);
  const [isDialogOpen, setDialogOpen] = useState(false);

  // // Ho inizializzato newRowData come un oggetto vuoto ({}) perché non so quali colonne ci saranno.
  // In questo modo, possiamo utilizzare il componente per diverse colonne dinamicamente.
  const [newRowData, setNewRowData] = useState({});

  const handleAddRow = () => {
    // Apri la finestra modale per l'inserimento dei dati
    setDialogOpen(true);
  };

  const handleSaveRow = () => {
    // Chiudi la finestra modale e aggiungi la nuova riga
    const newRows = [...rows, { id: rows.length + 1, ...newRowData }];
    setRows(newRows);
    setDialogOpen(false);
    // Resettare i dati del nuovo inserimento
    setNewRowData({});
  };

  // questa funzione in modo che sia in grado di gestire qualsiasi
  //  campo di input in base alle colonne passate come props.
  const handleInputChange = (e) => {
    // Aggiorna lo stato con i dati del nuovo inserimento
    setNewRowData({ ...newRowData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <Button variant="contained" onClick={handleAddRow}>
          Aggiungi Riga
        </Button>
      </div>

      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent>
          <div
            className="flex flex-col items-center justify-center"
            style={{
              gap: "0.75rem",
            }}
          >
            {props.columns.map((column) => (
              <TextField
                key={column.field}
                label={column.headerName}
                name={column.field}
                value={newRowData[column.field] || ""}
                onChange={handleInputChange}
                fullWidth
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Annulla</Button>
          <Button variant="contained" onClick={handleSaveRow}>
            Salva
          </Button>
        </DialogActions>
      </Dialog>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={props.columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
}
