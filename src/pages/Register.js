import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core';
import { Alert } from '@mui/material';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import axios from "axios";
import Cookies from 'universal-cookie';

function Register() {
    const apiUrl = "https://btcn-3-webnc.herokuapp.com";
    //const apiUrl = "http://localhost:3000";

    const { register, handleSubmit } = useForm();
    const [existedError, setExistedError] = useState(false);
    const [confirmError, setConfirmError] = useState(false);

    const cookies = new Cookies();

    const handleSubmitSignUp = (data) => {
        if (data.password !== data.confirmPassword) {
            if (existedError) setExistedError(false);
            setConfirmError(true);
        } else {
            axios.post(`${apiUrl}/users/register`, {
                firstname: data.firstname,
                lastname: data.lastname,
                username: data.username,
                password: data.password
            }).then(res => {
                if (res.data){
                    cookies.set('token', res.data.token);
                    window.location.replace('/');
                } else {
                    if (confirmError) setConfirmError(false);
                    setExistedError(true);
                }
            }).catch(function(error) {
                console.log(error);
            });
        }
    }

    const paperStyle={padding :20,height:'80vh',width:280, margin:"20px auto"};
    const avatarStyle={backgroundColor:'skyblue', height:'70px',width:'70px'};
    const iconStyle={transform:'scale(2.2)'};
    const btnstyle={margin:'15px 0'};
    const textFieldStyle = {margin:'15px 0 0 0'};
    const typoStyle =  {marginLeft: '10px'};
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><PersonSharpIcon style={iconStyle}/></Avatar>
                    <h2>????ng k??</h2>
                </Grid>
                <form onSubmit={handleSubmit(handleSubmitSignUp)}>
                { confirmError && (
                    <Alert variant="standard" severity="error" style={btnstyle}>
                        M???t kh???u kh??ng tr??ng kh???p!
                    </Alert>)
                }
                { existedError && (
                    <Alert variant="standard" severity="error" style={btnstyle}>
                        T??n ????ng nh???p ???? t???n t???i!
                    </Alert>)
                }

                <Grid container spacing={2} >
                    <Grid item xs={12} sm={6}>
                        <TextField {...register('firstname')}
                            fullWidth
                            label="T??n"
                            type="text"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField {...register('lastname')}
                            fullWidth
                            label="H???"
                            type="text"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
                <TextField {...register('username')} style={textFieldStyle}
                    fullWidth
                    label="T??n ????ng nh???p" 
                    variant="outlined"
                    required
                />
                <TextField {...register('password')} style={textFieldStyle}
                    fullWidth
                    type="password"
                    label="M???t kh???u"
                    variant="outlined"
                    required
                />
                <TextField {...register('confirmPassword')} style={textFieldStyle}
                    fullWidth
                    type="password"
                    label="X??c nh???n m???t kh???u"
                    variant="outlined"
                    required
                />

                <Button 
                    fullWidth
                    type='submit'
                    color='primary'
                    variant="contained"
                    style={btnstyle}
                >????ng k??</Button>
                </form>
                <Typography > ???? c?? t??i kho???n?  
                    <Link href="login" style={typoStyle} >
                        ????ng nh???p
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
}

export default Register;