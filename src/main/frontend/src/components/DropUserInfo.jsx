import React, { Fragment, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { logout } from '../utils/firebase';
import {Popover,  Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography,} from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { FaUser } from 'react-icons/fa';
import OrderList from '../pages/Order/OrderList';
import MyReviews from '../pages/Review/View/MyReviews';

export default function DropUserInfo({ role }) {
	const navigate = useNavigate();
  const [ orderOpen, setOrderOpen ] = useState(false);
  const [ reviewOpen, setReviewOpen ] = useState(false);
  const { setOutletAddress } = useOutletContext();
	const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = query => {
    switch(query){
      case 'Order':
        if (orderOpen) {
          setOrderOpen(false);
        }
        break;
      case 'Review':
        if(reviewOpen) {
          setReviewOpen(false);
        }
        break;
    }
    setAnchorEl(null);
  };

  const handleOpen = query => {
    switch(query){
    case 'Order':
      if (!orderOpen) {
        setOrderOpen(true);
      }
      break;
    case 'Review':
      if(!reviewOpen) {
        setReviewOpen(true);
      }
      break;
    }
  }
	
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
      case 'Dibs' :
        navigate('/Dibs')
        break;
      case 'MyReviews' :
        navigate('/MyReviews')
        break;
			default :
        break;
		}
		
	}

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
  <Box>
    <FaUser style={{ color: 'white' }} aria-describedby={id} variant="contained" onClick={handleClick} sx={{mx: 2}}/>
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
            <ListItemButton onClick={() => handleNavigate('Dibs')}>
              <ListItemIcon sx={{color:'black'}}>
  						  <FavoriteIcon />
              </ListItemIcon>
                <ListItemText primary="찜 목록" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => handleOpen('Order')}>
              <ListItemIcon sx={{color:'black'}}>
                <ListAltIcon/>
              </ListItemIcon>
              <OrderList handleOpen={orderOpen} orderClose={() => handleClose('Order')}/>
              <ListItemText primary="주문내역"/>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => handleOpen('Review')}>
              <ListItemIcon sx={{color:'black'}}>
                <RateReviewIcon/>
              </ListItemIcon>
              <MyReviews handleOpen={reviewOpen} reviewClose={() => handleClose('Review')}/>
              <ListItemText primary="리뷰 관리"/>
            </ListItemButton>
          </ListItem>
          </Fragment>
          }
          <Divider sx={{borderColor:'black', borderWidth:1}}/>
          <ListItem>
            <ListItemButton onClick={() => handleLogout()}>
              <ListItemIcon sx={{color:'black'}}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText sx={{cursor:'pointer', }} primary="로그아웃" />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </Box>
  );
}