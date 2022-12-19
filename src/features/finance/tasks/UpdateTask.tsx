import React from 'react'
import { Task, User } from '../../../interface'
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from 'react-router-dom';
import { customerObject, taskObject, variables } from '../../assets/variables';
import { useAppDispatch } from '../../../app/hooks';
import dayjs, { Dayjs } from 'dayjs';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Box, ThemeProvider } from '@mui/material';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';

import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Typography, Button } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { theme } from '../../../assets/mui/styles';
import SelectedCustomer from '../customers/SelectedCustomer';
import { updateTask } from './taskSlice';


export default function UpdateTask({ username }: User) {
    const id = useParams().id;
    const taskID = (id === undefined) ? ('') : (parseInt(id))
    const url = `${variables.urlbase}accounts/${username}/tasks`

    const [task, setTask] = React.useState<Task>(taskObject)
    const [title, setTitle] = React.useState('');
    const [startDateTime, setStartDateTime] = React.useState<Dayjs | null>(dayjs(task.date_time_start));
    const [endDateTime, setEndDateTime] = React.useState<Dayjs | null>(dayjs(task.date_time_end));
    const [customers, setCustomers] = React.useState([customerObject])
    const [customerName, setCustomerName] = React.useState('');

    console.log(task)
    console.log(title)
    console.log(startDateTime)
    console.log(endDateTime)
    console.log(customers)
    console.log(customerName)

    React.useEffect(() => {
        fetch(url + '/' + taskID, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res => {
                setTask(res)
                setTitle(res.title)
                // setCustomers(res.customer)
                setStartDateTime(res.date_time_start)
                setEndDateTime(res.date_time_end)
                setCustomerName(res.customer.customerName)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    React.useEffect(() => {
        fetch(customer_url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res => {
                setCustomerName(res.customerName)
                setCustomers(res)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    // console.log(task)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const customer_url = `${variables.urlbase}/accounts/${username}/customers`
    // const url = `http://127.0.0.1:8000/accounts/${username}/customers`

    const start = new Date(dayjs(startDateTime).format('YYYY-MM-DD, HH:mm'))
    const end = new Date(dayjs(endDateTime).format('YYYY-MM-DD, HH:mm'))
    var diffHours = end.getHours() - start.getHours() + (end.getDate() - start.getDate()) * 24
    console.log(diffHours)


    const onChangeSelectCustomer = (event: SelectChangeEvent) => {
        setCustomerName(event.target.value as string);
    };

    const selectedCustomer = customers.filter(customer => customer.customerName === customerName)[0] || {}
    // console.log(customerName)


    const onSubmit = (e: React.MouseEvent) => {
        const test = {
            title: title,
            selectedCustomer,
            time: {
                start: start.toISOString(),
                end: end.toISOString,
                hours: diffHours
            }
        };
        console.log(test)
        dispatch(updateTask({
            id: id,
            username: username,
            customerID: selectedCustomer.id,
            title: title,
            date_time_start: start.toISOString(),
            date_time_end: end.toISOString(),
            hours: diffHours,
        }))
    }

    return (
        <ThemeProvider theme={theme}>
            <Box className='updateTask'>
                <div className='row mx-0'>
                    <Box className='gx-0 px-3'>
                        <TextField
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            label="Task name"
                            sx={{ width: { xs: '100%' }, mr: 3, my: 2 }}
                        />
                        <Box
                            sx={{ display: { xs: 'grid', md: 'flex' }, justifyContent: { md: 'space-between' }, marginLeft: 0, marginRight: 0 }}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DateTimePicker
                                    renderInput={(props) => <TextField {...props} sx={{ my: 3 }} />}
                                    label="Start Date & Time"
                                    value={startDateTime}
                                    ampm={false}
                                    onChange={(newValue) => {
                                        setStartDateTime(newValue);
                                    }}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    renderInput={(props) => <TextField {...props} sx={{ my: 3 }} />}
                                    label="End Date & Time"
                                    value={endDateTime}
                                    ampm={false}
                                    onChange={(newValue) => {
                                        setEndDateTime(newValue);
                                    }}
                                />
                            </LocalizationProvider>

                            <TextField
                                // disabled
                                sx={{ my: 3 }}
                                label="No. of hours"
                                type="number"
                                value={diffHours.toString()}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: { md: 'start', xs: 'space-between' }, my: 3 }}>
                            <Box sx={{ width: { xs: '100%', md: 200 }, mr: 2 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Existing Customers</InputLabel>
                                    <Select
                                        value={customerName ? customerName : ''}
                                        label="Existing Customers"
                                        onChange={onChangeSelectCustomer}
                                    >
                                        {customers.map(customer => (
                                            (customer === undefined) ? ('') : (
                                                <MenuItem key={customer.customerName} value={customer.customerName}>
                                                    {customer.customerName}
                                                </MenuItem>
                                            )
                                        ))}
                                    </Select>
                                </FormControl>

                            </Box>
                            <Box>
                                <Box
                                    component="form"
                                    border={1}
                                    borderRadius={2}
                                    borderColor='success.main'
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'left', width: '100%', height: 57 }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search for customers"
                                        inputProps={{ 'aria-label': 'search google maps' }}
                                    />
                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box className='gx-0 px-3'>
                        <Box
                            border={1}
                            borderColor="success.main"
                            borderRadius={3}
                            sx={{ my: 2, display: 'flex', justifyContent: 'space-between', width: { xs: '100%', md: '40%' } }}
                        >
                            <Typography sx={{ mx: 3, mt: 2 }} color='success'>Add new customers</Typography>
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                <Avatar>
                                    <AddIcon color='primary' onClick={(e: React.MouseEvent) => { navigate('/account/customers/addcustomer') }} />
                                </Avatar>
                            </IconButton>
                        </Box>
                    </Box>
                </div>

                {(customerName === '') ? (<div></div>) : (
                    <div className='mx-0'>
                        <SelectedCustomer
                            selectedcustomer={selectedCustomer}
                        />
                    </div>
                )}
                <Box className='gx-0 boxButton' >
                    <Button sx={{backgroundColor:'green'}} variant="text" color="inherit" onClick={onSubmit}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    )
}
