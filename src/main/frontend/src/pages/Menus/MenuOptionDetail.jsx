import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMenu } from "./useMenu";

export default function MenuOptionDetail({options, email}) {
		const [ open, setOpen ] = useState(false);
		const [ optionUpdataData, setOptionUpdateData ] = useState({options: '', price: ''})
		
		const handleOpen = () => setOpen(true);
		const handleClose = () => setOpen(false);
    // const { getMenuDetailByMenuId: {isLoading, data: menuData } } = useMenu(menuId, email);
    const handleUpdate = () => {
			
		}


    return (
			<Box>
				<Button onClick={handleOpen}>옵션 수정({options.length}개)</Button>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						{options.map((data) => (
							<Box key={data.menuOptionId}>
									<Stack direction={'row'}>
										<Typography>옵션명: {data.options}</Typography>
										<Typography>가격: {data.price}</Typography>
										<Button >수정</Button>
									</Stack>
							</Box>
						))}
					</Box>
				</Modal>
			</Box>
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