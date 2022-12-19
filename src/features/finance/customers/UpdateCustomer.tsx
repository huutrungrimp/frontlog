import { Box, TextField, Typography, IconButton } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { boxStyle } from '../../../assets/mui/styles';
import Send from '@mui/icons-material/Send';
import { Button } from 'react-bootstrap';
import { useAppDispatch } from '../../../app/hooks';
import { updateCustomer } from './customerSlice';
import { customerObject } from '../../assets/variables';
import Update from '@mui/icons-material/Update';

export default function UpdateCustomer() {
    const key = useParams().id;
    const customerID = (key === undefined) ? ('') : (parseInt(key))

    const user = localStorage.getItem('userDetail');
    const existingUser = (user === null ? "" : (JSON.parse(localStorage.getItem('userDetail') || '')));

    const urlbase ='https://backlog2.up.railway.app/'

    const url = `${urlbase}accounts/${existingUser.username}/customers`
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
        <div className='financeContent gx-0'>
            <Box className='py-3 px-3 bg-light' sx={{ boxShadow: { xs: 3, md: 12 }, borderRadius: 4 }}>
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
                                onChange={onChange}
                            />
                            <TextField
                                value={customer.email}
                                name='email'
                                type="text"
                                sx={{ my: 2 }}
                                onChange={onChange}
                            />
                            <TextField
                                value={(customer.phone !== null) ? (customer.phone.toString()) : ('')}
                                name='phone'
                                type="number"
                                sx={{ my: 2 }}
                                onChange={onChange}
                            />
                        </Box>
                        <Box
                            sx={boxStyle}
                        >
                            <TextField
                                name='address'
                                value={customer.address}
                                type="text"
                                sx={{ my: 2, width: { md: '30%' }, mr: { xs: 0, md: 3 } }}
                                onChange={onChange}
                            />
                            <TextField
                                name='city'
                                value={customer.city}
                                type="text"
                                sx={{ my: 2, mr: { xs: 0, md: 3 } }}
                                onChange={onChange}
                            />
                            <TextField
                                name='province'
                                value={customer.province}
                                type="text"
                                sx={{ my: 2, mr: { xs: 0, md: 3 } }}
                                onChange={onChange}
                            />
                            <TextField
                                name='postal'
                                value={customer.postal}
                                type="text"
                                sx={{ my: 2, mr: { xs: 0, md: 3 } }}
                                onChange={onChange}
                            />
                            <TextField
                                name='country'
                                value={customer.country}
                                type="text"
                                sx={{ my: 2, mr: { xs: 0, md: 3 } }}
                                onChange={onChange}
                            />
                        </Box>
                    </Box>
                )}

                <IconButton aria-label="" onClick={onClick}>
                    <Update color='primary'/>
                    <Typography variant="body1" color="primary">Update</Typography>
                </IconButton>

            </Box>
        </div>
    )
}
