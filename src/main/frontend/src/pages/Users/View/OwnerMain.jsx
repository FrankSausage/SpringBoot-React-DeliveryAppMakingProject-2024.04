import React, { Fragment } from 'react';
import { Stack, Box, Grid, InputBase, Button, Typography, } from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import OwnerHeader from '../../../components/OwnerHeader';
import { useStoreListByEmail } from '../../../utils/storeInfo';
import { getCurrentUser } from '../../../utils/firebase';
import StoreDetail from '../../Stores/StoreDetail';

export default function OwnerMain() {
  const { email } = getCurrentUser();     // { Key : Value } , { name : '제임스' }
  const { isLoading, error, storeData } = useStoreListByEmail(email);
  // console.log(storeData)  // {storeList : Array(2)}

  // console.log(storeData.storeList)  // {0번 데이터}, {1번 데이터}
  // console.log(storeData.storeList[0])   
  // Map<Key:Value> <- Map 형태(배열) 
  // 즉, 이 데이터를 건들이려면 Array, List 에서 쓰는 함수가 아닌 "Map" 관련 함수로 건들여야 한다
  return (
    <Box>
      <OwnerHeader />
      <Grid container justifyContent="center" alignItems="center" mt={2}>
        <Grid item xs={6} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderColor: 'divider', borderRadius: 1 }}>
            <SearchIcon sx={{ m: 1 }} />
            <InputBase
              placeholder="검색"
              inputProps={{ 'aria-label': 'search' }}
              fullWidth
            />
          </Box>
        </Grid>
      </Grid>
      {isLoading && <Typography> 로딩 중.. </Typography>}
      {error && <Typography> 에러 발생! </Typography>}
      {storeData && (
        storeData.storeList.map((data, idx) => (
          <Box key={idx}  sx={{...boxStyle, position: 'relative', width: { xs: '100%', sm: '70%' }, height: '150px', marginX: 'auto'}}>
            <Link to={`/StoreDetail/${data.storeId}`}  style={{textDecoration: 'none', color: 'black'}} >
            <Typography>{idx}</Typography>
            <div>
                  <img src={'/img/01.jpg'}  style={{ width: '20%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                  {/* <img src={ data.storePictureName} style={{ width: '20%', height: '100%', position: 'absolute', top: 0, left: 0 }} /> */}
                  <ul style={{ position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0 }}>
                    <li style={{ listStyleType: 'none' }}>가게이름: {data.name}</li>
                    <li style={{ listStyleType: 'none' }}>별점: {data.rateing}</li>
                    <li style={{ listStyleType: 'none' }}>리뷰: {data.reviewCount}</li>
                    <li style={{ listStyleType: 'none' }}>조회수: {data.dibsCount}</li> 
                  </ul>
            </div>  
            </Link>
          </Box>
        ))
      )}
    </Box>
  );
}
{/* <StoreDetail storeList={data} /> */}

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