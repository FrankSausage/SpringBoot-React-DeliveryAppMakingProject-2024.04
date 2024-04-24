import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../components/Footer';
import axios from 'axios';
import SearchHeader from '../components/SearchHeader';
import { getAuth, updateEmail as updateEmailFirebase, updatePassword as updatePasswordFirebase, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

const defaultTheme = createTheme();

export default function Update() {
    const [user, setUser] = useState({}); // 사용자 정보를 저장할 상태

    // Firebase 현재 사용자 가져오기
    const currentUser = getAuth().currentUser;

    // 이메일 업데이트
    const updateEmail = () => {
        const newEmail = "user@example.com"; // 새 이메일
        updateEmailFirebase(currentUser, newEmail)
            .then(() => {
                alert('이메일이 업데이트되었습니다.');
            })
            .catch((error) => {
                console.error('이메일 업데이트 중 에러 발생:', error);
            });
    };

    // 비밀번호 업데이트
    const updatePassword = () => {
        const newPassword = "newPassword123"; // 새 비밀번호
        updatePasswordFirebase(currentUser, newPassword)
            .then(() => {
                alert('비밀번호가 업데이트되었습니다.');
            })
            .catch((error) => {
                console.error('비밀번호 업데이트 중 에러 발생:', error);
            });
    };

    // 계정 삭제
    const deleteUserAccount = () => {
        deleteUser(currentUser)
            .then(() => {
                alert('계정이 삭제되었습니다.');
            })
            .catch((error) => {
                console.error('계정 삭제 중 에러 발생:', error);
            });
    };

    // 재인증
    const reauthenticate = () => {
        const credential = EmailAuthProvider.credential(
            currentUser.email, // 현재 사용자의 이메일
            'password123' // 사용자의 현재 비밀번호
        );

        reauthenticateWithCredential(currentUser, credential)
            .then(() => {
                alert('재인증되었습니다.');
            })
            .catch((error) => {
                console.error('재인증 중 에러 발생:', error);
            });
    };

    // 주소 업데이트
    const updateAddress = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            // 수정된 주소 정보를 서버로 보냄 (예: axios.put('/api/user/address', formData) 등)
            await axios.put('/api/user/address', formData);
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
                                <Button onClick={updatePassword} fullWidth variant="contained" sx={{ mt: 2 }}>비밀번호 업데이트</Button>
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
                            </Grid>
                            {/* 주소 정보 입력 필드 */}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="address"
                                    name="address"
                                    label="주소"
                                    defaultValue={user.address} // 기존 주소 정보 표시
                                />
                            </Grid>
                            {/* 이메일, 비밀번호, 계정 삭제, 재인증 버튼 */}
                            
                            {/* 비밀번호 업데이트 버튼 */}
                            <Grid item xs={12}>
                            </Grid>
                            {/* 계정 삭제 버튼 */}
                            <Grid item xs={12}>
                                <Button onClick={deleteUserAccount} fullWidth variant="contained" sx={{ mt: 2 }}>계정 삭제</Button>
                            </Grid>
                            {/* 재인증 버튼 */}
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
