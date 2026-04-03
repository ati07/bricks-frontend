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


export default function Step2({ onDataChange, data }: any) {
  const [formData, setFormData] = useState({
    nit: "",
    saldoImpuesto: "",
    vencimientoImpuesto: "",
    saldoTasaUnica: "",
    vencimientoTasa: "",
    saldoAgua: "",
    saldoMunicipio: "",
    saldoPH: "",
    fechaPazSalvo: "",
  });

  const handleChange = (f: string) => (e: any) => {
    const updated = { ...formData, [f]: e.target.value };
    setFormData(updated);
    onDataChange?.(updated);
  };

  useEffect(() => data?.Step7 && setFormData(data.Step7), [data]);

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>Impuestos</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField label="NIT (DGI)" fullWidth value={formData.nit} onChange={handleChange("nit")} />
        </Grid>

        {[
          ["Saldo Impuesto Inmueble", "saldoImpuesto"],
          ["Saldo Tasa Única", "saldoTasaUnica"],
          ["Saldo Agua (IDAAN)", "saldoAgua"],
          ["Saldo Municipio", "saldoMunicipio"],
          ["Saldo PH / Mantenimiento", "saldoPH"],
        ].map(([label, key]) => (
          <Grid item xs={12} md={6} key={key}>
            <TextField label={label} type="number" fullWidth value={(formData as any)[key]} onChange={handleChange(key)} />
          </Grid>
        ))}

        <Grid item xs={12} md={6}>
          <TextField type="date" label="Fecha Último Paz y Salvo" InputLabelProps={{ shrink: true }} fullWidth
            value={formData.fechaPazSalvo}
            onChange={handleChange("fechaPazSalvo")}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}



