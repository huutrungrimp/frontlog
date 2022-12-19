import { Box, TextField, ThemeProvider, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { boxStyle, theme } from '../../../assets/mui/styles';
import { Customer, Task, User } from '../../../interface';
import { dataContext } from '../../assets/dataProvider';
import { taskObject, variables } from '../../assets/variables';


export default function TaskDetail() {
    const username = useContext(dataContext)
    const id = useParams().id;
    const taskID = (id === undefined) ? ('') : (parseInt(id))

    const url = `${variables.urlbase}accounts/${username}/tasks`

    const [task, setTask] = React.useState<Task>(taskObject)

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
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    console.log(task.date_time_end)


    return (
        <ThemeProvider theme={theme}>
            <Box className='taskDetail px-3'>
                <Box sx={{ pt: 2 }}>
                    <Typography variant='h5'>Task Detail</Typography>
                </Box >
                {(Object.keys(task).length === 0) ? ('') : (
                    <Box>
                        <Box sx={boxStyle}>
                            <TextField
                                name='customerName'
                                value={task.title}
                                type="text"
                                sx={{ my: 2 }}
                            />
                            <TextField
                                label='Start Date'
                                name='customerName'
                                value={task.date_time_start.slice(0, 10)}
                                type="text"
                                sx={{ my: 2 }}
                            />
                            <TextField
                                label='Start Time'
                                name='customerName'
                                value={task.date_time_start.slice(11, 16)}
                                type="text"
                                sx={{ my: 2 }}
                            />
                            <TextField
                                label="End Date"
                                name='customerName'
                                value={task.date_time_end.slice(0, 10)}
                                type="text"
                                sx={{ my: 2 }}
                            />
                            <TextField
                                label="End Time"
                                name='customerName'
                                value={task.date_time_end.slice(11, 16)}
                                type="text"
                                sx={{ my: 2 }}
                            />

                        </Box>
                        <Box
                            sx={boxStyle}
                        >

                            <TextField
                                name='customerName'
                                value={task.customer.customerName}
                                type="text"
                                sx={{ my: 2 }}
                            />
                            <TextField
                                value={task.customer.email}
                                name='email'
                                type="email"
                                sx={{ my: 2 }}
                            />
                            <TextField
                                name='phone'
                                value={task.customer.phone}
                                type="number"
                                sx={{ my: 2 }}
                            />
                        </Box>
                        <Box
                            sx={boxStyle}
                        >
                            <TextField
                                value={task.customer.address}
                                type="text"
                                sx={{ my: 2, width: { md: '30%' }, mr: { xs: 0, md: 3 } }}
                            />
                            <TextField
                                value={task.customer.city}
                                type="text"
                                sx={{ my: 2, mr: { xs: 0, md: 3 } }}
                            />
                            <TextField
                                value={task.customer.province}
                                type="text"
                                sx={{ my: 2, mr: { xs: 0, md: 3 } }}
                            />
                            <TextField
                                value={task.customer.postal}
                                type="text"
                                sx={{ my: 2, mr: { xs: 0, md: 3 } }}
                            />
                            <TextField
                                value={task.customer.country}
                                type="text"
                                sx={{ my: 2 }}
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </ThemeProvider>
    )
}
