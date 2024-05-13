import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Divider, Typography } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Cart({ allClose }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    allClose();
    setOpen(false)
  };

  return (
    <React.Fragment>
      <React.Fragment>
        <Box>
          <ShoppingCartIcon sx={{cursor:'pointer', px: 2,}} onClick={handleClickOpen} /> 
        </Box>
          <Typography sx={{cursor:'pointer', pl:1}} onClick={handleClickOpen}>장바구니</Typography>
      </React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle variant='h4' sx={{textAlign:'center'}}>{"장바구니"}</DialogTitle>
		<Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

let dialogOpener = {
  cursor: 'pointer',
  
}

