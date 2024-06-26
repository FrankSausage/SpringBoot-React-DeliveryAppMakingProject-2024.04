import { Box, Card, CardContent, CardMedia, Dialog, Grid, Paper, Typography, IconButton, Rating } from "@mui/material";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useDibs } from "../Hook/useDibs";
import CloseIcon from '@mui/icons-material/Close';
import BackDrop from "../../../components/BackDrop";

export default function Dibs(props) {
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const { handleOpen, dibsClose } = props;
  const { getDibsListByEmail: { isLoading, data: dibsData } } = useDibs(email, handleOpen);

  const handleNav = storeId => {
    navigate(`/StoreDetail/${storeId}`);
  };

  return (
    <Dialog open={handleOpen} keepMounted PaperProps={{ style: { borderRadius: 20, overflow: 'hidden' } }}>
      <Box>
        <Paper elevation={5} sx={paperStyle}>
          <IconButton sx={CloseBoxStyle} onClick={() => dibsClose()}>
            <CloseIcon />
          </IconButton>
          {isLoading && <BackDrop isLoading={isLoading} />}
          {!isLoading && !dibsData && <Typography variant="h4">아직 찜한 가게가 없어요!</Typography>}
          {!isLoading && dibsData &&
            <Grid container direction="row" alignItems="center">
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', my: 2 }}>
                  <Typography variant="h4">내가 찜한 가게</Typography>
                </Box>
              </Grid>
              <Grid container item xs={12} spacing={3} justifyContent="center">
                {dibsData.data.dibsList.map((data, idx) => (
                  <Grid item key={idx} xs={12} sm={6} md={4} lg={4} xl={4}>
                    <Card onClick={() => handleNav(data.storeId)} sx={{ ...cardStyle,  boxShadow: 3, transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: 6 }} }>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <CardMedia component='img' image={data.storePictureName} sx={mediaStyle} />
                        </Grid>
                        <Grid item xs>
                          <CardContent sx={contentStyle}>
                            <Typography variant="h6" sx={storeNameStyle}>
                              {data.storeName.length > 6 ? `${data.storeName.slice(0, 6)}..` : data.storeName}
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              <Rating name="read-only" value={data.rating} readOnly />
                            </Typography>
                            <Typography>리뷰 수: {data.reviewCount}</Typography>
                          </CardContent>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          }
        </Paper>
      </Box>
    </Dialog>
  );
}

const paperStyle = {
  height: '90vh',
  backgroundImage: 'url(/img/differen.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundBlendMode: 'lighten',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  p: 3,
  overflowY: 'auto'
};

const CloseBoxStyle = {
  color: "black",
  position: "absolute",
  top: 10,
  right: 10,
  "&:hover": {
    color: 'crimson',
  }
};

const cardStyle = {
  cursor: 'pointer',
  p: 2,
  mb: 2,
  borderRadius: 2,
  boxShadow: 3,
  '&:hover': {
    boxShadow: 6,
  }
};

const mediaStyle = {
  width: 113,
  height: 113,
  borderRadius: '50%'
};

const storeNameStyle = {
  fontWeight: 'bold',
  mb: 1
};

const contentStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
};
