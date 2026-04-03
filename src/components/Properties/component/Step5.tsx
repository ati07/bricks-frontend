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

export default function Step5({ onDataChange, data, usuarios = [] }: any) {
  const [formData, setFormData] = useState({
    agenteAsignado: "",
    fechaIngreso: "",
    precioLista: "",
    institucionAcreedora: "",
    estatusProcesal: "",
    numeroExpediente: "",
    situacionOcupacion: "",
    notasInternas: "",
  });

  const handleChange = (field: string) => (e: any) => {
    const updated = { ...formData, [field]: e.target.value };
    setFormData(updated);
    onDataChange?.(updated);
  };

  useEffect(() => {
    if (data?.Step5) {
      setFormData(data.Step5);
    }
  }, [data]);

  return (
    <Box>
      <Box maxWidth="lg" mx="auto">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
            Gestión
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Agente Asignado</InputLabel>
                <Select
                  value={formData.agenteAsignado}
                  label="Agente Asignado"
                  onChange={handleChange("agenteAsignado")}
                >
                  {usuarios.map((u: any) => (
                    <MenuItem key={u.id} value={u.id}>
                      {u.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Fecha de Ingreso"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.fechaIngreso}
                onChange={handleChange("fechaIngreso")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Precio de Lista"
                type="number"
                fullWidth
                value={formData.precioLista}
                onChange={handleChange("precioLista")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Institución Acreedora</InputLabel>
                <Select
                  value={formData.institucionAcreedora}
                  label="Institución Acreedora"
                  onChange={handleChange("institucionAcreedora")}
                >
                  <MenuItem value="Banco">Banco</MenuItem>
                  <MenuItem value="Juzgado">Juzgado</MenuItem>
                  <MenuItem value="Cooperativa">Cooperativa</MenuItem>
                  <MenuItem value="Otro">Otro</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Estatus Procesal</InputLabel>
                <Select
                  value={formData.estatusProcesal}
                  label="Estatus Procesal"
                  onChange={handleChange("estatusProcesal")}
                >
                  <MenuItem value="Adjudicada">Adjudicada</MenuItem>
                  <MenuItem value="Remate">Remate</MenuItem>
                  <MenuItem value="Lanzamiento">Lanzamiento</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Número de Expediente"
                fullWidth
                value={formData.numeroExpediente}
                onChange={handleChange("numeroExpediente")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Situación de Ocupación</InputLabel>
                <Select
                  value={formData.situacionOcupacion}
                  label="Situación de Ocupación"
                  onChange={handleChange("situacionOcupacion")}
                >
                  <MenuItem value="Desocupada">Desocupada</MenuItem>
                  <MenuItem value="Ocupada">Ocupada</MenuItem>
                  <MenuItem value="Intrusos">Intrusos</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Notas Internas"
                fullWidth
                multiline
                rows={4}
                value={formData.notasInternas}
                onChange={handleChange("notasInternas")}
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}
