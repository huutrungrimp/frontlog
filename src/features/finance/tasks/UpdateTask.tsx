import React, { useContext } from 'react'
import { Task, User } from '../../../interface'
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from 'react-router-dom';
import { customerObject, taskObject, variables } from '../../assets/variables';
import { useAppDispatch } from '../../../app/hooks';
import dayjs, { Dayjs } from 'dayjs';
import { createTheme, Input, InputAdornment, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Box, ThemeProvider } from '@mui/material';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Typography, Button } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import SelectedCustomer from '../customers/SelectedCustomer';
import { updateTask } from './taskSlice';
import { dataContext } from '../../assets/dataProvider';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { componentTheme } from '../../../assets/mui/styles';


export default function UpdateTask() {

    const data = useContext(dataContext)
    const id = useParams().id;
    const taskID = (id === undefined) ? ('') : (parseInt(id))
    const url = `${variables.urlbase}accounts/${data?.username}/tasks`
    const customer_url = `${variables.urlbase}accounts/${data?.username}/customers`

    const [task, setTask] = React.useState<Task>(taskObject)
    const [title, setTitle] = React.useState('');
    const [startDateTime, setStartDateTime] = React.useState<Dayjs | null>(dayjs(task.date_time_start));
    const [endDateTime, setEndDateTime] = React.useState<Dayjs | null>(dayjs(task.date_time_end));
    const [customers, setCustomers] = React.useState([customerObject])
    const [customerName, setCustomerName] = React.useState('');
    const [isCompleted, setIsCompleted] = React.useState(false);
    const [taskRate, setTaskRate] = React.useState(0)


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
                setCustomers(res)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    console.log(task)
    // console.log(title)
    // console.log(startDateTime)
    // console.log(endDateTime)
    // console.log(customer_url)
    // console.log(customers)
    // console.log(customerName)



    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const start = new Date(dayjs(startDateTime).format('YYYY-MM-DD, HH:mm'))
    const end = new Date(dayjs(endDateTime).format('YYYY-MM-DD, HH:mm'))
    var diffHours = end.getHours() - start.getHours() + (end.getDate() - start.getDate()) * 24

    const onChangeSelectCustomer = (event: SelectChangeEvent) => {
        setCustomerName(event.target.value as string);
    };

    const selectedCustomer = customers.filter(customer => customer.customerName === customerName)[0] || {}

    const onSubmit = (e: React.MouseEvent) => {
        dispatch(updateTask({
            id: id,
            isCompleted: isCompleted,
            username: data?.username,
            customerID: selectedCustomer.id,
            title: title,
            date_time_start: start.toISOString(),
            date_time_end: end.toISOString(),
            hours: diffHours,
            task_rate: taskRate
        }))
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsCompleted(event.target.checked);
    };
    console.log(isCompleted)

    return (
        <ThemeProvider theme={componentTheme}>
            <Box className='componentClass'>
                <h4>Update Tasks</h4>
                <Box className='gx-0'>
                    <FormControlLabel control={<Checkbox checked={isCompleted} onChange={handleChange} />} label={(isCompleted === true) ? ('Completed') : ('Incompleted')} />
                    <Box>
                        <TextField
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            label="Task name"
                        />
                    </Box>
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
                            value={(diffHours === 0) ? (0) : (diffHours.toString())}
                        />
                        <TextField
                            label="Rate ($ per hour)"
                            type="number"
                            value={task.task_rate}
                            onChange={(e) => { setTaskRate(parseInt(e.target.value)) }}
                        />
                        <TextField
                            label="Task pay"
                            type="number"
                            value={(task.task_pay === null) ? (0) : (task.task_pay)}
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
    )
}
