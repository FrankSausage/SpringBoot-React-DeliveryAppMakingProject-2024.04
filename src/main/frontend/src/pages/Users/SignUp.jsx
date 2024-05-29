import React, { useState, useEffect, Fragment } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../../components/Footer';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { findPostcode } from '../../utils/AddressUtil';
import { register } from '../../utils/firebase';
import { extractDataFromFormData, formatPhoneNumber } from '../../utils/commonUitil';
import axios from 'axios';
import { useUser } from './Hook/useUser';

const defaultTheme = createTheme();

export default function SignUp() {
  const [roadAddress, setRoadAddress] = useState('');
  const [extraAddress, setExtraAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [addressCode, setAddressCode] = useState('');
  const [role, setRole] = useState('');
  const [passwordCheack, setPasswordCheack] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const { setOutletAddress } = useOutletContext();
  const { postUserSignUp } = useUser();
  const navigate = useNavigate();

  const CustomCheckbox = ({ checked, onChange }) => {
    return (
      <Checkbox checked={checked} onChange={onChange} sx={{ color: '002500', '&.Mui-checked': { color: '#66BB6A' }}}/>
        );
      };

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

      if (setIsPasswordMatch) {
        setFormData(data)
          .then(res => {
            register(res);
            extractDataFromFormData(res)
              .then(resFormData => {
                // const axiosConfig = { headers: {"Content-Type": "multipart/form-data",}} // 이미지 파일 첨부 대비 코드
                postUserSignUp.mutate(resFormData, {
                  onSuccess: () => {
                    setOutletAddress(resFormData.currentAddress);
                    navigate('/signin')
                  },
                  onError: e => { console.error('회원 가입 실패:' + e) }
                })
              })
          })
      }
    }
  };

  const handlePhoneNumberChange = (event) => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value);
    setPhoneNumber(formattedPhoneNumber);
  };

  const setFormData = async (data) => {
    try {
      data.append('currentAddress', ((roadAddress ? roadAddress : '') + ',' + (extraAddress ? extraAddress : '')
        + ',' + (detailAddress ? detailAddress : '')));
      data.append('role', role);
      data.append('addressCode', role === '회원' ? addressCode.substring(0, 8) : '00000000');
      return await data;
    }
    catch (error) {
      return ('setFormData Error!: ' + error);
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <div style={{ backgroundImage: 'url(/img/kitchen.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '23px 0', backgroundBlendMode: 'lighten', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
          <Container component="main" maxWidth="xs" style={{ backgroundColor: '#ffffffd9', padding: '20px', borderRadius: '8px' }}>
            <CssBaseline />
          <Box
            sx={{
              marginTop: 0, display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              // background: 'linear-gradient(to bottom, #ff6b6b, #ffe66d)',
              padding: '20px',
              borderRadius: '10px'
            }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'black', fontFamily: 'Arial, sans-serif', display: 'flex', justifyContent: 'center' }}>
              <img src={'/img/001.png'} style={{ width: '50%', height: '50%',position: 'relative', top: 5, marginBottom: '20px'}}/>
            </Link>
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: '#f09032', marginBottom: '10px' }}>
            <EditNoteIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontFamily: 'Arial, sans-serif', color: 'black', marginBottom: '20px' }}>
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
                  placeholder='ex)홍길동'
                  autoFocus
                  InputProps={{ style: { fontFamily: 'Arial, sans-serif' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="이메일"
                  placeholder='ex)human@example.com'
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
                  placeholder='6자리 이상 입력하세요.(영문,숫자만 입력 가능합니다)'
                  autoComplete="new-password"
                  InputProps={{style: {fontFamily: 'Arial, sans-serif'}}}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  label="비밀번호 확인"
                  type="password"
                  placeholder='위와 일치하게 작성하세요'
                  onChange={e => {setPasswordCheack(e.target.value)}}
                  error={!isPasswordMatch}
                  helperText={!isPasswordMatch && "비밀번호가 일치하지 않습니다"}
                  autoComplete="new-password"
                  InputProps={{style: {fontFamily: 'Arial, sans-serif'}}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="휴대전화"
                  name="phone"
                  placeholder='ex) 010-1234-5678'
                  autoComplete="phone"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  inputProps={{
                    maxLength: 13,
                    inputMode: 'numeric',
                  }}
                />
              </Grid>
              {role === '회원' &&
                <Fragment>
                  <Grid item xs={12}>
                    <TextField required fullWidth id="roadAddress" label="도로명주소" value={roadAddress} InputProps={{ readOnly: true, }} />
                  </Grid>
                  <Button
                    type="button"
                    onClick={handleFindPostcode}
                      variant="contained"
                      sx={{ mt: 3, mb: 2, backgroundColor: '#66BB6A', color: '#FFFFFF' ,'&:hover': {backgroundColor: '#41df78', // 호버 시 버튼 배경색
                    }}}>
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
                    <TextField required fullWidth id="detailAddress" label="상세주소" name="detailAddress" autoComplete="detailAddress" onChange={e => setDetailAddress(e.target.value)} />
                  </Grid>
                </Fragment>
              }
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={<CustomCheckbox checked={role === '회원'} onChange={() => setRole('회원')} color="primary" />}
                  label="회원"
                />
                <FormControlLabel
                  control={<CustomCheckbox checked={role === '점주'} onChange={() => setRole('점주')} color="primary" />}
                  label="점주"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<CustomCheckbox value="allowExtraEmails" color="primary" />}
                  label="이메일을 통해 마케팅 프로모션, 업데이트를 받고 싶습니다.(선택)"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#66BB6A', color: '#FFFFFF' ,'&:hover': {backgroundColor: '#41df78'},
              fontFamily: 'Arial', 
              fontWeight: 'bold', 
              fontSize: '1.2rem'}}>
              회원 가입
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/SignIn" variant="body2" style={{ textDecoration: 'none', color: 'black' }}>
                  계정이 있으신가요? 로그인
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Footer sx={{ mt: 3 }}/>
    </div>
  </ThemeProvider>
  );
}