import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

import UpdateIcon from '@mui/icons-material/Update';
import { IconButton, Button, Paper, ThemeProvider, Link, FormGroup, FormControlLabel, Switch, ButtonGroup } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Task, User } from '../../../interface';
import { theme } from '../../../assets/mui/styles';
import { variables } from '../../../app/service';
import { taskObject } from '../../assets/variables';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CompletedTask from './CompletedTask';
import IncompletedTask from './IncompletedTask';
import AllTasks from './AllTasks';


export default function TaskList({ username }: User) {
    const navigate = useNavigate()
    const [value, setValue] = React.useState('allTasks');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <div className='taskList'>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="All" value="allTasks" />
                            <Tab label="Completed" value="completedTasks" />
                            <Tab label="Incompleted" value="incompletedTasks" />
                        </TabList>
                    </Box>
                    <TabPanel value="allTasks">
                        <AllTasks username={username} />
                    </TabPanel>
                    <TabPanel value="completedTasks">
                        <CompletedTask username={username} />
                    </TabPanel>
                    <TabPanel value="incompletedTasks">
                        <IncompletedTask username={username} />
                    </TabPanel>
                </TabContext>
            </div>
        </ThemeProvider>
    );
}