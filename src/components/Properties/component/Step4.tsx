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

const AMENIDADES_OPTIONS = [
  "Piscina",
  "Gym",
  "Seguridad",
  "Área Social",
  "Parque Infantil",
  "Ascensor",
  "Cancha Deportiva",
];

export default function Step4({ onDataChange, data }: any) {
  const [formData, setFormData] = useState({
    amenidades: [] as string[],
    acabados: "",
    mobiliarioIncluido: "",
  });

  const handleChange = (field: string) => (e: any) => {
    const updated = { ...formData, [field]: e.target.value };
    setFormData(updated);
    onDataChange?.(updated);
  };

  useEffect(() => {
    if (data?.Step4) {
      setFormData(data.Step4);
    }
  }, [data]);

  return (
    <Box>
      <Box maxWidth="lg" mx="auto">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
            Amenidades
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Amenidades</InputLabel>
                <Select
                  multiple
                  value={formData.amenidades}
                  label="Amenidades"
                  onChange={handleChange("amenidades")}
                  renderValue={(selected) => (selected as string[]).join(", ")}
                >
                  {AMENIDADES_OPTIONS.map((item) => (
                    <MenuItem key={item} value={item}>
                      <Checkbox
                        checked={formData.amenidades.indexOf(item) > -1}
                      />
                      <ListItemText primary={item} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Acabados (Pisos / Sobres)"
                fullWidth
                multiline
                rows={3}
                value={formData.acabados}
                onChange={handleChange("acabados")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Mobiliario Incluido</InputLabel>
                <Select
                  value={formData.mobiliarioIncluido}
                  label="Mobiliario Incluido"
                  onChange={handleChange("mobiliarioIncluido")}
                >
                  <MenuItem value="Linea Blanca">Línea Blanca</MenuItem>
                  <MenuItem value="Amoblado">Amoblado</MenuItem>
                  <MenuItem value="Vacio">Vacío</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}
