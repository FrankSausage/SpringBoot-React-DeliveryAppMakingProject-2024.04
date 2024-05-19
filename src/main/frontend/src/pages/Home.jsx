import { Box, Container, CssBaseline } from "@mui/material";
import Footer from "../components/Footer"
import UserMain from "./Users/View/UserMain";
import OwnerMain from "./Users/View/OwnerMain"; 

//주소: http://localhost:3000

export default function Home() {
    const role = localStorage.getItem('role') ? localStorage.getItem('role') : '회원';
    
    return(
    <div style={{ backgroundImage: 'linear-gradient(to right, #1e7843, #ffffff 20%, #ffffff 80%, #1e7843)', display: 'flex', justifyContent: 'center', padding: '23px 0' }}>
      <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', justifyContent: 'center' }}>
        <Container component="main" maxWidth="lg" style={{ backgroundColor: '#fff', padding: '10px' }}>
        <CssBaseline />
        <Box sx={{ margin: -1 }}>
            {role==='회원' && <UserMain />}
            {role==='점주' && <OwnerMain />}
            <Footer />
        </Box>
        </Container>
      </div>
    </div>
  )
}