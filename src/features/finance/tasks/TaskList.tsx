import * as React from 'react';
import Box from '@mui/material/Box';
import { IconButton, Button, Paper, ThemeProvider, Link, FormGroup, FormControlLabel, Switch, ButtonGroup } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { theme } from '../../../assets/mui/styles';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CompletedTask from './CompletedTask';
import IncompletedTask from './IncompletedTask';
import AllTasks from './AllTasks';
import { dataContext } from '../../assets/dataProvider';


export default function TaskList() {
    const navigate = useNavigate()
    const username = React.useContext(dataContext )
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
                    <TabPanel sx={{p:1}} value="allTasks">
                        <AllTasks />
                    </TabPanel>
                    <TabPanel sx={{p:1}} value="completedTasks">
                        <CompletedTask username={username} />
                    </TabPanel>
                    <TabPanel sx={{p:1}} value="incompletedTasks">
                        <IncompletedTask username={username} />
                    </TabPanel>
                </TabContext>
            </div>
        </ThemeProvider>
    );
}