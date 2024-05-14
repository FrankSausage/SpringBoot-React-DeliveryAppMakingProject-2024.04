import React, { useEffect, useState } from 'react';
import { Box, Grid,  Typography, Button, Stack } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useMenuListByStoreId } from '../../utils/storeInfo';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getCurrentUser } from '../../utils/firebase';
import axios from 'axios';
import MenuOptionRegister from './Menus/MenuOptionRegister';
import { useStore } from './Hook/useStore';

const defaultTheme = createTheme();

export default function StoreMenuList() {   
  const email = localStorage.getItem('email')
  const role = localStorage.getItem('role');
  const { storeId } = useParams();
  const [status, setStatus] = useState([]);
  const { isLoading, error, menuData } = useMenuListByStoreId(storeId);
  const { postChangeMenuStatus } = useStore()

  useEffect(() => {
    const storedStatus = localStorage.getItem(`status_${storeId}`);
    if (storedStatus) {
      setStatus(JSON.parse(storedStatus));
    }
  }, [storeId]);


  useEffect(() => {
    if (menuData) {
      // menuData가 존재하면서 status가 초기화되지 않았을 때
      if (status.length === 0) {
        const initialStatus = menuData.categories.flatMap(category => category.menus).map(menu => menu.status === '품절');
        setStatus(initialStatus);
      }
    }
  }, [menuData]);

  const handleCheckboxChange = async (index) => {
    const newStatuses = [...status];
    newStatuses[index] = !newStatuses[index];
    setStatus(newStatuses);
    localStorage.setItem(`status_${storeId}`, JSON.stringify(newStatuses));
    try {
      const { email } = getCurrentUser();
      const menuId = menuData.categories
        .flatMap(category => category.menus)
      [index].menuId;

      postChangeMenuStatus.mutate({
        menuId: menuId,
        email: email,
        status: newStatuses[index] ? '품절' : '일반'
      })

      // const response = await axios.post(`/dp/store/menu/status`, {
      //   menuId: menuId,
      //   email: email,
      //   status: newStatuses[index] ? '품절' : '일반'
      // });

      // console.log(response.data);
    } catch (error) {
      console.error('에러 발생:', error);
    }
    // setTimeout(() => {
    //   // alert("상태가 업데이트되었습니다!");
    //   console.log('2초 후에 반응');
    // }, 2000);
  };
  
  return (
    <ThemeProvider theme={defaultTheme}>
      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography>에러 발생!</Typography>}
      {!isLoading && menuData && (
        menuData.categories.map((data) => (
          data.menus.map((res, idx) =>
            <Box>
              <Grid container>
                <Grid item xs />
                <Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
                  <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2 }} sx={gridStyle}>
                    <Box key={res.menuId} sx={{ ...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto' }}>
                        <Box component={Link} to={role==='회원' ? `/MenuDetail` : `/MenuUpdate`} state={{menuId : res.menuId, storeId : storeId,}}  sx={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>
                          <img src={res.menuPictureName} style={{ width: '20%', height: '100%', position: 'absolute', top: 0, left: 0 }} alt='메뉴 사진' />
                          <ul style={{ position: 'absolute', top: '50%', left: '40%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0 }}>
                            <li style={{ listStyleType: 'none' }}>{res.name}</li>
                            <li style={{ listStyleType: 'none' }}>인기 : {res.popularity} </li>
                            <li style={{ listStyleType: 'none' }}>구성 : {res.content} </li>
                            {status[idx] && (
                              <li style={{ listStyleType: 'none' }}>{res.status}</li>
                            )}
                          </ul>
                        </Box>
                      {role === '점주' && 
                        <Grid container spacing={3} >
                          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                            <Stack>
                              <Button
                                variant="contained"
                                color={status[idx] ? 'primary' : 'secondary'}
                                onClick={() => handleCheckboxChange(idx)}
                              >
                                {status[idx] ? '상품 판매' : '품절'}
                              </Button>
                              <Button color={'info'}>
                                <MenuOptionRegister email={email} menuId={res.menuId}/>
                              </Button>
                            </Stack>
                          </Grid>
                        </Grid>
                      }
                    </Box>
                  </Grid>
                </Grid>
                <Grid item xs />
              </Grid>
            </Box>
          )
        ))
      )}
      {role === '점주' &&
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            style={{ textDecoration: 'none', color: 'white' }}
            sx={{ mt: 3, mb: 10, width: '200px', height: '50px', fontSize: '1.2rem', }}>
            <Link Link to={`/MenuRegister/${storeId}`} state={{ storeId: storeId }} style={{ textDecoration: 'none', color: 'white' }}>메뉴 추가하기</Link>
          </Button>
        </div>
      }
    </ThemeProvider>
  );
}

let boxStyle = {
  width: 200,
  height: 200,
  border: 1,
  borderColor: 'rgb(217, 217, 217)',
  m: 2
}
let gridStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  p: 2
}