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
          <Footer sx={{ marginTop: 7}}/>
        </Box>
  )
}