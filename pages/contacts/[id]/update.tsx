import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { object } from 'yup'
import * as yup from 'yup'
import FormInput from '../../../components/FormInput'
import { fetchContact, updateContact } from '../../../redux/actions/contactsActions'
import { emptyStringToNull } from '../../../helpers/yupHelpers'

const Update: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useDispatch()
    const toUpdate = useSelector(state => state.contacts.result)

    const createSchema = object({
        firstName: yup.string().min(1, 'First name is required'),
        lastName: yup.string().min(1, 'Last name is required'),
        email: yup.string().min(1, 'Email is required').email('Email is invalid'),
        phone: yup.string().transform(emptyStringToNull).nullable().required('Phone is required'),
    });

    const defaultValues: ICreate = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    };

    const methods = useForm<ICreate>({
        resolver: yupResolver(createSchema),
        defaultValues,
    });

    const onSubmitHandler: SubmitHandler<ICreate> = (values: ICreate) => {
        dispatch(updateContact(id, values))
        router.back()
    };

    useEffect(() => {
        dispatch(fetchContact(id))
    }, [dispatch, id])

    useEffect(() => {
        if (toUpdate) {
            Object.keys(toUpdate).forEach(key => {
                methods.setValue(key, toUpdate[key]);
            })
        }
    }, [methods, toUpdate])

    return (
        toUpdate && (

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
                    <FormProvider {...methods}>
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
                                    onSubmit={methods.handleSubmit(onSubmitHandler)}
                                >
                                    <Typography
                                        variant='h6'
                                        component='h1'
                                        sx={{ textAlign: 'center', mb: '1.5rem', color: 'black' }}
                                    >
                                        Update contact
                                    </Typography>

                                    <FormInput
                                        label='First Name'
                                        type='text'
                                        name='firstName'
                                        focused
                                        required
                                    />
                                    <FormInput
                                        label='Last Name'
                                        type='text'
                                        name='lastName'
                                        focused
                                        required
                                    />
                                    <FormInput
                                        type='phone'
                                        label='Phone'
                                        name='phone'
                                        required
                                        focused
                                    />
                                    <FormInput
                                        type='email'
                                        label='Email'
                                        name='email'
                                        required
                                        focused
                                    />
                                    <LoadingButton
                                        loading={false}
                                        type='submit'
                                        variant='contained'
                                        sx={{
                                            py: '0.8rem',
                                            mt: 2,
                                            width: '100%',
                                            marginInline: 'auto',
                                        }}
                                    >
                                        Update
                                    </LoadingButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </FormProvider>
                </Grid>
            </Grid>
        )
    )
}

export default Update