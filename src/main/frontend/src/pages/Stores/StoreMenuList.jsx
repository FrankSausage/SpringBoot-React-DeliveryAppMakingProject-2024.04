import React, { useEffect, useState } from 'react';
import { Box, Grid, Checkbox, Typography, Button, FormControlLabel } from '@mui/material';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMenuListByStoreId } from '../../utils/storeInfo';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getCurrentUser } from '../../utils/firebase';
import axios from 'axios';

const defaultTheme = createTheme();

export default function StoreMenuList(data) {
  const { email } = getCurrentUser();
  const { storeId } = useParams();
  const { price } = useState('');
  const [status, setStatus] = useState([]); // 배열로 각 메뉴의 상태를 저장한다고 하네요.
  const navigate = useNavigate();
  const { isLoading, error, menuData } = useMenuListByStoreId(storeId);
  console.log(menuData)

  console.log(data)

  const handleLinkClick = () => {
    navigate(`/MenuUpdate/`);
  };

  const handleCheckboxChange = async (index) => {
    const newStatuses = [...status];
    newStatuses[index] = !newStatuses[index];
    setStatus(newStatuses);
  
    try {
      // 현재 사용자의 이메일 가져오기
      const { email } = getCurrentUser();
      
      // 메뉴 아이디 가져오기
      const menuId = menuData.categories[index].menus[index].menuId;

      // API 요청 보내기
      const response = await axios.post(`/dp/store/menu/status`, {
        menuId: menuId,
        email: email,
        status: newStatuses[index] ? '품절' : '일반' // 상태에 따라 '품절' 또는 '일반' 전달
      });
  
      // 응답 처리
      console.log(response.data); // 성공적으로 업데이트된 메뉴 정보 출력
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography>에러 발생!</Typography>}
      {menuData && (
        menuData.categories.map((data) => (
          data.menus.map((res, idx) =>
            <Box>
              <Grid container>
                <Grid item xs />
                <Grid container sx={{ position: 'relative', border: 1, borderColor: 'rgba(255, 0, 0, 0)', justifyContent: 'center', alignItems: 'center' }}>
                  <Grid className="centerBody" container columnSpacing={{ xs: 2, sm: 2 }} sx={gridStyle}>
                    <Box key={res.menuId} sx={{ ...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto' }}>
                      <div onClick={handleLinkClick} style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>
                        {/* <img src={'/img/칠리모짜징거통다리세트.png'} style={{ width: '20%', height: '100%', position: 'absolute', top: 0, left: 0 }} /> */}
                        <img src={res.menuPictureName} style={{ width: '20%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                        <ul style={{ position: 'absolute', top: '50%', left: '40%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0 }}>
                          <li style={{ listStyleType: 'none' }}>이름 : {res.name}</li>
                          <li style={{ listStyleType: 'none' }}>인기 : {res.popularity} </li>
                          <li style={{ listStyleType: 'none' }}>음식 소개글 : {res.content} </li>
                          <li style={{ listStyleType: 'none' }}>{res.status} </li>
                        </ul>
                      </div>
                      <Grid container spacing={3} >
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={status[idx]} // 각 메뉴에 해당하는 상태를 체크합니다.
                                onChange={() => handleCheckboxChange(idx)} // 체크박스 변경 핸들러를 호출합니다.
                                color="primary"
                              />
                            }
                            label="품절"
                          />
                        </Grid>
                        </Grid>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item xs />
              </Grid>
            </Box>
          )
        ))
      )}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button
          type="submit"
          variant="contained"
          style={{ textDecoration: 'none', color: 'white' }}
          sx={{ mt: 3, mb: 10, width: '200px', height: '50px', fontSize: '1.2rem' }}>
          <Link Link to={`/MenuRegister/${storeId}`} state={{ storeId: storeId }} style={{ textDecoration: 'none', color: 'white' }}>메뉴 추가하기</Link>
        </Button>
      </div>
    </ThemeProvider>
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