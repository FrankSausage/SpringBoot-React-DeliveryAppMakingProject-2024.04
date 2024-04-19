import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function SignUp() {
    return(
        <Box>
            <Link to={'/SignIn'}>로그인</Link>
            가입 페이지
        </Box>
    );
}