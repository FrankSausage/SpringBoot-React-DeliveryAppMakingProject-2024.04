import React, { useEffect, useState } from 'react';
import { Box, Grid, Checkbox, Typography, Button, FormControlLabel } from '@mui/material';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMenuListByStoreId } from '../../utils/storeInfo';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getCurrentUser } from '../../utils/firebase';

const defaultTheme = createTheme();

export default function StoreMenuList(data) {
  const { email } = getCurrentUser();
  const { storeId } = useParams();
  const { price } = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const { isLoading, error, menuData } = useMenuListByStoreId(storeId);
  console.log(menuData)

  const handleLinkClick = () => {
    navigate(`/MenuUpdate`);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography>에러 발생!</Typography>}
      {menuData && (
        menuData.categories.map((data) => (
          data.menus.map((res, idx) =>
            <Box>
              <Grid container>
                <Grid item xs />
                <Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
                  <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2 }} sx={gridStyle}>
                    <Box key={res.menuId} sx={{ ...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto' }}>
                      <div onClick={handleLinkClick} style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>
                        {/* <img src={'/img/01.jpg'} style={{ width: '20%', height: '100%', position: 'absolute', top: 0, left: 0 }} /> */}
                        <img src={res.menuPictureName} style={{ width: '20%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                        <ul style={{ position: 'absolute', top: '50%', left: '40%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0 }}>
                          <li style={{ listStyleType: 'none' }}>이름 : {res.name}</li>
                          <li style={{ listStyleType: 'none' }}>인기 : {res.popularity} </li>
                          <li style={{ listStyleType: 'none' }}>음식 소개글 : {res.content} </li>
                          <li style={{ listStyleType: 'none' }}>{res.status} </li>
                        </ul>
                      </div>
                        <Grid container spacing={3} >
                          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <FormControlLabel
                              control={<Checkbox checked={status === 0} onChange={() => setStatus(0)} color="primary" />}
                              label="품절"
                            />
                          </Grid>
                        </Grid>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item xs />
              </Grid>
            </Box>
          )
        ))
      )}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button
          type="submit"
          variant="contained"
          style={{ textDecoration: 'none', color: 'white' }}
          sx={{ mt: 3, mb: 10, width: '200px', height: '50px', fontSize: '1.2rem' }}>
          <Link Link to={`/MenuRegister`} state={{ storeId: storeId }} style={{ textDecoration: 'none', color: 'white' }}>메뉴 추가하기</Link>
        </Button>
      </div>
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