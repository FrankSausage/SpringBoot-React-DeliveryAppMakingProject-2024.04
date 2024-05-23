import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useStoreSearch } from "./Hook/useStoreSearch";
import { Link } from "react-router-dom";

export default function StoreList({ category, searchText, }) {
	const { getStoreListByCategory: { isLoading, data: storeDatas } } = useStoreSearch(searchText ? searchText : category);
	console.log(storeDatas)
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
							<Box key={data.storeId} component={Link} to={`/StoreDetail/${data.storeId}`} state={{ storeName: data.name, isDibed: data.isDibed }} sx={{ ...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto' }}>
								<img src={data.storePictureName} style={{ width: '20%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
								<ul style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0 }}>
									<li style={{ listStyleType: 'none' }}>가게명:{data.name}</li>
									<li style={{ listStyleType: 'none' }}>별점:{data.rating}</li>
									<li style={{ listStyleType: 'none' }}>찜 수: {data.dibsCount}</li>
									<li style={{ listStyleType: 'none' }}>리뷰 수:{data.reviewCount}</li>
									<li style={{ listStyleType: 'none' }}>{data.isOpened===0 ? '영업 준비 중' : '영업 중'}</li>
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
