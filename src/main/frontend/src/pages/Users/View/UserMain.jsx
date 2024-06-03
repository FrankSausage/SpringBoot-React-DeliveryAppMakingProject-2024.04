import React from "react";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SearchHeader from "../../../components/SearchHeader";
import Footer from "../../../components/Footer";

export default function UserMain() {
  return (
    <Box sx={{ bgcolor: '#f8f8f8', minHeight: '100vh', m: -1 }}>
      <SearchHeader />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack sx={{ maxHeight: 200, borderRadius: 0, overflow: 'hidden' }}>
              <Box
                sx={{
                  width: '100%',
                  height: 130,
                  backgroundImage: `url(https://source.unsplash.com/random?wallpapers)`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      <Paper elevation={3} sx={{ height: 'auto', backgroundImage: 'url(/img/kitchen.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'lighten', backgroundColor: 'rgba(255, 255, 255, 0.6)', p: 2 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {categories.map((category, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
              <Link to={category.link} state={category.state} style={{ textDecoration: 'none', color: 'black' }}>
                <Typography variant="h5" sx={{ mt: 1, fontWeight: 'bold', color: 'black' }}>
                  {category.label}
                </Typography>
              </Link>
              <Box sx={{ ...boxStyle, backgroundColor: 'white', position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
                <Link to={category.link} state={category.state} style={{ textDecoration: 'none', color: 'black', display: 'block', height: '100%' }}>
                  <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
                    <img src={category.img} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s', borderRadius: 'inherit' }} alt={category.label} />
                  </Box>
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Footer sx={{ marginTop: 7 }} />
      </Paper>
    </Box>
  );
}

const categories = [
  { label: '전체', link: '/Store', state: 0, img: '/img/00.png' },
  { label: '한식', link: '/Store/HanSick', state: 1, img: '/img/01.png' },
  { label: '중식', link: '/Store/Chinesefood', state: 2, img: '/img/11.png' },
  { label: '일식', link: '/Store/Japanese', state: 3, img: '/img/21.png' },
  { label: '양식', link: '/Store/WesternStyle', state: 4, img: '/img/31.png' },
  { label: '패스트', link: '/Store/FastFood', state: 5, img: '/img/41.png' },
  { label: '치킨', link: '/Store/Chicken', state: 6, img: '/img/51.png' },
  { label: '분식', link: '/Store/SnackBar', state: 7, img: '/img/61.png' },
  { label: '디저트', link: '/Store/Dessert', state: 8, img: '/img/71.png' }
];

const boxStyle = {
  width: '85%',
  height: 200,
  border: 1,
  borderColor: 'transparent',
  m: 1,
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  transition: ' box-shadow 0.3s',
  '&:hover': {
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    img: 'scale(0.8)'
  },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const imgStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s',
  borderRadius: 'inherit',
};
