import React, { useEffect, useState } from "react";
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  // GridSlotProps,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import { StripedDataGrid } from "../../common/helperComponent";
import { Box, Paper, Typography } from "@mui/material";
import { convertFormate } from "../../../formComponents/helper";



interface Step2Props {
  // unidades: number;
  // precioPorUnidad: number;
  onDataChange: (data: any[]) => void;
  data:any;
}

export default function Step6({
  onDataChange,
  data
}: Step2Props) {
  const [rows, setRows] = React.useState<any>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row:any) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  // Generate rows when unidades changes
  useEffect(() => {
    if (!data?.step1?.unidades) return;

    const baseDate = new Date("2026-01-01");

    const generatedRows = Array.from({ length: data?.step1?.unidades }, (_, i) => {
      const date = new Date(baseDate);
      date.setMonth(baseDate.getMonth() + i);

      return {
        id: i + 1,
        numeroUnidad: i + 1,
        fecha: date,
        impuestoTraspaso: 0,
      };
    });

    setRows(generatedRows);
    onDataChange(generatedRows);
  }, [data?.step1?.unidades]);

  const columns: GridColDef[] = [
    {
      field: "numeroUnidad",
      headerName: "Numero de Unidad",
      sortable: false,
      flex: 1,
      editable: false,
      headerClassName: "data-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fecha",
      headerName: "Fecha de Traspaso",
      sortable: false,
      flex: 1,
      editable: true,
      type: 'date',
      headerClassName: "data-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "impuestoTraspaso",
      headerName: "Impuesto Traspaso",
      sortable: false,
      flex: 1,
      editable: true,
      type: "number",
      headerClassName: "data-header",
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) =>
        `$${convertFormate(params.value)}`,
    },
  ];

  return (
    <Box>
      
        {/* <Typography variant="h5" mb={2} textAlign="center">
          Ventas Proyectadas
        </Typography> */}

        <div style={{ height: 450, width: "100%" }}>
          <StripedDataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            getRowHeight={() => 30}
            isRowSelectable={() => false}
            disableColumnMenu
            density="compact"
            hideFooterPagination
            sx={{
              "& .first-row": {
                backgroundColor: "#f5f5f5",
              },
              "&, [class^=MuiDataGrid]": { border: "none" },
              fontFamily: "DM Sans",
              display: "flex",
              justifyContent: "center",
              alignItem: "center",
              color: "#1b2559",
              fontSize: "10px",
              fontWeight: "700",
              "& .data-header": {
                borderBottom: "1px solid",
                textTransform: "uppercase",
                color: "#a0aec0",
                fontSize: "11px",
                fontWeight: "700",
              },
              "& .non-editable-row": {
                backgroundColor: "#3baf2a", // light gray
                color: "white",
              },
              "& .non-editable-row.Mui-selected, & .non-editable-row.Mui-hovered":
                {
                  backgroundColor: "#3baf2a !important", // keeps same color even on focus/hover
                }
            }}
            
          />
        </div>
      
    </Box>
  );
}
