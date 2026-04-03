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
} from "@mui/material";

export default function Step2({ onDataChange, data }: any) {
  const [formData, setFormData] = useState({
    pais: "",
    provincia: "",
    distrito: "",
    corregimiento: "",
    direccionFisica: "",
    numeroFinca: "",
    codigoUbicacion: "",
    tomoFolioAsiento: "",
    linkRegistroPublico: "",
    latitud: "",
    longitud: "",
  });

  const handleChange = (field: string) => (e: any) => {
    const updated = { ...formData, [field]: e.target.value };
    setFormData(updated);
    onDataChange?.(updated);
  };

  useEffect(() => {
    if (data?.Step2) {
      setFormData(data.Step2);
    }
  }, [data]);

  return (
    <Box>
      <Box maxWidth="lg" mx="auto">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
            Ubicación
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>País</InputLabel>
                <Select
                  value={formData.pais}
                  label="País"
                  onChange={handleChange("pais")}
                >
                  <MenuItem value="Panamá">Panamá</MenuItem>
                  <MenuItem value="Costa Rica">Costa Rica</MenuItem>
                  <MenuItem value="Colombia">Colombia</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Provincia / Estado</InputLabel>
                <Select
                  value={formData.provincia}
                  label="Provincia / Estado"
                  onChange={handleChange("provincia")}
                >
                  <MenuItem value="Panamá">Panamá</MenuItem>
                  <MenuItem value="Chiriquí">Chiriquí</MenuItem>
                  <MenuItem value="Veraguas">Veraguas</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Distrito / Ciudad"
                fullWidth
                value={formData.distrito}
                onChange={handleChange("distrito")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Corregimiento / Barrio"
                fullWidth
                value={formData.corregimiento}
                onChange={handleChange("corregimiento")}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Dirección Física"
                fullWidth
                required
                multiline
                rows={3}
                value={formData.direccionFisica}
                onChange={handleChange("direccionFisica")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Número de Finca"
                fullWidth
                value={formData.numeroFinca}
                onChange={handleChange("numeroFinca")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Código de Ubicación"
                fullWidth
                value={formData.codigoUbicacion}
                onChange={handleChange("codigoUbicacion")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Tomo / Folio / Asiento"
                fullWidth
                value={formData.tomoFolioAsiento}
                onChange={handleChange("tomoFolioAsiento")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Link Registro Público"
                type="url"
                fullWidth
                value={formData.linkRegistroPublico}
                onChange={handleChange("linkRegistroPublico")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Latitud"
                type="number"
                fullWidth
                value={formData.latitud}
                onChange={handleChange("latitud")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Longitud"
                type="number"
                fullWidth
                value={formData.longitud}
                onChange={handleChange("longitud")}
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}
