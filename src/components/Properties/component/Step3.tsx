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
  FormControlLabel,
} from "@mui/material";

export default function Step3({ onDataChange, data }: any) {
  const [formData, setFormData] = useState({
    areaTerreno: "",
    unidadArea: "m2",
    construccionCerrada: "",
    construccionAbierta: "",
    recamaras: "",
    banosTotales: "",
    denEstudio: false,
    cbeServicio: false,
    estacionamientos: "",
    zonificacion: "",
  });

  const handleChange = (field: string) => (e: any) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onDataChange?.(updated);
  };

  useEffect(() => {
    if (data?.Step3) {
      setFormData(data.Step3);
    }
  }, [data]);

  return (
    <Box>
      <Box maxWidth="lg" mx="auto">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
            Especificaciones
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Área de Terreno"
                type="number"
                fullWidth
                value={formData.areaTerreno}
                onChange={handleChange("areaTerreno")}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Unidad</InputLabel>
                <Select
                  value={formData.unidadArea}
                  label="Unidad"
                  onChange={handleChange("unidadArea")}
                >
                  <MenuItem value="m2">m²</MenuItem>
                  <MenuItem value="ha">ha</MenuItem>
                  <MenuItem value="ft2">ft²</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Construcción Cerrada (m²)"
                type="number"
                fullWidth
                value={formData.construccionCerrada}
                onChange={handleChange("construccionCerrada")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Construcción Abierta (m²)"
                type="number"
                fullWidth
                value={formData.construccionAbierta}
                onChange={handleChange("construccionAbierta")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Recámaras"
                type="number"
                fullWidth
                value={formData.recamaras}
                onChange={handleChange("recamaras")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Baños Totales"
                type="number"
                inputProps={{ step: 0.5 }}
                fullWidth
                value={formData.banosTotales}
                onChange={handleChange("banosTotales")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.denEstudio}
                    onChange={handleChange("denEstudio")}
                  />
                }
                label="Den / Estudio"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.cbeServicio}
                    onChange={handleChange("cbeServicio")}
                  />
                }
                label="CBE (Servicio)"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Estacionamientos"
                type="number"
                fullWidth
                value={formData.estacionamientos}
                onChange={handleChange("estacionamientos")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Zonificación"
                fullWidth
                value={formData.zonificacion}
                onChange={handleChange("zonificacion")}
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}
