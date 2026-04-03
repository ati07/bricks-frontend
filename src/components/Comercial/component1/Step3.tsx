import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from "@mui/material";

export default function Step3({ data, onChange }: any) {
  const [state, setState] = useState({
    estatusPipeline: "",
    registroDeVisitas: ""
  });

  const handleChange = (field: string) => (e: any) => {
    const updated = { ...state, [field]: e.target.value };
    setState(updated);
    onChange(updated);
  };

  useEffect(() => {
    data && setState(data);
  }, [data]);

  return (
    <>
      <Typography variant="h5" mb={3}>Ventas</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Estatus Pipeline</InputLabel>
            <Select value={state.estatusPipeline} onChange={handleChange("estatusPipeline")}>
              <MenuItem value="Prospecto">Prospecto</MenuItem>
              <MenuItem value="En Negociación">En Negociación</MenuItem>
              <MenuItem value="Cerrado">Cerrado</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Registro de Visitas"
            fullWidth
            disabled
            value="Audit log automático"
          />
        </Grid>
      </Grid>
    </>
  );
}
