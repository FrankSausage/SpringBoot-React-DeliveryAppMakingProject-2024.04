import { Box } from "@mui/material";
import Footer from "../components/Footer"
import UserMain from "./Users/View/UserMain";
import OwnerMain from "./Users/View/OwnerMain"; 

//주소: http://localhost:3000

export default function Home() {
    const role = localStorage.getItem('role') ? localStorage.getItem('role') : '회원';
    
    // const backgroundImage = role === '회원' ? 'url(/img/kitchen.jpg)' : 'url(/img/Okitchen.jpg)';
    return(
        
        <Box sx={{ width: '100%', marginTop: -1 }}>
          {role==='회원' && <UserMain />}
          {role==='점주' && <OwnerMain />}
         
        </Box>
  )
}
    // <div style={{ backgroundImage: 'linear-gradient(to right, #FFD77F, #ffffff 20%, #ffffff 80%, #FFD77F)', display: 'flex', justifyContent: 'center', padding: '23px 0' }}>
    // <Box sx={{
    //   backgroundImage: backgroundImage,
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center',
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center', // Center content vertically
    //   backgroundBlendMode: 'lighten',
    //   backgroundColor: 'rgba(255, 255, 255, 0.6)', // This makes the background image appear lighter
    //   minHeight: '100vh',
    //   width: '100%', // Ensure full width
    //   boxSizing: 'border-box', // Include padding and border in the element's total width and height
    //   padding: '23px 0' // Padding outside of the container to ensure spacing
    // }}>
    //   <Container 
    //     component="main" 
    //     maxWidth="lg" 
    //     sx={{ 
    //       backgroundColor: '#fff', 
    //       padding: { xs: '16px', sm: '24px', md: '32px' }, // Adjust padding based on screen size
    //       borderRadius: '8px', 
    //       boxShadow: 3, 
    //       display: 'flex', 
    //       flexDirection: 'column', 
    //       alignItems: 'center' 
    //     }}
    //   >
    //     <CssBaseline />
    //   </Container>
    // </Box>
    // <div style={{
    //     backgroundImage: backgroundImage,
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     padding: '23px 0',
    //     backgroundBlendMode: 'lighten',
    //     backgroundColor: 'rgba(255, 255, 255, 0.6)', // This makes the background image appear lighter
    //     minHeight: '100vh'
    //   }}>
    //   <div style={{ width: '100%', maxWidth: '900px', display: 'flex', justifyContent: 'center' }}>
    //     <Container component="main" maxWidth="lg" style={{ backgroundColor: '#fff', padding: '8px' }}>
    //     <CssBaseline />
    //     <Box sx={{ margin: -1}} >
    //         {role==='회원' && <UserMain />}
    //         {role==='점주' && <OwnerMain />}
    //         <Footer />
    //     </Box>
    //     </Container>
    //   </div>
    // </div>