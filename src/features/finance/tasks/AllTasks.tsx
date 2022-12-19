import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

import UpdateIcon from '@mui/icons-material/Update';
import { IconButton, Button, Paper, ThemeProvider, Link, FormGroup, FormControlLabel, Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Task, User } from '../../../interface';
import { theme } from '../../../assets/mui/styles';
import { variables } from '../../../app/service';
import { taskObject } from '../../assets/variables';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';



export default function AllTasks({ username }: User) {
    const navigate = useNavigate()

    const url = `${variables.urlbase}/accounts/${username}/tasks`
    console.log(url)

    const [tasks, setTasks] = React.useState<Array<Task>>([taskObject])

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
                setTasks(res)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    tasks.map(task => console.log(task.id))

    const [isCompleted, setIsCompleted] = React.useState(true);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsCompleted(event.target.checked);
    };


    return (
        <ThemeProvider theme={theme}>
            <div className='gx-0'>
                <Box sx={{ border: 1, borderColor: 'green', borderRadius: 1 }}>
                    <h3>All Tasks</h3>
                    <Box>
                        {tasks.map(task => (
                            <Box display="flex" justifyContent='space-between' key={'task' + task.id}>
                                <Box sx={{ width: '40%', paddingLeft: { xs: '10px', md: '20px' } }}>
                                    <Link href={'/' + username + '/finance/tasks/' + task.id}>{task.title}</Link>
                                </Box>
                                {(task.isCompleted === false) ? (
                                    <Box sx={{ width: '30%' }}>
                                        <IconButton aria-label="">
                                            <CheckIcon color='secondary' sx={{ marginRight: '10px' }} />
                                            <Typography variant="body1" color="initial">Completed</Typography>
                                        </IconButton>
                                    </Box>
                                ) : (
                                    <Box sx={{ width: '30%' }}>
                                        <IconButton aria-label="">
                                            <CancelIcon sx={{ color: 'red', marginRight: '10px' }} />
                                            <Typography variant="body1" color="initial">Incompleted</Typography>
                                        </IconButton>
                                    </Box>
                                )}
                                <Box sx={{ width: '10%' }}>
                                    <IconButton aria-label="" onClick={() => navigate('/' + username + '/finance/tasks/' + task.id + '/delete')}>
                                        <DeleteIcon color='secondary' />
                                    </IconButton>
                                </Box>
                                <Box sx={{ width: '10%' }}>
                                    <IconButton onClick={() => { navigate('/' + username + '/finance/tasks/' + task.id + '/update') }}>
                                        <UpdateIcon color='primary' />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <Box>
                        <IconButton onClick={() => { navigate('/' + username + '/finance/tasks/' + 'add') }}>
                            <ControlPointIcon sx={{ ml: 0, fontSize: '50', color: 'secondary.dark' }} fontSize="large" color='success' />
                            <Typography color='black'>Add Tasks</Typography>
                        </IconButton>
                    </Box>
                </Box>
            </div>
        </ThemeProvider>
    );
}