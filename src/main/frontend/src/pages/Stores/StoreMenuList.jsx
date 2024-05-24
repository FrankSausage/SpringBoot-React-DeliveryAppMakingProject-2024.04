import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Button, Stack, CssBaseline, Tabs, Tab } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useMenuListByStoreId } from '../../utils/storeInfo';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getCurrentUser } from '../../utils/firebase';
import MenuOptionRegister from './Menus/MenuOptionRegister';
import { useStore } from './Hook/useStore';

const defaultTheme = createTheme();

export default function StoreMenuList({ storeName }) {
  const email = localStorage.getItem('email');
  const role = localStorage.getItem('role');
  const { storeId } = useParams();
  const [status, setStatus] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const { isLoading, error, menuData } = useMenuListByStoreId(storeId);
  const { postChangeMenuStatus } = useStore();

  useEffect(() => {
    const storedStatus = localStorage.getItem(`status_${storeId}`);
    if (storedStatus) {
      setStatus(JSON.parse(storedStatus));
    }
  }, [storeId]);

  useEffect(() => {
    if (menuData) {
      if (status.length === 0) {
        const initialStatus = menuData.categories.flatMap(category => category.menus).map(menu => menu.status === '품절');
        setStatus(initialStatus);
      }
    }
  }, [menuData]);

  const handleCheckboxChange = async (index) => {
    const newStatuses = [...status];
    newStatuses[index] = !newStatuses[index];
    setStatus(newStatuses);
    localStorage.setItem(`status_${storeId}`, JSON.stringify(newStatuses));
    try {
      const { email } = getCurrentUser();
      const menuId = menuData.categories.flatMap(category => category.menus)[index].menuId;

      postChangeMenuStatus.mutate({
        menuId: menuId,
        email: email,
        status: newStatuses[index] ? '품절' : '일반'
      });
    } catch (error) {
      console.error('에러 발생:', error);
    }
    setTimeout(() => {
      alert("상태가 업데이트되었습니다!");
    }, 500);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const sortMenus = (menus) => {
    const categoryOrder = ['메인 메뉴', '세트 메뉴', '사이드 메뉴'];
    return menus.sort((a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category));
  };

  const filterMenusByTab = (menus) => {
    if (tabIndex === 1) return menus.filter(menu => menu.category === '메인 메뉴');
    if (tabIndex === 2) return menus.filter(menu => menu.category === '세트 메뉴');
    if (tabIndex === 3) return menus.filter(menu => menu.category === '사이드 메뉴');
    return sortMenus(menus); // Sort menus in the order for '전체 메뉴' tab
  };

  const renderMenuItems = (menus) => {
    let currentCategory = '';
    return menus.map((res, idx) => {
      const isFirstInCategory = res.category !== currentCategory;
      if (isFirstInCategory) {
        currentCategory = res.category;
      }
      return (
        <React.Fragment key={res.menuId}>
          {isFirstInCategory && (
            <Box sx={{ width: '60%', mt: 4, mb: 2, ml: 30 }}>
              <Typography variant="h5" component="div">
                {currentCategory}
              </Typography>
              <hr style={{ border: 'none', borderTop: '2px solid #000', margin: '8px 0' }} />
            </Box>
          )}
          <Box sx={{ ...boxStyle, position: 'relative', width: { xs: '90%', sm: '47%' }, height: '120px', marginX: 'auto' }}>
            <Grid container>
              <Grid item xs={12} md={3}>
                <Box component={Link} to={role === '회원' ? `/MenuDetail` : `/MenuUpdate`} state={{ menuId: res.menuId, storeId: storeId, storeName: storeName }} sx={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>
                  <img src={res.menuPictureName} style={{ width: '130px', height: '95px', objectFit: 'cover' }} />
                </Box>
              </Grid>
              <Grid item xs={12} md={7} sx={{ position: 'relative' }}>
                <Box component={Link} to={role === '회원' ? `/MenuDetail` : `/MenuUpdate`} state={{ menuId: res.menuId, storeId: storeId, storeName: storeName }} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: 0, margin: 0, whiteSpace: 'nowrap', maxWidth: '80%', overflow: 'hidden', textOverflow: 'ellipsis', textDecoration: 'none', color: 'black' }}>
                  <ul style={{ padding: 0, margin: 0 }}>
                    <li style={{ listStyleType: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{res.name}</li>
                    <li style={{ listStyleType: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>구성 : {res.content} </li>
                    {status[idx] && (
                      <li style={{ listStyleType: 'none' }}>{res.status}</li>
                    )}
                  </ul>
                </Box>
              </Grid>
              <Grid item xs={12} md={2}>
                {role === '점주' &&
                  <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Button
                      variant="contained"
                      color={status[idx] ? 'primary' : 'secondary'}
                      onClick={() => handleCheckboxChange(idx)}
                    >
                      {status[idx] ? '상품 판매' : '품절'}
                    </Button>
                    <Button color={'info'}>
                      <MenuOptionRegister email={email} menuId={res.menuId} />
                    </Button>
                  </Stack>
                }
              </Grid>
            </Grid>
          </Box>
        </React.Fragment>
      );
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="전체 메뉴" />
        <Tab label="메인 메뉴" />
        <Tab label="세트 메뉴" />
        <Tab label="사이드 메뉴" />
      </Tabs>
      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography>에러 발생!</Typography>}
      {!isLoading && menuData && (
        <>
          {renderMenuItems(filterMenusByTab(menuData.categories.flatMap(category => category.menus)))}
        </>
      )}
      {role === '점주' &&
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            style={{ textDecoration: 'none', color: 'white' }}
            sx={{ mt: 3, mb: 10, width: '200px', height: '50px', fontSize: '1.2rem', backgroundColor: '#a9a9a9' }}>
            <Link to={`/MenuRegister/${storeId}`} state={{ storeId: storeId }} style={{ textDecoration: 'none', color: 'white' }}>메뉴 추가하기</Link>
          </Button>
        </div>
      }
    </ThemeProvider>
  );
}

let boxStyle = {
  width: 300,
  height: 200,
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '16px',
  margin: '16px',
  backgroundColor: '#ffffff',
  position: 'relative',
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
  }
};
