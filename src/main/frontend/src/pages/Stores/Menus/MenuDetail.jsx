import { Button, Box, Card, CardContent, Checkbox, FormControlLabel, Grid, Radio, Stack, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMenuDetailByMenuId } from "../../../utils/storeInfo";
import { useCart } from "../../Cart/Hook/useCart";

export default function MenuDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { storeId, menuId, storeName } = location.state;
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
        navigate(`/StoreDetail/${storeId}`, {state: {storeName: storeName}})
        return;
      }
      alert(`장바구니에 ${menuDetailData.menus.name}을(를) 담았습니다. `)
      navigate(`/StoreDetail/${storeId}`, {state: {storeName: storeName}})
    });
  }
  return(
    <Box sx={{ height: 'auto', minHeight: '100vh', backgroundImage: 'url(/img/m01.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'lighten', backgroundColor: 'rgba(255, 255, 255, 0.6)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '28px 0',}}>
      <Fragment>
        {isLoading && <Typography> 로딩 중...</Typography>}      
        {error && <Typography>정보를 받아오지 못했습니다!</Typography>}
        {!isLoading && menuDetailData && 
            <Grid container sx={{backgroundColor: 'rgba(255, 255, 255, 0.6)', mt:10 }}>
              <Grid item xs/>
              <Grid item xs={6} sx={{ml: '70px', mr: 2}}>
                <Grid container spacing={2}>
                 <Grid item xs={6}>
                  <Card sx={{ my:1, height: '95%' }}>
                    <CardContent sx={{m:1, height: '100%' }}>
                      <Stack direction={'row'} alignItems="center" sx={{ height: '100%' }}>
                      <Grid container sx={{justifyContent:'start', height: '100%' }}>
                          <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center', justifyContent:'center'}}>
                            {menuDetailData.menus.menuPictureName ? (<img src={menuDetailData.menus.menuPictureName} alt={menuDetailData.menus.name} style={{ width: '100%', height: '60%', objectFit: 'cover' }} />
                            ) : (
                              <Typography>이미지를 불러올 수 없습니다.</Typography>
                            )}
                          </Grid>
                          <Grid item xs={2}/>
                            <Grid item xs={4}sx={{alignContent:'center', textAlign:'end'}}>
                              <Typography variant="h6">{menuDetailData.menus.content}</Typography>
                            </Grid>
                          </Grid>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
                  <Grid item xs={6}>
                    <Card sx={{my:1}}>
                      <CardContent sx={{m:1}}>
                        <Typography variant="h6">가격</Typography>
                        <Stack direction={'row'} alignItems="center">
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
                  <Card sx={{my:1}}>
                    <CardContent sx={{m:1}}>
                      <Typography variant="h6">옵션</Typography>
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
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Button onClick={handleSubmit} variant="contained" 
                    sx={{ mt: 3, mb: 2, backgroundColor: '#e69c00', color: '#FFFFFF' ,'&:hover': {backgroundColor: '#ffbe33'}, fontSize: '1rem'}}>장바구니 담기</Button>
                  {/* <Button onClick={handleSubmit}>장바구니 담기</Button> */}
                </Box>
              </Grid>
              {items && items.map((data, idx) => (
                  <Stack key={idx}>
                    <Typography>{data.menuOptionId}</Typography>
                  </Stack>
              ))}
              <Grid item xs/>
            </Grid>
        }
      </Fragment>
    </Box>
  );
}