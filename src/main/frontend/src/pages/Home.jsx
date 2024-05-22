import { Box, Container, CssBaseline } from "@mui/material";
import Footer from "../components/Footer"
import UserMain from "./Users/View/UserMain";
import OwnerMain from "./Users/View/OwnerMain"; 

//주소: http://localhost:3000

export default function Home() {
    const role = localStorage.getItem('role') ? localStorage.getItem('role') : '회원';
    
    const backgroundImage = role === '회원' ? 'url(/img/kitchen.jpg)' : 'url(/img/Okitchen.jpg)';
    return(
    // <div style={{ backgroundImage: 'linear-gradient(to right, #FFD77F, #ffffff 20%, #ffffff 80%, #FFD77F)', display: 'flex', justifyContent: 'center', padding: '23px 0' }}>
    // <Box style={{
    //     backgroundImage: backgroundImage,
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     padding: '23px 0',
    //     backgroundBlendMode: 'lighten',
    //     backgroundColor: 'rgba(255, 255, 255, 0.6)', 
    //     minHeight: '100vh'
    //   }}>
      // {/* <Box style={{ width: '100%', maxWidth: '900px', display: 'flex', justifyContent: 'center' }}> */}
        // {/* <Container component="main" maxWidth="lg" style={{ backgroundColor: '#fff', padding: '8px' }}> */}
        // <CssBaseline />
        <Box sx={{ m: -1}} >
            {role==='회원' && <UserMain />}
            {role==='점주' && <OwnerMain />}
            <Footer />
        </Box>
        // {/* </Container> */}
      // {/* </Box> */}
    // </Box>
  )
}