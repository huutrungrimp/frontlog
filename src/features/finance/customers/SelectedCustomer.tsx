import { Box, createTheme, TextField, ThemeProvider, Typography } from '@mui/material';
import { Customer } from '../../../interface';

interface selectedCustomer {
    selectedcustomer: Customer
}

export default function SelectedCustomer({ selectedcustomer }: selectedCustomer) {

    const theme = createTheme({
        components: {
            MuiFormControl: {
                styleOverrides: {
                    root: {
                        width: '100%',
                    }
                }
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        marginBottom: '20px',
                    }
                }
            }
        }
    })


    return (
        <ThemeProvider theme={theme}>
            <Box className='componentClass'>
                <h4>Selected Customer</h4>
                {(Object.keys(selectedcustomer).length === 0) ? ('') : (
                    <Box>
                        <Box className='customerInfo'>
                            <TextField
                                name='customerName'
                                value={selectedcustomer.customerName}
                                type="text"
                            />
                            <TextField
                                value={selectedcustomer.email}
                                name='email'
                                type="email"
                            />
                            <TextField
                                name='phone'
                                value={selectedcustomer.phone}
                                type="number"
                            />
                        </Box>
                        <Box className='customerAddress'>
                            <TextField
                                value={selectedcustomer.address}
                                type="text"
                            />
                            <TextField
                                value={selectedcustomer.city}
                                type="text"
                            />
                            <TextField
                                value={selectedcustomer.province}
                                type="text"
                            />
                            <TextField
                                value={selectedcustomer.postal}
                                type="text"
                            />
                            <TextField
                                value={selectedcustomer.country}
                                type="text"
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </ThemeProvider>
    )
}
