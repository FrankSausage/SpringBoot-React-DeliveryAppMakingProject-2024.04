import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../Hook/useCart';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Cart({ allClose }) {
  const [ open, setOpen ] = React.useState(false);
  const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
  const { getPrice } = useCart();
  const [ totalPrice, setTotalPrice ] = useState(0);

  useEffect(() =>{
    if(cartItems) {
      getPrice().then(res=> setTotalPrice(res))
    }
  }, [allClose])

  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    allClose();
    setOpen(false)
  };

  const handleDelte = () => {
    console.log(getPrice())
  } 

  const handleMinus = () => {

  }

  const handlePlus = () => {

  }
  
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
        <DialogTitle variant='h4' sx={{textAlign:'center', width:500}}>{"장바구니"}</DialogTitle>
        <Typography sx={{textAlign:'center', mb:1}}>최종 가격: {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Typography>
        <DialogContent sx={{borderTop:1}}>
          <DialogContentText id="주문 목록">
            {cartItems &&
              cartItems.map((menuItems) => (
                <Card key={menuItems.sequence}>
                  <CardContent sx={{mb:1, border:1, borderRadius:'1%'}}>
                    <Typography variant='h5' sx={{mb:1, textAlign:'center'}}>{menuItems.menuName}</Typography>
                    <Divider sx={{mb:2}}/>
                    <Typography sx={{textAlign:'center'}}>기본 가격 : {menuItems.menuPrice}</Typography>
                      {menuItems.menuOptions && menuItems.menuOptions.map((optionItems) => (
                        <Stack direction={'row'} key={optionItems.menuOptionId}>
                          <Grid container sx={{justifyContent:'start'}}>
                            <Grid item xs={1}>
                            </Grid>
                            <Grid item xs={8}>
                              <Typography>{optionItems.options}</Typography>
                            </Grid>
                            <Grid item xs={3} sx={{alignContent:'center', textAlign:'end'}}>
                              <Typography>+{optionItems.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Typography>
                            </Grid>
                          </Grid>
                        </Stack>
                      ))}
        <Divider sx={{my:2}}/>
                    <Stack direction={'row'} sx={{justifyContent:'center'}}>
                      <Button sx={{ml:-8}} onClick={handleDelte}><DeleteIcon color='error'/></Button>
                      <Button sx={{border:1}} color='error' >-</Button>
                      <Typography sx={{textAlign:'center', alignContent:'center', mx: 2}}>수량 : {menuItems.quantity}</Typography>
                      <Button sx={{border:1}} >+</Button>
                    </Stack>
                  </CardContent>
                </Card>
              ))
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{justifyContent:'space-around', mb:1}}>
          <Button onClick={handleClose} color='error'>닫기</Button>
          <Button onClick={handleClose}>주문하기</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

