import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, SwipeableDrawer, IconButton, List, ListItem, 
  ListItemButton, ListItemIcon, ListItemText, Button, InputAdornment, OutlinedInput, Divider} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ReceiptIcon from '@mui/icons-material/Receipt'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import SearchIcon from '@mui/icons-material/Search'; 
import { Link } from 'react-router-dom';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

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
                {index === 0 ? <ReceiptIcon /> : index === 1 ? <ShoppingCartIcon /> : <FavoriteIcon />} {/* 변경: 아이콘 변경 */}
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
            onClick={toggleDrawer(!state.left)} // IconButton 클릭 시 toggleDrawer 함수 호출
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>휴먼 딜리버리</Link>    
            {/* Home 으로 이동 */}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
            <GpsFixedIcon style={{ color: 'white' }} />&nbsp;
            <OutlinedInput
              placeholder="주소를 입력 하세요"
              startAdornment={
                <InputAdornment position="start">
                </InputAdornment>
              }
              sx={{ width: '100%', maxWidth: 400, mr: 1, backgroundColor: 'white' }} 
            />
          </Box>
          <Link to={'/SignIn'} color="inherit">로그인</Link><br/><br/>
          <Link to={'/SignUp'} color="inherit">회원가입</Link>
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
