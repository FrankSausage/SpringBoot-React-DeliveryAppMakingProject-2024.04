import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { findPostcode } from '../utils/AddressUtil';
import { getCurrentUser, register } from '../utils/firebase';
import { extractDataFromFormData, formatPhoneNumber } from '../utils/storeInfo';
import axios from 'axios';
import Ownerheader from '../components/OwnerHeader';

const defaultTheme = createTheme();

export default function MenuRegister() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [deliveryTip, setDeliveryTip] = useState('');
  const [content, setContent] = useState('');
  const [storePictureName, setStorePictureName] = useState('');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  // const [userInfo, setUserInfo] = useState({email: '', password: '', })
  // const [storeInfo, setStoreInfo] = useState({deliveryAddress: '', closedDays: '',}) // 나중에 이런식으로 이팩토리 할것 이유 업데이트 할때 정보 받기 편해지기 위해서
  
  useEffect(() => {
    const fetchUserData = async () => {
      const { email } = await getCurrentUser();
      setEmail(email);
    };
    fetchUserData();
  }, []);
  console.log(email);
  

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (!data.get('name') || !data.get('phone')) {
      alert('필수 항목을 입력하세요.');
      return;
    }

    
      const formData = await setFormData(data);
      extractDataFromFormData(formData)
        .then(resFormData => axios.post(`/dp/store/menu/register`, resFormData));

      alert('음식 등록이 완료되었습니다.');
      navigate('/OwnerMain');
    
  };

  

  const setFormData = async (data) => {
    try {
      data.append('email', email);
      data.append('category', category);
      data.append('content', content);
      data.append('name', name);
      data.append('deliveryTip', deliveryTip);
      data.append('price', price);
      return await data;
    }
    catch (error) {
      console.error('setFormData Error!: ', error);
      return null;
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const fileNames = files.map(file => file.name);
      setStorePictureName(fileNames);
    }
  };



  return (
    <ThemeProvider theme={defaultTheme}>
      <Ownerheader />
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
            <Link to="/StoreList" style={{ textDecoration: 'none', color: 'black' }}>가게 이동</Link>
          </Typography>
          <Typography component="h1" variant="h5">
            메뉴 등록(단건)
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  autoComplete="given-name"
                  name="name"
                  id="name"
                  value={name}
                  label="음식 이름"
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  label="음식 가격"
                  name="price"
                  autoComplete="price"
                  value={price}
                  onChange={e => setName(e.target.value)}
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
                  autoComplete="given-name"
                  name="content"
                  fullWidth
                  id="content"
                  label="음식 소개"
                  multiline
                  rows={4}
                  variant='outlined'
                  onChange={e => setContent(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  음식 사진
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
                  label="음식 사진"
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
                  sx={{ mt: 3, mb: 2, }}>
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
              sx={{ mt: 3, mb: 2, fontSize: '1.1rem' }}>
               음식 등록 하기
            </Button>
          </Box>
        </Box>
        <Footer sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
