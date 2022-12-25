import { Box, createTheme, TextField, ThemeProvider, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Customer, Task, User } from '../../../interface';
import { dataContext } from '../../assets/dataProvider';
import { taskObject, variables } from '../../assets/variables';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { componentTheme } from '../../../assets/mui/styles';

export default function TaskDetail() {
    const username = useContext(dataContext)
    const id = useParams().id;
    const taskID = (id === undefined) ? ('') : (parseInt(id))

    const url = `${variables.urlbase}accounts/${username}/tasks`

    const [task, setTask] = React.useState<Task>(taskObject)
    const [isCompleted, setIsCompleted] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsCompleted(event.target.checked);
    };

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
                setTask(res);
                setIsCompleted(res.isCompleted)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    console.log(task)

    return (
        <ThemeProvider theme={componentTheme}>
            <Box className='componentClass'>
                <Box className='taskStatus'>
                    <h4>Task Details</h4>
                    <FormControlLabel control={<Checkbox checked={isCompleted} />} label={(isCompleted===true)?('Completed'):('Incompleted')} />                   
                </Box >
                {(Object.keys(task).length === 0) ? ('') : (
                    <Box>
                        <Box>
                            <Box>
                                <TextField
                                    name='customerName'
                                    value={task.title}
                                    type="text"
                                />
                            </Box>
                            <Box className='taskTiming'>
                                <TextField
                                    label='Start Date'
                                    name='customerName'
                                    value={task.date_time_start.slice(0, 10)}
                                    type="text"
                                />
                                <TextField
                                    label='Start Time'
                                    name='customerName'
                                    value={task.date_time_start.slice(11, 16)}
                                    type="text"
                                />
                                <TextField
                                    label="End Date"
                                    name='customerName'
                                    value={task.date_time_end.slice(0, 10)}
                                    type="text"
                                />
                                <TextField
                                    label="End Time"
                                    name='customerName'
                                    value={task.date_time_end.slice(11, 16)}
                                    type="text"
                                />
                                <TextField
                                    label="No. of hours"
                                    type="number"
                                    value={task.hours}
                                />

                                <TextField
                                    label="Rate ($ per hour)"
                                    type="number"
                                    value={task.task_rate}
                                />

                                <TextField
                                    label="Task pay"
                                    type="number"
                                    value={(task.task_pay === null) ? (0) : (task.task_pay)}
                                />
                            </Box>
                        </Box>
                        <Box className='customerInfo'>
                            <TextField
                                name='customerName'
                                value={task.customer.customerName}
                                type="text"
                            />
                            <TextField
                                value={task.customer.email}
                                name='email'
                                type="email"
                            />
                            <TextField
                                name='phone'
                                value={task.customer.phone}
                                type="number"
                            />
                        </Box>
                        <Box className='customerAddress'>
                            <TextField
                                value={task.customer.address}
                                type="text"
                            />
                            <TextField
                                value={task.customer.city}
                                type="text"
                            />
                            <TextField
                                value={task.customer.province}
                                type="text"
                            />
                            <TextField
                                value={task.customer.postal}
                                type="text"
                            />
                            <TextField
                                value={task.customer.country}
                                type="text"
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </ThemeProvider>
    )
}
