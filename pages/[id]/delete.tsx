import { LoadingButton } from '@mui/lab'
import { Box, Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteContact, fetchContact } from '../../redux/actions/contactsActions'

const Delete: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useDispatch()
    const toDelete = useSelector(state => state.contacts.result)

    const handleDelete = (id) => {
        dispatch(deleteContact(id))
        router.back()
    }

    useEffect(() => {
        dispatch(fetchContact(id))
    }, [dispatch, id])

    return (
        toDelete && (

            <Grid
                container
                justifyContent='center'
                alignItems='center'
                sx={{ height: '100%' }}
            >
                <Grid
                    item
                    sx={{ backgroundColor: '#fff' }}
                >
                    <Grid
                        container
                        sx={{
                            boxShadow: { sm: '0 0 5px #ddd' },
                            py: '6rem',
                            px: '1rem',
                        }}
                    >
                        <Grid
                            item
                            container
                            justifyContent='space-between'
                            rowSpacing={5}
                            sx={{
                                maxWidth: { sm: '45rem' },
                                marginInline: 'auto',
                                minWidth: { sm: '400px' }
                            }}
                        >
                            <Box
                                display='flex'
                                flexDirection='column'
                                component='form'
                                noValidate
                                autoComplete='off'
                                sx={{ width: '100%' }}
                            >
                                <Typography
                                    variant='h6'
                                    component='h1'
                                    sx={{ textAlign: 'center', mb: '1.5rem', color: 'black' }}
                                >
                                    Delete contact
                                </Typography>
                                <Box>
                                    <Box border={2}>
                                        <Typography
                                            variant='body1'
                                            component='p'
                                            sx={{ textAlign: 'center', mb: '1.5rem', color: 'black' }}
                                        >
                                            {toDelete.firstName}
                                        </Typography>
                                    </Box>

                                    <Typography
                                        variant='body1'
                                        component='p'
                                        sx={{ textAlign: 'center', mb: '1.5rem', color: 'black' }}
                                    >
                                        {toDelete.lastName}
                                    </Typography>

                                    <Typography
                                        variant='body1'
                                        component='p'
                                        sx={{ textAlign: 'center', mb: '1.5rem', color: 'black' }}
                                    >
                                        {toDelete.phone}
                                    </Typography>

                                    <Typography
                                        variant='body1'
                                        component='p'
                                        sx={{ textAlign: 'center', mb: '1.5rem', color: 'black' }}
                                    >
                                        {toDelete.email}
                                    </Typography>
                                </Box>

                                <LoadingButton
                                    loading={false}
                                    type='submit'
                                    variant='contained'
                                    onClick={id => handleDelete(id)}
                                    sx={{
                                        py: '0.8rem',
                                        mt: 2,
                                        width: '100%',
                                        marginInline: 'auto',
                                        backgroundColor: 'indianred'
                                    }}
                                >
                                    Delete
                                </LoadingButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    )
}

export default Delete