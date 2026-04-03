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

export default function Step5({ onDataChange, data }: any) {
  const [formData, setFormData] = useState({
    certificadoRegistro: null,
    pazSalvo: null,
    minuta: null,
    identidad: null,
  });

  const handleFile = (field: string) => (e: any) => {
    const updated = { ...formData, [field]: e.target.files[0] };
    setFormData(updated);
    onDataChange?.(updated);
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>Archivos</Typography>

      <Grid container spacing={3}>
        {[
          ["Certificado Registro Público", "certificadoRegistro"],
          ["Paz y Salvo DGI", "pazSalvo"],
          ["Minuta / Promesa", "minuta"],
          ["Identidad del Dueño", "identidad"],
        ].map(([label, key]) => (
          <Grid item xs={12} md={6} key={key}>
            <TextField
              type="file"
              fullWidth
              label={label}
              InputLabelProps={{ shrink: true }}
              onChange={handleFile(key)}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}





