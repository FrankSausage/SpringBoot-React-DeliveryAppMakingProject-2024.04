import { Box, Button, Input, Modal } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useMenu } from "../Hook/useMenu";

export default function MenuOptionUpdateForm({menuOptionId, email}) {
  const [ menuOptions, setMenuOptions ] = useState({menuOptionId: menuOptionId, email: email, options:'', price: 0 })
  const { updateMenuOption } = useMenu();
  const [ open, setOpen ] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = e => {
    setMenuOptions({...menuOptions, [e.target.name] : e.target.value});
  }

  const handleUpdate = () => {    
    if (!menuOptions.options || !menuOptions.price) {
      alert('먼저 옵션 이름 또는 가격을 입력 해야 합니다.')
      return;
    }
    updateMenuOption.mutate(menuOptions, {
      onSuccess:(handleClose)
    })
  }
  
  return(
    <Fragment>
    <Button sx={{border: 1, mb:1}} onClick={handleOpen} >수정</Button>
    <Modal
      open={open}
      onClose={handleClose}
    >
    <Box sx={style}>
      <Input type="text" id='options' name='options' placeholder='새 옵션 이름' 
        onChange={handleChange} required fullWidth/>
      <Input type="number" id='price' name='price' placeholder='새 가격 (숫자만 입력)' 
        onChange={handleChange} required fullWidth/>
      <Button onClick={handleUpdate} fullWidth> 확인 </Button>
    </Box>
    </Modal>
    </Fragment>
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