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

export default function Step4({ onDataChange, data }: any) {
  const [formData, setFormData] = useState({
    tipoTramite: "",
    estatusEscritura: "",
    abogado: "",
    escrituraNumero: "",
  });

  const handleChange = (f: string) => (e: any) => {
    const updated = { ...formData, [f]: e.target.value };
    setFormData(updated);
    onDataChange?.(updated);
  };

  useEffect(() => data?.Step9 && setFormData(data.Step9), [data]);

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>Trámites</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField label="Tipo de Trámite Actual" fullWidth value={formData.tipoTramite} onChange={handleChange("tipoTramite")} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Estatus de la Escritura" fullWidth value={formData.estatusEscritura} onChange={handleChange("estatusEscritura")} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Abogado / Firma Responsable" fullWidth value={formData.abogado} onChange={handleChange("abogado")} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Escritura Pública N°" fullWidth value={formData.escrituraNumero} onChange={handleChange("escrituraNumero")} />
        </Grid>
      </Grid>
    </Paper>
  );
}




