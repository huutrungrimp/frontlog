import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

import UpdateIcon from '@mui/icons-material/Update';
import { IconButton, Button, Paper, ThemeProvider, Link, FormGroup, FormControlLabel, Switch, createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Task, User } from '../../../interface';
import { taskObject, variables } from '../../assets/variables';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { dataContext } from '../../assets/dataProvider';
import { componentTheme } from '../../../assets/mui/styles';



export default function IncompletedTask() {
    const navigate = useNavigate()
    const data = React.useContext(dataContext)

    const url = `${variables.urlbase}accounts/${data?.username}/tasks`
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

    console.log(tasks)

    return (
        <ThemeProvider theme={componentTheme}>
            <Box className='componentClass'>
                <h4>Incompleted Tasks</h4>
                <Box>
                    {tasks.filter(task => task.isCompleted === false).map(task => (
                        <Box key={'incompletedTasks' + task.id}>
                            <Box display="flex" justifyContent='space-between' key={'task' + task.id}>
                                <Box sx={{ width: '40%'}}>
                                    <IconButton className='gx-0 mx-0 px-0'>
                                        <Typography variant="body1" color="initial">
                                            <Link href={'/' + data?.username + '/finance/tasks/' + task.id}>
                                                {task.title}
                                            </Link>
                                        </Typography>
                                    </IconButton>
                                </Box>
                                <Box sx={{ width: '40%' }}>
                                    <IconButton aria-label="">
                                        <CancelIcon sx={{ color: 'red', marginRight: '10px' }} />
                                        <Typography variant="body1" color="initial">Incompleted</Typography>
                                    </IconButton>
                                </Box>
                                <Box sx={{ width: '10%' }}>
                                    <IconButton aria-label="" onClick={() => navigate('/' + data?.username + '/finance/tasks/' + task.id + '/delete')}>
                                        <DeleteIcon color='secondary' />
                                    </IconButton>
                                </Box>
                                <Box sx={{ width: '10%' }}>
                                    <IconButton onClick={() => { navigate('/' + data?.username + '/finance/tasks/' + task.id + '/update') }}>
                                        <UpdateIcon color='primary' />
                                    </IconButton>
                                </Box>
                            </Box>

                        </Box>
                    ))}
                </Box>
            </Box>
        </ThemeProvider>
    );
}