import React, { useState } from "react";
import { useStoreSearch } from "./Hook/useStoreSearch";
import { Link } from "react-router-dom";
import { Box, Grid, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function StoreList({ category, searchText, initialSort }) {
    const [sort, setSort] = useState(initialSort || 'default'); // 'sort' 상태의 기본 값
    const { getStoreListByCategory: { isLoading, data: storeDatas } } = useStoreSearch((searchText ? searchText : category), sort);

    // 정렬 함수 정의
    const sortStoreList = (storeList, sortKey) => {
        switch (sortKey) {
            case 'rating':
                return storeList.sort((a, b) => b.rating - a.rating);
            case 'dibs':
                return storeList.sort((a, b) => b.dibsCount - a.dibsCount);
            case 'reviews':
                return storeList.sort((a, b) => b.reviewCount - a.reviewCount);
            default:
                return storeList;
        }
    };

    // 정렬된 리스트
    const sortedStoreList = !isLoading && storeDatas ? sortStoreList([...storeDatas.data.storeList], sort) : [];

    return (
        <Grid container>
            <Grid item xs={12} sx={{ textAlign: 'center', mb: 2 }}>
                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        label="Sort By">
												<MenuItem value="default">기본 정렬</MenuItem>
                        <MenuItem value="rating">별점</MenuItem>
                        <MenuItem value="dibs">찜</MenuItem>
                        <MenuItem value="reviews">리뷰 수</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            {isLoading && <Typography variant="h4" sx={{ textAlign: 'center' }}>가게 목록 불러오는 중...</Typography>}
            <Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
                <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2 }} sx={gridStyle}>
                    {!isLoading && sortedStoreList.length === 0 &&
                        <Typography variant="h4" sx={{ textAlign: 'center' }}>가게가 존재하지 않아요!</Typography>
                    }
                    {!isLoading && sortedStoreList && (
                        sortedStoreList.map((data) => (
                            <Box key={data.storeId} component={Link} to={`/StoreDetail/${data.storeId}`} state={{ storeName: data.name, isDibed: data.isDibed }} sx={{ ...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto' }}>
                                <img src={data.storePictureName} style={{ width: '20%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                                <ul style={{ position: 'absolute', top: '50%', left: '15%', transform: 'translateY(-50%)', padding: 0, margin: 0 , textAlign: 'left'}}>
                                    <li style={{ listStyleType: 'none' }}>가게명:{data.name}</li>
                                    <li style={{ listStyleType: 'none' }}>별점:{data.rating}</li>
                                    <li style={{ listStyleType: 'none' }}>{data.isDibed==='찜' ? <FavoriteIcon sx={{color:'red', fontSize:'small'}} /> : <FavoriteBorderIcon />}찜 수: {data.dibsCount} </li>
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
