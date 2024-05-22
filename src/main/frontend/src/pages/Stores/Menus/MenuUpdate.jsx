import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../../components/Footer';
import { extractDataFromFormData } from '../../../utils/commonUitil';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuOptionDetail from './MenuOptionDetail';
import { useMenuUpByEmail } from '../../../utils/storeInfo';
import SearchHeader from '../../../components/SearchHeader';
import { uploadImageToCloudinary } from '../../../utils/uploader';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMenu } from '../Hook/useMenu';

const defaultTheme = createTheme();

export default function MenuUpdate() {
  const location = useLocation();
  const email = localStorage.getItem('email');
  const queryClient = useQueryClient();
  const { storeId, menuId } = location.state;
  const { isLoading, error, menu } = useMenuUpByEmail(email, menuId)
  const { updateMenu } = useMenu();
  const [initialName, setInitialName] = useState('');
  const [initialPrice, setInitialPrice] = useState('');
  const [initialContent, setInitialContent] = useState('');
  const [initialCategory, setInitialCategory] = useState('');
  const [initialMenuPictureName, setInitialMenuPictureName] = useState('');
  const [menuPictureUrl, setMenuPictureUrl] = useState('');  // 업로드된 이미지 URL을 저장할 상태 추가
  const [isFileUploading, setIsFileUploading] = useState(false);
  console.log(isFileUploading)
  console.log(menuPictureUrl)
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [type , setType ] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [menuPictureName, setMenuPictureName] = useState('');

  useEffect(() => {
    if (!isLoading && menu) {
      // 초기 값을 설정합니다.
      setInitialName(menu.menus[0].name);
      setInitialPrice(menu.menus[0].price);
      setInitialContent(menu.menus[0].content);
      setInitialCategory(menu.menus[0].category);
      setInitialMenuPictureName(menu.menus[0].menuPictureName);

      // 사용자 입력 상태 변수를 초기 값으로 설정합니다.
      setName(menu.menus[0].name);
      setPrice(menu.menus[0].price);
      setContent(menu.menus[0].content);
      setCategory(menu.menus[0].category);
      setMenuPictureName(menu.menus[0].menuPictureName);
    }
  }, [isLoading]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (!data.get('name') || !data.get('price')) {
      alert('필수 항목을 입력하세요.');
      return;
    }

    const formData = await setFormData(data);
    extractDataFromFormData(formData)
      .then(resFormData => updateMenu.mutate(resFormData,{
        onSuccess: () => {
          alert('메뉴 업데이트가 완료되었습니다.');
          navigate(`/StoreDetail/${storeId}`);
        }
      }))
  };

  const handleMenuDelete = () => {
    const confirmDelete = window.confirm('정말로 이 메뉴를 삭제하시겠습니까?');
    if (confirmDelete) {
      axios.post(`/dp/store/menu/delete`, { menuId: menuId, storeId: storeId, email: email })
        .then(response => {
          alert('메뉴가 삭제되었습니다.');
          navigate(`/StoreDetail/${storeId}`);
        })
        .catch(error => {
          console.error('메뉴 삭제 중 에러 발생:', error);
          alert('메뉴 삭제 중 에러가 발생했습니다.');
        });
    }
  };

  const setFormData = async (data) => {
    try {
      data.append('menuId', menuId);
      data.append('email', email);
      data.append('category', category);
      data.append('type', type);
      data.append('content', content);
      data.append('name', name);
      data.append('price', price);
      // data.append('menuPictureName', menuPictureName);
      data.append('menuOptions', null);
      data.append('menuPictureName', menuPictureUrl);
      return data;
    } catch (error) {
      console.error('setFormData Error!: ', error);
      return ('setFormData Error!: ', error);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        const fileName = file.name;
        setIsFileUploading(true);
        setInitialMenuPictureName(fileName);
        uploadImageToCloudinary(file) // 클라우드니어리에 이미지 업로드
            .then((url) => {
              setMenuPictureUrl(url); // 업로드된 이미지 URL 저장
            })
            .then(() => setIsFileUploading(false)
            )
            .catch((error) => {
                console.error('Failed to upload image to Cloudinary:', error);
            });
    }
};

  return (
    <ThemeProvider theme={defaultTheme}>
      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography>에러 발생!</Typography>}
      {!isLoading && menu.menus &&
        <Box>
          <SearchHeader />
          <div style={{ backgroundImage: 'url(/img/kitchenO.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', padding: '23px 0', backgroundBlendMode: 'lighten', backgroundColor: 'rgba(255, 255, 255, 0.6)'}}>
          <div style={{ width: '100%', maxWidth: '900px', display: 'flex', justifyContent: 'center' }}>
          <Container component="main" maxWidth="xs" style={{ backgroundColor: '#ffffffd9', padding: '20px', borderRadius: '8px' }}>
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
                <Link to={`/StoreDetail/${storeId}`} style={{ textDecoration: 'none', color: 'black' }}>메뉴 리스트</Link>
              </Typography>
              <Typography component="h1" variant="h5">
                음식 정보 수정
              </Typography>
              {menu.menus[0].options && <MenuOptionDetail options={menu.menus[0].options} email={email} />}
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField required fullWidth autoComplete="given-name" name="name" id="name" value={name} placeholder={String(initialName)} label="음식 이름" onChange={e => setName(e.target.value)} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField required fullWidth autoComplete="given-name" name="price" id="price" value={price} placeholder={initialPrice.toString()} label="음식 가격" onChange={e => setPrice(e.target.value)} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      카테고리
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <FormControlLabel control={<Checkbox checked={category === '메인 메뉴'} onChange={() => setCategory('메인 메뉴')} color="primary" />} label="메인 메뉴" />
                        <FormControlLabel control={<Checkbox checked={category === '사이드 메뉴'} onChange={() => setCategory('사이드 메뉴')} color="primary" />} label="사이드 메뉴" />
                        <FormControlLabel control={<Checkbox checked={category === '세트 메뉴'} onChange={() => setCategory('세트 메뉴')} color="primary" />} label="세트 메뉴" />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField autoComplete="given-name" name="content" fullWidth id="content" label="음식 소개글" value={content} placeholder={initialContent.toString()} multiline rows={4} variant='outlined' onChange={e => setContent(e.target.value)} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      메뉴 사진 업로드
                    </Typography>
                    <input accept=".png, .jpeg, .jpg" id="upload-photo" type="file" style={{ display: 'none' }} onChange={handleFileUpload} multiple />
                    <TextField autoComplete="given-name" name="menuPictureName" value={menuPictureName} fullWidth id="menuPictureName" label="메뉴 사진" onClick={() => document.getElementById('upload-photo').click()} InputProps={{ readOnly: true }} sx={{ mb: 2 }} />
                    <Button type="button" variant="contained" onClick={() => document.getElementById('upload-photo').click()} fullWidth>
                      사진 올리기
                    </Button>
                    {initialMenuPictureName && (
                      <Typography variant="body1" gutterBottom sx={{maxWidth:400}}>
                        {/* 업로드된 파일: {initialMenuPictureName.split(',')[]} */}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6} >
                    {isFileUploading ? 
                    <Button type="submit" fullWidth disabled variant="contained" sx={{ mt: 3, mb: 2 }}>
                      수정
                    </Button>
                    :
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                      수정
                    </Button>
                    }
                  </Grid>
                  <Grid item xs={6} >
                    <Button fullWidth variant="contained" color="error" onClick={() => handleMenuDelete(menuId, email, storeId)} sx={{ mt: 3, mb: 2 }}>
                      삭제
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Footer sx={{ mt: 5 }} />
          </Container>
          </Container>
          </div>
        </div>
        </Box>
      }
    </ThemeProvider>
  );
}
