import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox,
    Paper, Grid, Box, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login, } from '../../utils/firebase';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import Footer from '../../components/Footer';
import axios from 'axios';
import { splitAddressFromCurrentUserAddress } from '../../utils/commonUitil';

const defaultTheme = createTheme();

export default function SignIn() {
  const [userInfo, setUserInfo] = useState({email:'', password:''});
  const { setOutletAddress } = useOutletContext() // 주소 표시 비동기 임시 처리
  const navigate = useNavigate();

  const handleChange = e => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value});
  }
  
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
                // console.log(res)
                localStorage.setItem('email', userInfo.email);
                localStorage.setItem('role', res.data.role);
                localStorage.setItem('email', userInfo.email);
                if(res.data.role !== '점주') {
                  setOutletAddress(res.data.currentAddress);
                  localStorage.setItem("address", res.data.currentAddress); // 세션 스토리지 리팩터
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>휴먼 딜리버리</Link>    
          </Typography>
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
                control={<Checkbox value="remember" color="primary" />}
                label="나를 기억하기"   // 아이디 기억하기 기능이나 로그인 상태 유지하기 구현 예정
              />
              <Button
                type="submit" 
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
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
