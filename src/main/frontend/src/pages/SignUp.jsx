import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../components/Footer';
import { Form, Link, useNavigate } from 'react-router-dom';
import { findPostcode } from '../utils/AddressUtil'; 
import { register, registerTest } from '../utils/firebase';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const defaultTheme = createTheme();

export default function SignUp() {
  const [postcode, setPostcode] = useState('');
  const [roadAddress, setRoadAddress] = useState('');
  const [jibunAddress, setJibunAddress] = useState('');
  const [extraAddress, setExtraAddress] = useState('');
  const [role, setRole] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [username, setUsername] = useState('');
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
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
    findPostcode(setPostcode, setRoadAddress, setJibunAddress, setExtraAddress); // use findPostcode from AddressUtil
  };

  const registing = useMutation()

  const handleSubmit = async (event) => {
    event.preventDefault();

    const password = event.target.password.value;
    const password2 = event.target.password2.value;

    if (password !== password2) {
      setPasswordMatch(false);
      return;
    }

    setPasswordMatch(true);

    // 모든 필요한 필드 값을 변수로 추출
    const username = event.target.userId.value;
    const email = event.target.email.value;
    const name = event.target.name.value;
    const phone = phoneNumber; // 이미 formatted된 전화번호
    const address = event.target.address.value;
    const currentAddress = `${roadAddress} ${jibunAddress} ${extraAddress} ${address}`;

    // 데이터를 JSON 객체로 구성
    const userData = {
      username,
      password,
      name,
      email,
      phone,
      role,
      currentAddress
    };

    try {
      // Axios를 사용하여 데이터를 JSON 형태로 전송
      const response = await axios.post('/dp/user/signup', userData, {
        headers: { 'Content-Type': 'application/json' }
      });

      // 성공적으로 등록 후 메인 페이지로 리디렉션
      alert('가입이 완료되었습니다.');
      navigate('/');
    } catch (error) {
      // 에러 처리 로직
      console.error('가입 처리 중 오류가 발생했습니다', error);
      alert('가입 처리 중 오류가 발생했습니다');
    }
  };


  const formatPhoneNumber = (phoneNumberValue) => {
    const strippedPhoneNumber = phoneNumberValue.replace(/\D/g, '');
    //  핸드폰 입력 formatting (e.g., XXX-XXXX-XXXX)
    const formattedPhoneNumber = strippedPhoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    return formattedPhoneNumber;
  };
  const handlePhoneNumberChange = (event) => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value);
    setPhoneNumber(formattedPhoneNumber);
  };
  const setFormData = async (data) => {
    try{
      data.append('currentAddress', (roadAddress + ' ' + jibunAddress + ' ' + extraAddress));
      data.append('role', role);
      data.append('userId', username);
      data.append('phone', phoneNumber);
      return await data;
    }
    catch{
      return 'Error!';
    }
  }

  const checkUsernameAvailability = () => {
    setIsUsernameAvailable(username !== '');
  };

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
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userId"
                  label="아이디"
                  name="lastName"
                  autoComplete="family-name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={checkUsernameAvailability}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                >
                  아이디 중복 확인
                </Button>
                {!isUsernameAvailable && (
                  <Typography variant="caption" color="error">아이디가 이미 사용 중입니다.</Typography>
                )}
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
                  name="password2"
                  label="비밀번호 확인"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                  error={!passwordMatch}
                  helperText={!passwordMatch && "비밀번호가 일치하지 않습니다"}
                />
              </Grid>
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
                  id="phone"
                  label="휴대전화"
                  name="phone"
                  autoComplete="phone"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  InputProps={{
                    inputMode: 'numeric',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="sample4_postcode"
                  label="우편번호"
                  value={postcode}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Button
                  type="button"
                  onClick={handleFindPostcode}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                >
                  우편번호 찾기
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="sample4_roadAddress"
                  label="도로명주소"
                  value={roadAddress}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="sample4_extraAddress"
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
                  id="sample4_detailAddress"
                  label="상세주소"
                  name="address"
                  autoComplete="address"
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
