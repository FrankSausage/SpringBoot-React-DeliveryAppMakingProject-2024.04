import React from "react";
import { useStoreSearch } from "./Hook/useStoreSearch";
import { Link } from "react-router-dom";
import { Box, Grid, Typography, Paper } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function StoreList({ category, searchText }) {
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
							<Paper key={data.storeId} sx={{ ...paperStyle, position: 'relative' }}>
								<Box component={Link} to={`/StoreDetail/${data.storeId}`} state={{ storeName: data.name, isDibed: data.isDibed }} sx={{ ...boxStyle, textDecoration: 'none', color: 'black' }}>
									<Grid container spacing={2} alignItems="center">
										<Grid item xs={3} sx={{ position: 'relative' }}>
											<img src={data.storePictureName} style={{ width: '100%', height: 'auto' }} alt="Store" />
											{/* FavoriteIcon 또는 FavoriteBorderIcon을 오른쪽 모서리에 위치 */}
											<Typography sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translate(50%, -200%)' }}>
												{data.isDibed === '찜' ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon />}
											</Typography>
										</Grid>
										<Grid item xs={9}>
											<Typography variant="body1" sx={{ fontWeight: 'bold' }}>가게명: {data.name}</Typography>
											<Typography variant="body1">별점: {data.rating}</Typography>
											<Typography variant="body1">리뷰 수: {data.reviewCount}</Typography>
											<Typography variant="body1">찜 수: {data.dibsCount}</Typography>
											<Typography variant="body1">{data.isOpened === 0 ? '영업 준비 중' : '영업 중'}</Typography>
										</Grid>
									</Grid>
								</Box>
							</Paper>
						))
					)}
				</Grid>
			</Grid>
			<Grid item xs />
		</Grid>
	);
}

let boxStyle = {
	width: '100%',
	height: '100%',
	padding: '10px',
};

let paperStyle = {
	width: { xs: '90%', sm: '45%' },
	margin: 'auto',
	marginBottom: '10px',
	padding: '10px',
	fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
	fontWeight: 400,
	fontSize: '1rem',
	lineHeight: 1.5,
	letterSpacing: '0.00938em',
	backgroundColor: '#fff',
	color: 'rgba(0, 0, 0, 0.87)',
	transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
	borderRadius: '4px',
	boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
	border: 'none',
	paddingBottom: '0px',
	paddingTop: '0px',
	marginBottom: '0px',
	marginTop: '0px',
	height: '165px',
	width: '520px',
	borderRadius: '10px',
};

let gridStyle = {
	justifyContent: 'center',
	alignItems: 'center',
	p: 1,
};
