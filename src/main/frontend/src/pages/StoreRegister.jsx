import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { findPostcode } from '../utils/AddressUtil';
import { getCurrentUser, register } from '../utils/firebase';
import { extractDataFromFormData, } from '../utils/userInfo';
import axios from 'axios';

const defaultTheme = createTheme();

export default function StoreRegister() {
  const [roadAddress, setRoadAddress] = useState('');
  const [extraAddress, setExtraAddress] = useState('');
  const [ detailAddress, setDetailAddress ] = useState('');
  const [category, setCategory] = useState('');
  const [ type, setType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ addressCode, setAddressCode ] = useState('');
  const navigate = useNavigate();
  

  useEffect(() => {         // 주소 찾기 지금 기능에서 처음 검색한 주소가 저장도 되면서 그다음 주소도 추가 가능하고 이전 선택한 주소도 선택 삭제 가능하게
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
    findPostcode(setRoadAddress, setExtraAddress , setAddressCode); // use findPostcode from AddressUtil
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    if (!data.get('name') || !data.get('phone')) {
      alert('필수 항목을 입력하세요.');
      return;
    } else {
      // const axiosConfig = { headers: {"Content-Type": "multipart/form-data",}}
      setFormData(data)
        .then(res => {
          register(res);
          extractDataFromFormData(res)
            .then(resFormData => {
              axios.post(`/dp//store/owner/register`, resFormData)
              console.log(resFormData);
            })
          })
        .then(() => {
          alert('입점 신청이 완료되었습니다.');
          getCurrentUser();
          navigate('/Home');
        });
    }
  };

  const formatPhoneNumber = (phoneNumberValue) => {
  const strippedPhoneNumber = phoneNumberValue.replace(/\D/g, '');
    //  핸드폰 입력 formatting (e.g., XXX-XXXX-XXXX)
    const formattedPhoneNumber = strippedPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    return formattedPhoneNumber;
  };
  const handlePhoneNumberChange = (event) => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value);
    setPhoneNumber(formattedPhoneNumber);
  };

  const setFormData = async (data) => {
    try{
      data.append('currentAddress', ((roadAddress ? roadAddress : '') + ',' + (extraAddress ? extraAddress : '') 
          + ',' + (detailAddress ? detailAddress : '')));
      data.append('addressCode', addressCode.substring(0, 8));   // 여러개의 주소를 주소코드로 바꿔서 띄어쓰기로 구분해서 전달 // 배달 지역 부분
      data.append('category', category);
      data.append('type', type )
      return await data;
    }
    catch (error) {
      return ('setFormData Error!: ' + error);
    }
  }
  
  const [storePictureName, setStorePictureName] = useState('');

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files); // 선택된 파일들을 배열로 변환
    if (files.length > 0) {
      const fileNames = files.map(file => file.name);
      setStorePictureName(fileNames);
      // 여기서 파일 업로드 처리를 수행할 수 있습니다.
    }
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
                      control={<Checkbox checked={category === '한식'} onChange={() => setCategory('한식')} color="primary" />}
                      label="한식"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={category === '중식'} onChange={() => setCategory('중식')} color="primary" />}
                      label="중식"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={category === '일식'} onChange={() => setCategory('일식')} color="primary" />}
                      label="일식"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={category === '양식'} onChange={() => setCategory('양식')} color="primary" />}
                      label="양식"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={category === '패스트'} onChange={() => setCategory('패스트')} color="primary" />}
                      label="패스트"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={category === '치킨'} onChange={() => setCategory('치킨')} color="primary" />}
                      label="치킨"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={category === '분식'} onChange={() => setCategory('분식')} color="primary" />}
                      label="분식"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={category === '디저트'} onChange={() => setCategory('디저트')} color="primary" />}
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
                  label="전화번호"
                  name="phone"
                  autoComplete="phone"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  inputProps={{
                    maxLength: 12,
                    inputMode: 'numeric',
                  }}
                />
              </Grid>
              <Grid item xs={12}>       
                <TextField
                  required
                  fullWidth
                  id="roadAddress"
                  label="도로명 주소"
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
                  name="detailAddress"
                  autoComplete="detailAddress"
                  onChange={e => setDetailAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>배달, 포장</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox checked={type === 0} onChange={() => setType(0)} color="primary" />}
                      label="배달"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={type === 1} onChange={() => setType(1)} color="primary" />}
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
                      onChange={handleFileUpload} multiple
                    />
                    
                      <TextField
                        autoComplete="given-name"
                        name="storePictureName"
                        value={storePictureName}
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
                        sx={{ mt: 3, mb: 2,}}>
                        사진 올리기
                      </Button>
                  </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="개인정보 수집 및 이용에 동의합니다"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontSize: '1.1rem'}}>
              입점 신청하기
            </Button>
          </Box>
        </Box>
        <Footer sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}