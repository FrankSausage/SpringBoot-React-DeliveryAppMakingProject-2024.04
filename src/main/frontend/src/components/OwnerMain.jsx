import React from 'react';
import { Stack, Box, Grid, InputBase, Button, } from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';
import SearchHeader from './SearchHeader';
import { Link } from 'react-router-dom';

export default function OwnerMain() {

  return (
    <Box sx={{ margin: -1 }}>
      <Grid container>
        <Grid item xs={12} sx={{border: 1}}>
          <Stack sx={{maxHeight: 200}}>
            <Box 
              sx={{
                width: '100%', 
                height: 200, 
                backgroundImage: `url(https://source.unsplash.com/random?wallpapers)`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
              </Box>
          </Stack>
        </Grid>              
      </Grid>
      <Grid container></Grid>
      <Grid container justifyContent="center" alignItems="center" mt={2}>
        <Grid item xs={6} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderColor: 'divider', borderRadius: 1 }}>
            <SearchIcon sx={{ m: 1 }} />
            <InputBase
              placeholder="검색"
              inputProps={{ 'aria-label': 'search' }}
              fullWidth
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs/>
        <Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
            <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2}} sx={gridStyle}>
              
              <Box sx={{...boxStyle, position: 'relative', width: { xs: '100%', sm: '70%' }, height: '150px', marginX: 'auto'}}>
                <div>
                  <img src={'/img/01.jpg'} style={{ width: '20%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                  <ul style={{ position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0 }}>
                    <li style={{ listStyleType: 'none' }}>가게 이름</li> 
                  </ul>
                </div>         
              </Box>
            </Grid>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 10, width: '200px', height: '50px', fontSize: '1.2rem' }}>
                <Link to='/StoreRegister'>가게 추가하기</Link>

              </Button>
            </div>
        </Grid>
        <Grid item xs />
      </Grid>
    </Box>
  );
}

let boxStyle = {
  width: 200, 
  height: 200, 
  border:1, 
  borderColor: 'rgb(217, 217, 217)', 
  m:2
}
let gridStyle ={
  justifyContent:'center',
  alignItems:'center',
  p:2
}