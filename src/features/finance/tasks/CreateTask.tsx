import * as React from 'react';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
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

import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { muitheme, theme } from '../../../assets/mui/styles';
import SelectedCustomer from '../customers/SelectedCustomer';
import { Customer, User } from '../../../interface';
import { variables } from '../../assets/variables';
import { useAppDispatch } from '../../../app/hooks';
import { createTask } from './taskSlice';
import { dataContext } from '../../assets/dataProvider';
import { green } from '@mui/material/colors';


export default function CreateTask() {

    const username = React.useContext(dataContext)
    const url = `${variables.urlbase}accounts/${username}/customers`
    const navigate = useNavigate()

    const today = new Date().toLocaleDateString("en", { year: "numeric", day: "2-digit", month: "2-digit" })

    const [title, setTitle] = React.useState('');
    const [customerName, setCustomerName] = React.useState('')
    const [customers, setCustomers] = React.useState<Array<Customer>>([])
    const [startDateTime, setStartDateTime] = React.useState<Dayjs | null>(dayjs(today));
    const [endDateTime, setEndDateTime] = React.useState<Dayjs | null>(dayjs(today));
    const [taskRate, setTaskRate] = React.useState(0)

    const start = new Date(dayjs(startDateTime).format('YYYY-MM-DD, HH:mm'))
    const end = new Date(dayjs(endDateTime).format('YYYY-MM-DD, HH:mm'))
    var diffHours = (end.getHours() - start.getHours()) + (end.getDate() - start.getDate()) * 24;

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

    const onChangeSelectCustomer = (event: SelectChangeEvent) => {
        setCustomerName(event.target.value as string);
    };

    const selectedCustomer = customers.filter(customer => customer.customerName === customerName)[0] || {}
    console.log(selectedCustomer.id)

    const dispatch = useAppDispatch()

    const onSubmit = (e: React.MouseEvent) => {
        dispatch(createTask({
            username: username,
            customerID: selectedCustomer.id,
            title: title,
            date_time_start: start.toISOString(),
            date_time_end: end.toISOString(),
            hours: diffHours,
            task_rate: taskRate
        }))
        navigate('/' + username + '/finance/tasks')
    }

    return (
        <ThemeProvider theme={theme}>
            <Box className='gx-0 mx-0 border border-success rounded-3'>
                <div className='row mx-0'>
                    <Box className='gx-0 rounded-3 px-3'>
                        <TextField
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            label="Task name"
                            sx={{ width: { xs: '100%' }, mr: 3, my: 2 }}
                        />
                        <Box
                            sx={{ display: { xs: 'grid', md: 'flex' }, gap: { md: '10px' }, justifyContent: { md: 'space-between' }, marginLeft: 0, marginRight: 0 }}
                        >
                            <Box sx={{ mb: { xs: 3 } }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props} />}
                                        label="Start Date & Time"
                                        value={startDateTime}
                                        ampm={false}
                                        onChange={(newValue) => {
                                            setStartDateTime(newValue);
                                        }}
                                    />
                                </LocalizationProvider>
                            </Box>
                            <Box sx={{ mb: { xs: 3 } }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props} />}
                                        label="End Date & Time"
                                        value={endDateTime}
                                        ampm={false}
                                        onChange={(newValue) => {
                                            setEndDateTime(newValue);
                                        }}
                                    />
                                </LocalizationProvider>
                            </Box>

                            <TextField
                                label="No. of hours"
                                type="number"
                                value={diffHours}
                                sx={{ mb: { xs: 3 } }}
                            />

                            <TextField
                                label="Rate ($ per hour)"
                                type="number"
                                value={taskRate}
                                onChange={(e) => { setTaskRate(parseInt(e.target.value)) }}
                                sx={{ mb: { xs: 3 } }}
                            />

                            <TextField
                                label="Task pay"
                                type="number"
                                value={diffHours * taskRate}
                                sx={{ mb: { xs: 3 } }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: { md: 'start', xs: 'space-between' } }}>
                            <Box sx={{ width: { xs: '100%', md: 200 }, mr: 2 }}>
                                <FormControl fullWidth>
                                    <InputLabel>Existing Customers</InputLabel>
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

                    <Box className='gx-0 rounded-3 px-3'>
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
                    <Button sx={{ backgroundColor: 'green' }} variant="text" color="inherit" onClick={onSubmit}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
