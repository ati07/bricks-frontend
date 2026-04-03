import React, { useEffect, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";

export default function Step2({ data, onChange }: any) {
  const [state, setState] = useState({
    tituloAnuncio: "",
    descripcionSEO: "",
    linksExternos: ""
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
      <Typography variant="h5" mb={3}>Marketing</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Título de Anuncio"
            inputProps={{ maxLength: 100 }}
            helperText={`${state.tituloAnuncio.length}/100`}
            fullWidth
            value={state.tituloAnuncio}
            onChange={handleChange("tituloAnuncio")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Descripción SEO"
            multiline
            rows={4}
            fullWidth
            value={state.descripcionSEO}
            onChange={handleChange("descripcionSEO")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Links Externos"
            placeholder="https://example.com"
            fullWidth
            value={state.linksExternos}
            onChange={handleChange("linksExternos")}
          />
        </Grid>
      </Grid>
    </>
  );
}
