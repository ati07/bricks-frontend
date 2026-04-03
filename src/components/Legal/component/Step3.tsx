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


export default function Step3({ onDataChange, data }: any) {
  const [formData, setFormData] = useState({
    institucion: "",
    estatusProcesal: "",
    expediente: "",
    ocupacion: "",
  });

  const handleChange = (f: string) => (e: any) => {
    const updated = { ...formData, [f]: e.target.value };
    setFormData(updated);
    onDataChange?.(updated);
  };

  useEffect(() => data?.Step8 && setFormData(data.Step8), [data]);

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>Reposesión</Typography>

      <Grid container spacing={3}>
        {[
          ["Institución Acreedora", "institucion"],
          ["Estatus Procesal", "estatusProcesal"],
          ["Número de Expediente", "expediente"],
          ["Situación de Ocupación", "ocupacion"],
        ].map(([label, key]) => (
          <Grid item xs={12} md={6} key={key}>
            <TextField label={label} fullWidth value={(formData as any)[key]} onChange={handleChange(key)} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}




