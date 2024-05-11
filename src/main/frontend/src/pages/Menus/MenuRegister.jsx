import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../../components/Footer';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../../utils/firebase';
import { extractDataFromFormData } from '../../utils/storeInfo';
import axios from 'axios';
import Ownerheader from '../../components/OwnerHeader';

const defaultTheme = createTheme();

export default function MenuRegister() {
  const { email } = getCurrentUser();
  const location = useLocation();
  const { storeId } = location.state;
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [content, setContent] = useState('');
  const [menuPictureName, setMenuPictureName] = useState('');
  const navigate = useNavigate();
  console.log(storeId)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (!name || !price) {
      alert('필수 항목을 입력하세요.');
      return;
    }

    const formData = await setFormData(data);
    extractDataFromFormData(formData)
      .then(resFormData => {
        console.log(resFormData)
        axios.post(`/dp/store/menu/register`, resFormData)
        
       }
      )
      .then(() => {
        alert('음식 등록이 완료되었습니다.');
        navigate(`/StoreDetail/${storeId}`);
      })
      .catch(error => console.error('음식 등록 실패: ', error));
  };

  const setFormData = async (data) => {
    try {
      data.append('storeId', storeId);
      data.append('email', email);
      data.append('category', category);
      data.append('content', content);
      data.append('name', name);
      data.append('price', price);
      data.append('menuPictureName', menuPictureName);
      return data;
    } catch (error) {
      console.error('setFormData Error!: ', error);
      return null;
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const fileNames = files.map(file => file.name);
      setMenuPictureName(fileNames);
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
            <Link to="/StoreDetail" style={{ textDecoration: 'none', color: 'black' }}>가게 이동</Link>
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
                  name="menuPictureName"
                  value={menuPictureName}
                  fullWidth
                  id="menuPictureName"
                  label="음식 사진"
                  autoFocus
                  onClick={(e) => {
                    e.target.value = setMenuPictureName(e.target.value)
                  }}
                />

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
