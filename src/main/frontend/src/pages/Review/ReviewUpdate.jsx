import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, Rating } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/firebase';
import { extractDataFromFormData  } from '../../utils/storeInfo';
import axios from 'axios';
import SearchHeader from '../../components/SearchHeader';
import Footer from '../../components/Footer';

const defaultTheme = createTheme();

export default function ReviewUpdate() {
  const { email } = getCurrentUser(); 
  const [rating, setRating] = useState('');
  const [content, setContent] = useState('');
  const [storePictureName, setStorePictureName] = useState('');
  const navigate = useNavigate();
  // const [userInfo, setUserInfo] = useState({email: '', password: '', })
  // const [storeInfo, setStoreInfo] = useState({deliveryAddress: '', closedDays: '',}) // 나중에 이런식으로 이팩토리 할것 이유 업데이트 할때 정보 받기 편해지기 위해서

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget);
  //   extractDataFromFormData(data).then(res=>console.log(res))
  //     setFormData(data)
  //       .then(res => {
  //         extractDataFromFormData(res)
  //           .then(resFormData => {
  //             axios.post(`/dp/store/review/register`, resFormData)
  //           })
  //           .then(() => {
  //             alert('리뷰 등록이 완료되었습니다.');
  //             navigate('/');
  //           })
  //       })
  //       .catch(console.error);
  //   };

  

  const setFormData = async (data) => {
    try {
      data.append('email', email);
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

  // 별점이 변경될 때 호출되는 함수
  const handleRatingChange = (event, newRating) => {
    setRating(newRating); // 선택된 별점을 상태에 저장
  };

  // // 별점이 확정될 때 호출되는 함수
  // const handleRatingConfirm = () => {
  //   console.log('별점 확정:', rating); // 선택된 별점을 확정
  //   // 여기에 별점을 확정하는 로직을 추가할 수 있습니다.
  // };

  return (
    <ThemeProvider theme={defaultTheme}>
      <SearchHeader />
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
            {/* <Link to="/OwnerMain" style={{ textDecoration: 'none', color: 'black' }}>휴먼 딜리버리</Link> */} {/* <- 여기 리뷰 리스트 링크??? */}
          </Typography>
          <Typography component="h1" variant="h5">
            가게 이름
          </Typography>
          
          <div style={{marginTop: '5%', textAlign: 'center'}}>
            <Box sx={{'& > legend': {mt: 2}}}>
              <Rating name="rating" value={rating} 
                defaultValue={0} precision={0.5} size="large"
                onChange={handleRatingChange}>        
              </Rating>
              <br />
            </Box>
          </div>
          

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="content"
                  fullWidth
                  id="content"
                  label="리뷰"
                  multiline
                  rows={4}
                  variant='outlined'
                  onChange={e => setContent(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <input
                  accept=".png, .jpeg, .jpg"
                  id="upload-photo"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileUpload} multiple
                />

                <TextField
                  name="storePictureName"
                  value={storePictureName}
                  fullWidth
                  id="storePictureName"
                  label="리뷰 사진"
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
            </Grid>
            <Box sx={{...boxStyle, position: 'relative', width: { xs: '90%', sm: '100%' }, height: '65px', marginX: 'auto'}}>
                <div>
                  <ul style={{ display: 'flex', justifyContent: 'space-between', position: 'absolute', top: '50%', left: '40%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0 }}>
                    <li style={{ listStyleType: 'none', marginLeft:'-140px', marginRight: '100px' }}>메뉴 이름</li>
                    <li style={{ listStyleType: 'none', marginLeft:'100px', marginRight: '10px' }}> O </li>
                    <li style={{ listStyleType: 'none', marginRight: '-220px'}}> X </li>
                  </ul>
                </div> 
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontSize: '1.1rem' }}>
              리뷰 등록하기
            </Button>
          </Box>
        </Box>
        <Footer sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

let boxStyle = {
  width: 200, 
  height: 200, 
  border:1, 
  borderColor: 'rgb(217, 217, 217)', 
  m:2
}
let gridStyle ={
  justifyContent:'center',
  alignItems:'center',
  p:2
}
