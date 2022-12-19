import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectCustomer() {

    const existingStorage = localStorage.getItem('customers')
    const storage = (existingStorage === null ? {} : (JSON.parse(existingStorage)));

    const [customer, setCustomer] = React.useState('');

    const onChange = (event: SelectChangeEvent) => {
        setCustomer(event.target.value as string);
    };
    console.log(customer)

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Existing Customers</InputLabel>
            <Select
                value={customer}
                label="Existing Customers"
                onChange={onChange}
            >
                {Object.keys(storage).map(key => (
                    <MenuItem key={storage[key].name} value={storage[key].name}>{storage[key].name}</MenuItem>
                ))}
            </Select>

        </FormControl>
    );
}