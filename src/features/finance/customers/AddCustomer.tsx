import React from 'react'
import { Box, TextField, Button, Typography, Paper, ThemeProvider, IconButton, createTheme } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { addCustomer } from './customerSlice';
import { useNavigate } from 'react-router-dom';
import { customerObject } from '../../assets/variables';
import { componentTheme } from '../../../assets/mui/styles';

export default function AddCustomer() {

    const [customer, setCustomer] = React.useState(customerObject)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        })
    }

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const onSubmit = (e: React.MouseEvent) => {
        console.log(customer)
        dispatch(addCustomer(customer))
        navigate(-1)
    }

    console.log(customer)


    return (
        <ThemeProvider theme={componentTheme}>
            <Box className='componentClass'>
                <h4>Create Customer</h4>
                <Box className='customerInfo'>
                    <TextField
                        label="Name"
                        value={customer.customerName}
                        name='customerName'
                        onChange={onChange}
                        type="text"
                    />
                    <TextField
                        label="Email"
                        value={customer.email}
                        name='email'
                        onChange={onChange}
                        type="email"
                    />
                    <TextField
                        label="Phone"
                        name='phone'
                        value={customer.phone}
                        onChange={onChange}
                        type="number"
                    />
                </Box>
                <Box className='customerAddress'>
                    <TextField
                        label="Address"
                        value={customer.address}
                        name='address'
                        onChange={onChange}
                        type="text"
                    />
                    <TextField
                        label="City"
                        value={customer.city}
                        name='city'
                        onChange={onChange}
                        type="text"
                    />
                    <TextField
                        label="State/Province"
                        value={customer.province}
                        name='province'
                        onChange={onChange}
                        type="text"
                    />
                    <TextField
                        label="Postal/Zip Code"
                        name='postal'
                        value={customer.postal}
                        onChange={onChange}
                        type="text"
                    />
                    <TextField
                        label="Country"
                        name='country'
                        value={customer.country}
                        onChange={onChange}
                        type="text"
                    />
                </Box>
                <Button className='btnSubmit' onClick={onSubmit}>
                    Sumit
                </Button>
            </Box>
        </ThemeProvider >
    )
}
