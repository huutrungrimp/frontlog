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
    }
});


export const mainComponent = createTheme({
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
                        textTransform: 'none'
                    },
                    [muitheme.breakpoints.up('md')]: {
                        marginRight: muitheme.spacing(3),
                        paddingRight: 0,
                        marginLeft: 0,
                        borderRightColor: 'red',
                        fontSize: '12px'
                    },
                    [muitheme.breakpoints.up('lg')]: {
                        borderRadius: 0,
                        marginLeft: 0,
                        fontSize: '12px'
                    },
                }
            }
        }
    }
})

export const componentTheme = createTheme({
    components: {
        MuiFormControl: {
            styleOverrides: {
                root: {
                    width: '100%',
                    marginBottom: '10px'
                }
            }
        },
        MuiFormControlLabel: {
            styleOverrides: {
                root: {
                    margin: '10px 0px 10px 0'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    marginBottom: '20px',
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderWidth: 1,
                        // borderColor: "green"
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        // borderColor: "blue"
                    }
                }
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    margin: '0px 0px 0px 0px',
                    padding: '0px 0px 0px 0px'
                }
            }
        }
    }
})
