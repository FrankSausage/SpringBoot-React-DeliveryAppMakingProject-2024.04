import React, { Fragment, useState } from 'react';
import Footer from "../../components/Footer";
import { Box, Grid, Paper, Tab, Tabs, Typography } from '@mui/material/';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import StoreInfo from './StoreInfo';
import StoreMenuList from './StoreMenuList';
import SearchHeader from '../../components/SearchHeader';
import { useDibs } from '../Dibs/Hook/useDibs';
import { useStoreDeatilByEmail } from '../../utils/storeInfo';
import { useQueryClient } from '@tanstack/react-query';
import BackDrop from '../../components/BackDrop';
import StoreReviews from '../Review/View/StoreReviews';
import { Button } from 'react-bootstrap';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function StoreDetail() {
  const queryClient = useQueryClient();
  const email = localStorage.getItem('email');
  const role = localStorage.getItem('role');
  const { storeId } = useParams();
  const { isLoading, storeDetail } = useStoreDeatilByEmail(email, storeId);
  const { postDibStore } = useDibs();
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleDib = (isDibed) => {
    if (isDibed === null) {
      postDibStore.mutate({ email: email, storeId: storeId, status: '찜' }, {
        onSuccess: () => { console.log('찜 성공'); queryClient.invalidateQueries(['storeDetail', { storeId: storeId }]) },
        onError: e => { alert('찜 등록에 문제가 발생했습니다.'); console.error(e) }
      });
      return;
    }

    if (isDibed === '일반') {
      postDibStore.mutate({ email: email, storeId: storeId, status: '찜' }, {
        onSuccess: () => { console.log('찜 성공'); queryClient.invalidateQueries(['storeDetail', { storeId: storeId }]) },
        onError: e => { alert('찜 등록에 문제가 발생했습니다.'); console.error(e) }
      });
    } else if (isDibed === '찜') {
      postDibStore.mutate({ email: email, storeId: storeId, status: '일반' }, {
        onSuccess: () => { console.log('일반 성공'); queryClient.invalidateQueries(['storeDetail', { storeId: storeId }]) },
        onError: e => { alert('찜 등록에 문제가 발생했습니다.'); console.error(e) }
      });
    }
  };

  return (
    <Box sx={{ margin: 0 }}>
      <SearchHeader />

      {isLoading && <BackDrop isLoading={isLoading} />}
      {!isLoading && storeDetail &&
        <Fragment>
          <Box sx={{ borderBottom: 1, borderColor: 'black', display: 'flex', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
            <Button variant="contained" onClick={() => navigate(-1)} sx={{ backgroundColor: 'transparent', color: 'black', boxShadow: 'none', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' }, alignSelf: 'flex-start', mr: 2}} >
              ◀ 뒤로가기
            </Button>

            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mr: 15  }} centered >
              <Tab label="메뉴" {...a11yProps(0)} sx={{ marginLeft: 2, marginRight: 2 }} />
              <Tab label="가게·원산지 정보" {...a11yProps(1)} autoFocus sx={{ marginLeft: 2, marginRight: 2 }} />
              <Tab label="리뷰" {...a11yProps(2)} autoFocus sx={{ marginLeft: 2, marginRight: 2 }} />
            </Tabs>
          </Box>
          <Paper elevation={3} sx={{ minHeight: '100vh', maxHeight: 'auto', backgroundImage: 'url(/img/cooking.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'lighten', backgroundColor: 'rgba(255, 255, 255, 0.6)', p: 2 }}>
            <Grid container>
              <Grid item xs={2} />
              <Grid item xs>
                <Typography variant='h4' sx={{ textAlign: 'center', mt: 3 }}>{storeDetail.name}
                  {role !== '점주' &&
                    <Fragment>
                      {storeDetail.isDibed === '일반' || storeDetail.isDibed === null ?
                        <FavoriteIcon sx={{ cursor: 'pointer', fontSize: 30, mb: 1, ":hover": { color: 'red' } }} onClick={() => handleDib(storeDetail.isDibed)} />
                        :
                        <FavoriteIcon sx={{ cursor: 'pointer', fontSize: 30, color: 'red', mb: 1 }} onClick={() => handleDib(storeDetail.isDibed)} />
                      }
                    </Fragment>
                  }
                </Typography>
              </Grid>
              <Grid item xs={2} />
            </Grid>
            <CustomTabPanel value={value} index={0}>
              <StoreMenuList storeName={storeDetail.name} deliveryTip={storeDetail.deliveryTip} minDeliveryPrice={storeDetail.minDeliveryPrice} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <StoreInfo storeDetail={storeDetail} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <StoreReviews storeId={storeId} />
            </CustomTabPanel>
            <Footer />
          </Paper>
        </Fragment>
      }
    </Box>
  );
}
