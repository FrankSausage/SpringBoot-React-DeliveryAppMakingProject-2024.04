import * as React from 'react';
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
        경기도 수원시 팔달구 중부대로 100, 3층 T.031-239-5855 | 개인정보담당자 :  privacy@dp.co.kr|제휴문의 : partnership@dp.co.kr|고객만족센터 : support@ydp.co.kr
        </Link>{' '}
        {/* {new Date().getFullYear()}
        {'.' + '04'} */}
      </Typography>
    );
  }