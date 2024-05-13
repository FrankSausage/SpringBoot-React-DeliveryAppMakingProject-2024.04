// SearchHeader.jsx

import React, { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { logout } from '../utils/firebase';
import { AppBar, Box, Toolbar, Typography, SwipeableDrawer, List, ListItem, 
  ListItemButton, ListItemIcon, ListItemText, InputAdornment, OutlinedInput, Divider, Stack, Grid,} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt'; 
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import DropUserInfo from './DropUserInfo';

export default function SearchHeader() {
  const [ state, setState ] = useState({ left: false, });
  const { user } = useAuthContext();
  const { outletAddress, setOutletAddress } = useOutletContext();
  const address = localStorage.getItem("address") && localStorage.getItem("address");
  const role = localStorage.getItem('role') && localStorage.getItem('role');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setOutletAddress('');
    navigate('/');
  };

  const handleNavigate = () => {
    if(user)  {
    navigate('/Address');
    } else {
      alert('로그인이 필요합니다.');
      navigate('/SignIn');
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>휴먼 딜리버리</Link>    
          </Typography>
          {role === '회원' &&
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
              <OutlinedInput
                value={address ? address : outletAddress}
                startAdornment={
                  <InputAdornment position="start">
                    <GpsFixedIcon style={{ color: 'gray' }} />&nbsp;
                  </InputAdornment>
                }
                sx={{ width: '100%', maxWidth: 400, mr: 25, backgroundColor: 'white' }} 
                onClick={handleNavigate}
              />
            </Box> 
          }
          <Grid item xs={3}>
          <Stack direction='row' spacing={1} justifyContent='right' alignItems='center'>
            {user ? (
              <>
                <Typography variant="body1" sx={{ color: 'white', mr: 1 }}>
                  <Link to="/Update" style={{ textDecoration: 'none', color: 'white' }}>
                    {user.displayName}
                  </Link>
                </Typography>
                <button onClick={handleLogout} style={{ color: 'white', textDecoration: 'none', background: 'none', border: 'none' }}>로그아웃</button>
                <DropUserInfo />
              </>
            ) : (
              <>
                <Link to='/SignIn' style={{ textDecoration: 'none', color: 'white' }}>로그인</Link>
                <Link to='/SignUp' style={{ textDecoration: 'none', color: 'white' }}>회원가입</Link>
              </>
            )}
          </Stack>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
