import React  from 'react';
import { Container, CssBaseline } from '@mui/material';

const Background = ({children}) => {
  return (
    <div style={{
      backgroundImage: 'url(/img/kitchen.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '23px 0',
      backgroundBlendMode: 'lighten',
      backgroundColor: 'rgba(255, 255, 255, 0.6)' // This makes the background image appear lighter
    }}>
      <Container component="main" maxWidth="xs" style={{ backgroundColor: '#ffffffd9', padding: '20px', borderRadius: '8px' }}>
        <CssBaseline />
          {children}
        </Container>
    </div>
  );
};
 export default Background;