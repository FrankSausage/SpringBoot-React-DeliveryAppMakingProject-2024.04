import React, { useState, useEffect, Fragment } from 'react';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, Modal } from '@mui/material';
import RestorePageIcon from '@mui/icons-material/RestorePage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../../components/Footer';
import axios from 'axios';
import SearchHeader from '../../components/SearchHeader';
import { findPostcode } from '../../utils/AddressUtil';
import { extractDataFromFormData, formatPhoneNumber } from '../../utils/commonUitil';
import { getCurrentUser, logout, updateUser } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useUser } from './Hook/useUser';

const theme = createTheme({
  palette: {
    primary: {
      main: '#dcdcdc',
    },
    secondary: {
      main: '#ff9800',
    },
    tertiary: {
      main: '#f09032'
    },

    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h5: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
    },
  },
});

export default function Update() {
    const { email, displayName } = getCurrentUser();
    const { getUserByEmail: {isLoading, error, data: user} } = useUser();
    const [ phone, setPhoneNumber] = useState();
    const [ passwordCheck, setPasswordCheck ] = useState('');
    const [ isPasswordMatch, setIsPasswordMatch ] = useState(true);
    const { roadAddress, extraAddress, detailAddress} = (localStorage.getItem("splitAddress") ? 
        JSON.parse(localStorage.getItem("splitAddress")) : ({roadAddress: '', extraAddress: '', detailAddress : ''}));
    const [ updateRoadAddress, setUpdateRoadAddress ] = useState(roadAddress ? roadAddress : '');
    const [ updateExtraAddress, setUpdateExtraAddress ] = useState(extraAddress ? extraAddress : '');
    const [ updateDetailAddress ,setUpdateDetailAddress ] = useState(detailAddress ? detailAddress : '');
    const [ addressCode, setAddressCode ] = useState('');
    const [open, setOpen] = React.useState(false);
    const role = localStorage.getItem('role');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const backgroundImage = role === '회원' ? 'url(/img/kitchen.jpg)' : 'url(/img/Okitchen.jpg)';
    useEffect(() => {
      const loadDaumPostcodeScript = () => {
        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => {
        };
      };

    loadDaumPostcodeScript();

    return () => {
    };
    }, []);

    useEffect(() => {
      if (user) {
        setPhoneNumber(user.data.phone);
        setAddressCode(user.data.addressCode);
      }
    }, [isLoading]);

  const handleFindPostcode = () => {
    findPostcode(setUpdateRoadAddress, setUpdateExtraAddress, setAddressCode);
  };

  const handlePhoneNumberChange = (event) => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value);
    setPhoneNumber(formattedPhoneNumber);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('password') !== passwordCheck) {
      setIsPasswordMatch(false);
      return;
    } else {
      setIsPasswordMatch(true);

      if (setIsPasswordMatch) {
        setFormData(data)
          .then(res => {
            updateUser(res);
            extractDataFromFormData(res)
              .then(resFormData => {
                console.log(resFormData);
                axios.post(`/dp/user/update`, resFormData);
              })
          })
          .then(() => {
            alert('회원 정보 수정이 완료되었습니다.');
            navigate('/signin');
          });
      }
    }
  };

  const handleDelete = () => {
    axios.post(`/dp/user/delete`, { email: email })
      .then(() => {
        handleClose();
        logout();
        alert('계정이 삭제되었습니다');
        navigate('/');
      })
      .catch(console.error);
  };

  const setFormData = async (data) => {
    try {
      data.append('email', email);
      data.append('currentAddress', ((updateRoadAddress ? updateRoadAddress : '') + ','
        + (updateExtraAddress ? updateExtraAddress : '') + ','
        + (updateDetailAddress ? updateDetailAddress : '')
      ));
      data.append('addressCode', (role === '회원') ? addressCode.substring(0, 8) : '00000000');
      data.append('userId', user.data.userId);
      return await data;
    } catch (error) {
      return ('setFormData Error!: ' + error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography>에러 발생!</Typography>}
      {user && user.data &&
        <>
      <SearchHeader />
      <Box sx={{ height: 'auto', minHeight: '100vh', backgroundImage: 'url(/img/kitchen.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'lighten', backgroundColor: 'rgba(255, 255, 255, 0.6)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '28px 0',}}>
          <Container component="main" maxWidth="xs" style={{ backgroundColor: '#ffffffd9', padding: '20px', borderRadius: '8px' }}>
          {/* <Container component="main" maxWidth="xs"> */}
            <CssBaseline />
            <Box
            sx={{
              marginTop: 0, display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              borderRadius: '10px'
            }}>
            {/* <Box
              sx={{
                marginTop: 8, display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'background.paper',
                boxShadow: 1,
                p: 4,
                borderRadius: 2,
              }}> */}
              <Avatar sx={{ m: 1, bgcolor: (role === '회원') ? 'tertiary.main' : (role === '점주') ? 'primary.main' : 'default' }}>
                <RestorePageIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                회원정보 수정
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField required fullWidth id="name" name="name" label="이름" defaultValue={displayName} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="이메일" defaultValue={email} autoComplete="current-email" disabled />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField required fullWidth name="password" label="비밀번호" type="password" id="password" autoComplete="current-password" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required fullWidth label="비밀번호 확인" type="password" onChange={e => { setPasswordCheck(e.target.value); }} error={!isPasswordMatch} helperText={!isPasswordMatch && "비밀번호가 일치하지 않습니다"} autoComplete="second-current-password" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField required fullWidth id="phone" name="phone" label="휴대전화" defaultValue={user.data.phone} value={phone} onChange={handlePhoneNumberChange} inputProps={{ maxLength: 13, inputMode: 'numeric'}}/>
                  </Grid>
                  {role === '회원' &&
                    <Fragment>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="roadAddress"
                          label="도로명주소"
                          value={updateRoadAddress}
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
                        sx={{ mt: 1, mb: 2, ml: 2, backgroundColor: '#66BB6A', color: '#FFFFFF', '&:hover': {backgroundColor: '#41df78'}}}>
                        주소 찾기
                      </Button>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="extraAddress"
                          label="참고항목"
                          value={updateExtraAddress}
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
                          value={updateDetailAddress}
                          onChange={e => setUpdateDetailAddress(e.target.value)}
                        />
                      </Grid>
                    </Fragment>
                  }
                  <Grid item xs={12}>
                    <Button type="submit" fullWidth variant="contained" sx={role === '회원' ? { mt: 3, mb: 2, backgroundColor: '#66BB6A', color: '#FFFFFF', '&:hover': { backgroundColor: '#41df78' }} : {mt: 3, mb: 2 }}>
                      정보 수정
                    </Button>
                    <Button fullWidth variant="contained" color='error' sx={{ mt: 2 }} onClick={handleOpen}>
                      계정 삭제
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Footer sx={{ mt: 3 }} />
          </Container>
          </Box>
          {/* </div> */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ textAlign: 'center' }}>
                계정 삭제
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
                정말로 삭제하시겠습니까?
              </Typography>
              <Grid container>
                <Grid item xs />
                <Grid item xs={5}>
                  <Button onClick={handleDelete}>네</Button>
                  <Button onClick={handleClose}>아니요</Button>
                </Grid>
                <Grid item xs />
              </Grid>
            </Box>
          </Modal>
        </>
      }
    </ThemeProvider>
  );
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
