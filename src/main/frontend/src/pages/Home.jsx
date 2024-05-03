import { Box } from "@mui/material";
import Footer from "../components/Footer"
import UserMain from "../components/UserMain";
import OwnerMain from "../components/OwnerMain";

//주소: http://localhost:3000

export default function Home() {
   const role = '회원'
    // const role = localStorage.getItem('role');
    return(
        <Box sx={{ margin: -1 }}>
            {role==='회원' && <UserMain />}
            {role==='점주' && <OwnerMain />}
          <Footer />
        </Box>       
  )
}