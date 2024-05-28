import React, { Fragment } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { FaUser, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useAuthContext } from '../context/AuthContext';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Box, Typography, InputAdornment, OutlinedInput, Stack, Grid } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import DropUserInfo from './DropUserInfo';

export default function AppNavbar() {
  const { user } = useAuthContext();
  const { outletAddress } = useOutletContext();
  const address = localStorage.getItem('address') ? localStorage.getItem('address') : '';
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (user) {
      navigate('/Address');
    } else {
      alert('로그인이 필요합니다.');
      navigate('/SignIn');
    }
  };

  return (
    <header className="header_section">
      <Container>
        <Navbar expand="lg" className="custom_nav-container">
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <img src={'/img/000.png'} style={{ width: '15%', height: '15%', position: 'relative', top: 5, left: '-50px' }} />
          </Link>
          {/* <Navbar.Toggle aria-controls="navbarSupportedContent" /> */}
          {/* <Navbar.Collapse id="navbarSupportedContent"> */}
            {/* <Grid container justifyContent="center" alignItems="center"> */}
              {role === '회원' && (
                <Grid item xs={12} sm={8} md={6}>
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
                          <Button variant="outline-success" className="nav_search-btn" type="submit">
                            <FaSearch aria-hidden="true" />
                          </Button>
                        </InputAdornment>
                      }
                      sx={{ mt: 1, mb: 1, width: '100%', maxWidth: 550, backgroundColor: 'white', cursor: 'pointer', borderRadius: '30px', padding: '1px 15px', fontSize: '1rem', textAlign: 'center' }}
                      inputProps={{ style: { textAlign: 'center' } }}
                      onClick={handleNavigate}
                    />
                  </Box>
                </Grid>
              )}
              <Grid item xs={12} sm={4} md={6}>
                <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                  {user ? (
                    <>
                      <Nav.Link href="#" className="cart_link">
                        <FaShoppingCart aria-hidden="true" />
                      </Nav.Link>
                      <DropUserInfo role={role} />
                      <Typography variant="body1" sx={{ color: 'black', fontWeight: 'bold' }}>
                        {user.displayName}
                      </Typography>
                    </>
                  ) : (
                    <Fragment>
                      <Link
                        to="/SignIn"
                        style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}
                      >
                        로그인
                      </Link>
                      <Link
                        to="/SignUp"
                        style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}
                      >
                        회원가입
                      </Link>
                    </Fragment>
                  )}

                </Stack>
              </Grid>
            {/* </Grid> */}
          {/* </Navbar.Collapse> */}
        </Navbar>
      </Container>
    </header>
  );
}
