import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";

export default function Step1({ onDataChange, data }: any) {
  const [formData, setFormData] = useState<any>({
    estadoTitulacion: "",
    cargasGravamenes: [] as string[],
    observaciones: "",
    ultimaActualizacion: "",
    enlaceRegistro: "",
  });

  const handleChange = (field: string) => (e: any) => {
    const value = Array.isArray(formData[field])
      ? e.target.value
      : e.target.value;
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onDataChange?.(updated);
  };

  useEffect(() => data?.Step1 && setFormData(data.Step1), [data]);

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>Estado Legal</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Estado de Titulación</InputLabel>
            <Select value={formData.estadoTitulacion} onChange={handleChange("estadoTitulacion")}>
              <MenuItem value="Titulado">Titulado</MenuItem>
              <MenuItem value="Derechos Posesorios">Derechos Posesorios</MenuItem>
              <MenuItem value="En Trámite">En Trámite</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Cargas y Gravámenes</InputLabel>
            <Select
              multiple
              value={formData.cargasGravamenes}
              onChange={handleChange("cargasGravamenes")}
              renderValue={(v) => v.join(", ")}
            >
              {["Hipoteca", "Embargo", "Servidumbre", "Afectación", "Ninguno"].map(v => (
                <MenuItem key={v} value={v}>
                  <Checkbox checked={formData.cargasGravamenes.includes(v)} />
                  <ListItemText primary={v} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Observaciones Marginales"
            multiline rows={3}
            fullWidth
            value={formData.observaciones}
            onChange={handleChange("observaciones")}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Última Actualización Registro"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={formData.ultimaActualizacion}
            onChange={handleChange("ultimaActualizacion")}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Enlace Registro Público"
            type="url"
            fullWidth
            value={formData.enlaceRegistro}
            onChange={handleChange("enlaceRegistro")}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
