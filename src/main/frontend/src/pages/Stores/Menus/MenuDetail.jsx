import { Box } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function MenuDetail() {
  const location = useLocation();
  const { storeId } = location.state;
  
  return(
    <Box>
      <Link to={`/StoreDetail/${storeId}`}>회원 메뉴 정보 페이지</Link>
    </Box>
  );
}