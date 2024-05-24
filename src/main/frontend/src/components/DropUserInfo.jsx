import React, { Fragment } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { logout } from '../utils/firebase';
import {Popover,  Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography,} from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Cart from '../pages/Cart/View/Cart';

export default function DropUserInfo({ role }) {
	const navigate = useNavigate();
  const { setOutletAddress } = useOutletContext();
	const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
	
  const handleLogout = () => {
    logout();
    setOutletAddress('');
    navigate('/');
  }

	const handleNavigate = loc => {
		switch(loc) {
			case 'Update':
				navigate('/Update')
			  break;
			case 'Cart' :
				navigate('/Cart')
			  break;
			case 'OrderList' :
				navigate('/OrderList')
			  break;
      case 'Dibs' :
        navigate('/Dibs')
        break;
			default :
        break;
		}
		
	}

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
  <Box>
    <MenuIcon aria-describedby={id} variant="contained" onClick={handleClick} sx={{mx: 2}}/>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
          >
        <List>
          <ListItem>
            <ListItemButton onClick={() => handleNavigate('Update')}>
              <ListItemIcon sx={{color:'black'}}>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="내 정보"/>
            </ListItemButton>
          </ListItem>
          {role!=='점주' &&
          <Fragment>
          <ListItem>
            <ListItemButton>
              <ListItemIcon sx={{color:'black'}}>
                <Cart allClose={handleClose} />
              </ListItemIcon>
              <ListItemText primary="장바구니"/>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => handleNavigate('Dibs')}>
              <ListItemIcon sx={{color:'black'}}>
  						  <FavoriteIcon />
              </ListItemIcon>
                <ListItemText primary="찜 목록" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => handleNavigate('OrderList')}>
              <ListItemIcon sx={{color:'black'}}>
                <ListAltIcon/>
              </ListItemIcon>
              <ListItemText primary="주문내역"/>
            </ListItemButton>
          </ListItem>
          </Fragment>
          }
          <Divider />
          <ListItem>
            <ListItemButton onClick={() => handleLogout()}>
              <ListItemIcon sx={{color:'black'}}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText sx={{cursor:'pointer'}} primary="로그아웃" />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </Box>
  );
}