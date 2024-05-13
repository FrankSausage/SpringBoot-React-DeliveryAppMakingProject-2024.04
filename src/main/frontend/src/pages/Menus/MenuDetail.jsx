import { Box, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function MenuDetail() {
    const location = useLocation();
    const { menuId, storeId } = location.state;
    return (
        <Box>
            <Link to={`/StoreDetail/${storeId}`}>
                <Typography variant="h4">메뉴 정보 페이지</Typography>
            </Link>
        </Box>
    );
}