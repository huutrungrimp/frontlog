import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ThemeProvider, IconButton, ButtonGroup, Button, createTheme } from '@mui/material';
import { theme, muitheme } from '../../assets/mui/styles';
import { Outlet, useNavigate } from 'react-router-dom';
import { borderBottom } from '@mui/system';
import shadows from '@mui/material/styles/shadows';
import { purple, green } from '@mui/material/colors';
import { User } from '../../interface';

export default function MainFinance({ username }: User) {
    const navigate = useNavigate()

    const theme = createTheme({
        components: {
            MuiButtonGroup: {
                styleOverrides: {
                    root: {
                        width: '100%',
                        backgroundColor: muitheme.palette.secondary.main,
                        borderRadius: 0,
                        boxShadow: '0 0 0 0',
                        [muitheme.breakpoints.down('sm')]: {
                            padding: '0px 0 0px 0',
                        },
                        [muitheme.breakpoints.up('md')]: {
                            padding: '10x 0 10px 0',
                        },
                        [muitheme.breakpoints.up('lg')]: {
                            padding: '10px 0 10px 0',
                        },
                    }
                }
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        backgroundColor: muitheme.palette.secondary.main,
                    }
                }
            }
        }
    })

    return (
        <div>
            <div className='mainFinanceTop'>
                <ThemeProvider theme={theme}>
                    <ButtonGroup
                        variant="contained"
                        size="large"
                    >
                        <Button onClick={() => { navigate('/' + username + '/finance') }}>Dashboard</Button>
                        <Button onClick={() => { navigate('/' + username + '/finance/tasks') }}>Tasks</Button>
                        <Button>Customers</Button>
                    </ButtonGroup>
                </ThemeProvider>
            </div>
            <div className='mainFinanceBottom'>
                <Outlet />
            </div>
        </div>
    );
}