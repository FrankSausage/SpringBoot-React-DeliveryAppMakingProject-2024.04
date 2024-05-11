import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useStore } from "./Hook/useStore";
import { Link } from "react-router-dom";

export default function StoreList({ category, searchText, }) {
	const { getStoreListByCategory: {isLoading, data: storeDatas} } = useStore(searchText ? searchText : category);	
	
    return(
			<Grid container>
				<Grid item xs />
				{isLoading && <Typography variant="h4" sx={{textAlign:'center'}}>가게 목록 불러오는 중...</Typography>}
				<Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
					<Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2 }} sx={gridStyle}>
					{!isLoading && storeDatas.data.storeList.length===0 && 
						<Typography variant="h4" sx={{textAlign:'center'}}>가게가 존재하지 않아요!</Typography>
					}
					{!isLoading && storeDatas && (
						storeDatas.data.storeList.map((data) => (
							<Box component={Link} to={`/StoreDetail/${data.storeId}`} sx={{ ...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto' }}>
									{data.name}
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
