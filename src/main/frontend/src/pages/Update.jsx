import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../components/Footer';
import axios from 'axios';
import SearchHeader from '../components/SearchHeader';

const defaultTheme = createTheme();

export default function Update() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/dp/user/update');
                setUser(response.data);
            } catch (error) {
                console.error('사용자 데이터 가져오기 실패:', error);
            }
        };

        fetchUserData();
    }, []);

    const updateEmail = () => {
        // 이메일 업데이트 함수 구현
    };

    const updatePassword = () => {
        // 비밀번호 업데이트 함수 구현
    };

    const updateName = () => {
        // 이름 업데이트 함수 구현
    };

    const updatePhone = () => {
        // 이름 업데이트 함수 구현
    };


    const deleteUserAccount = () => {
        // 계정 삭제 함수 구현
    };

    const reauthenticate = () => {
        // 재인증 함수 구현
    };

    const updateAddress = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            await axios.put('/dp/user/address', formData);
            alert('주소가 업데이트되었습니다.');
        } catch (error) {
            console.error('주소 업데이트 중 에러 발생:', error);
        }
    };

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
                    <Typography component="h1" variant="h5">
                        회원정보 수정
                    </Typography>
                    <Box component="form" onSubmit={updateAddress} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="이메일"
                                    defaultValue={user.email} 
                                />
                                <Button onClick={updateEmail} fullWidth variant="contained" sx={{ mt: 2 }}>이메일 업데이트</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="비밀번호"
                                    defaultValue={user.password} 
                                />
                                <Button onClick={updatePassword} fullWidth variant="contained" sx={{ mt: 2 }}>비밀번호 업데이트</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="이름"
                                    defaultValue={user.name} 
                                />
                                <Button onClick={updateName} fullWidth variant="contained" sx={{ mt: 2 }}>이름 업데이트</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    name="phone"
                                    label="휴대폰"
                                    defaultValue={user.phone} 
                                />
                                <Button onClick={updatePhone} fullWidth variant="contained" sx={{ mt: 2 }}>전화번호 업데이트</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="address"
                                    name="address"
                                    label="주소"
                                    defaultValue={user.address} 
                                />
                                <Button onClick={updateAddress} fullWidth variant="contained" sx={{ mt: 2 }}>주소 업데이트</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={deleteUserAccount} fullWidth variant="contained" sx={{ mt: 2 }}>계정 삭제</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={reauthenticate} fullWidth variant="contained" sx={{ mt: 2 }}>재인증</Button>
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
                    <Footer sx={{ mt: 5 }} />
                </Box>
            </Container>
        </ThemeProvider>
    );
}
