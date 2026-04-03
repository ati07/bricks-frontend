import React, { useEffect, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";

export default function Step1({ data, onChange }: any) {
  const [state, setState] = useState({
    precioLista: "",
    precioMinimo: "",
    precioMinRecomendado: "",
    precioMaxRecomendado: "",
    valorAvaluo: "",
    fechaAvaluo: ""
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
      <Typography variant="h5" mb={3}>Precios</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField label="Precio de Lista" required type="number" fullWidth value={state.precioLista} onChange={handleChange("precioLista")} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField label="Precio Mínimo" type="number" fullWidth value={state.precioMinimo} onChange={handleChange("precioMinimo")} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField label="Precio Min Recomendado" type="number" fullWidth value={state.precioMinRecomendado} onChange={handleChange("precioMinRecomendado")} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField label="Precio Max Recomendado" type="number" fullWidth value={state.precioMaxRecomendado} onChange={handleChange("precioMaxRecomendado")} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField label="Valor de Avalúo" type="number" fullWidth value={state.valorAvaluo} onChange={handleChange("valorAvaluo")} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField label="Fecha de Avalúo" type="date" InputLabelProps={{ shrink: true }} fullWidth value={state.fechaAvaluo} onChange={handleChange("fechaAvaluo")} />
        </Grid>
      </Grid>
    </>
  );
}
