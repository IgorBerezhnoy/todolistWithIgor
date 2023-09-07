import React from 'react';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import {AppRootStateType, useAppDispatch} from '../../app/store';
import {loginTC} from './auth-reducer';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

export const Login = () => {
    const dispatch = useAppDispatch();

    let isLogin = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn);


    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <= 3) {
                errors.password = 'Password need more 3';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values));
        },
    });


    if (isLogin) {
        return <Navigate to={'/'}/>;
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <form onSubmit={formik.handleSubmit}>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>

                        <TextField label="Email" margin="normal" {...formik.getFieldProps('email')}/>
                        {formik.errors.email && <span style={{color: 'red'}}>{formik.errors.email}</span>}o


                        <TextField type="password" label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}/>
                        {formik.errors.password && <span style={{color: 'red'}}>{formik.errors.password}</span>}o

                        <FormControlLabel label={'Remember me'} control={<Checkbox/>}
                                          {...formik.getFieldProps('rememberMe')}/>

                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>;
};