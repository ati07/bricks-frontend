import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { convertFormate } from "../../../formComponents/helper";
// import { convertFormate } from "../../../formComponents/helper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function Step1({ onDataChange, data }: any) {
  const [formData, setFormData] = useState({
    codigoInterno: "",
    nombrePropiedad: "",
    tipoActivo: "",
    categoriaEspecífica: "",
    estatusDisponibilidad: "",
    esReposeida: "",
  });

  const handleChange = (field: any) => (e: any) => {
    const updated = {
      ...formData,
      [field]: e.target.value,
    };

    if (field === "") {
    }

    setFormData(updated);
    if (onDataChange) onDataChange(updated);
  };

  useEffect(() => {
    if (!data) return;
    setFormData(data.step1 || {});
  }, []);

  return (
    <Box
      sx={{}}
      // minHeight: "100vh", backgroundColor: "#f3f4f6", py: 4, px: 2
    >
      <Box maxWidth="lg" mx="auto">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            color="text.primary"
            mb={4}
          >
            Identificación
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Código Interno"
                type="number"
                fullWidth
                value={formData.codigoInterno}
                onChange={handleChange("codigoInterno")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Nombre de Propiedad"
                type="text"
                fullWidth
                value={formData.nombrePropiedad}
                onChange={handleChange("nombrePropiedad")}
                // InputProps={{
                //   startAdornment: <InputAdornment position="start">$</InputAdornment>,
                // }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tipo de Activo</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.tipoActivo}
                  label="Tipo de Activo"
                  onChange={handleChange("tipoActivo")}
                >
                  <MenuItem value="Residencial">Residencial</MenuItem>
                  <MenuItem value="Comercial">Comercial</MenuItem>
                  <MenuItem value="Industrial">Industrial</MenuItem>
                  <MenuItem value="Terreno">Terreno</MenuItem>
                  <MenuItem value="Mixto">Mixto</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Categoría Específica</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.categoriaEspecífica}
                  label="Categoría Específica"
                  onChange={handleChange("categoriaEspecífica")}
                >
                  <MenuItem value="Residencial">Residencial</MenuItem>
                  <MenuItem value="Comercial">Comercial</MenuItem>
                  <MenuItem value="Industrial">Industrial</MenuItem>
                  <MenuItem value="Terreno">Terreno</MenuItem>
                  <MenuItem value="Mixto">Mixto</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Estatus Disponibilidad</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.estatusDisponibilidad}
                  label="Estatus Disponibilidad"
                  onChange={handleChange("estatusDisponibilidad")}
                >
                  <MenuItem value="Disponible">Disponible</MenuItem>
                  <MenuItem value="Reservado">Reservado</MenuItem>
                  <MenuItem value="Vendido">Vendido</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Es Reposeída</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.esReposeida}
                  label="Es Reposeída"
                  onChange={handleChange("esReposeida")}
                >
                  <MenuItem value="si">Si</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}
