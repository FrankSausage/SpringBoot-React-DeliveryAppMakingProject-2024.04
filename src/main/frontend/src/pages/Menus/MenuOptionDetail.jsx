import { Box, Button, Divider, Grid, Input, Modal, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Form, Link, useLocation } from "react-router-dom";
import { useMenu } from "./useMenu";
import MenuOptionUpdateForm from "./MenuOptionUpdateForm";

export default function MenuOptionDetail({options, email}) {
		const [ open, setOpen ] = useState(false);
		const { deleteMenuOption } = useMenu();
		
		const handleOpen = () => {
			if(options.length===0) {
				alert('메뉴에 수정 할 수 있는 옵션이 없습니다, 먼저 옵션을 추가 해 주세요.')
				return;
			}
			setOpen(true);
		}
		const handleClose = () => setOpen(false);

    const handleDelete = (menuOptionId) => {
			deleteMenuOption.mutate(menuOptionId, email, {
				onSuccess: handleClose
			})
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
							<Box key={data.menuOptionId} component={Form} sx={{border: 1, borderRadius: 2, mb: 1}}>
								<Stack direction={'row'} sx={{justifyContent:'space-between', alignItems:'center', px:1}}>
									<Grid Container>
										<Grid item sx={{py:2}}>
											<Typography>{data.options} </Typography>
											<Typography>{data.price} 원 </Typography>
										</Grid>
									</Grid>
									<Grid Container>
										<Grid item>
											<Stack sx={{alignContent:"center", my: 1}}>
												<MenuOptionUpdateForm menuOptionId={data.menuOptionId} email={email}/>
												<Button sx={{border: 1}} onClick={() => handleDelete(data.menuOptionId)} color="error">삭제</Button>
											</Stack>
										</Grid>
									</Grid>
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