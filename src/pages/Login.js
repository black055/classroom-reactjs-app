import React from "react";
import { useForm } from 'react-hook-form';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from "axios";
import Cookies from 'universal-cookie';


function Login() {
    //const apiUrl = "https://btcn-3-webnc.herokuapp.com";
    const apiUrl = "http://localhost:3000";

    const cookies = new Cookies();
    const { register, handleSubmit } = useForm();

    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"};
    const avatarStyle={backgroundColor:'skyblue', height:'70px',width:'70px'};
    const iconStyle={transform:'scale(2.2)'};
    const btnstyle={margin:'0 0 10px 0'};
    const textFieldStyle = {margin:'0 0 15px 0'};
    const typoStyle =  {marginLeft: '10px'};

    const handleSubmitSignUp = (data) => {
        axios.post(`${apiUrl}/users/login`, {
              username: data.username,
              password: data.password
        }).then(res => {
            if (res.data){
                cookies.set('token', res.data.token);
                window.location.replace('/');
            }
        }).catch(function(error) {
            console.log('Error on Authentication');
        });
    }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><PersonSharpIcon style={iconStyle}/></Avatar>
                    <h2>Đăng nhập</h2>
                </Grid>
                <form onSubmit={handleSubmit(handleSubmitSignUp)}>
                <TextField {...register('username')} style={textFieldStyle} autoFocus label="Tên đăng nhập" fullWidth variant="outlined" required/>
                <TextField {...register('password')} style={textFieldStyle} type="password" label="Mật khẩu" fullWidth variant="outlined" required/>
                <FormControlLabel
                    control={<Checkbox name="checkedB" color="primary" />}
                    label="Ghi nhớ tài khoản"
                 />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Đăng nhập</Button>
                </form>
                <Typography > Chưa có tài khoản?  
                    <Link href="register" style={typoStyle} >
                        Đăng ký
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
}

export default Login;