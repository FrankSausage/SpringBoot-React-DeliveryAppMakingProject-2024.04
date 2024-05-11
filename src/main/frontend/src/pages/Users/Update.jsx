import React, { useState, useEffect, Fragment } from 'react';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, Modal } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../../components/Footer';
import axios from 'axios';
import SearchHeader from '../../components/SearchHeader';
import { findPostcode } from '../../utils/AddressUtil'; 
import { extractDataFromFormData, formatPhoneNumber } from '../../utils/userInfo';
import { getCurrentUser, logout, updateUser } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useUser } from './useUser';

const defaultTheme = createTheme();

export default function Update() {
    const { email, displayName } = getCurrentUser();
    // const { isLoading, error, user } = useUserByEmail(email);
    const { getUserByEmail: {isLoading, error, data: user} } = useUser(email);
    const [ phone, setPhoneNumber] = useState();
    const [ passwordCheack, setPasswordCheack ] = useState('');
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

    // console.log(user)
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
      };
    }, []);

    const handleFindPostcode = () => {
      findPostcode(setUpdateRoadAddress, setUpdateExtraAddress, setAddressCode); // use findPostcode from AddressUtil
    };

    const handlePhoneNumberChange = (event) => {
      const formattedPhoneNumber = formatPhoneNumber(event.target.value);
      setPhoneNumber(formattedPhoneNumber);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget)
      if (data.get('password') !== passwordCheack) {      
          setIsPasswordMatch(false);
          return;
      } else {
          setIsPasswordMatch(true);
          
          if(setIsPasswordMatch) {
            setFormData(data)
              .then(res => {
              updateUser(res);
              extractDataFromFormData(res)
                  .then(resFormData => {
                  // const axiosConfig = { headers: {"Content-Type": "multipart/form-data",}} // 이미지 파일 첨부 대비 코드
                  axios.post(`/dp/user/update`, resFormData)
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
      axios.post(`/dp/user/delete`, { email : email })
          .then(() => {
              handleClose();
              logout();
              alert('계정이 삭제되었습니다');
              navigate('/');
          })
          .catch(console.error)
    }

    const setFormData = async (data) => {
      try{
        data.append('currentAddress', ((updateRoadAddress ? updateRoadAddress : '') + ',' 
        + (updateExtraAddress ? updateExtraAddress : '') + ',' 
        + (updateDetailAddress ? updateDetailAddress : '')
        ));
        data.append('addressCode', user.role==='회원' ? addressCode.substring(0,8) : '00000000');
        return await data;
      }
      catch (error) {
        return ('setFormData Error!: ' + error);
      }
    }
    
    return (
        <ThemeProvider theme={defaultTheme}>
        {isLoading && <Typography>Loading...</Typography>}
        {error && <Typography>에러 발생!</Typography>}
        {user && user.data &&
        <>
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
                    <Typography component="h1" variant="h5">
                        회원정보 수정
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="이름"
                                    defaultValue={displayName} // 기존 이름 정보 표시
                                    />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="이메일"
                                    defaultValue={email} // 기존 이메일 정보 표시
                                    autoComplete="current-email"
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
                                autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                               <TextField
                                required
                                fullWidth
                                label="비밀번호 확인"
                                type="password"
                                onChange={e => {setPasswordCheack(e.target.value)}}
                                error={!isPasswordMatch}
                                helperText={!isPasswordMatch && "비밀번호가 일치하지 않습니다"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    name="phone"
                                    label="휴대전화"
                                    value={user.data.phone}
                                    onChange={handlePhoneNumberChange}
                                    inputProps={{
                                        maxLength: 13,
                                        inputMode: 'numeric',
                                    }}
                                    />
                            </Grid>    
                            {role==='회원' &&
                            <Fragment>
                              <Grid item xs={12}>
                                  <TextField
                                      required
                                      fullWidth
                                      id="roadAddress"
                                      label="도로명주소"
                                      value={updateRoadAddress}
                                    //   value={user.data.currentAddress.split(',')[0]}
                                      InputProps={{
                                          readOnly: true, // 도로명주소도 수정되지 않도록 설정되어 있습니다.
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
                                      value={updateExtraAddress}
                                    //   value={user.data.currentAddress.split(',')[1]}
                                      InputProps={{
                                          readOnly: true, // 참고항목도 수정되지 않도록 설정되어 있습니다.
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
                                    //   value={user.data.currentAddress.split(',')[3]}
                                      onChange={e => setUpdateDetailAddress(e.target.value)}
                                      />
                              </Grid>
                            </Fragment>
                            }                        
                            <Grid item xs={12}>
                                <Button 
                                    fullWidth 
                                    variant="contained" 
                                    sx={{ mt: 2 }}
                                    onClick={handleOpen}
                                    >
                                계정 삭제
                                </Button>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            >
                            정보 업데이트
                        </Button>
                    </Box>
                </Box>
            <Footer sx={{ mt: 5 }} />
        </Container>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

