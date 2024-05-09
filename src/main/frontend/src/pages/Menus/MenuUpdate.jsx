import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../../components/Footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { findPostcode } from '../../utils/AddressUtil';
import { getCurrentUser, register } from '../../utils/firebase';
import { extractDataFromFormData, useUserByEmail } from '../../utils/storeInfo';
import axios from 'axios';
import Ownerheader from '../../components/OwnerHeader';

const defaultTheme = createTheme();

export default function MenuUpdate() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [content, setContent] = useState('');
  const [storePictureName, setStorePictureName] = useState('');

  const navigate = useNavigate();
  const { email } = getCurrentUser();
  const { isLoading, error, MenuData } = useUserByEmail(email);
  const location = useLocation();
  const { menuId } = location.state;




  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (!data.get('name') || !data.get('phone')) {
      alert('필수 항목을 입력하세요.');
      return;
    }


    const formData = await setFormData(data);
    extractDataFromFormData(formData)
      .then(resFormData => axios.post(`/dp/store/owner/update`, resFormData));

    alert('입점 신청이 완료되었습니다.');
    navigate('/OwnerMain');

  };


  const setFormData = async (data) => {
    try {
      data.append('menuId', menuId);
      data.append('email', email);
      data.append('category', category + (','));
      data.append('type', type);
      data.append('content', content);
      data.append('name', name);
      data.append('price', price);
      return await data;
    }
    catch (error) {
      console.error('setFormData Error!: ', error);
      return ('setFormData Error!: ', error);
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
      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography>에러 발생!</Typography>}
      {MenuData &&
        <>
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
                <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>휴먼 딜리버리</Link>
              </Typography>
              <Typography component="h1" variant="h5">
                가게 정보 수정
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
                      defaultValuevalue={name}
                      label="가게 이름"
                      onChange={e => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      autoComplete="given-name"
                      name="price"
                      id="price"
                      defaultValuevalue={name}
                      label="가게 이름"
                      onChange={e => setPrice(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      카테고리
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={<Checkbox checked={category === '메인 메뉴'} onChange={() => setCategory('메인 메뉴')} color="primary" />}
                          label="메인 메뉴"
                        />
                        <FormControlLabel
                          control={<Checkbox checked={category === '사이드 메뉴'} onChange={() => setCategory('사이드 메뉴')} color="primary" />}
                          label="사이드 메뉴"
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
                      label="음식 소개글"
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
                  sx={{ mt: 3, mb: 2 }}>
                  수정하기
                </Button>
              </Box>
            </Box>
            <Footer sx={{ mt: 5 }} />
          </Container>
        </>
      }
    </ThemeProvider>
  );
}
