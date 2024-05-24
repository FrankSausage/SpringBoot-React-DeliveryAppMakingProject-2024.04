import React from "react";
import { useStoreSearch } from "./Hook/useStoreSearch";
import { Link } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function StoreList({ category, searchText, }) {
	const { getStoreListByCategory: { isLoading, data: storeDatas } } = useStoreSearch(searchText ? searchText : category);

	return (
		<Grid container>
			<Grid item xs />
			{isLoading && <Typography variant="h4" sx={{ textAlign: 'center' }}>가게 목록 불러오는 중...</Typography>}
			<Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
				<Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2 }} sx={gridStyle}>
					{!isLoading && storeDatas.data.storeList.length === 0 &&
						<Typography variant="h4" sx={{ textAlign: 'center' }}>가게가 존재하지 않아요!</Typography>
					}
					{!isLoading && storeDatas && (
						storeDatas.data.storeList.map((data) => (
							<Box key={data.storeId} component={Link} to={`/StoreDetail/${data.storeId}`} state={{ storeName: data.name }} sx={{ ...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto', 
												backgroundColor: 'rgba(255, 255, 255)', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
								<img src={data.storePictureName} style={{ width: '20%', height: '100%',marginRight: '10px' }} />
								<ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
									<li style={{ listStyleType: 'none' }}>{data.name}</li>
								</ul>
							</Box>
						))
					)}
				</Grid>
			</Grid>
			<Grid item xs />
		</Grid>
	);
}

let boxStyle = {
	width: 200,
	height: 200,
	border: 1,
	borderColor: 'rgb(217, 217, 217)',
	m: 2
}
let gridStyle = {
	justifyContent: 'center',
	alignItems: 'center',
	p: 2
}
