import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { findPostcode } from '../utils/AddressUtil'; 
import { getCurrentUser, register } from '../utils/firebase';
import { extractDataFromFormData } from '../utils/userInfo';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const defaultTheme = createTheme();

export default function StoreSignUp() {
  const [postcode, setPostcode] = useState('');
  const [roadAddress, setRoadAddress] = useState('');
  const [jibunAddress, setJibunAddress] = useState('');
  const [extraAddress, setExtraAddress] = useState('');
  const [role, setRole] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    const password = data.get('password');
    const password2 = data.get('password2');
    if (password !== password2) {
      // 비밀번호가 일치하지 않을 때
      setPasswordMatch(false);
      return;
    } else {
      setPasswordMatch(true);
      // const axiosConfig = { headers: {"Content-Type": "multipart/form-data",}}
      setFormData(data)
        .then(res => {
          register(res);
          extractDataFromFormData(res)
            .then(resFormData => {
              axios.post(`/dp/user/signup`, resFormData)
              console.log(resFormData);
            })
          })
        .then(() => {
          alert('입점 신청이 완료되었습니다.');
          getCurrentUser();
          navigate('/signin');
        });
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
      data.append('currentAddress', (roadAddress + ',' + jibunAddress + ',' + extraAddress + ',' + data.get('detailAddress')));
      data.append('role', role);
      return await data;
    }
    catch{
      return 'Error!';
    }
  }
  
  const [storePictureName, setStorePictureName] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStorePictureName(file.name);
      // 여기서 파일 업로드 처리를 수행할 수 있습니다.
    }
  };

  const uploadButtonStyle = {
    display: 'inline-block',
    width: '90px',
    height: '90px',
    background: 'url("src/assets/icon-add-photo.svg") no-repeat',
    backgroundPosition: 'center',
    border: '1px solid #ccc',
    borderRadius: '10px',
    cursor: 'pointer',
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>휴먼 딜리버리</Link>    
          </Typography>
          <Typography component="h1" variant="h5">
           온라인 입점 신청서
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="가게 이름"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  카테고리
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox checked={role === '한식'} onChange={() => setRole('한식')} color="primary" />}
                      label="한식"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={role === '중식'} onChange={() => setRole('중식')} color="primary" />}
                      label="중식"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={role === '일식'} onChange={() => setRole('일식')} color="primary" />}
                      label="일식"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={role === '양식'} onChange={() => setRole('양식')} color="primary" />}
                      label="양식"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={role === '패스트'} onChange={() => setRole('패스트')} color="primary" />}
                      label="패스트"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={role === '치킨'} onChange={() => setRole('치킨')} color="primary" />}
                      label="치킨"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={role === '분식'} onChange={() => setRole('분식')} color="primary" />}
                      label="분식"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={role === '디저트'} onChange={() => setRole('디저트')} color="primary" />}
                      label="디저트"
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="가게 전화번호"
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
                  id="postcode"
                  label="가게 주소"
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
                  id="roadAddress"
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
                  name="address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>배달, 포장</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox checked={role === '배달'} onChange={() => setRole('배달')} color="primary" />}
                      label="배달"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={role === '배달+포장'} onChange={() => setRole('배달+포장')} color="primary" />}
                      label="배달+포장"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="minDeliveryPrice"
                  required
                  fullWidth
                  id="minDeliveryPrice"
                  label="최소 주문금액"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="deliveryTip"
                  required
                  fullWidth
                  id="deliveryTip"
                  label="배달팁"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="minDeliveryTime"
                  required
                  fullWidth
                  id="minDeliveryTime"
                  label="최소 배달 예상 시간"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="maxDeliveryTime"
                  required
                  fullWidth
                  id="maxDeliveryTime"
                  label="최대 배달 예상 시간"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="operationHours"
                  required
                  fullWidth
                  id="operationHours"
                  label="운영 시간"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="closedDays"
                  required
                  fullWidth
                  id="closedDays"
                  label="휴무일"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="deliveryAddress"
                  required
                  fullWidth
                  id="deliveryAddress"
                  label="배달 지역"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="content"
                  required
                  fullWidth
                  id="content"
                  label="가게 소개글"
                  autoFocus
                  multiline
                  rows={4}
                  variant='outlined'
                />
              </Grid>
              
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    가게 사진
                  </Typography>
                    <input
                      accept=".png, .jpeg, .jpg"
                      id="upload-photo"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleFileUpload}
                    />
                    
                      <TextField
                        autoComplete="given-name"
                        name="storePictureName"
                        value={storePictureName}
                        required
                        fullWidth
                        id="storePictureName"
                        label="가게 사진"
                        autoFocus
                        onClick={(e) => {
                          e.target.value = null;
                        }}
                      />
                      {/* 아이콘 대신에 "사진 올리기" 텍스트를 사용하고 싶다면 아래 주석 처리된 라인을 사용하세요 */}
                      {/* <span>사진 올리기</span> */}
                    
                      <Button
                        type="button"
                        variant="contained"
                        onClick={() => document.getElementById('upload-photo').click()}
                        sx={{ mt: 3, mb: 2 }}>
                        사진 올리기
                      </Button>
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
              sx={{ mt: 3, mb: 2 }}>
              입점 신청하기
            </Button>
          </Box>
        </Box>
        <Footer sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}