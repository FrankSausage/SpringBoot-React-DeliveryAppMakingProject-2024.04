import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../components/Footer';
import axios from 'axios';
import SearchHeader from '../components/SearchHeader';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { extractDataFromFormData, useUserByEmail } from '../utils/userInfo';
import { getCurrentUser } from '../utils/firebase';

const defaultTheme = createTheme();

export default function Update() {
    // const [user, setUser] = useState({}); // 사용자 정보를 저장할 상태
    const [passwordMatch, setPasswordMatch] = useState(true);
    const { email, displayName } = getCurrentUser();
    const { isLoading, error, user } = useUserByEmail(email);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            await axios.post('/dp/user/update', extractDataFromFormData(formData));
            alert('회원 정보가 업데이트되었습니다.');
        } catch (error) {
            console.error('회원 정보 업데이트 중 에러 발생:', error);
            console.log(extractDataFromFormData(formData));
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
        <SearchHeader />
        {isLoading && <Typography>Loading...</Typography>}
        {error && <Typography>에러 발생!</Typography>}
        {user &&
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
                                    id="email"
                                    name="email"
                                    label="이메일"
                                    defaultValue={email} // 기존 이메일 정보 표시
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
                                autoComplete="new-password"
                                />
                            </Grid>
                            {/*<Grid item xs={12}>*/}
                            {/*    <TextField*/}
                            {/*    required*/}
                            {/*    fullWidth*/}
                            {/*    name="password2"*/}
                            {/*    label="비밀번호 확인"*/}
                            {/*    type="password"*/}
                            {/*    id="password2"*/}
                            {/*    autoComplete="new-password"*/}
                            {/*    error={!passwordMatch}*/}
                            {/*    helperText={!passwordMatch && "비밀번호가 일치하지 않습니다"}*/}
                            {/*    />*/}
                            {/*</Grid>*/}
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
                                    id="phone"
                                    name="phone"
                                    label="휴대전화"
                                    defaultValue={user.phone} // 기존 휴대전화 정보 표시
                                    inputProps={{
                                        maxLength: 13,
                                        inputMode: 'numeric',
                                    }}
                                />
                                {/* <TextField
                                    id="postcode"
                                    name="postcode"
                                    label="우편번호"
                                    defaultValue={user.postcode} // 기존 우편번호 정보 표시
                                    InputProps={{
                                        readOnly: true, // 우편번호는 수정되지 않도록 설정되어 있습니다.
                                    }}
                                /> */}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="currentAddress"
                                    name="currentAddress"
                                    label="도로명주소"
                                    defaultValue={user.currentAddress} // 기존 도로명주소 정보 표시
                                    InputProps={{
                                        readOnly: true, // 도로명주소도 수정되지 않도록 설정되어 있습니다.
                                    }}
                                        />
                                {/* <TextField
                                    required
                                    fullWidth
                                    id="roadAddress"
                                    name="roadAddress"
                                    label="도로명주소"
                                    defaultValue={user.roadAddress} // 기존 도로명주소 정보 표시
                                    InputProps={{
                                        readOnly: true, // 도로명주소도 수정되지 않도록 설정되어 있습니다.
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="extraAddress"
                                    name="extraAddress"
                                    label="참고항목"
                                    defaultValue={user.extraAddress} // 기존 참고항목 정보 표시
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
                                    name="detailAddress"
                                    label="상세주소"
                                    defaultValue={user.detailAddress} // 기존 상세주소 정보 표시
                                />
                                <TextField
                                    id="address"
                                    name="address"
                                    label="주소"
                                    defaultValue={user.address} 
                                /> */}
                            </Grid>
                            <Grid item xs={12}>
                                <Button fullWidth variant="contained" sx={{ mt: 2 }}>계정 삭제</Button>
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
        }
    </ThemeProvider>

    );
}
