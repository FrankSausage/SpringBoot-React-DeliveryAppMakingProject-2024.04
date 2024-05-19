import React, { Fragment } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputAdornment,
  OutlinedInput,
  Stack,
  Grid,
} from '@mui/material';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import DropUserInfo from './DropUserInfo';

export default function SearchHeader() {
  const { user } = useAuthContext();
  const { outletAddress } = useOutletContext();
  const address = localStorage.getItem('address') ? localStorage.getItem('address') : '';
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (user) {
      navigate('/Address');
    } else {
      alert('로그인이 필요합니다.');
      navigate('/SignIn');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#ffb819' }}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#1e7843', fontWeight: 'bold' }}>
                  휴먼 딜리버리
                </Link>
              </Typography>
            </Grid>
            {role === '회원' && (
              <Grid item xs>
                <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
                  <OutlinedInput
                    value={address ? address : outletAddress}
                    startAdornment={
                      <InputAdornment position="start">
                        <GpsFixedIcon style={{ color: 'gray' }} />
                      </InputAdornment>
                    }
                    sx={{
                      mt: 1, mb: 1,
                      width: '100%',
                      maxWidth: 550,
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      borderRadius: '30px',
                      padding: '1px 15px',
                      fontSize: '1rem',
                    }}
                    onClick={handleNavigate}
                  />
                </Box>
              </Grid>
            )}
            <Grid item xs={user && role !== '점주' ? 3 : 9}>
              <Stack direction="row" spacing={1} justifyContent="right" alignItems="center">
                {user ? (
                  <>
                    <DropUserInfo role={role} />
                    <Typography variant="body1" sx={{ color: '#1e7843', fontWeight: 'bold' }}>
                      {user.displayName}
                    </Typography>
                  </>
                ) : (
                  <Fragment>
                    <Link
                      to="/SignIn"
                      style={{ textDecoration: 'none', color: '#1e7843', fontWeight: 'bold' }}
                    >
                      로그인
                    </Link>
                    <Link
                      to="/SignUp"
                      style={{ textDecoration: 'none', color: '#1e7843', fontWeight: 'bold' }}
                    >
                      회원가입
                    </Link>
                  </Fragment>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
