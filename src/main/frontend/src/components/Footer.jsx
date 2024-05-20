import * as React from 'react';
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function footer(props) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); 

    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" to="https://www.youtube.com/" style={{ textDecoration: 'none', color: 'gray'}}>
        경기도 수원시 팔달구 중부대로 100, 3층 T.031-239-5855  | 개인정보담당자 :  privacy@dp.co.kr|제휴문의 : partnership@dp.co.kr|고객만족센터 : support@ydp.co.kr
        </Link>{' '}
        {/* {new Date().getFullYear()}{'.' + new Date().getMonth() +'.'+ new Date().getDate()} */}
        {currentYear}.{currentMonth}
      </Typography>
    );
  }