import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SearchHeader from "../../../components/SearchHeader";

export default function UserMain() {
  return (
    <Box sx={{ bgcolor: '#f8f8f8', minHeight: '100vh', p: 0 }}>
      <SearchHeader />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack sx={{ maxHeight: 200, borderRadius: 0, overflow: 'hidden', mb: 2 }}>
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
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {categories.map((category, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center', flexDirection:'column', alignItems:'center' }}>
            <Box sx={{ ...boxStyle, position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
              <Link to={category.link} state={category.state} style={{ textDecoration: 'none', color: 'black', display: 'block', height: '100%' }}>
                <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
                  {/* <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', position: 'absolute', top: 0, right: 0 }}>
                    <li style={{ textAlign: 'right', writingMode: 'vertical-rl', textOrientation: 'mixed', marginTop: 15, marginRight: 7, color: '#fff', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>{category.label}</li>
                  </ul> */}
                  <img src={category.img} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s', borderRadius: 'inherit' }} alt={category.label} />
                </Box>
              </Link>
            </Box>
            <Typography variant="h6" sx={{ mt: 1, fontWeight:'bold', color:'black', textAling:'center' }}>
              {category.label}
            </Typography>
          </Grid>
        ))}
      </Grid>
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
  width: '100%',
  height: 200,
  border: 1,
  borderColor: 'transparent',
  m: 1,
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};
