import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

export default function DataGridComponent(props) {
  const [rows, setRows] = useState(props.rows);

  const handleAddRow = () => {
    // Aggiungi una nuova riga
    const newRows = [
      ...rows,
      { id: rows.length + 1, Bicicleta: "", data: "", descrizione: "" },
    ];
    setRows(newRows);
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <Button variant="contained" onClick={handleAddRow}>
          Aggiungi Riga
        </Button>
      </div>
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
