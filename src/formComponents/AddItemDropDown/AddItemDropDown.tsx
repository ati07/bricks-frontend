import * as React from "react";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  // Select,
  // SelectChangeEvent,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  Paper,
  MenuList,
  ButtonBase,
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddIcon from "@mui/icons-material/Add";
import { setglobaltempDataKey } from "../../redux/features/globaltemp/globaltempSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

export default function AddItemDropDown({ props, dataHandle, disable }: any) {
  const [items, setItems] = React.useState<string[]>(props.options || []);
  const [name, setName] = React.useState("");
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation();
  // const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (event: SelectChangeEvent) => {
    // dataHandle && dataHandle(event.target.value);
    event.stopPropagation()
        console.log('props',props,event)
    
    dispatch(setglobaltempDataKey({ key: props.key, value: event.target.value }))
  };

  const handleAddItem = () => {
    if (name.trim() && !items.includes(name)) {
      setItems([...items, name]);
      setName("");
      // setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  return (
    
    <Box sx={{ minWidth: 250 }} component="div">
      <FormControl fullWidth>
        <InputLabel id="mui-select-label">{props.title}</InputLabel>
        <Select
          error={props.error}
          labelId="mui-select-label"
          id="mui-select"
          value={props.value}
          label={props.title}
          onChange={handleChange}
          disabled={props.disable || disable}
          MenuProps={{ disableScrollLock: true }}
          renderValue={(selected) => selected || "Select an option"}
        >
          
          {/* Scrollable Menu Items */}
         


           {/* Fixed Input Section */}
         <Paper sx={{ position: "sticky", top: 0, zIndex: 1000, background: "white", p: 1 }}>
          <TextField
              fullWidth
              placeholder="Add new item"
              value={name}
              onChange={(e) => {
                // e.stopPropagation()
                console.log("e",e.target.value)
                setName(e.target.value)
              }}
              onKeyDown={(e) => e.stopPropagation()} // Prevent closing on key events
              onMouseDown={(e) => e.stopPropagation()} // Prevent dropdown from closing when clicking
              // inputRef={inputRef}
            />
            
            <Button
              variant="contained"
              size="small"
              onClick={handleAddItem}
              sx={{ mt: 1 ,
                borderRadius: '16px',
                backgroundColor: '#F37021',
                            // padding: '5px',
                            color: '#ffffff', 
                '&:hover': {
                  backgroundColor: '#F37021',
                }           
              }}
              disabled={!name.trim()}
              fullWidth
            >
              <AddIcon /> Add
            </Button>
            <Divider sx={{ mt: 1 }} />

          </Paper>
          {props.options.map((item:any, index:number) => (
            <MenuItem key={index} value={item} style={{ fontSize: '12px' }}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
    
      
  );
}
