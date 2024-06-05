import React, { Fragment, useEffect, useState } from 'react';
import { Badge,  Card, CardContent, Divider, Grid, Stack, Typography, styled } from '@mui/material';
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
import { useNavigate } from 'react-router';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Cart({ allClose }) {
  const navigate = useNavigate();
  const [ open, setOpen ] = useState(false);
  const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
  const { getPrice, deleteItemFromCart, minusItemQuantity, plusItemQuantity } = useCart();
  const [ totalPrice, setTotalPrice ] = useState(0);

  useEffect(() =>{
    if(cartItems.length!==0) {
      getPrice().then(res=> setTotalPrice(res))
    } else if (cartItems.length===0) {
      setTotalPrice(0);
    }
  }, [open])

  const handleClickOpen = () => setOpen(true);
  
  const handleClose = () => {
    allClose();
    setOpen(false)
  };

  const handleMinus = index => {
    setOpen(false)
    minusItemQuantity(index).then(() => setOpen(true))
  }

  const handlePlus = index => {
    setOpen(false)
    plusItemQuantity(index).then(() => setOpen(true))
  }

  const handleOrder = () => {
    if (totalPrice < cartItems[0].minDeliveryPrice) {
      alert('주문 금액이 모자릅니다.')
      return;
    }
    navigate('/Order', {state: {totalPrice: totalPrice}})
  }

  const handleDelete = index => {
   if(!window.confirm('메뉴를 삭제 하시겠습니까?')){
    return;
   } else {
    setOpen(false)
    deleteItemFromCart(index).then(() => setOpen(true))
   }
  }
  
  return (
    <React.Fragment>
      <React.Fragment>
        {localStorage.getItem('cartCount') > 0 ?
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          badgeContent={localStorage.getItem('cartCount') && localStorage.getItem('cartCount')}
          max={9}
          color='secondary'
        >
          <ShoppingCartIcon sx={{color:'white'}} onClick={handleClickOpen} /> 
        </StyledBadge>
        :
          <ShoppingCartIcon sx={{color:'white'}} onClick={handleClickOpen} /> 
        }
      </React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle variant='h4' sx={{textAlign:'center', width:500,  color: '#222831'}}>{"장바구니"}</DialogTitle>
          {/* <Typography sx={{textAlign:'center', mb:0,  color: '#222831', fontSize: '1rem'}}>최종 가격: {totalPrice ? totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0}원</Typography> */}
        <DialogContent sx={{borderTop:1, backgroundColor: '#e1e9ec',}}>
          <DialogContentText id="주문 목록">
            {!localStorage.getItem('cartItems') && <Typography sx={{textAlign:'center', fontSize: 30}}>아직 주문 내역이 없어요!</Typography>}
            {cartItems &&
              cartItems.map((menuItems, idx) => (
                <Card key={idx} sx={{mt: 7, mb:1}}>
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
                      {menuItems.quantity<=1 ? 
                      <Button sx={{border:1}} onClick={() => handleDelete(idx)} color='error' >
                      <DeleteIcon/> 
                      </Button>
                      :
                      <Button sx={{border:1}} onClick={() => handleMinus(idx)} color='error' >-</Button>
                      }
                      <Typography sx={{textAlign:'center', alignContent:'center', mx: 2}}>수량 : {menuItems.quantity}</Typography>
                      <Button sx={{border:1}} onClick={() => handlePlus(idx)}>+</Button>
                    </Stack>
                  </CardContent>
                </Card>
              ))
            }
          </DialogContentText>
         {localStorage.getItem('cartItems') && <Typography sx={{textAlign:'center', mt:3,  color: '#222831', fontSize: '1rem'}}>최소 주문 가격: {cartItems[0].minDeliveryPrice && cartItems[0].minDeliveryPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Typography> }
         {localStorage.getItem('cartItems') && <Typography sx={{textAlign:'center', mt:3,  color: '#222831', fontSize: '1rem'}}>배달 팁: {cartItems[0].deliveryTip && cartItems[0].deliveryTip.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Typography> }
          <Typography sx={{textAlign:'center', mt:3,  color: '#222831', fontSize: '1rem'}}>최종 가격: {totalPrice ? totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0}원</Typography>
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

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: 'white',
    width: 11,
    height: 18,
    textAlign:'center',
    border: `2px solid ${theme.palette.background.paper}`,
    borderRadius: '30%',
  },
}));
