import { Box, Button, Grid, InputBase, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchHeader from "../../components/SearchHeader";
import SearchIcon from '@mui/icons-material/Search';
import StoreList from './StoreList';

export default function StoreSearchResult() {
	const location = useLocation();
	const navigate = useNavigate();
	const { searchText } = location.state;

	return (
		<Box sx={{margin: -1}}>
			<SearchHeader />
				<Typography component={Link} to={'/Store'}>뒤로가기</Typography>
				<Grid container justifyContent="center" alignItems="center" mt={2}>
				<Grid item xs={6} md={4}>
				<Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderColor: 'divider', borderRadius: 1 }}>
					<SearchIcon sx={{ m: 1 }} />
					<InputBase
					placeholder="검색"
					inputProps={{ 'aria-label': 'search' }}
					value={searchText}
					onClick={() => navigate('/StoreSearch', {state: {searchText:searchText}})}
					fullWidth
					/>
				</Box>
				</Grid>
				<StoreList searchText={searchText}/>
			</Grid>
		</Box>
	);
}