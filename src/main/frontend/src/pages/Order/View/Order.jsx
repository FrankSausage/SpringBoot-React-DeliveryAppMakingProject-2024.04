import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export default function Order() {

	return(
		<Box>
			<Typography>주문 페이지</Typography>
			<Link to={'/'}>메인화면</Link>
		</Box>
	);
}