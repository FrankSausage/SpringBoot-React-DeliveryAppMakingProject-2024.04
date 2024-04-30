import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../components/Footer';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { findPostcode } from '../utils/AddressUtil'; 
import { register } from '../utils/firebase';
import { extractDataFromFormData, formatPhoneNumber } from '../utils/userInfo';
import axios from 'axios';

const defaultTheme = createTheme();

export default function SignUp() {
  const [ roadAddress, setRoadAddress ] = useState('');
  const [ extraAddress, setExtraAddress ] = useState('');
  const [ detailAddress, setDetailAddress ] = useState('');
  const [ addressCode, setAddressCode ] = useState('');
  const [ role, setRole ] = useState('');
  const [ passwordCheack, setPasswordCheack ] = useState('');
  const [ isPasswordMatch, setIsPasswordMatch ] = useState(true);
  const [ phoneNumber, setPhoneNumber ] = useState('');
  const { setOutletAddress } = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    const loadDaumPostcodeScript = () => {
      const script = document.createElement('script');
      script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        console.log('Daum 우편번호 API 스크립트가 로드되었습니다.');
      };
    };

    loadDaumPostcodeScript();

    return () => {
      // 언마운트 시 스크립트 제거 로직
    };
  }, []);

  const handleFindPostcode = () => {
    findPostcode(setRoadAddress, setExtraAddress, setAddressCode); // use findPostcode from AddressUtil
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    if (data.get('password') !== passwordCheack) {      
      setIsPasswordMatch(false);
        return;
    } else {
      setIsPasswordMatch(true);
      
      if(setIsPasswordMatch) {
        setFormData(data)
          .then(res => {
            register(res);
            extractDataFromFormData(res)
              .then(resFormData => {
                // const axiosConfig = { headers: {"Content-Type": "multipart/form-data",}} // 이미지 파일 첨부 대비 코드
                setOutletAddress(resFormData.currentAddress);
                axios.post(`/dp/user/signup`, resFormData)
              })
          })
          .then(() => {
            alert('가입이 완료되었습니다.');
            navigate('/signin');
          });
      }
    }
  };

  const handlePhoneNumberChange = (event) => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value);
    setPhoneNumber(formattedPhoneNumber);
  };

  const setFormData = async (data) => {
    try{
      data.append('currentAddress', ((roadAddress ? roadAddress : '') + ',' + (extraAddress ? extraAddress : '') 
          + ',' + (detailAddress ? detailAddress : '')));
      data.append('role', role);
      data.append('addressCode', addressCode);
      return await data;
    }
    catch (error) {
      return ('setFormData Error!: ' + error);
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
            회원가입
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="이름"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="이메일"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="비밀번호 확인"
                  type="password"
                  onChange={e => {setPasswordCheack(e.target.value)}}
                  error={!isPasswordMatch}
                  helperText={!isPasswordMatch && "비밀번호가 일치하지 않습니다"}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="휴대전화"
                  name="phone"
                  autoComplete="phone"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  inputProps={{
                    maxLength: 13,
                    inputMode: 'numeric',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="roadAddress"
                  label="도로명주소"
                  value={roadAddress}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
                  <Button
                    type="button"
                    onClick={handleFindPostcode}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 2, ml: 2}}
                  >
                    주소 찾기
                  </Button>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="extraAddress"
                  label="참고항목"
                  value={extraAddress}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="detailAddress"
                  label="상세주소"
                  name="detailAddress"
                  autoComplete="detailAddress"
                  onChange={e => setDetailAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={<Checkbox checked={role === '회원'} onChange={() => setRole('회원')} color="primary" />}
                  label="회원"
                />
                <FormControlLabel
                  control={<Checkbox checked={role === '점주'} onChange={() => setRole('점주')} color="primary" />}
                  label="점주"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="이메일을 통해 마케팅 프로모션, 업데이트를 받고 싶습니다.(선택)"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              회원가입
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/SignIn" variant="body2" style={{ textDecoration: 'none', color: 'black'  }}>
                  계정이 있으신가요? 로그인
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Footer sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}