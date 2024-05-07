import React, {useState} from "react";
import { Box, Grid, Stack, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import SearchHeader from "../../../components/SearchHeader";

export default function UserMain() {



    const { state: category } = useLocation();  
    const [value, setValue] = useState(category);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
      <Box>
        <SearchHeader />
        <Grid container>
          <Grid item xs={12} sx={{ border: 1 }}>
            <Stack sx={{ maxHeight: 200 }}>
              <Box
                sx={
                  {
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
        <Grid container>
          <Grid item xs />
          <Grid container sx={{ border: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2 }} sx={gridStyle}>
              <Box sx={{ ...boxStyle, position: 'relative' }}>
                <Link to="/Store" state={0} style={{ textDecoration: 'none', color: 'black' }}>
                  <div>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <li style={{ textAlign: 'right', writingMode: 'vertical-rl', textOrientation: 'mixed', marginTop: 15, marginRight: 7 }}>전체</li>
                    </ul>
                    <img src={'/img/00.jpg'} style={{ width: '82%', height: '82%', position: 'absolute', top: 35, left: 0 }} />
                  </div>
                </Link>
              </Box>
              <Box sx={{ ...boxStyle, position: 'relative' }}>
                <Link to="/Store/HanSick" state={1} style={{ textDecoration: 'none', color: 'black' }}>
                  <div>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <li style={{ textAlign: 'right', writingMode: 'vertical-rl', textOrientation: 'mixed', marginTop: 15, marginRight: 7 }}>한식</li>
                    </ul>
                    <img src={'/img/01.jpg'} style={{ width: '82%', height: '82%', position: 'absolute', top: 35, left: 0 }} />
                  </div>
                </Link>
              </Box>
              <Box sx={{ ...boxStyle, position: 'relative' }}>
                <Link to="/Store/Chinesefood" state={2} style={{ textDecoration: 'none', color: 'black' }}>
                  <div>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <li style={{ textAlign: 'right', writingMode: 'vertical-rl', textOrientation: 'mixed', marginTop: 15, marginRight: 7 }}>중식</li>
                    </ul>
                    <img src={'/img/11.jpg'} style={{ width: '82%', height: '82%', position: 'absolute', top: 35, left: 0 }} />
                  </div>
                </Link>
              </Box>
              <Box sx={{ ...boxStyle, position: 'relative' }}>
                <Link to="/Store/Japanese" state={3} style={{ textDecoration: 'none', color: 'black' }}>
                  <div>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <li style={{ textAlign: 'right', writingMode: 'vertical-rl', textOrientation: 'mixed', marginTop: 15, marginRight: 7 }}>일식</li>
                    </ul>
                    <img src={'/img/21.jpg'} style={{ width: '82%', height: '82%', position: 'absolute', top: 35, left: 0 }} />
                  </div>
                </Link>
              </Box>
            </Grid>
            <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2 }}
              sx={gridStyle}>
              <Box sx={{ ...boxStyle, position: 'relative' }}>
                <Link to="/Store/WesternStyle" state={4} style={{ textDecoration: 'none', color: 'black' }}>
                  <div>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <li style={{ textAlign: 'right', writingMode: 'vertical-rl', textOrientation: 'mixed', marginTop: 15, marginRight: 7 }}>양식</li>
                    </ul>
                    <img src={'/img/31.jpg'} style={{ width: '82%', height: '82%', position: 'absolute', top: 35, left: 0 }} />
                  </div>
                </Link>
              </Box>
              <Box sx={{ ...boxStyle, position: 'relative' }}>
                <Link to="/Store/FastFood" state={5} style={{ textDecoration: 'none', color: 'black' }}>
                  <div>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <li style={{ textAlign: 'right', writingMode: 'vertical-rl', textOrientation: 'mixed', marginTop: 15, marginRight: 7 }}>패스트</li>
                    </ul>
                    <img src={'/img/41.jpg'} style={{ width: '82%', height: '82%', position: 'absolute', top: 35, left: 0 }} />
                  </div>
                </Link>
              </Box>
              <Box sx={{ ...boxStyle, position: 'relative' }}>
                <Link to="/Store/Chicken" state={6} style={{ textDecoration: 'none', color: 'black' }}>
                  <div>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <li style={{ textAlign: 'right', writingMode: 'vertical-rl', textOrientation: 'mixed', marginTop: 15, marginRight: 7 }}>치킨</li>
                    </ul>
                    <img src={'/img/51.jpg'} style={{ width: '82%', height: '82%', position: 'absolute', top: 35, left: 0 }} />
                  </div>
                </Link>
              </Box>
              <Box sx={{ ...boxStyle, position: 'relative' }}>
                <Link to="/Store/SnackBar" state={7} style={{ textDecoration: 'none', color: 'black' }}>
                  <div>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <li style={{ textAlign: 'right', writingMode: 'vertical-rl', textOrientation: 'mixed', marginTop: 15, marginRight: 7 }}>분식</li>
                    </ul>
                    <img src={'/img/61.jpg'} style={{ width: '82%', height: '82%', position: 'absolute', top: 35, left: 0 }} />
                  </div>
                </Link>
              </Box>
            </Grid>
            <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2 }}
              sx={gridStyle}>
              <Box sx={{ ...boxStyle, position: 'relative' }}>
                <Link to="/Store/Dessert" state={8} style={{ textDecoration: 'none', color: 'black' }}>
                  <div>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <li style={{ textAlign: 'right', writingMode: 'vertical-rl', textOrientation: 'mixed', marginTop: 15, marginRight: 7 }}>디저트</li>
                    </ul>
                    <img src={'/img/71.jpg'} style={{ width: '82%', height: '82%', position: 'absolute', top: 35, left: 0 }} />
                  </div>
                </Link>
              </Box>
              <Box sx={boxStyle}></Box>
              <Box sx={boxStyle}></Box>
              <Box sx={boxStyle}></Box>
            </Grid>
          </Grid>
          <Grid item xs />
        </Grid>
      </Box>
  );
}

let boxStyle = {
  width: 200,
  height: 200,
  border: 1,
  borderColor: 'black',
  m: 1
}
let gridStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  p: 2
}