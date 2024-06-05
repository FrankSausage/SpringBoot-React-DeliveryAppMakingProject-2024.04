import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function BackDrop({ isLoading }) {  // 'true' or 'false'
  const [open] = useState(isLoading);    // 'true' == 백드롭 활성화 or 'false' == 백드롭 비활성화

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}