import React, { Fragment, useState } from "react";
import { Button, Box, Card, CardContent, Checkbox, FormControlLabel, Grid, Radio, Stack, Typography, Dialog, Slide, Divider } from "@mui/material";
import { useCart } from '../../Cart/Hook/useCart';
import { useMenuDetailByMenuId } from '../../../utils/storeInfo';
import CloseIcon from '@mui/icons-material/Close';
import BackDrop from "../../../components/BackDrop";

export default function MenuDetail(props) {
  const { handleOpen, menuClose, storeId, storeName, menuId } = props
  const { isLoading, error, menuDetailData } = useMenuDetailByMenuId(menuId)
  const { addItemToCart } = useCart();
  const [ items, setItems ] = useState([]);

  

  const handleAddItem = data => {
    if (!items.find(e => e === data)) {
      const newItems = [...items, data];
      setItems(newItems.sort((a,b) => {return a.menuOptionId - b.menuOptionId}))
    } else {
      const newItems = items.filter(con => {return con !== data})
      setItems(newItems.sort((a,b) => {return a.menuOptionId - b.menuOptionId}));
    }
  }

  const handleSubmit = () => {
    addItemToCart({menus: {menuId: menuId, menuName: menuDetailData.menus.name, menuPictureName: menuDetailData.menus.menuPictureName, menuContent: menuDetailData.menus.content,
      menuPrice: menuDetailData.menus.price, storeId: storeId, storeName: storeName, menuOptions: items}})
    .then(res => {
      if(res===false){
        return;
      }
      alert(`장바구니에 ${menuDetailData.menus.name}을(를) 담았습니다. `)
      menuClose();
    });
  }

  return(
    <Dialog 
    open={handleOpen}
    keepMounted
    >
      {isLoading && <BackDrop isLoading={isLoading} />}      
      <Box sx={BoxStyle}>
      <Fragment>
        {error && <Typography>정보를 받아오지 못했습니다!</Typography>}
        {!isLoading && menuDetailData && 
        <Fragment>
          <Typography variant="h5" sx={{textAlign:'center', mt: 2, mb:-5}}> {menuDetailData.menus.name} </Typography>
            <Grid container sx={{ mt:9, width: 500 }}>
                <Stack>
                  <Card sx={{mb:1}}>
                    <CardContent sx={{m:1}}>
                      <img src={menuDetailData.menus.menuPictureName} style={{ width: '50%', height: 'auto', display: 'block', margin: '0 auto', borderRadius: '8px'}} />
                      <Typography sx={{textAlign:'center', mt: 3}} variant="h6">{menuDetailData.menus.content}</Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{my:4, width: 500}}>
                    <CardContent sx={{m:1}}>
                      <Typography sx={{textAlign:'center'}} variant="h6">가격</Typography>
                      <Divider sx={{borderWidth:2}}/>
                      <Stack direction={'row'}>
                        <Grid container sx={{justifyContent:'start'}}>
                          <Grid item xs={5}>
                            <FormControlLabel 
                            control={<Radio defaultChecked/>}
                            label={menuDetailData.menus.name}
                            labelPlacement="end"
                            />
                          </Grid>
                          <Grid item xs={4}/>
                          <Grid item xs={3}sx={{alignContent:'center', textAlign:'end'}}>
                            <Typography>{menuDetailData.menus.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Typography>
                          </Grid>
                        </Grid>
                      </Stack>
                    </CardContent>
                  </Card>
                  {menuDetailData.menus.options && menuDetailData.menus.options.length!==0 && 
                    <Card sx={{mb:1}}>
                      <CardContent sx={{m:1}}>
                        <Typography sx={{textAlign:'center'}} variant="h6">옵션</Typography>
                        <Divider />
                          {menuDetailData.menus.options && menuDetailData.menus.options.map((data, idx) => (
                            <Stack direction={'row'} key={idx}>
                              <Grid container sx={{justifyContent:'start'}}>
                                <Grid item xs={5}>
                                  <FormControlLabel 
                                  control={<Checkbox onClick={() => handleAddItem(data)}/>}
                                  label={data.options}
                                  labelPlacement="end"
                                  />
                                </Grid>
                                <Grid item xs={4}/>
                                <Grid item xs={3} sx={{alignContent:'center', textAlign:'end'}}>
                                  <Typography>+{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Typography>
                                </Grid>
                              </Grid>
                            </Stack>
                          ))}
                      </CardContent>
                    </Card>
                  }
                </Stack>
            </Grid>
            <Box sx={{ mt: 5 }} />
            <Button onClick={handleSubmit} variant="contained" 
              sx={{ mb: 2, backgroundColor: '#e69c00', color: '#FFFFFF' ,'&:hover': {backgroundColor: '#ffbe33'}, fontSize: '1.2rem'}}>장바구니 담기</Button>
        </Fragment>
        }
      </Fragment>
    </Box>
    </Dialog>
  );
}

let BoxStyle = {
  height: 'auto', 
  minHeight: '105vh', 
  border:2,
  backgroundImage: 'url(/img/m01.jpg)', 
  backgroundSize: 'cover', 
  backgroundPosition: 'center', 
  backgroundBlendMode: 'lighten', 
  backgroundColor: 'rgba(255, 255, 255, 0.6)', 
  display: 'flex', 
  flexDirection: 'column', 
  p:3,
}