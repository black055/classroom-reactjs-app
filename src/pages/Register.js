import React from "react";
import { useForm } from 'react-hook-form';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import axios from "axios";
import Cookies from 'universal-cookie';

function Login() {
    //const apiUrl = "https://btcn-3-webnc.herokuapp.com";
    const apiUrl = "http://localhost:3000";

    const { register, handleSubmit } = useForm();

    const cookies = new Cookies();

    const handleSubmitSignUp = (data) => {
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
                console.log('Tên đăng nhập đã tồn tại');
            }
        }).catch(function(error) {
            console.log('Error on Register');
        });
    }

    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"};
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
                    <h2>Đăng ký</h2>
                </Grid>
                <form onSubmit={handleSubmit(handleSubmitSignUp)}>
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={6}>
                        <TextField {...register('firstname')}
                            fullWidth
                            label="Tên"
                            type="text"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField {...register('lastname')}
                            fullWidth
                            label="Họ"
                            type="text"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
                <TextField {...register('username')} style={textFieldStyle}
                    fullWidth
                    label="Tên đăng nhập" 
                    variant="outlined"
                    required
                />
                <TextField {...register('password')} style={textFieldStyle}
                    fullWidth
                    type="password"
                    label="Mật khẩu"
                    variant="outlined"
                    required
                />
                <TextField {...register('confirmPassword')} style={textFieldStyle}
                    fullWidth
                    type="password"
                    label="Xác nhận mật khẩu"
                    variant="outlined"
                    required
                />

                <Button 
                    fullWidth
                    type='submit'
                    color='primary'
                    variant="contained"
                    style={btnstyle}
                >Đăng ký</Button>
                </form>
                <Typography > Đã có tài khoản?  
                    <Link href="login" style={typoStyle} >
                        Đăng nhập
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
}

export default Login;