import { Button, Card, CardContent, Checkbox, FormControlLabel, Grid, Radio, Stack, Typography } from "@mui/material";
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
      setItems(newItems)
    } else {
      const newItems = items.filter(con => {return con !== data})
      setItems(newItems.sort((a,b) => {return a.menuOptionId - b.menuOptionId}));
    }
  }

  const handleSubmit = () => {
    addItemToCart({menus: {menuId: menuId, menuName: menuDetailData.menus.name, 
      menuPrice: menuDetailData.menus.price, storeId: storeId, storeName: storeName, menuOptions: items}})
    .then(() => {
      alert(`장바구니에 ${menuDetailData.menus.name}을(를) 담았습니다. `)
      navigate(`/StoreDetail/${storeId}`, {state: {storeName: storeName}})
    });
  }
  return(
    <Fragment>
      {isLoading && <Typography> 로딩 중...</Typography>}      
      {error && <Typography>정보를 받아오지 못했습니다!</Typography>}
      {!isLoading && menuDetailData && 
          <Grid container sx={{backgroundColor: 'grey'}}>
            <Grid item xs/>
            <Grid item xs={4}>
              <Card sx={{my:1}}>
                <CardContent sx={{m:1}}>
                  <Typography variant="h6">가격</Typography>
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
              <Card sx={{mb:1}}>
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
            {items && items.map((data, idx) => (
                <Stack key={idx}>
                  <Typography>{data.menuOptionId}</Typography>
                </Stack>
            ))}
            <Grid item xs/>
          </Grid>
      }
      <Button onClick={handleSubmit}>장바구니 담기</Button>
    </Fragment>
  );
}