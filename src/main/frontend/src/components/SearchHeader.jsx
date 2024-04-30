// SearchHeader.jsx

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

export default function SearchHeader() {
  const [text, setText] = useState('');
  const { keyword } = useParams();
  const [state, setState] = React.useState({
    left: false,
  });
  const { email } = getCurrentUser();

  const { user, setUser, logout } = useAuthContext();
  const navigate = useNavigate();
  const { outletAddress } = useOutletContext();
  const address = localStorage.getItem("address") && localStorage.getItem("address");
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
    navigate('/SignIn');
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
            <GpsFixedIcon style={{ color: 'white' }} />&nbsp;
            <OutlinedInput
              placeholder="주소를 입력 하세요"
              value={address ? address : outletAddress}
              startAdornment={
                <InputAdornment position="start">
                </InputAdornment>
              }
              onClick={() => {stateToggle ? setStateToggle(false) : setStateToggle(true)} }
              sx={{ width: '100%', maxWidth: 400, mr: 1, backgroundColor: 'white' }} 
            />
          </Box> 
          <Grid item xs={3}>
          <Stack direction='row' spacing={1} justifyContent='right' alignItems='center'>
            {user ? (
              <>
                <Typography variant="body1" sx={{ color: 'white', mr: 1 }}>
                  <Link to="/Update" state={{ email }} style={{ textDecoration: 'none', color: 'white' }}>
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

      <Address stateToggle={stateToggle} />
      
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
