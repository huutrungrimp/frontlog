import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Box, Link, ThemeProvider } from '@mui/material';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import GroupIcon from '@mui/icons-material/Group';
import { User } from '../../interface';
import { theme } from '../../assets/mui/styles';
import { dataContext } from '../assets/dataProvider';



export default function Menu4Mobile() {

    const username = React.useContext(dataContext )
    return (
        <ThemeProvider theme={theme}>
            <Box>
                {(Object.keys(username).length === 0) ? (
                    <MenuList>
                        <MenuItem>
                            <ListItemIcon>
                                <LoginIcon color='primary' fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Sign In</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <AppRegistrationIcon color='primary' fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Sign Up</ListItemText>
                        </MenuItem>
                    </MenuList>
                ) : (
                    <MenuList>
                        <MenuItem>
                            <ListItemIcon>
                                <DashboardIcon color='primary' fontSize="small" />
                            </ListItemIcon>
                            <ListItemText><Link href={`${username}/finance`}>Dashboard</Link></ListItemText>
                        </MenuItem>

                        <MenuItem>
                            <ListItemIcon>
                                <GroupIcon color='primary' fontSize="small" />
                            </ListItemIcon>
                            <ListItemText><Link href={`${username}/finance/customers`}>Customers</Link></ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <LogoutIcon color='primary' fontSize="small" />
                            </ListItemIcon>
                            <ListItemText><Link href={`${username}/signout`}>Sign Out</Link></ListItemText>
                        </MenuItem>
                    </MenuList>
                )}
            </Box>
        </ThemeProvider>
    );
}