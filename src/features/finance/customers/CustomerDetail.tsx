import { Box, TextField, Typography } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { boxStyle } from '../../../assets/mui/styles';
import { Customer, User } from '../../../interface';
import { customerObject, variables } from '../../assets/variables';


export default function CustomerDetail({ username }: User) {
    const id = useParams().id;
    const customerID = (id === undefined) ? ('') : (parseInt(id))

    const url = `${variables.urlbase}accounts/${username}/customers`
    // const url ='http://127.0.0.1:8000/accounts/halan/customers'
    
    const [customer, setCustomer] = React.useState<Customer>(customerObject)
    React.useEffect(() => {
        fetch(url + '/' + customerID, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res => {
                setCustomer(res)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    console.log(customer.user)


    return (
        <div className='financeContent gx-0'>
            <Box sx={{ padding: 4, boxShadow: 3, borderRadius: 3 }}>
                <Box sx={{ pt: 2 }}>
                    <Typography variant='h5'>Customer Information</Typography>
                </Box >
                {(Object.keys(customer).length === 0) ? ('') : (
                    <Box>
                        <Box
                            sx={boxStyle}
                        >
                            <TextField
                                name='customerName'
                                value={customer.customerName}
                                type="text"
                                sx={{ my: 2 }}
                            />
                            <TextField
                                value={customer.email}
                                name='email'
                                type="email"
                                sx={{ my: 2 }}
                            />
                            <TextField
                                name='phone'
                                value={(customer.phone !== null) ? (customer.phone.toString()) : ('')}
                                type="number"
                                sx={{ my: 2 }}
                            />
                        </Box>
                        <Box
                            sx={boxStyle}
                        >
                            <TextField
                                value={customer.address}
                                type="text"
                                sx={{ my: 2, width: { md: '30%' }, mr: { xs: 0, md: 3 } }}
                            />
                            <TextField
                                value={customer.city}
                                type="text"
                                sx={{ my: 2, mr: { xs: 0, md: 3 } }}
                            />
                            <TextField
                                value={customer.province}
                                type="text"
                                sx={{ my: 2, mr: { xs: 0, md: 3 } }}
                            />
                            <TextField
                                value={customer.postal}
                                type="text"
                                sx={{ my: 2, mr: { xs: 0, md: 3 } }}
                            />
                            <TextField
                                value={customer.country}
                                type="text"
                                sx={{ my: 2 }}
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </div>
    )
}
