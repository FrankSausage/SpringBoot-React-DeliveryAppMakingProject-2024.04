import React, { Fragment, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Button, Dialog, DialogActions, DialogContent, 
    DialogContentText, DialogTitle, Divider, Stack, Typography } from "@mui/material";

export default function AddressDelete({addressId, addressData}) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = () => {
        axios.post(`dp/address/delete`, { addressId: addressId })
            .then(() => {
                alert('삭제 되었습니다.')
                navigate('/')
            })
            .catch(() => {
                alert('삭제에 실패했습니다.')
                navigate('/')
            })
    }
    return(
        <Fragment>
        <Button sx={{border: 1, mx: 1}} onClick={handleOpen}>
          삭제
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"  >
          <DialogTitle id="alert-dialog-title">
            <Typography variant="h5" sx={{textAlign: 'center'}}>주소 삭제</Typography>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Typography sx={{ml: 10}} variant="h5">삭제 하시겠습니까?</Typography>
          <DialogContentText id="alert-dialog-description">
            <Typography sx={{mb: 2}} variant="button">현재 주소: {addressData}</Typography>
          </DialogContentText>
          </DialogContent>
          <Stack direction={'row'} sx={{mb: 2}}>
              <Button onClick={handleDelete} sx={{margin: 'auto', color:'red', border: 1, width: 100}} autoFocus>
                  삭제
              </Button>
              <Button onClick={handleClose} sx={{margin: 'auto', border: 1, width: 100}}>아니오</Button>
        </Stack>
        </Dialog>
      </Fragment>
    );
}