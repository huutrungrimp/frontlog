import { Box, TextField, Typography, IconButton, createTheme, ThemeProvider } from '@mui/material';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { componentTheme } from '../../../assets/mui/styles';
import { useAppDispatch } from '../../../app/hooks';
import { updateCustomer } from './customerSlice';
import { customerObject, variables } from '../../assets/variables';
import Update from '@mui/icons-material/Update';
import { dataContext } from '../../assets/dataProvider';

export default function UpdateCustomer() {
    const data = useContext(dataContext)
    const key = useParams().id;
    const customerID = (key === undefined) ? ('') : (parseInt(key))
    const urlbase = 'https://backlog2.up.railway.app/'

    const url = `${variables.urlbase}accounts/${data?.username}/customers`
    // const url = `http://127.0.0.1:8000/accounts/${existingUser.username}/customers`
    console.log(url + '/' + customerID + '/update')


    const dispatch = useAppDispatch()

    console.log(key)


    const [customer, setCustomer] = React.useState(customerObject)

    React.useEffect(() => {
        fetch(url + '/' + customerID + '/update', {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res => {
                // const customer = res.delete('user')
                delete res['user']
                setCustomer(res)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        })
    }

    const onClick = (e: React.MouseEvent) => {
        console.log(customer)
        dispatch(updateCustomer({
            id: key ? key : '',
            customer
        }))
    }

    return (
        <ThemeProvider theme={componentTheme}>
            <Box className='componentClass'>
                <h4>Update Customer</h4>
                {(Object.keys(customer).length === 0) ? ('') : (
                    <Box>
                        <Box className='customerInfo'>
                            <TextField
                                name='customerName'
                                value={customer.customerName}
                                type="text"
                                onChange={onChange}
                            />
                            <TextField
                                value={customer.email}
                                name='email'
                                type="text"
                                onChange={onChange}
                            />
                            <TextField
                                value={(customer.phone !== null) ? (customer.phone.toString()) : ('')}
                                name='phone'
                                type="number"
                                onChange={onChange}
                            />
                        </Box>
                        <Box className='customerAddress'>
                            <TextField
                                name='address'
                                value={customer.address}
                                type="text"
                                onChange={onChange}
                            />
                            <TextField
                                name='city'
                                value={customer.city}
                                type="text"
                                onChange={onChange}
                            />
                            <TextField
                                name='province'
                                value={customer.province}
                                type="text"
                                onChange={onChange}
                            />
                            <TextField
                                name='postal'
                                value={customer.postal}
                                type="text"
                                onChange={onChange}
                            />
                            <TextField
                                name='country'
                                value={customer.country}
                                type="text"
                                onChange={onChange}
                            />
                        </Box>
                    </Box>
                )}
                <IconButton aria-label="" onClick={onClick}>
                    <Update color='primary' />
                    <Typography variant="body1" color="primary">Update</Typography>
                </IconButton>
            </Box>
        </ThemeProvider>

    )
}
