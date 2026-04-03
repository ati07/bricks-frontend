import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridColumnHeaderParams,
  GridRowParams,
//   GridSlotProps,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import { Stack, Typography } from '@mui/material';
import { Add, Height } from '@mui/icons-material';
import AddItemDropDown from '../../formComponents/AddItemDropDown/AddItemDropDown';
import { StripedDataGrid } from '../common/helperComponent';
import './workProgress.css'
// import DropDown from '../../formComponents/DropDown/DropDown';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { StripedDataGrid } from '../client/Client';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows: GridRowsProp = [
  {
    id: randomId(),
    name: 'Actividades preliminares (actividades inciales)',
    'Presupuesto Aprobado': 36,
    'Presupuesto Aprobado Percentage': 0.00,
    trabajosExtras: 0.00,
    costoTotal: 0.00,
    costoTotalPercentage: 0.00,
    'Cuenta de Avance Acum': 0.00,
    'Cuenta de Avance Acum Percentage': 0.00,
    'Avance Físico Proyectos': 0.00,
    'Avance Físico Proyectos Percentage': 0.00,
    'VARIACIÓN Cta Avance / Físico': 0.00,
    'VARIACIÓN Cta Avance / Físico Percentage': 0.00,
  },
  {
    id: randomId(),
    name: 'Movimiento de tierra',
    'Presupuesto Aprobado': 36,
    'Presupuesto Aprobado Percentage': 0.00,
    trabajosExtras: 0.00,
    costoTotal: 0.00,
    costoTotalPercentage: 0.00,
    'Cuenta de Avance Acum': 0.00,
    'Cuenta de Avance Acum Percentage': 0.00,
    'Avance Físico Proyectos': 0.00,
    'Avance Físico Proyectos Percentage': 0.00,
    'VARIACIÓN Cta Avance / Físico': 0.00,
    'VARIACIÓN Cta Avance / Físico Percentage': 0.00,
  },
  {
    id: randomId(),
    name: 'Sistema pluvial',
    'Presupuesto Aprobado': 36,
    'Presupuesto Aprobado Percentage': 0.00,
    trabajosExtras: 0.00,
    costoTotal: 0.00,
    costoTotalPercentage: 0.00,
    'Cuenta de Avance Acum': 0.00,
    'Cuenta de Avance Acum Percentage': 0.00,
    'Avance Físico Proyectos': 0.00,
    'Avance Físico Proyectos Percentage': 0.00,
    'VARIACIÓN Cta Avance / Físico': 0.00,
    'VARIACIÓN Cta Avance / Físico Percentage': 0.00,
  },
  {
    id: randomId(),
    name: 'Sistenma de acueducto',
    'Presupuesto Aprobado': 36,
    'Presupuesto Aprobado Percentage': 0.00,
    trabajosExtras: 0.00,
    costoTotal: 0.00,
    costoTotalPercentage: 0.00,
    'Cuenta de Avance Acum': 0.00,
    'Cuenta de Avance Acum Percentage': 0.00,
    'Avance Físico Proyectos': 0.00,
    'Avance Físico Proyectos Percentage': 0.00,
    'VARIACIÓN Cta Avance / Físico': 0.00,
    'VARIACIÓN Cta Avance / Físico Percentage': 0.00,
  },
  {
    id: randomId(),
    name: 'Infraestructura Sanitaria',
    'Presupuesto Aprobado': 36,
    'Presupuesto Aprobado Percentage': 0.00,
    trabajosExtras: 0.00,
    costoTotal: 0.00,
    costoTotalPercentage: 0.00,
    'Cuenta de Avance Acum': 0.00,
    'Cuenta de Avance Acum Percentage': 0.00,
    'Avance Físico Proyectos': 0.00,
    'Avance Físico Proyectos Percentage': 0.00,
    'VARIACIÓN Cta Avance / Físico': 0.00,
    'VARIACIÓN Cta Avance / Físico Percentage': 0.00,
  },
  {
    id: randomId(),
    name: 'Infraestructura eléctrica',
    'Presupuesto Aprobado': 36,
    'Presupuesto Aprobado Percentage': 0.00,
    trabajosExtras: 0.00,
    costoTotal: 0.00,
    costoTotalPercentage: 0.00,
    'Cuenta de Avance Acum': 0.00,
    'Cuenta de Avance Acum Percentage': 0.00,
    'Avance Físico Proyectos': 0.00,
    'Avance Físico Proyectos Percentage': 0.00,
    'VARIACIÓN Cta Avance / Físico': 0.00,
    'VARIACIÓN Cta Avance / Físico Percentage': 0.00,
  },{
    id: randomId(),
    name: 'Infraestructura Vial',
    'Presupuesto Aprobado': 36,
    'Presupuesto Aprobado Percentage': 0.00,
    trabajosExtras: 0.00,
    costoTotal: 0.00,
    costoTotalPercentage: 0.00,
    'Cuenta de Avance Acum': 0.00,
    'Cuenta de Avance Acum Percentage': 0.00,
    'Avance Físico Proyectos': 0.00,
    'Avance Físico Proyectos Percentage': 0.00,
    'VARIACIÓN Cta Avance / Físico': 0.00,
    'VARIACIÓN Cta Avance / Físico Percentage': 0.00,
  },{
    id: randomId(),
    name: 'Otros (señalización, paisajismo, riego, limpieza)',
    'Presupuesto Aprobado': 36,
    'Presupuesto Aprobado Percentage': 0.00,
    trabajosExtras: 0.00,
    costoTotal: 0.00,
    costoTotalPercentage: 0.00,
    'Cuenta de Avance Acum': 0.00,
    'Cuenta de Avance Acum Percentage': 0.00,
    'Avance Físico Proyectos': 0.00,
    'Avance Físico Proyectos Percentage': 0.00,
    'VARIACIÓN Cta Avance / Físico': 0.00,
    'VARIACIÓN Cta Avance / Físico Percentage': 0.00,
  },
  
];



declare module '@mui/x-data-grid' {
  interface ToolbarPropsOverrides {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
  }
}



// GridSlotProps['toolbar']
function EditToolbar(props:any ) {
  // const { setRows, setRowModesModel } = props;

  // const handleClick = () => {
  //   const id = randomId();
  //   setRows((oldRows:any) => [
  //     ...oldRows,
  //     { id, name: '', age: '', role: '', isNew: true },
  //   ]);
  //   setRowModesModel((oldModel:any) => ({
  //     ...oldModel,
  //     [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
  //   }));
  // };

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
 let options = ["ALTAMAR",
  "CASAMAR",
  "COROTÚ GOLF VILLAS",
  "LAGUNA",
  "LAKESHORE",
  "MARINA GARDENS",
  "MARINA VILLAGE",
  "MARINE LODGE",
  "PENINSULA SUR",
  "RIVERSIDE",
  "VELAMAR",
  "VELAMAR VILLAGE",
  "VILLA MARINA CONDO",
  "VILLA MARINA FRENTE DE MAR",
  "VILLA MARINA LOTES",
  "COROTU",
  ]
  return (
    <Box sx={{ minWidth: 250,padding:"10px" }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Select Project</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Select Project"
          onChange={handleChange}
        >
          {options.map((item:any,index:number)=><MenuItem key={index} value={item} style={{ fontSize: '12px' }}>{item}</MenuItem>)}
          
        </Select>
      </FormControl>
    </Box>
    // <GridToolbarContainer>
      
      
    // </GridToolbarContainer>
  );
}


export default function WorkProgress() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
      { field: 'name', headerName: 'Name', flex:0.8,editable: false,sortable: false,
      headerClassName: 'data-header',
      renderHeader: (params: GridColumnHeaderParams) => (
        
        <div style={{ whiteSpace: "normal", textAlign: "center", lineHeight: "1.2",fontWeight:'400' }}>
           {"Name"}
        </div>
      )
       },
    {
      field: 'Presupuesto Aprobado',
      // headerName: "Presupuesto Aprobado",
      type: 'number',
      flex:0.4,
      align: 'left',
      headerAlign: 'left',
      // editable: ((params:any) => !params.row.isTotal) as any,
      editable: true,

      sortable: false,
      headerClassName: 'data-header',
      // headerClassName: "custom-header", // Header styles
      cellClassName: "custom-cell",

      renderHeader: (params: GridColumnHeaderParams) => (
        
        <div style={{ whiteSpace: "normal", textAlign: "center", lineHeight: "1.2",fontWeight:'400' }}>
           {"Presupuesto Aprobado"}
        </div>
      )
    },
    {
      field: 'Presupuesto Aprobado Percentage',
      headerName: '%',
      type: 'number',
      flex:0.07,
      // editable: ((params:any) => !params.row.isTotal) as any,
      editable: true,

      sortable: false,
      headerClassName: 'data-header',
      // headerClassName: "custom-header", // Header styles
      cellClassName: "custom-cell",
      
    },
    {
      field: 'trabajosExtras',
      headerName: "Trabajos Extras",
      flex:0.5,
      // editable: ((params:any) => !params.row.isTotal) as any,
      editable: true,

      type: 'number',
      sortable: false,
      headerClassName: 'data-header',
      // headerClassName: "custom-header", // Header styles
      cellClassName: "custom-cell",

      renderHeader: (params: GridColumnHeaderParams) => (
        
        <div style={{ whiteSpace: "normal", textAlign: "center", lineHeight: "1.2",fontWeight:'400' }}>
           {"Trabajos Extras"}
        </div>
      )
    },
    {
      field: 'costoTotal',
      headerName: "Costo Total",
      flex:0.3,
      // editable: ((params:any) => !params.row.isTotal) as any,
      editable: true,

      type: 'number',
      sortable: false,
      headerClassName: 'data-header',
      // headerClassName: "custom-header", // Header styles
      cellClassName: "custom-cell",

      renderHeader: (params: GridColumnHeaderParams) => (
        
        <div style={{ whiteSpace: "normal", textAlign: "center", lineHeight: "1.2",fontWeight:'400' }}>
           {"Costo Total"}
        </div>
      )
    },
    {
      field: 'costoTotalPercentage',
      headerName: "%",
      flex:0.07,
      // editable: ((params:any) => !params.row.isTotal) as any,
      editable: true,

      type: 'number',
      sortable: false,
      headerClassName: 'data-header',
      // headerClassName: "custom-header", // Header styles
      cellClassName: "custom-cell",
      
    },
    {
      field: 'Cuenta de Avance Acum',
      headerName: "Cuenta de Avance Acum",
      flex:0.6,
      // editable: ((params:any) => !params.row.isTotal) as any,
      editable: true,

      type: 'number',
      sortable: false,
      headerClassName: 'data-header',
      // headerClassName: "custom-header", // Header styles
      cellClassName: "custom-cell",

      renderHeader: (params: GridColumnHeaderParams) => (
        
        <div style={{ whiteSpace: "normal", textAlign: "center", lineHeight: "1.2",fontWeight:'400' }}>
           {"Cuenta de Avance Acum"}
        </div>
      )
    },{
      field: 'Cuenta de Avance Acum Percentage',
      headerName: "%",
      flex:0.07,
      // editable: ((params:any) => !params.row.isTotal) as any,
      editable: true,

      type: 'number',
      sortable: false,
      headerClassName: 'data-header',
      // headerClassName: "custom-header", // Header styles
      cellClassName: "custom-cell",

      // valueOptions: ['Market', 'Finance', 'Development'],
    },{
      field: 'Avance Físico Proyectos',
      headerName: "Avance Físico Proyectos",
      flex:0.5,
      // editable: ((params:any) => !params.row.isTotal) as any,
      editable: true,

      type: 'number',
      sortable: false,
      headerClassName: 'data-header',
      // headerClassName: "custom-header", // Header styles
      cellClassName: "custom-cell",

      renderHeader: (params: GridColumnHeaderParams) => (
        
        <div style={{ whiteSpace: "normal", textAlign: "center", lineHeight: "1.2",fontWeight:'400' }}>
           {"Avance Físico Proyectos"}
        </div>
      )
    },{
      field: 'Avance Físico Proyectos Percentage',
      headerName: "%",
      flex:0.07,
      // editable: ((params:any) => !params.row.isTotal) as any,
      editable: true,

      type: 'number',
      sortable: false,
      headerClassName: 'data-header',
      // headerClassName: "custom-header", // Header styles
      cellClassName: "custom-cell",

      // valueOptions: ['Market', 'Finance', 'Development'],
    },
    {
      field: 'VARIACIÓN Cta Avance / Físico',
      headerName: "VARIACIÓN Cta Avance / Físico",
      flex:0.6,
      // editable: ((params:any) => !params.row.isTotal) as any,
      editable: true,

      type: 'number',
      sortable: false,
      headerClassName: 'data-header',
      // headerClassName: "custom-header", // Header styles
      cellClassName: "custom-cell",
      renderHeader: (params: GridColumnHeaderParams) => (
        
        <div style={{ whiteSpace: "normal", textAlign: "center", lineHeight: "1.2",fontWeight:'400' }}>
           {"VARIACIÓN Cta Avance / Físico"}
        </div>
      )
    },
    {
      field: 'VARIACIÓN Cta Avance / Físico Percentage',
      headerName: "%",
      flex:0.07,
      // editable: ((params:any) => !params.row.isTotal) as any,
      editable: true,

      type: 'number',
      headerClassName: 'data-header',
      // headerClassName: "custom-header", // Header styles
      cellClassName: "custom-cell",
      sortable: false
      // valueOptions: ['Market', 'Finance', 'Development'],
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex:0.4,
      // cellClassName: 'actions',
      // headerClassName: "custom-header", // Header styles
      headerClassName: 'data-header',
      getActions: ({ id, row }) => {
        // Check if this is the total row
        if (row.isTotal) {
          return []; // Return empty array for total row to hide actions
        }
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon sx={{fontSize:'12px',color:'rgb(59, 175, 42)'}}/>}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon sx={{fontSize:'12px'}} />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon sx={{fontSize:'12px'}}/>}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon sx={{fontSize:'12px'}} />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];




  // Add this function to your component
const calculateTotals = (dataRows:any) => {
  const numericFields = [
    'Presupuesto Aprobado',
    'Presupuesto Aprobado Percentage',
    'trabajosExtras',
    'costoTotal',
    'costoTotalPercentage',
    'Cuenta de Avance Acum',
    'Cuenta de Avance Acum Percentage',
    'Avance Físico Proyectos',
    'Avance Físico Proyectos Percentage',
    'VARIACIÓN Cta Avance / Físico',
    'VARIACIÓN Cta Avance / Físico Percentage'
  ];
  
  // Initialize totals object
  const totals:any = {
    id: 'total-row',
    name: 'Total de Infraestructura',
    isTotal: true
  };
  
  // Calculate sum for each numeric field
  numericFields.forEach(field => {
    totals[field] = dataRows.reduce((sum:any, row:any) => {
      // Convert to number and handle potential NaN
      const value = Number(row[field]) || 0;
      return sum + value;
    }, 0);
    
    // Format to 2 decimal places for percentage fields
    if (field.includes('Percentage')) {
      totals[field] = parseFloat(totals[field].toFixed(2));
    }
  });
  
  return totals;
};

// Use this in your component to update the rows
React.useEffect(() => {
  // If there are no rows yet, skip
  if (rows.length === 0) return;
  
  // Filter out any existing total row
  const dataRows = rows.filter(row => !row.isTotal);
  
  // Calculate the totals
  const totalRow = calculateTotals(dataRows);
  
  // Create new rows array with data rows plus total row
  const newRows = [...dataRows, totalRow];
  
  // Update state only if totals have changed to avoid infinite loop
  if (JSON.stringify(rows) !== JSON.stringify(newRows)) {
    setRows(newRows);
  }
}, [rows]); // You might need to adjust this dependency array



// Add a state for data rows and total row separately
const [dataRows, setDataRows] = React.useState(initialRows);
const [totalRow, setTotalRow] = React.useState(null);

// Effect to recalculate totals when data rows change
React.useEffect(() => {
  const newTotalRow = calculateTotals(dataRows);
  setTotalRow(newTotalRow);
}, [dataRows]);

// Combine data rows and total row for display
const allRows = React.useMemo(() => {
  return totalRow ? [...dataRows, totalRow] : dataRows;
}, [dataRows, totalRow]);

// Use allRows in your DataGrid instead of rows



  return (

    // <Stack paddingTop={{ xs: "80px", sm: '80px', md: '60px', xl: '60px' }}>   
    <Stack paddingTop={{ xs: "130px", sm: '130px', md: '80px',xl:'80px' }} >
      <Box
        sx={{
          borderRadius: '16px',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '600px', // Use viewport height
          // gap: 2, // Add gap between tables
          overflow: 'hidden', // Add this line
        }}
      >
        <Box style={{width:'300px'}}>
          <EditToolbar/>
        </Box>
        {/* First Table Container */}
        <Box
          sx={{
            // borderRadius: '16px',
            border: '1px solid #EBEFFA',
            width: '100%',
            backgroundColor: 'white',
            // flex: '1.1', // Take available space
            height:'450px',
            overflow: 'hidden', // Add this line
            // height: '100%', // Full height of container
          }}
        >
          <StripedDataGrid
            hideFooter={true}
            rowHeight={25}
            columnHeaderHeight={30}
            disableColumnMenu
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            // slots={{ toolbar: EditToolbar }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
            getRowClassName={(params) => {
              return params.row.isTotal ? 'total-row' : '';
            }}
            // isRowSelectable={(params) => !params.row.isTotal}
            sx={{
              '&, [class^=MuiDataGrid]': { border: 'none' },
              fontFamily: 'DM Sans',
              display: 'flex', 
              justifyContent: 'center', 
              alignItem: 'center', 
              color: "#1b2559", 
              fontSize: '9px',
              fontWeight: '700',
              // height: '100%', // Full height of container
              overflow: 'hidden', // Add this line
              '& .MuiDataGrid-main': {
                overflow: 'hidden', // Add this line too
              },
              '& .data-header': {
                borderBottom: '1px solid',
                textTransform: 'uppercase',
                color: '#a0aec0',
                fontSize: '11px',
                fontWeight: '600'
              },
              '& .total-row': {
                backgroundColor: '#f8f9fa',
                fontWeight: 'bold',
                borderTop: '2px solid #dee2e6',
                '& .MuiDataGrid-cell': {
                  color: '#1b2559',
                  fontSize: '10px',
                }
              }
            }}
          />
  

        </Box>

        {/* Second Table Container */}
        <Box
          sx={{
            // borderRadius: '16px',
            border: '1px solid #EBEFFA',
            width: '100%',
            backgroundColor: 'white',
            // flex: '1.1', // Take available space
            // marginTop:'300px',
            height:'450px',
            overflow:'hidden'
          }}
        >
          <StripedDataGrid
            hideFooter={true}
            rowHeight={25}
            columnHeaderHeight={30}
            disableColumnMenu
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slotProps={{
              toolbar: { setRows: setRows, setRowModesModel },
            }}
            getRowClassName={(params) => {
              return params.row.isTotal ? 'total-row' : '';
            }}
            // isRowSelectable={(params) => !params.row.isTotal}
            sx={{
              '&, [class^=MuiDataGrid]': { border: 'none' },
              fontFamily: 'DM Sans',
              display: 'flex', 
              justifyContent: 'center', 
              alignItem: 'center', 
              color: "#1b2559", 
              fontSize: '9px',
              fontWeight: '700',
              // height: '100%', // Full height of container
              overflow: 'hidden', // Add this line
              '& .MuiDataGrid-main': {
                overflow: 'hidden', // Add this line too
              },
              '& .data-header': {
                borderBottom: '1px solid',
                textTransform: 'uppercase',
                color: '#a0aec0',
                fontSize: '11px',
                fontWeight: '600'
              },
              '& .total-row': {
                backgroundColor: '#f8f9fa',
                fontWeight: 'bold',
                borderTop: '2px solid #dee2e6',
                '& .MuiDataGrid-cell': {
                  color: '#1b2559',
                  fontSize: '10px',
                }
              }
            }}
          />
        </Box>
      </Box>
    </Stack>

  );
}
