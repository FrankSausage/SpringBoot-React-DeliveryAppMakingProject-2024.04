import { Box } from "@mui/material";
import Footer from "../components/Footer"
import UserMain from "./Users/View/UserMain";
import OwnerMain from "./Users/View/OwnerMain"; 

//주소: http://localhost:3000

export default function Home() {
    const role = localStorage.getItem('role') ? localStorage.getItem('role') : '점주';
    
    return(
        <Box sx={{ margin: -1 }}>
            {role==='회원' && <UserMain />}
            {role==='점주' && <OwnerMain />}
            <Footer />
        </Box>       
  )
}