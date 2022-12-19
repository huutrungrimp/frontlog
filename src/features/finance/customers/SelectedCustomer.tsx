import { Box, TextField, Typography } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { boxStyle } from '../../../assets/mui/styles';
import { Customer } from '../../../interface';

interface selectedCustomer {
    selectedcustomer:Customer
}

export default function SelectedCustomer({selectedcustomer}:selectedCustomer) {
    
    return (
        <Box className='gx-0 p-3'>
            <Box sx={{ pt: 2 }}>
                <Typography variant='h5'>Selected Customer</Typography>
            </Box >
            {(Object.keys(selectedcustomer).length === 0) ? ('') : (
                <Box>
                    <Box
                        sx={boxStyle} 
                    >
                        <TextField
                            name='customerName'
                            value={selectedcustomer.customerName}
                            type="text"
                            sx={{ my: 2 }}
                        />
                        <TextField
                            value={selectedcustomer.email}
                            name='email'
                            type="email"
                            sx={{ my: 2 }}
                        />
                        <TextField
                            name='phone'
                            value={selectedcustomer.phone}
                            type="number"
                            sx={{ my: 2 }}
                        />
                    </Box>
                    <Box
                        sx={boxStyle}
                    >
                        <TextField
                            value={selectedcustomer.address}
                            type="text"
                            sx={{ my: 2, width: { md: '30%' }, mr: { xs: 0, md: 3 } }}
                        />
                        <TextField
                            value={selectedcustomer.city}
                            type="text"
                            sx={{ my: 2, mr: { xs: 0, md: 3 } }}
                        />
                        <TextField
                            value={selectedcustomer.province}
                            type="text"
                            sx={{ my: 2, mr: { xs: 0, md: 3 } }}
                        />
                        <TextField
                            value={selectedcustomer.postal}
                            type="text"
                            sx={{ my: 2, mr: { xs: 0, md: 3 } }}
                        />
                        <TextField
                            value={selectedcustomer.country}
                            type="text"
                            sx={{ my: 2 }}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    )
}
