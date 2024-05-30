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
            <Grid item xs={12} sx={{ mt: 4, mb: 2 }}>
              <Typography variant="h5" component="div">
                {currentCategory}
              </Typography>
              <hr style={{ border: 'none', borderTop: '2px solid #000', margin: '8px 0' }} />
            </Grid>
          )}
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Box sx={{ ...boxStyle, position: 'relative', width: '100%', height: 'auto', marginX: 'auto', display: 'flex', alignItems: 'center' }}>
              <Box component={Link} to={role === '회원' ? `/MenuDetail` : `/MenuUpdate`} state={{ menuId: res.menuId, storeId: storeId, storeName: storeName }} sx={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>
                <img src={res.menuPictureName} style={{ width: '150px', height: '120px', objectFit: 'cover', marginRight: '16px' }} />
              </Box>
              <Box sx={{ flexGrow: 1}}>
                <Box component={Link} to={role === '회원' ? `/MenuDetail` : `/MenuUpdate`} state={{ menuId: res.menuId, storeId: storeId, storeName: storeName }}
                  sx={{ textDecoration: 'none', color: 'black' }}>
                    <ul style={{ padding: 0, textAlign:'center' }}>
                      <li style={{ listStyleType: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{res.name}</li>
                      <li style={{ listStyleType: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{res.price}원</li>
                      {status[idx] && (
                        <li style={{ listStyleType: 'none' }}>{res.status}</li>
                      )}
                    </ul>
                </Box>
                {role === '점주' &&
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      color={status[idx] ? 'primary' : 'secondary'}
                      onClick={() => handleCheckboxChange(idx)} sx={{width: '100px', height:'35px'}}>
                      {status[idx] ? '상품 판매' : '품절'}
                    </Button>
                    <Button color={'info'} sx={{width: '100px', height: '35px'}}>
                      <MenuOptionRegister email={email} menuId={res.menuId} />
                    </Button>
                  </Stack>}
              </Box>
            </Box>
          </Grid>
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
        <Grid container spacing={2}>
          {renderMenuItems(filterMenusByTab(menuData.categories.flatMap(category => category.menus)))}
        </Grid>
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
  width: '100%',
  height: 'auto',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '16px',
  margin: '16px',
  backgroundColor: '#ffffff',
  position: 'relative',
  transition: 'box-shadow 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
  }
};
