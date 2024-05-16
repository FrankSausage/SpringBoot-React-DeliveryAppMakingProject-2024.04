import { Box, Button, Modal, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

export default function CartDelete() {
    const [ open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return(
    <Fragment>
      <Button onClick={handleOpen} color="error" sx={{border:1}}><DeleteIcon color='error'/></Button>
      <Modal
        open={open}
        onClose={handleClose}
      > 
      <Box sx={style}>
        <Typography>삭제 하시겠습니까?</Typography>
        <Button>삭제</Button>
        <Button color='error' onClick={handleClose}>취소</Button>
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