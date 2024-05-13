import React, { useState } from 'react';
import {Popover, Typography , Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
	Divider,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Cart from '../pages/Cart/View/Cart';
import { Link, useNavigate } from 'react-router-dom';
export default function DropUserInfo() {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
	
	const handleNavigate = loc => {
		switch(loc) {
			case 'Update':
				navigate('/Update')
			break;
			case 'Cart' :
				navigate('/Cart')
			break;
			default :
		}
		
	}

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
  <Box>
    <MenuIcon aria-describedby={id} variant="contained" onClick={handleClick}/>
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
          <ListItem disablePadding >
						<Cart allClose={handleClose} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => {handleNavigate('Update')}}>
              <ListItemIcon>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="내 정보"/>
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </Box>
  );
}