import React, { useState } from "react";
import { useStoreSearch } from "./Hook/useStoreSearch";
import { Link } from "react-router-dom";
import { Box, Grid, Typography, Select, MenuItem, FormControl, InputLabel, Paper } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BackDrop from "../../components/BackDrop";

export default function StoreList({ category, searchText, initialSort }) {
    const [sort, setSort] = useState(initialSort || 'default');
    const { getStoreListByCategory: { isLoading, data: storeDatas } } = useStoreSearch((searchText ? searchText : category), sort);

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

    const sortedStoreList = !isLoading && storeDatas ? sortStoreList([...storeDatas.data.storeList], sort) : [];

    return (
        <Grid container>
            <Grid item xs={12} sx={{ textAlign: 'center', mb: 2 }}>
                <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select value={sort} onChange={(e) => setSort(e.target.value)} label="Sort By" sx={{bgcolor: '#fff', textAlign:'center'}}>
                        <MenuItem value="default">기본 정렬</MenuItem>
                        <MenuItem value="rating">별점</MenuItem>
                        <MenuItem value="dibs">찜</MenuItem>
                        <MenuItem value="reviews">리뷰 수</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            {isLoading && <BackDrop isLoading={isLoading} />}
            <Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
                <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2 }} sx={gridStyle}>
                    {!isLoading && sortedStoreList.length === 0 &&
                        <Typography variant="h4" sx={{ textAlign: 'center' }}>가게가 존재하지 않아요!</Typography>}
                    {!isLoading && sortedStoreList && (
                        sortedStoreList.map((data) => (
                            <Box key={data.storeId} component={Link} to={`/StoreDetail/${data.storeId}`} state={{ storeName: data.name, isDibed: data.isDibed }} sx={{ ...linkStyle, width: { xs: '90%', sm: '47%' }, marginX: 'auto' }}>
                                <Paper sx={{ ...paperStyle, position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <img src={data.storePictureName} style={{ width: '20%', height: '100%', borderRadius: '8px' }} />
                                    <Box sx={{ flex: 1, paddingLeft: '20px' }}>
                                        <ul style={{ padding: 0, margin: 0, textAlign: 'left' }}>
                                            <li style={{ listStyleType: 'none' }}>{data.name}</li>
                                            <li style={{ listStyleType: 'none' }}>별점: {data.rating}</li>
                                            <li style={{ listStyleType: 'none' }}>찜 수: {data.dibsCount}</li>
                                            <li style={{ listStyleType: 'none' }}>리뷰 수: {data.reviewCount}</li>
                                            <li style={{ listStyleType: 'none', color: 'blue' }}>{data.isOpened === 0 ? '영업 준비 중' : '영업 중'}</li>
                                        </ul>
                                    </Box>
                                    {data.isDibed === '찜' ? (
                                        <FavoriteIcon sx={{ color: 'red',  position: 'absolute', top: 8, right: 8 }} />
                                    ) : (
                                        <FavoriteBorderIcon sx={{ position: 'absolute', top: 8, right: 8 }} />
                                    )}
                                </Paper>
                            </Box>
                        ))
                    )}
                </Grid>
            </Grid>
            <Grid item xs />
        </Grid>
    );
}

let paperStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    mt: '15px',
    pl: '10px',
    py: '10px',
}

let linkStyle = {
    textDecoration: 'none',
    color: 'inherit'
}

let gridStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    p: 2
}
