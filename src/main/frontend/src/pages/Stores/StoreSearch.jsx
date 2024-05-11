import { Box, Button, Grid, InputBase, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchHeader from "../../components/SearchHeader";
import SearchIcon from '@mui/icons-material/Search';
import StoreList from '../Stores/StoreList';

export default function StoreSearch() {
	const location = useLocation();
	const navigate = useNavigate();
	const { searchText } = location.state;
	const [ queryText, setQueryText ] = useState(searchText ? searchText : '');

	const handleSubmit = e => {
    e.preventDefault();
    if(!searchText) {
      alert('검색어를 입력하세요.');
      return;
    } else {
      navigate('/StoreSearchResult', {state: {searchText: queryText}})
    }
  }

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
					value={queryText}
					onChange={e => setQueryText(e.target.value)}
					fullWidth
					autoFocus
					/>
					<Button onClick={handleSubmit}>검색</Button>
				</Box>
				</Grid>
			</Grid>
		</Box>
	);
}