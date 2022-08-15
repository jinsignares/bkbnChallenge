import { Alert, AppBar, Container, Snackbar, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeAlert } from '../../redux/actions/contactsActions';

const Layout = ({ children }) => {
    const dispatch = useDispatch()
    const { message, type, active } = useSelector((state) => state.contacts.alert)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(removeAlert())
    };
    return (
        <main>
            <AppBar color='default' position="fixed">
                <Toolbar variant="regular">
                    <Link href="/">
                        <Typography variant="h6" color="inherit" style={{ cursor: 'pointer' }}>
                            Contacts API
                        </Typography>
                    </Link>

                </Toolbar>
            </AppBar>
            <Container maxWidth={false}
                sx={{ height: '100vh', backgroundColor: { xs: '#fff', md: '#f4f4f4' } }}>
                {children}
            </Container>
            <Snackbar open={active} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </main>
    )
}

export default Layout