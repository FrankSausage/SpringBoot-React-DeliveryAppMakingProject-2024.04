import React, { useEffect, useState } from 'react';
import { Box, Grid, Checkbox, Typography, Button, FormControlLabel } from '@mui/material';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMenuListByEmail } from '../../utils/storeInfo';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getCurrentUser } from '../../utils/firebase';

const defaultTheme = createTheme();

export default function StoreMenuList(data) {
  const { email } = getCurrentUser();
  const { storeId, menuId } = useParams();
  const { price } = useState('');
  const [popularity, setPopularity] = useState('');
  const navigate = useNavigate();
  const { isLoading, error, menuData } = useMenuListByEmail(email);
  
  
  console.log(menuId)


  const handleLinkClick = () => {
    navigate(`/MenuUpdate`);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography>에러 발생!</Typography>}
      {menuData && <>
        <Box sx={{ margin: -1 }}>
          <Grid container>
            <Grid item xs />
            <Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
              <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2 }} sx={gridStyle}>
                <Box sx={{ ...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto' }}>
                  <div onClick={handleLinkClick} style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>
                    <img src={'/img/01.jpg'} style={{ width: '20%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                    <ul style={{ position: 'absolute', top: '50%', left: '40%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0 }}>
                      <li style={{ listStyleType: 'none' }}>{data.name}</li>
                      <li style={{ listStyleType: 'none' }}>찜순</li>
                      <li style={{ listStyleType: 'none' }}>가격: {data.price} 원</li>
                      <li style={{ listStyleType: 'none' }}>평점순</li>
                      <li style={{ listStyleType: 'none' }}>리뷰순</li>
                    </ul>
                    <Grid container spacing={3} >
                      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <FormControlLabel
                          control={<Checkbox checked={popularity === 0} onChange={() => setPopularity(0)} color="primary" />}
                          label="인기도"
                        />
                      </Grid>
                    </Grid>
                  </div>
                </Box>
              </Grid>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ textDecoration: 'none', color: 'white' }}
                  sx={{ mt: 3, mb: 10, width: '200px', height: '50px', fontSize: '1.2rem' }}>
                  <Link Link to={`/MenuRegister`} state={{ storeId: storeId }} style={{ textDecoration: 'none', color: 'white' }}>메뉴 추가하기</Link>
                </Button>
              </div>
            </Grid>
            <Grid item xs />
          </Grid>
        </Box>
      </>
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