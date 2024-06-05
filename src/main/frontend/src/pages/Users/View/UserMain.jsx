import React from "react";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SearchHeader from "../../../components/SearchHeader";
import Footer from "../../../components/Footer";

export default function UserMain() {
  const settings = { dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1, autoplay: true, autoplaySpeed: 3000, };

  return (
    <Box sx={{ bgcolor: '#f8f8f8', minHeight: '100vh', m: -1 }}>
      <SearchHeader />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack sx={{ maxHeight: 300, borderRadius: 0, overflow: 'hidden' }}>
            <Slider {...settings}>
              <Box component="img" sx={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 'inherit' }} src="img/c/01.jpg" alt="01" />
              <Box component="img" sx={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 'inherit' }} src="img/c/02.jpg" alt="02" />
              <Box component="img" sx={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 'inherit' }} src="img/c/03.jpg" alt="03" />
              <Box component="img" sx={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 'inherit' }} src="img/c/04.jpg" alt="04" />
              <Box component="img" sx={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 'inherit' }} src="img/c/05.jpg" alt="05" />
              <Box component="img" sx={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 'inherit' }} src="img/c/06.jpg" alt="06" />
              <Box component="img" sx={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 'inherit' }} src="img/c/07.jpg" alt="07" />
              <Box component="img" sx={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 'inherit' }} src="img/c/08.jpg" alt="08" />
              <Box component="img" sx={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 'inherit' }} src="img/c/09.jpg" alt="09" />
            </Slider>
          </Stack>
        </Grid>
      </Grid>
      <Paper elevation={3} sx={{ height: 'auto', backgroundImage: 'url(/img/011.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'lighten', backgroundColor: 'rgba(255, 255, 255, 0.5)', p: 2 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {categories.map((category, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center', }}>
              <Link to={category.link} state={category.state} style={{ textDecoration: 'none', color: 'black' }}>
                <Typography variant="h5" sx={{ mt: 1  ,fontWeight: 'bold', color: 'black' }}>
                  {category.label}
                </Typography>
              </Link>
              <Box sx={{ ...boxStyle, backgroundColor: 'white', position: 'relative', overflow: 'hidden', borderRadius: 2,boxShadow: 3, transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: 6 }}}>
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
  width: '100%',
  height: 200,
  border: 1,
  borderColor: 'transparent',
  m: 1,
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  transition: ' box-shadow 0.3s',
  '&:hover': {
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
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


