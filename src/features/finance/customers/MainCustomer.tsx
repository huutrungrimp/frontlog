import * as React from 'react';
import Box from '@mui/material/Box';
import { mainComponent} from '../../../assets/mui/styles';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Outlet, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { dataContext } from '../../assets/dataProvider';


export default function MainCustomer() {
    const data = React.useContext(dataContext)

    const navigate = useNavigate()

    return (
        <ThemeProvider theme={mainComponent}>
            <div className='mainComponent gx-0'>
                <Box className='mainComponentLeft'>
                    <ButtonGroup>
                        <Button onClick={() => { navigate('/' + data?.username + '/finance/customers') }}>Customers</Button>
                        <Button onClick={() => { navigate('/' + data?.username + '/finance/customers/new') }}>New Customers</Button>
                        <Button onClick={() => { navigate('/' + data?.username + '/finance/customers/search') }}>Search Customers</Button>
                    </ButtonGroup>

                </Box>
                <Box className='mainComponentRight'>
                    <Outlet />
                </Box>
            </div>
        </ThemeProvider>
    );
}