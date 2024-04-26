import React, { useEffect, useState } from 'react';
import { AppBar, Box, Toolbar, Typography, SwipeableDrawer, IconButton, List, ListItem, 
  ListItemButton, ListItemIcon, ListItemText, InputAdornment, OutlinedInput, Divider, Stack, Grid} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ReceiptIcon from '@mui/icons-material/Receipt'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import { Link, useParams, useNavigate } from 'react-router-dom';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { useAuthContext } from '../context/AuthContext';
import { getCurrentUser } from '../utils/firebase';
import { findPostcode } from '../utils/AddressUtil'; 

export default function SearchHeader() {
  const [postcode, setPostcode] = useState('');
  const [roadAddress, setRoadAddress] = useState('');
  const [jibunAddress, setJibunAddress] = useState('');
  const [extraAddress, setExtraAddress] = useState('');

  const [text, setText] = useState('');
  const { keyword } = useParams();
  const [state, setState] = React.useState({
    left: false,
  });
  const { email } = getCurrentUser();

  const { user, setUser, logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  useEffect(() => {
    setText(keyword || '');
  }, [keyword]);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ left: open });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/SignIn');
  };

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
    findPostcode(setPostcode, setRoadAddress, setJibunAddress, setExtraAddress); // use findPostcode from AddressUtil
  };

  const list = (
    <Box
      sx={{ width: 'auto' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['결제내역', '장바구니', '찜'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? <ReceiptIcon /> : index === 1 ? <ShoppingCartIcon /> : <FavoriteIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(!state.left)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>휴먼 딜리버리</Link>    
          </Typography>
          {user &&
          <>
          <Box sx={{  alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
            <GpsFixedIcon style={{ color: 'white' }} />
            <OutlinedInput
              placeholder="주소를 입력하세요"
              id="roadAddress"
              value={user.currentAddress}
                 
              startAdornment={
                <InputAdornment position="start" value={user.roadAddress}>
                  <button onClick={handleFindPostcode} value={user.roadAddress}/>
                </InputAdornment>
              }
              sx={{ width: '100%', maxWidth: 400, mr: 20, backgroundColor: 'white' }} 
            />
          </Box> 
          </>
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
      
      <div>
        <SwipeableDrawer
          anchor={'left'}
          open={state.left}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list}
        </SwipeableDrawer>
      </div>
    </Box>
  );
}