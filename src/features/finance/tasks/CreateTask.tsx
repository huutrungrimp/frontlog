import * as React from 'react';
import { Box, createTheme, Input, InputAdornment, ThemeProvider } from '@mui/material';
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
import SelectedCustomer from '../customers/SelectedCustomer';
import { Customer } from '../../../interface';
import { variables } from '../../assets/variables';
import { useAppDispatch } from '../../../app/hooks';
import { createTask } from './taskSlice';
import { dataContext } from '../../assets/dataProvider';
import { componentTheme } from '../../../assets/mui/styles';


export default function CreateTask() {

    const data = React.useContext(dataContext)
    const url = `${variables.urlbase}accounts/${data?.username}/customers`
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
            username: data?.username,
            customerID: selectedCustomer.id,
            title: title,
            date_time_start: start.toISOString(),
            date_time_end: end.toISOString(),
            hours: diffHours,
            task_rate: taskRate
        }))
        navigate('/' + data?.username + '/finance/tasks')
    }

    return (
        <ThemeProvider theme={componentTheme}>
            <Box className='componentClass'>
                <h4>Create Tasks</h4>
                <Box>
                    <TextField
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        label="Task name"
                    />
                    <Box className='taskTiming'>
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
                        />

                        <TextField
                            label="Task pay"
                            type="number"
                            value={diffHours * taskRate}
                        />
                    </Box>
                </Box>
                <Box className='customerInfo'>
                    <Box className='existingCustomer'>
                        <FormControl>
                            <InputLabel>Existing Customers</InputLabel>
                            <Select
                                value={customerName ? customerName : ''}
                                label="Existing Customers"
                                onChange={onChangeSelectCustomer}
                            >
                                {(Object.keys(customers).length === 0) ? (<div></div>) : (
                                    customers.map(customer => (
                                        <MenuItem key={customer.customerName} value={customer.customerName}>
                                            {customer.customerName}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        </FormControl>
                    </Box>
                    <IconButton className='addCustomer' onClick={(e: React.MouseEvent) => { navigate('/' + data?.username + '/finance/customers/new') }} >
                        <Avatar>
                            <AddIcon color='primary' />
                        </Avatar>
                        <Typography>Add new customers</Typography>
                    </IconButton>
                </Box>
                {(customerName === '') ? (<div></div>) : (
                    <div className='mx-0'>
                        <SelectedCustomer
                            selectedcustomer={selectedCustomer}
                        />
                    </div>
                )}
                <Button className='btnSubmit' onClick={onSubmit}>
                    Submit
                </Button>
            </Box>
        </ThemeProvider>
    );
}
