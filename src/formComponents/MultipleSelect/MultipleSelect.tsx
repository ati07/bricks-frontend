import React from 'react'
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useDispatch } from 'react-redux';
import { setglobaltempDataKey } from '../../redux/features/globaltemp/globaltempSlice';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    disableScrollLock: true,
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};



function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontSize: '12px',
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
function MultipleSelect({ props, dataHandle, disable }: any) {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState<string[]>([]);
    const dispatch = useDispatch()
    // console.log("propsMS", props);
    const names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
    ];
    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        dispatch(setglobaltempDataKey({ key: props.key, value: typeof value === 'string' ? value.split(',') : value }))
    };
    return (
        <Box sx={{ minWidth: 120 }} component='div'>
            <FormControl fullWidth>
                <InputLabel id="demo-multiple-chip-label">{props.title}</InputLabel>
                <Select
                
                disabled={props.disabled || disable}
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    // MenuProps={{ disableScrollLock: true }}
                    // disableScrollLock={true}
                    value={props.value}
                    onChange={handleChange}
                    label={props.title}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {props.options.map((name: any) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={{ fontSize: '12px' }}
                            // style={getStyles(name, personName, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export default MultipleSelect