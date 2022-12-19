import React from 'react'
import { createTheme } from '@mui/material/styles';
import { purple, green, blue } from '@mui/material/colors';

export const muitheme = createTheme({

    palette: {
        primary: {
            main: blue[500],
            light: blue[50]
        },
        secondary: {
            main: purple[500],
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    spacing: [0, 4, 8, 16, 32, 64],

});


export const theme = createTheme({
    components: {
        MuiTab: {
            styleOverrides: {
                root: {
                    fontSize: '18px',
                    textAlign: 'left',
                    textTransform: 'none',
                    marginLeft: '10px',
                    justifyContent: 'left',
                    [muitheme.breakpoints.down('sm')]: {
                        minHeight: '10px',
                    },
                    [muitheme.breakpoints.up('md')]: {
                        minHeight: '20px',
                    },
                    [muitheme.breakpoints.up('lg')]: {
                        minHeight: '30px',
                    },

                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: 20,
                    textTransform: 'none',
                    backgroundColor: green[100],
                    borderRadius: 10,
                    minWidth: 150,
                    maxHeight: 40,
                    borderLeft: 60
                },
            },
        },

        MuiMenuItem: {
            styleOverrides: {
                root: {
                    margin: 5,
                    border: 1,
                    borderRadius: 5
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderWidth: 1,
                        borderColor: "green"
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "blue"
                    }
                }
            },
        },
    },
});


export const boxStyle = {
    display: { xs: 'grid', md: 'flex' },
    justifyContent: { md: 'space-between' },
    spacing: { md: 2 },
    marginLeft: 0,
    marginRight: 0,
    marginBottom: { sx: 0, md: 2 }
}


export const textStyle = {
    my: { xs: 3 }
}

export const textField = {
    my: { xs: 1, md: 2 }
}

export const addCustomerStyle = {
    rounded: 'true',
    elevation: 12,
    padding: 3,
    marginTop: 5,
    marginBottom: 1,
    background: theme.palette.primary.main
}

export const menuMui = {
    width: { xs: '100%', sm: '25%', md: '20%', lg: '10%' },
    marginLeft: { xs: 0, md: '30px' },
    marginTop: { xs: 0, md: '30px' },
    float: 'left',
    borderRadius: 10,
    minHeight: '100px'
}

export const taskTabPanel = {
    m: 0,
    p: 0,
    borderRadius: '0px 0px 10px 10px'
}

export const financedashboardTab = {
    // textTransform: 'none', 
    fontSize: '15px',
    fontWeight: 'bold',
    color: 'white',
    // fontFamily: 'Verdana'
}

export const taskdashboardTab = {
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white'
}