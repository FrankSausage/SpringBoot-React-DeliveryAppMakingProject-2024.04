import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Grid, TextField, Stack } from '@mui/material';
import { Form } from 'react-router-dom';
import { useMenu } from '../Hook/useMenu';

export default function MenuOptionRegister({ email, menuId }) {
  const [open, setOpen] = useState(false);
  const [menuOptionData, setMenuOptionData] = useState({ email: email, menuId: menuId, options: '', price: '' });
  const { postMenuOption } = useMenu();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = e => {
    setMenuOptionData({ ...menuOptionData, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (menuOptionData.options !== '' && menuOptionData.price !== '') {
      postMenuOption.mutate(menuOptionData, { onSuccess: () => handleClose() });
    }
  }

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" sx={{ width: '100px', height: '35px', backgroundColor: '#00cde1', color: '#FFFFFF' }}>
        옵션 추가
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"  >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>
            구성요소 추가
          </Typography>
          <Divider sx={{ borderBottomWidth: '2px', borderColor: 'black', mt: 1, mb: 3, }} />
          <Form onSubmit={handleSubmit} style={{ padding: '16px' }} fullWidth>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField type="text" id="options" name="options" label="옵션 이름" variant="outlined" fullWidth value={menuOptionData.options} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12}>
                <TextField type="number" id="price" name="price" label="가격 (숫자만 입력)" variant="outlined" fullWidth value={menuOptionData.price} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="center">
                  <Button type="submit" variant="contained" color="primary">등록</Button>
                  <Button onClick={handleClose} variant="outlined" color="error">취소</Button>
                </Stack>
              </Grid>
            </Grid>
          </Form>
        </Box>
      </Modal>
    </div>
  );
}

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   borderRadius: '8px',
//   boxShadow: 24,
//   p: 4,
// };

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  backgroundImage: 'url(/img/ba.jpg)',
  backgroundSize: 'cover',
  // backgroundPosition: 'center',
  // backgroundBlendMode: 'lighten',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  p: 3,
  overflowY: 'auto'
};
