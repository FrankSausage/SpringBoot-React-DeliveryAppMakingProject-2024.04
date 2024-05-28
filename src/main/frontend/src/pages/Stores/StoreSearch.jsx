import { Box, Button, Grid, InputBase, Typography, MenuItem, Select, FormControl } from "@mui/material";
import React, { useState } from "react";
import { Link, } from "react-router-dom";
import SearchHeader from "../../components/SearchHeader";
import SearchIcon from '@mui/icons-material/Search';
import StoreList from '../Stores/StoreList';
import { useQueryClient } from "@tanstack/react-query";

export default function StoreSearch() {
	const queryClient = useQueryClient();
	const [ searchText, setSearchText ] = useState('');
	const [ sort, setSort ] = useState('');

	const handleSubmit = e => {
    e.preventDefault();
	if(searchText) {
    	queryClient.refetchQueries(['storeList', searchText, sort]);
	}
  }

	return (
		<Box sx={{margin: -1}}>
			<SearchHeader />
				<Typography component={Link} to={'/Store'}  style={{ textDecoration: 'none', color: 'inherit' }}>◀ 돌아가기 </Typography>
				<div style={{
        backgroundImage: 'url(/img/sl0.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        padding: '23px 0',
        backgroundBlendMode: 'lighten',
        backgroundColor: 'rgba(255, 255, 255, 0.6)' // This makes the background image appear lighter
        }}>
				<Grid container justifyContent="center" alignItems="center" mt={2}>
				<Grid item xs={6} md={4}>
				{/* <Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderColor: 'divider', borderRadius: 1 }}> */}
				<Box sx={{ display: 'flex', justifyContent: 'center', border: 1, borderColor: 'divider', borderRadius: 3, p: 1, bgcolor: '#fff', boxShadow: 1 }}>
						<FormControl sx={{ minWidth: 79 }}>
							<Select value={sort} onChange={e => setSort(e.target.value)}
								displayEmpty inputProps={{ 'aria-label': '정렬 기준' }}>
										<MenuItem value="dibs">찜</MenuItem>
										<MenuItem value="rating">별점</MenuItem>
										<MenuItem value="reviewCount">리뷰</MenuItem>
							</Select>
						</FormControl>
					<Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 5 }}>
					<SearchIcon sx={{ m: 1 }} />
					<InputBase placeholder="검색" inputProps={{ 'aria-label': 'search' }} value={searchText} onChange={e => setSearchText(e.target.value)} fullWidth autoFocus/>
					<Button onClick={handleSubmit}>검색</Button>
					</Box>
				</Box>
				</Grid>
			</Grid>
			</div>
			{searchText &&
				<StoreList searchText={searchText} sort={sort} />
			}
		</Box>
	);
}