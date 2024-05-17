import { Button, Dialog, Slide, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import ListAltIcon from '@mui/icons-material/ListAlt';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OrderList({ allClose }) {
  const [ open, setOpen ] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {

    setOpen(false)
  };
  
  return (
    <Fragment>
      <Fragment>
        <Button sx={{color:'black', mx:1}} onClick={handleOpen}>
          <ListAltIcon/><Typography sx={{ml:3}}>주문내역</Typography>
        </Button>
      </Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
      >

      </Dialog>
    </Fragment>
  );
}