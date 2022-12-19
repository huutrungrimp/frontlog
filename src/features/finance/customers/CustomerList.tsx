import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

import UpdateIcon from '@mui/icons-material/Update';
import { IconButton, Button, Paper, ThemeProvider, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Customer, User } from '../../../interface';
import { theme } from '../../../assets/mui/styles';
import { customerObject, variables } from '../../assets/variables';



export default function CustomerList({ username }: User) {
    const navigate = useNavigate()

    const url = `${variables.urlbase}/accounts/${username}/customers`
    // const url = `http://127.0.0.1:8000/accounts/${username}/customers`
    console.log(url)

    const [customers, setCustomers] = React.useState<Array<Customer>>([customerObject])

    React.useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res => {
                setCustomers(res)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

   customers.map(customer => console.log(customer.id))


    return (
        <ThemeProvider theme={theme}>
            <div className='financeContent gx-0'>
                <Box sx={{ maxWidth: '500px', boxShadow: { xs: 0, md: 12 }, borderRadius: 4 }}>
                    <h3>Existing Customers</h3>
                    <Box>
                        {customers.map(customer => (
                            <Box display="flex" justifyContent='space-between' key={customer.id + customer.customerName.replace(/\s+/g, '-')}>
                                <Box sx={{ width: '60%', paddingLeft: {xs:'10px', md:'20px'} }}>
                                    <Link href={'/'+ username + '/finance/customers/' + customer.id}>{customer.customerName}</Link>
                                </Box>
                                <Box sx={{ width: '20%' }}>
                                    <IconButton aria-label="" onClick={() => navigate('/'+ username + '/finance/customers/' + customer.id + '/delete')}>
                                        <DeleteIcon color='secondary' />
                                    </IconButton>
                                </Box>
                                <Box sx={{ width: '20%' }}>
                                    <IconButton onClick={() => { navigate('/'+ username + '/finance/customers/' + customer.id + '/update') }}>
                                        <UpdateIcon color='primary' />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <Box>
                        <IconButton onClick={() => { navigate('/' + username + '/finance/customers/' + 'add') }}>
                            <ControlPointIcon sx={{ ml: 0, fontSize: '50', color: 'secondary.dark' }} fontSize="large" color='success' />
                            <Typography color='black'>Add customers</Typography>
                        </IconButton>
                    </Box>
                </Box>
            </div>
        </ThemeProvider>
    );
}