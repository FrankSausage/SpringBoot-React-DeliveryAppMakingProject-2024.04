import React, { Fragment } from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useAuthContext } from '../context/AuthContext';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Box, Typography, InputAdornment, OutlinedInput, Stack, Grid } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import DropUserInfo from './DropUserInfo';
import Cart from '../pages/Cart/View/Cart';

export default function AppNavbar() {
  const { user } = useAuthContext();
  const { outletAddress } = useOutletContext();
  const address = localStorage.getItem('address') ? localStorage.getItem('address') : '';
  const role = localStorage.getItem('role');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (loc) => {
    switch (loc) {
      case 'Cart':
        navigate('/Cart');
        break;
      case 'Address':
        if (user) {
          navigate('/Address');
        } else {
          alert('로그인이 필요합니다.');
          navigate('/SignIn');
        }
        break;
      default:
        break;
    }
  };

  return (
    <header className="header_section" style={{ background: 'linear-gradient(to right, black, rgba(0, 0, 0, 0.5))' }}>
      <Container>
        <Navbar expand="lg" className="custom_nav-container">
          <Grid container alignItems="center">
            <Grid item xs={2} sm={2} md={2}>
              <Link to="/" style={{ textDecoration: 'none', color: 'Black' }}>
                <img src={'/img/logo01.png'} style={{ width: '40%', height: '40%', maxWidth: '150px', maxHeight: '150px' }} />
              </Link>
            </Grid>
            {role === '회원' && (
              <Grid item xs={8} sm={8} md={8}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <OutlinedInput
                    value={address ? address : outletAddress}
                    startAdornment={
                      <InputAdornment position="start">
                        <GpsFixedIcon style={{ color: 'gray' }} />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <Button variant="outline-success" className="nav_search-btn" type="submit" style={{ color: 'black', borderColor: 'black' }} >
                          <FaSearch aria-hidden="true" style={{ color: 'black' }} />
                        </Button>
                      </InputAdornment>}
                    sx={{ mt: 1, mb: 1, width: '100%', maxWidth: 550, backgroundColor: 'white', cursor: 'pointer', borderRadius: '30px', padding: '1px 15px', fontSize: '1rem', textAlign: 'center' }} inputProps={{ style: { textAlign: 'center' } }} onClick={() => handleNavigate('Address')}
                  />
                </Box>
              </Grid>
            )}
            <Grid item xs={user && role !== '점주' ? 2 : 9.5} sm={user && role !== '점주' ? 2 : 9.5} md={user && role !== '점주' ? 2 : 9.5}>
              <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center" sx={{ width: '100%' }}>
                {user ? (
                  <>
                   <Cart allClose={handleClose} />
                    <DropUserInfo role={role} />
                    <Typography variant="body1" sx={{ color: '#1e7843', fontWeight: 'bold' }}>
                      {user.displayName}
                    </Typography>
                </>
              ) : (
                <Fragment>
                    <Link to="/SignIn" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold', marginLeft: 'auto' }}>
                      로그인
                    </Link>
                    <Link to="/SignUp" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold', marginLeft: '1rem' }}>
                      회원가입
                    </Link>
                </Fragment>
              )}
            </Stack>
              </Grid>
          </Grid>
        </Navbar>
      </Container>
    </header>
  );
}
