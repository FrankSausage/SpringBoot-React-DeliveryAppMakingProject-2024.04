import React, { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, Typography, SwipeableDrawer, IconButton, List, ListItem, 
  ListItemButton, ListItemIcon, ListItemText, InputAdornment, OutlinedInput, Divider, Stack, Grid} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ReceiptIcon from '@mui/icons-material/Receipt'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { logout } from '../utils/firebase';

export default function OwnerHeader() {
  const [ state, setState ] = useState({ left: false, });
  const { user } = useAuthContext();
  const address = localStorage.getItem("address") && localStorage.getItem("address");
  const navigate = useNavigate();

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
            <Link to="/OwnerMain" style={{ textDecoration: 'none', color: 'white' }}>휴먼 딜리버리</Link>    
          </Typography>
         
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
