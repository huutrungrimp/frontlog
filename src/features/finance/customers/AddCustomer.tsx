import React from 'react'
import { Box, TextField, Button, Typography, Paper, ThemeProvider, IconButton } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { boxStyle, addCustomerStyle } from '../../../assets/mui/styles';
import { addCustomer } from './customerSlice';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../../assets/mui/styles';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { customerObject } from '../../assets/variables';

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
        <ThemeProvider theme={theme}>
            <div className='financeContent gx-0'>
                <Box sx={{ padding: 4, boxShadow: 3, borderRadius: 3 }}>
                    <Box>
                        <Typography variant='h5'>Customer Information</Typography>
                    </Box>
                    <Box
                        sx={boxStyle}
                    >
                        <TextField
                            label="Name"
                            value={customer.customerName}
                            name='customerName'
                            onChange={onChange}
                            type="text"
                            sx={{ my: 3, width: { md: '30%', xs: '100%' } }}
                        />
                        <TextField
                            label="Email"
                            value={customer.email}
                            name='email'
                            onChange={onChange}
                            type="email"
                            sx={{ my: 3, width: { md: '30%', xs: '100%' } }}
                        />
                        <TextField
                            label="Phone"
                            name='phone'
                            value={customer.phone}
                            onChange={onChange}
                            type="number"
                            sx={{ my: 3, width: { md: '30%', xs: '100%' } }}
                        />
                    </Box>
                    <Box
                        sx={boxStyle}
                    >
                        <TextField
                            label="Address"
                            value={customer.address}
                            name='address'
                            onChange={onChange}
                            type="text"
                            sx={{ my: 3, width: { md: '30%', xs: '100%' }, mr: { xs: 0, md: 3 } }}
                        />
                        <TextField
                            label="City"
                            value={customer.city}
                            name='city'
                            onChange={onChange}
                            type="text"
                            sx={{ my: 3, width: { md: '30%', xs: '100%' }, mr: { xs: 0, md: 3 } }}
                        />
                        <TextField
                            label="State/Province"
                            value={customer.province}
                            name='province'
                            onChange={onChange}
                            type="text"
                            sx={{ my: 3, width: { md: '30%', xs: '100%' }, mr: { xs: 0, md: 3 } }}
                        />
                        <TextField
                            label="Postal/Zip Code"
                            name='postal'
                            value={customer.postal}
                            onChange={onChange}
                            type="text"
                            sx={{ my: 3, width: { md: '30%', xs: '100%' }, mr: { xs: 0, md: 3 } }}
                        />
                        <TextField
                            label="Country"
                            name='country'
                            value={customer.country}
                            onChange={onChange}
                            type="text"
                            sx={{ my: 3, width: { md: '30%', xs: '100%' } }}
                        />
                    </Box>
                    <Box>
                        <IconButton onClick={onSubmit}>
                            <ControlPointIcon sx={{ ml: 0, fontSize: '30', color: 'secondary.dark' }} fontSize="large" color='success' />
                            <Typography color='black'>Add</Typography>
                        </IconButton>
                    </Box>
                </Box>
            </div>
        </ThemeProvider >
    )
}
