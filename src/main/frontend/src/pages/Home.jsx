import { Box, Grid, Stack, Typography, Button } from "@mui/material";
import SearchHeader from "../components/SearchHeader"
import Footer from "../components/Footer"

//주소: http://localhost:3000

export default function Home() {
    return(
        <Box>
          <SearchHeader />
          <Grid container>
              <Grid item xs={12} sx={{border: 1}}>
                <Stack sx={{maxHeight: 200}}>
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
            <Grid item xs/>
            <Grid container sx={{border: 1, borderColor:'red', justifyContent:'center', alignItems:'center'}}>
            <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2}} sx={gridStyle}>                 
                  <Box sx={{ ...boxStyle, position: 'relative' }}>
                      <img src={'/img/00.jpg'} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                  </Box>
                  <Box sx={{ ...boxStyle, position: 'relative' }}>
                      <img src={'/img/01.jpg'} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                  </Box>
                  <Box sx={{ ...boxStyle, position: 'relative' }}>
                      <img src={'/img/11.jpg'} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                  </Box>
                  <Box sx={{ ...boxStyle, position: 'relative' }}>
                      <img src={'/img/21.jpg'} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                  </Box>
              </Grid>
              <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2}} 
              sx={gridStyle}>                 
                  <Box sx={{ ...boxStyle, position: 'relative' }}>
                      <img src={'/img/31.jpg'} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                  </Box>
                  <Box sx={{ ...boxStyle, position: 'relative' }}>
                      <img src={'/img/41.jpg'} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                  </Box>
                  <Box sx={{ ...boxStyle, position: 'relative' }}>
                      <img src={'/img/51.jpg'} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                  </Box>
                  <Box sx={{ ...boxStyle, position: 'relative' }}>
                      <img src={'/img/61.jpg'} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                  </Box>
              </Grid>
              <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2}} 
              sx={gridStyle}>                 
                  <Box sx={{ ...boxStyle, position: 'relative' }}>
                      <img src={'/img/71.jpg'} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                  </Box>
                  <Box sx={boxStyle}></Box>
                  <Box sx={boxStyle}></Box>
                  <Box sx={boxStyle}></Box>
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
  border:1, 
  borderColor: 'black', 
  m:1
}
let gridStyle ={
  justifyContent:'center',
  alignItems:'center',
  p:2
}