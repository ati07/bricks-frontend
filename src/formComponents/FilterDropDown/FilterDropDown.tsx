import React, { useState } from 'react'
import { Box, Checkbox, Chip, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { Theme, useTheme } from '@mui/material/styles';
import './filter.css'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
function FilterDropDown({ value, options, callBackFunction, multiple = true,disable }: any) {
    const theme = useTheme();
    const [data, setData] = useState<string[]>([])
    const handleChange = (event: SelectChangeEvent<typeof data>) => {
        const {
            target: { value },
        } = event;
        setData(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        callBackFunction(typeof value === 'string' ? value.split(',') : value,)
    }
    return (
        <Box sx={{ minWidth: '50%' }} component='div'>
            <FormControl fullWidth style={{ minHeight: '30px',borderColor:'#E4E5E7 !important' }}>
                {/* <InputLabel id="demo-multiple-chip-label">{props.title}</InputLabel> */}
                <Select
                    disabled={disable}
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple={multiple}
                    value={value}
                    onChange={handleChange}
                    // label={props.title}
                    // input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'initial', gap: 0.5,marginTop:'4px' }}>
                            {selected.map((value: any) => (

                                <Chip key={value} label={value} style={{ height: '15px',fontSize:'10px' }} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                    sx={{
                        width: '100%',
                        height: '25px',
                        // top: '5px',
                        display:'flex',
                        justifyContent:'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius:'10px',
                        borderColor:'#E4E5E7 !important',
                        '&:hover':{
                            border:'none'
                        }
                    }}
                >
                    {options.map((name: any) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={{fontSize:'12px',height:'25px'}}
                            // style={getStyles(name, value, theme)}
                        >
                            <Checkbox checked={value.indexOf(name) > -1} />
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export default FilterDropDown