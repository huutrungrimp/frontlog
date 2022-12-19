import React, { FunctionComponent, PropsWithChildren, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import { Box } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from '@mui/material/Link';
import { User } from '../../interface';
import { dataContext } from '../assets/dataProvider';




const NavPage = () => {
    const username = useContext(dataContext )
    const length = Object.keys(username).length
    // console.log(length)

    const pages = ['About', 'Portfolio', 'Resume', 'Blog'];
    const settings = ['Profile', 'Dashboard', 'Customers', 'Signout'];
    const authPages = ['sign in', 'sign up']

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar sx={{ backgroundColor: 'primary', width: '100%', position: 'fixed' }}>
            <Toolbar sx={{ width: { xs: '100%', md: '75%' }, margin: 'auto', paddingRight: '20px' }} disableGutters>
                <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'white',
                        textDecoration: 'none',
                    }}
                >
                    LOGO
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        <MenuItem
                            key={'home'}
                            component={Link}
                            href='/home'
                            onClick={handleCloseNavMenu}
                        >
                            <Typography textAlign="center">Home</Typography>
                        </MenuItem>
                        {pages.map((page) => (
                            <MenuItem
                                key={page.toLowerCase().replace(/\s/g, '')}
                                component={Link}
                                href={'#' + page.toLowerCase().replace(/\s/g, '')}
                                onClick={handleCloseNavMenu}
                            >
                                <Typography textAlign="center">{page}</Typography>
                            </MenuItem>
                        ))}
                        <MenuItem
                            key={'user'}
                            component={Link}
                            href={`/${username}`}
                            onClick={handleCloseNavMenu}
                        >
                            <Typography textAlign="center">{username}</Typography>
                        </MenuItem>

                    </Menu>
                </Box>
                <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    LOGO
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Button
                        key={'home'}
                        component={Link}
                        href='/home'
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Home
                    </Button>
                    {pages.map((page) => (
                        <Button
                            key={page.toLowerCase().replace(/\s/g, '')}
                            component={Link}
                            href={'/#' + page.toLowerCase().replace(/\s/g, '')}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {page}
                        </Button>
                    ))}
                    <Button
                        key={'user'}
                        component={Link}
                        href={`/${username}`}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {username}
                    </Button>

                </Box>

                {(length === 0) ? (
                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        {authPages.map(page => (
                            <Box key={page.toLowerCase().replace(/\s/g, '')}>
                                <Button
                                    component={Link}
                                    href={'/' + page.toLowerCase().replace(/\s/g, '')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            </Box>))}
                    </Box>
                ) : (

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="https://www.fodors.com/assets/destinations/712582/canadian-parliament-building-ottawa-ontario-canada_980x650.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.toLowerCase().replace(/\s/g, '')} onClick={handleCloseUserMenu}
                                    component={Link}
                                    href={'/' + username + '/' + setting.toLowerCase().replace(/\s/g, '')}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                )}
            </Toolbar>
        </AppBar >
    );
}

export default NavPage;