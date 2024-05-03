import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Button, Container, CssBaseline, Grid, 
    TextField, Typography, } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from "./Footer";

const defaultTheme = createTheme();

export default function Address() {

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

    }

    const handleSubmit = () => {

    }

    return(
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
            주소 등록
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="currentAddress"
                  label="현재 주소"
                //   value={roadAddress}
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
                //   value={extraAddress}
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
                //   onChange={e => setDetailAddress(e.target.value)}
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