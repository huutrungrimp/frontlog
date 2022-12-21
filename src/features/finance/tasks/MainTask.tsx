import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { User } from '../../../interface';
import CreateTask from './CreateTask';
import TaskList from './TaskList';
import CompletedTask from './CompletedTask';
import IncompletedTask from './IncompletedTask';
import { muitheme, taskdashboardTab, taskTabPanel } from '../../../assets/mui/styles';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Outlet, useNavigate } from 'react-router-dom';
import { createTheme, Stack, ThemeProvider } from '@mui/material';
import { dataContext } from '../../assets/dataProvider';


export default function MainTask() {
    const username = React.useContext(dataContext)

    const navigate = useNavigate()
    const theme = createTheme({
        components: {
            MuiButtonGroup: {
                styleOverrides: {
                    root: {
                        width: '100%',
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                        "& .MuiButtonGroup-grouped:not(:last-of-type)": {
                            borderColor: 'green',
                            margin: '10px',
                            borderRadius: 4

                        },
                        "& .MuiButtonGroup-grouped:not(:first-of-type)": {
                            borderColor: 'green',
                            margin: '10px',
                            borderRadius: 4
                        },

                        [muitheme.breakpoints.down('sm')]: {
                            flexDirection: 'row'
                        },
                        [muitheme.breakpoints.up('md')]: {

                            flexDirection: 'column'
                        },
                        [muitheme.breakpoints.up('lg')]: {

                            flexDirection: 'column'
                        },
                    }
                }
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        justifyContent: "flex-start",                        
                        [muitheme.breakpoints.down('sm')]: {
                            border: 1,
                            borderRadius: 4,
                            textTransform:'none'
                        },
                        [muitheme.breakpoints.up('md')]: {
                            marginRight: muitheme.spacing(3),
                            paddingRight: 0,
                            marginLeft: 0,
                            borderRightColor: 'red',
                        },
                        [muitheme.breakpoints.up('lg')]: {
                            borderRadius: 0,
                            marginLeft: 0,
                        },
                    }
                }
            }
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <div className='mainTask gx-0'>
                <Box className='mainTaskLeft'>
                    <ButtonGroup>
                        <Button onClick={() => { navigate('/' + username + '/finance/tasks') }}>Tasks</Button>
                        <Button onClick={() => { navigate('/' + username + '/finance/tasks/new') }}>New Tasks</Button>
                        <Button onClick={() => { navigate('/' + username + '/finance/tasks/search') }}>Search Tasks</Button>
                    </ButtonGroup>

                </Box>
                <Box className='mainTaskRight'>
                    <Outlet />
                </Box>
            </div>
        </ThemeProvider>
    );
}