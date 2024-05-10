import React, { useState } from 'react';
import SearchHeader from '../../components/SearchHeader';
import Footer from '../../components/Footer';
import { Tab, Tabs, Box, Typography, Stack, Grid, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation } from 'react-router-dom';



export default function Store() {
  


  return (
    <Box sx={{ margin: -1 }}>
      <SearchHeader />
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
          <Grid item xs />
          <Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
          <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2}} sx={gridStyle}>
                <Box sx={{...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto'}}>
                <Link to="/ReviewUpdate" variant="body2" style={{ textDecoration: 'none', color: 'black'  }}>
                <div>
                  <img src={'/img/41.jpg'} style={{ width: '20%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                  <ul style={{ position: 'absolute', top: '50%', left: '40%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0 }}>
                    <li style={{ listStyleType: 'none' }}>가게 이름</li>
                    <li style={{ listStyleType: 'none' }}>평점</li>
                    <li style={{ listStyleType: 'none' }}>메뉴</li>
                  </ul>
                </div> 
                </Link>
                </Box>
              </Grid>
          </Grid>
          <Grid item xs />
        </Grid>
      
      <Footer />
    </Box>
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

