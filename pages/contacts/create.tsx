import {
    Grid,
    Box,
    Typography,
    Link as MuiLink,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { FC } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from '../../components/FormInput';
import styled from '@emotion/styled';
import Link from 'next/link';
import { object } from 'yup';
import * as yup from 'yup'
import { emptyStringToNull } from '../../helpers/yupHelpers';
import { useDispatch } from 'react-redux';
import { registerContact } from '../../redux/actions/contactsActions';
import { useRouter } from 'next/router';

// 👇 Styled React Route Dom Link Component
export const LinkItem = styled(Link)`
    text-decoration: none;
    color: #3683dc;
    &:hover {
      text-decoration: underline;
      color: #5ea1b6;
    }
  `;

// 👇 Styled Material UI Link Component
export const OauthMuiLink = styled(MuiLink)`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f6f7;
    border-radius: 1;
    padding: 0.6rem 0;
    column-gap: 1rem;
    text-decoration: none;
    color: #393e45;
    font-weight: 500;
    cursor: pointer;
  
    &:hover {
      background-color: #fff;
      box-shadow: 0 1px 13px 0 rgb(0 0 0 / 15%);
    }
  `;

const createSchema = object({
    firstName: yup.string().min(1, 'First name is required'),
    lastName: yup.string().min(1, 'Last name is required'),
    email: yup.string().min(1, 'Email is required').email('Email is invalid'),
    phone: yup.string().transform(emptyStringToNull).nullable().required('Phone is required'),
});

type ICreate = TypeOf<typeof createSchema>;

const Create: FC = () => {
    const router = useRouter()
    const dispatch = useDispatch()
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
        dispatch(registerContact(values, () => router.back()))
    };

    return (
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
                                sx={{ width: '100%' }}
                                onSubmit={methods.handleSubmit(onSubmitHandler)}
                            >
                                <Typography
                                    variant='h6'
                                    component='h1'
                                    sx={{ textAlign: 'center', mb: '1.5rem', color: 'black' }}
                                >
                                    Create new contact
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
                                    Create new contact
                                </LoadingButton>
                            </Box>
                        </Grid>
                    </Grid>
                </FormProvider>
            </Grid>
        </Grid>
    );
};

export default Create;

