import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox,
    Paper, Grid, Box, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login } from '../../utils/firebase';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import Footer from '../../components/Footer';
import axios from 'axios';
import { splitAddressFromCurrentUserAddress } from '../../utils/commonUitil';

const defaultTheme = createTheme();

export default function SignIn() {
  const [userInfo, setUserInfo] = useState({email:'', password:''});
  const { setUserPoint } = useOutletContext();
  const navigate = useNavigate();

  const handleChange = e => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value});
  }
  
  const CustomCheckbox = ({ checked, onChange}) => {
    return (
      <Checkbox checked={checked} onChange={onChange} sx={{color: '002500', '&.Mui-checked': {color: '#66BB6A'}}}/>
        );
      };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!userInfo.email){
      alert('이메일을 입력해주세요.')
    } else if (!userInfo.password) {
      alert('비밀번호를 입력해주세요.')
    } else {
      login(userInfo)
        .then(res => {
          if(!res){
            alert('계정이 존재하지 않습니다.')
            return false;
          } else {
            axios.get(`dp/user/signin`, { params: { email: userInfo.email }})
              .then(res => {
                localStorage.setItem('email', userInfo.email);
                localStorage.setItem('role', res.data.role);
                localStorage.setItem('email', userInfo.email);
                setUserPoint(userInfo.point);
                if(res.data.role !== '점주') {
                  localStorage.setItem("address", res.data.currentAddress);
                  localStorage.setItem("splitAddress", JSON.stringify(splitAddressFromCurrentUserAddress(res.data.currentAddress)))
                }
              })
              .then(()=>{
                navigate('/', {state: userInfo.email})
              })
          }
        })
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'black', fontFamily: 'Arial, sans-serif', display: 'flex', justifyContent: 'center' }}>
                <img src={'/img/logo01.png'} style={{ width: '40%', height: '50%',position: 'relative', top: 5, marginBottom: '20px'}}/>
              </Link> 
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: '#f09032', marginBottom: '10px' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              로그인
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="이메일"
                name="email"
                autoComplete="email"
                autoFocus
                value={userInfo.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="current-password"
                value={userInfo.password}
                onChange={handleChange}
              />
              <FormControlLabel
                control={<CustomCheckbox value="remember" color="primary" />}
                label="나를 기억하기"
              />
              <Button
                type="submit" 
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#66BB6A', color: '#FFFFFF' ,'&:hover': {backgroundColor: '#41df78'},
                fontFamily: 'Arial', 
                fontWeight: 'bold', 
                fontSize: '1.2rem'}}>
                로그인
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" style={{ textDecoration: 'none', color: 'black'  }}>
                    비밀번호를 잊으셨나요?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/SignUp" variant="body2" style={{ textDecoration: 'none', color: 'black'  }}>
                    {"계정이 없으신가요? 가입하기"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Footer sx={{ mt: 5 }} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
