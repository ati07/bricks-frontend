import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
import { dateFormate } from '../../components/dashboard/helpers/DatePicker';
import logo from '../../assets/images/whitelogo.png';
import GetAppIcon from '@mui/icons-material/GetApp';
import { Box, ButtonBase } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

export default function ExportButton({csvReport,dataTable}:any) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  console.log('csvReport',csvReport)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const exportPDF = () => {
    const unit = "px";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 170;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(10);

    const title = "Chargeback Pro Latam";
    // const headers = [["NAME", "PROFESSION"]];

    // const data = dataTable.data.map((elt:any)=> [elt.name, elt.profession]);
    // console.log("object",dataTable);
    let content = {
      startY: 65,
      head: dataTable.headers,
      body: dataTable.data
    };
    // doc.text(title, marginLeft, 30);
    doc.addImage(logo, "PNG", 30, 10, 150, 20);
    doc.text(`Report : ${dataTable.subject}`, 30,50);
    doc.text(`Date : ${dateFormate(new Date(),'MM/DD/YYYY')}`, 350,50);
    autoTable(doc,content)
    // doc.autoTable(content);
    doc.save(dataTable.filename)
  }
  // '#F37021'
  return (
    <Box sx={{marginTop:'-2px'}}>
      <ButtonBase style={{ 
        paddingLeft:"15px",
        paddingRight:"15px",
        fontSize: '0.78rem',
        // textTransform:"uppercase",
        // top: '5px',
        display:"flex",
        justifyContent:"space-around",
        alignItems:"center", 
        borderRadius: '16px', 
        width: '100px', 
        fontWeight:'500',
        // marginLeft: '10px', 
        height: '30px', 
        backgroundColor: '#422afb', 
        color: '#ffffff' }} onClick={handleClick}>
          <SaveAltIcon style={{fontSize:'16px'}}/>
          Export
        {/* <GetAppIcon style={{marginRight:'2px'}}/>  */}
      </ButtonBase>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2}}><CSVLink {...csvReport}>Download as CSV</CSVLink></Typography>
        <Typography sx={{ p: 2 ,cursor:'pointer'}} onClick={exportPDF}>Download as PDF</Typography>
      </Popover>
    </Box>
  );
}