import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Grid, Input, Stack } from '@mui/material';
import { Form } from 'react-router-dom';
import { useMenu } from '../Hook/useMenu';


export default function MenuOptionRegister({ email, menuId }) {
  const [open, setOpen] = React.useState(false);
  const [ menuOptionData, setMenuOptionData ] = useState({email: email, menuId: menuId, options: '', price: ''})
  const { postMenuOption } = useMenu();
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleChange = e => {
    setMenuOptionData({...menuOptionData, [e.target.name]: e.target.value});
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    if(menuOptionData.options!==null && menuOptionData.price!==null) {
      postMenuOption.mutate(menuOptionData, {onSuccess: () => handleClose()})
    } 
  }

  return (
    <div>
      <Button onClick={handleOpen} sx={{ width:'100px', backgroundColor: '#00cde1', color: '#FFFFFF'}}>옵션 추가</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign:'center'}}>
            구성요소 추가
          </Typography>
          <Divider sx={{borderBottomWidth: '2px', borderColor:'black', mt: 1, mb: 3,}} />
        <Form onSubmit={handleSubmit} sx={{py: 2}}fullWidth>
          <Grid container>
            <Grid item xs/>
            <Grid item xs={10}>
              <Input type='text' id='options' name='options' sx={{mb: 3}} error={menuOptionData.options ? false:true} 
              placeholder='옵션 이름' onChange={handleChange} required fullWidth></Input>
              <Input type='number' id='price' name='price' sx={{mb: 3}} error={menuOptionData.price ? false:true} 
              placeholder='가격 (숫자만 입력)' onChange={handleChange} required fullWidth></Input>
              <Stack direction={'row'} sx={{justifyContent:'center'}}>
                <Button type='submit' sx={{border: 1, mx: 2}}>등록</Button>
                <Button onClick={handleClose} color={'error'} sx={{border: 1, mx: 2}}>취소</Button>
              </Stack>
            </Grid>
            <Grid item xs/>
          </Grid>
        </Form> 
        </Box>
      </Modal>
    </div>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};