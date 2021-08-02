import Input from './Input';
import Icon from './icon.js';
import useStyles from './styles';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [form, setForm] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const switchMode = () => {
        setForm(initialState);
        setIsSignUp((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            dispatch(signup(form, history));
        } else {
            dispatch(signin(form, history));
        }
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;//?" will not geiv error if it does not exists"
        const token = res?.tokenId;
        try {
            dispatch({ type: AUTH, data: { result, token } });
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleError = () => {
        console.log('Google Sign In Was unsuccessful. Try Again Later');
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon color="secondary"/>
                    </Avatar>
                    <Typography variant="h5">
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} autoFocus half />
                                </>
                            )}
                            <Input name="email" type="email" handleChange={handleChange} label="Email Address" />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                            {isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <GoogleLogin
                            clientId="1016287767584-qrfd8qtnett7dupval6ghdp9gdgf1hsj.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <Button
                                    className={classes.googleButton}
                                    color="primary"
                                    fullWidth
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    startIcon={<Icon />}
                                    variant="contained"
                                >
                                    Google Sign In
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleError}
                            cookiePolicy="single_host_origin"
                        />
                        <Grid container justify="center">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignUp ? 'Already Have An Account? Sign In' : "Don't Have An Account? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </>
    );
}

export default Auth;
