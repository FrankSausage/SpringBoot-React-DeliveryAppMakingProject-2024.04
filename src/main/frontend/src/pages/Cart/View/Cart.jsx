import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export default function Cart() {
     
	return(
		<Box>
			<Typography>카트 페이지</Typography>
			<Link to={'/'}>메인화면</Link>
		</Box>
	);
}