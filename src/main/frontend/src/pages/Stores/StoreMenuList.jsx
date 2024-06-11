import React, { useState } from 'react';
import { Box, Grid, Typography, Button, Stack, CssBaseline, Tabs, Tab } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMenuListByStoreId } from '../../utils/storeInfo';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MenuOptionRegister from './Menus/MenuOptionRegister';
import { useStore } from './Hook/useStore';
import BackDrop from "../../components/BackDrop";
import MenuDetail from './Menus/MenuDetail';

const defaultTheme = createTheme();

export default function StoreMenuList({ storeName, deliveryTip, minDeliveryPrice }) {
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const role = localStorage.getItem('role');
  const { storeId } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(false);
  const { isLoading, error, menuData } = useMenuListByStoreId(storeId);
  const { postChangeMenuStatus } = useStore();

  const handleCheckboxChange = async (status, menuId) => {
    try {
      postChangeMenuStatus.mutate({
        menuId: menuId,
        email: email,
        status: status === '일반' ? '품절' : '일반',
      });
    } catch (error) {
      console.error('에러 발생:', error);
    }
    setTimeout(() => {
      alert("상태가 업데이트되었습니다!");
    }, 500);
  };

  const handleOpen = (e, menuId, status) => {
    if (role === '회원' && status === '품절') {
      return;
    }

    if (role === '회원' && !open) {
      setActiveIndex(menuId);
      setOpen(true);
    } else if (role === '점주') {
      navigate('/MenuUpdate', { state: { menuId: menuId, storeId: storeId, storeName: storeName } });
    }
  };
  const handleClose = () => setOpen(false);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const sortMenus = (menus) => {
    const categoryOrder = ['인기 메뉴', '메인 메뉴', '세트 메뉴', '사이드 메뉴'];
    return menus.sort((a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category));
  };

  const filterMenusByTab = (menus) => {
    if (tabIndex === 1) return menus.filter(menu => menu.popularity === 1);
    if (tabIndex === 2) return menus.filter(menu => menu.category === '메인 메뉴');
    if (tabIndex === 3) return menus.filter(menu => menu.category === '세트 메뉴');
    if (tabIndex === 4) return menus.filter(menu => menu.category === '사이드 메뉴');
    return sortMenus(menus); // Sort menus in the order for '전체 메뉴' tab
  };

  const renderMenuItems = (menus) => {
    let currentCategory = '';
    const popularMenus = menus.filter(menu => menu.popularity === 1);
    console.log(popularMenus)
    return (
      <>
        {tabIndex === 0 && popularMenus.length > 0 && (
          <>
            <Grid item xs={12} sx={{ mt: 4, mb: 2 }}>
              <Typography variant="h5" component="div">
                인기 메뉴
              </Typography>
              <hr style={{ border: 'none', borderTop: '2px solid #000', margin: '8px 0' }} />
            </Grid>
            {popularMenus.map((res) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={res.menuId}>
                <Box sx={boxStyle}>
                  <Box onClick={e => handleOpen(e, res.menuId, res.status)} sx={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>
                    <img src={res.menuPictureName} style={{ width: '180px', height: '150px', objectFit: 'cover', borderRadius: '10px', display: 'block', margin: '0 auto' }} alt="메뉴 사진" />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    {role === '회원' && res.status === '품절' && <img src='/img/soltout.jpg' style={{ position: 'absolute', top: 1, left: 1, width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%' }} alt="품절 이미지" />}
                    {res.popularity === 1 && <ThumbUpIcon sx={{ position: 'absolute', top: 0, right: 0, m: 1, color: 'crimson', borderRadius: '20%' }} />}
                    <Box onClick={e => handleOpen(e, res.menuId, res.status)} sx={{ textDecoration: 'none', color: 'black', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', }}>
                      <ul style={{ padding: 0, textAlign: 'center' }}>
                        <li style={{ listStyleType: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{res.name}</li>
                        <li style={{ listStyleType: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{res.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</li>
                      </ul>
                    </Box>
                    {role === '점주' &&
                      <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
                        <Button
                          variant="contained"
                          color={res.status === '품절' ? 'primary' : 'secondary'}
                          onClick={() => handleCheckboxChange(res.status, res.menuId)} sx={{ width: '100px', height: '35px' }}>
                          {res.status === '품절' ? '상품 판매' : '품절'}
                        </Button>
                        <Button color={'info'} sx={{ width: '100px', height: '35px' }}>
                          <MenuOptionRegister email={email} menuId={res.menuId} />
                        </Button>
                      </Stack>}
                  </Box>
                  <Grid item></Grid>
                </Box>
              </Grid>
            ))}
          </>
        )}

        {menus.map((res) => {
          const isFirstInCategory = res.category !== currentCategory;
          if (isFirstInCategory) {
            currentCategory = res.category;
          }
          return (
            <React.Fragment key={res.menuId}>
              {(isFirstInCategory && tabIndex === 0) && (
                <Grid item xs={12} sx={{ mt: 4, mb: 2 }}>
                  <Typography variant="h5" component="div">
                    {currentCategory}
                  </Typography>
                  <hr style={{ border: 'none', borderTop: '2px solid #000', margin: '8px 0' }} />
                </Grid>
              )}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Box sx={boxStyle}>
                  <Box onClick={e => handleOpen(e, res.menuId, res.status)} sx={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>
                    <img src={res.menuPictureName} style={{ width: '180px', height: '150px', objectFit: 'cover', borderRadius: '10px', display: 'block', margin: '0 auto' }} alt="메뉴 사진" />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    {role === '회원' && res.status === '품절' && <img src='/img/soltout.jpg' style={{ position: 'absolute', top: 1, left: 1, width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%' }} alt="품절 이미지" />}
                    {res.popularity === 1 && <ThumbUpIcon sx={{ position: 'absolute', top: 0, right: 0, m: 1, color: 'crimson', borderRadius: '20%' }} />}
                    <Box onClick={e => handleOpen(e, res.menuId, res.status)} sx={{ textDecoration: 'none', color: 'black', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', }}>
                      <ul style={{ padding: 0, textAlign: 'center' }}>
                        <li style={{ listStyleType: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{res.name}</li>
                        <li style={{ listStyleType: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{res.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</li>
                      </ul>
                      {open && role === '회원' && activeIndex === res.menuId && <MenuDetail storeId={storeId} menuId={res.menuId} storeName={storeName} handleOpen={open} menuClose={handleClose} deliveryTip={deliveryTip} minDeliveryPrice={minDeliveryPrice} />}
                    </Box>
                    {role === '점주' &&
                      <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
                        <Button
                          variant="contained"
                          color={res.status === '품절' ? 'primary' : 'secondary'}
                          onClick={() => handleCheckboxChange(res.status, res.menuId)} sx={{ width: '100px', height: '35px' }}>
                          {res.status === '품절' ? '상품 판매' : '품절'}
                        </Button>
                        <Button color={'info'} sx={{ width: '100px', height: '35px' }}>
                          <MenuOptionRegister email={email} menuId={res.menuId} />
                        </Button>
                      </Stack>}
                  </Box>
                  <Grid item></Grid>
                </Box>
              </Grid>
            </React.Fragment>
          );
        })}
      </>
    );
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="전체 메뉴" />
        <Tab label="인기 메뉴" />
        <Tab label="메인 메뉴" />
        <Tab label="세트 메뉴" />
        <Tab label="사이드 메뉴" />
      </Tabs>
      {isLoading && <BackDrop isLoading={isLoading} />}
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
  marginX: 'auto', 
  backgroundColor: '#ffffff',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'transform 0.3s, box-shadow 0.3s', 
  '&:hover': {
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    transform: 'scale(1.05)', 
  },
};
