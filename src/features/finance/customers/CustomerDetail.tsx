import { Box, createTheme, TextField, ThemeProvider, Typography } from '@mui/material';
import React, { FunctionComponent, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { componentTheme } from '../../../assets/mui/styles';
import { Customer, User } from '../../../interface';
import { dataContext } from '../../assets/dataProvider';
import { customerObject, variables } from '../../assets/variables';


export default function CustomerDetail() {
    const data = useContext(dataContext)
    const id = useParams().id;
    const customerID = (id === undefined) ? ('') : (parseInt(id))

    const url = `${variables.urlbase}accounts/${data?.username}/customers`
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
        <ThemeProvider theme={componentTheme}>
            <Box className='componentClass'>
                <h4>Customer Detail</h4>
                {(Object.keys(customer).length === 0) ? ('') : (
                    <Box>
                        <Box className='customerInfo'>
                            <TextField
                                name='customerName'
                                value={customer.customerName}
                                type="text"
                            />
                            <TextField
                                value={customer.email}
                                name='email'
                                type="email"
                            />
                            <TextField
                                name='phone'
                                value={(customer.phone !== null) ? (customer.phone.toString()) : ('')}
                                type="number"
                            />
                        </Box>
                        <Box className='customerAddress'>
                            <TextField
                                value={customer.address}
                                type="text"
                            />
                            <TextField
                                value={customer.city}
                                type="text"
                            />
                            <TextField
                                value={customer.province}
                                type="text"
                            />
                            <TextField
                                value={customer.postal}
                                type="text"
                            />
                            <TextField
                                value={customer.country}
                                type="text"
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </ThemeProvider>
    )
}
