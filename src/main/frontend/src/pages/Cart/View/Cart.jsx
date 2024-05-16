import React, { Fragment, useEffect, useState } from 'react';
import { Box, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../Hook/useCart';
import CartDelete from '../CartDelete';
import { useNavigate } from 'react-router';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Cart({ allClose }) {
  const navigate = useNavigate();
  const [ open, setOpen ] = useState(false);
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

  const handleMinus = () => {

  }

  const handlePlus = () => {

  }

  const handleOrder = () => {
    navigate('/Order', {state: {totalPrice: totalPrice}})
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
        <Typography sx={{textAlign:'center', mb:1}}>최종 가격: {totalPrice ? totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0}원</Typography>
        <DialogContent sx={{borderTop:1, backgroundColor:'silver'}}>
          <DialogContentText id="주문 목록">
            {!localStorage.getItem('cartItems') && <Typography sx={{textAlign:'center', fontSize: 30}}>아직 주문 내역이 없어요!</Typography>}
            {cartItems &&
              cartItems.map((menuItems) => (
                <Card key={menuItems.sequence} sx={{mb:1}}>
                  <CardContent sx={{mb:1, borderWidth:10, borderRadius:'1%'}}>
                    <Typography variant='h5' sx={{mb:1, textAlign:'center'}}>{menuItems.menuName}</Typography>
                    <Divider sx={{mb:2}}/>
                    <Typography sx={{textAlign:'center'}}>기본 가격 : {menuItems.menuPrice}</Typography>
                      {menuItems.menuOptions && menuItems.menuOptions.map((optionItems) => (
                        <Stack direction={'row'} key={optionItems.menuOptionId}>
                          <Grid container sx={{justifyContent:'start'}}>
                            <Grid item xs={1}>
                            </Grid>
                            <Grid item xs={7}>
                              <Typography>{optionItems.options}</Typography>
                            </Grid>
                            <Grid item xs={3} sx={{alignContent:'center', textAlign:'end'}}>
                              <Typography>+{optionItems.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Typography>
                            </Grid>
                          </Grid>
                        </Stack>
                      ))}
                    <Divider sx={{mt: 2}}/>
                    <Stack direction={'row'} sx={{justifyContent:'center', mt:3}}>
                      {menuItems.quantity===1 ? 
                      <CartDelete /> 
                      :
                      <Button sx={{border:1}} onClick={handleMinus} color='error' >-</Button>
                      }
                      <Typography sx={{textAlign:'center', alignContent:'center', mx: 2}}>수량 : {menuItems.quantity}</Typography>
                      <Button sx={{border:1}} onClick={handlePlus} >+</Button>
                    </Stack>
                  </CardContent>
                </Card>
              ))
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{justifyContent:'space-around', mb:1, borderTop: 1}}>
          <Fragment>
            <Button onClick={handleClose} color='error'>닫기</Button>
            {localStorage.getItem('cartItems') && <Button onClick={handleOrder}>주문하기</Button> }
          </Fragment>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

