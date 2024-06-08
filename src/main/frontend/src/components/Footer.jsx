import * as React from 'react';
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer(props) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); 

    return (
      <Typography variant="body2" color="text.black" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" to="https://github.com/FrankSausage/SpringBoot-React-DeliveryAppMakingProject-2024.04" style={{ textDecoration: 'none', color: 'black'}}>
        경기도 수원시 팔달구 중부대로 100, 3층 T.031-239-5855 <br/> 개인정보담당자 :  privacy@dp.co.kr<br/>제휴문의 : partnership@dp.co.kr <br/>고객만족센터 : support@ydp.co.kr
        </Link>{' '}
        {/* {new Date().getFullYear()}{'.' + new Date().getMonth() +'.'+ new Date().getDate()} */}
        &nbsp; {currentYear}.{currentMonth}
      </Typography>
    );
  }