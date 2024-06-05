import React, { Fragment, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { Button, Card, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import Modal from 'react-modal';
import { useOrder } from "../Hook/useOrder";
import TossChackOut from "../Toss/TossCheckOut";

Modal.setAppElement('#root');

export default function Order() {
	const location = useLocation();
	const navigate = useNavigate();
	const address = localStorage.getItem('address');
	const email = localStorage.getItem('email');
	const { userPoint } = useOutletContext();
	const { totalPrice } = location.state;
	const { postOrderRegist } = useOrder();
	const [ open, setOpen ] = useState('');
	const [request, setRequest] = useState('');
	const [paymentMethod, setPaymentMethod] = useState('');
	const [point, setPoint] = useState(0);
	const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

	const handleOpen = () => {
		if (!open) {
			setOpen(true);
		}
	}

	const handleClose = () => {
		if (open) {
			setOpen(false);
		}
	}

	const handleSubmit = () => {
		if (!paymentMethod) {
			alert('결제 방식을 선택 해 주세요.')
			return;
		}
		if (userPoint && point > userPoint) {
			alert('보유 포인트보다 더 많은 포인트를 사용 할 수 없습니다.');
			return;
		}
		if (paymentMethod==='토스결제') {
				const tossTemp = JSON.stringify({
					storeId: cartItems[0].storeId,
					userEmail: email,
					deliveryUserEmail: email,
					paymentMethod: paymentMethod,
					point: point,
					totalPrice: (point > 0) ? ((totalPrice - point) <= 0 ? 0 : (totalPrice - point)) : totalPrice,
					request: request,
					address: address,
					menus: cartItems
				});
				sessionStorage.setItem('tossTemp', tossTemp);
				handleOpen();
				return;
		}

		postOrderRegist.mutate({
			storeId: cartItems[0].storeId,
			userEmail: email,
			deliveryUserEmail: email,
			paymentMethod: paymentMethod,
			point: point,
			totalPrice: (point > 0) ? ((totalPrice - point) <= 0 ? 0 : (totalPrice - point)) : totalPrice,
			request: request,
			address: address,
			menus: cartItems
		}, {
			onSuccess: () => {
				localStorage.removeItem('cartItems');
				localStorage.removeItem('cartCount');
				navigate('/')
			},
			onError: e => {console.log(e)},
		})
	}

	return (
		<Card sx={{ width: '60%', margin: 'auto', padding: 2, mt: 3, border: 1 }}>
			<Typography variant="h4" sx={{ textAlign: 'center', my: 2, pb: 3, cursor: 'pointer' }}
				onClick={() => navigate(`/StoreDetail/${cartItems[0].storeId}`, { state: { storeName: cartItems[0].storeName } })}>
				{cartItems[0].storeName}
			</Typography>
			<Divider sx={{ borderColor: 'black', borderStyle: 'dashed', my: 3 }} />
			<Typography variant="h5" sx={{ textAlign: 'center', mb: 2  }}>- 주문 접수 -</Typography>
			{cartItems &&
				cartItems.map((menuItems) => (
					<Fragment key={menuItems.menuId}>
						<Grid container sx={{ marginLeft: 2.5 }}>
							<Grid item xs={1} />
							<Grid item xs container direction="column" style={{ marginLeft: '20px' }}>
								<Grid container justifyContent="space-between" alignItems="center">
									<Grid item>
										<Typography>{menuItems.menuName}: {menuItems.quantity}개 </Typography>
									</Grid>
									<Grid item>
										<Typography>{menuItems.menuPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Typography>
									</Grid>
								</Grid>
								{menuItems.menuOptions &&
									menuItems.menuOptions.map((optionItems) => (
										<Grid container key={optionItems.optionId} justifyContent="space-between" alignItems="center">
											<Grid item style={{ paddingLeft: '25px' }}>
												<Typography>{optionItems.options}</Typography>
											</Grid>
											<Grid item>
												<Typography>+ {optionItems.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 </Typography>
											</Grid>
										</Grid>
									))
								}
							</Grid>
							<Grid item xs={2} />
						</Grid>
					</Fragment>
				))
			}
			<Divider sx={{ borderColor: 'black', borderStyle: 'dashed', my: 3 }} />
			<Stack direction={'row'} sx={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
				<Typography>요청 사항: </Typography>
				<TextField id='request' name='request' sx={{ ml: 1, width: '50%' }} maxRows={1} placeholder="ex) 국/반찬은 빼주세요." onChange={e => { setRequest(e.target.value) }} value={request} autoComplete="request-text" />
			</Stack>
			<Grid container sx={{ my: 3 }}>
				<Grid item xs />
				<Grid item xs={3}>
					<FormControl fullWidth>
						<InputLabel id='paymentMethod'>결제 방식</InputLabel>
						<Select
							labelId='paymentMethod'
							id='paymentMethod-select'
							value={paymentMethod}
							label='결제 방식 선택'
							onChange={e => setPaymentMethod(e.target.value)}
						>
							<MenuItem value={'현금결제'}>만나서 현금 결제</MenuItem>
							<MenuItem value={'카드결제'}>만나서 카드 결제</MenuItem>
							<MenuItem value={'토스결제'}>Toss 결제</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs />
			</Grid>
			<Stack direction={'row'} sx={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
				<Typography>포인트 사용 :  </Typography>
				<TextField type='number' id='point' name='point' sx={{ ml: 1, width: '10%' }} maxRows={1}
					placeholder='0' onChange={e => { setPoint(e.target.value) }} value={(point >= userPoint) ? userPoint : point} autoComplete="point-text" InputProps={{ inputProps: {style: { textAlign: 'center' }}}}/>
					<Typography sx={{ ml: 1}}>/ {userPoint ? userPoint : 0}</Typography>
			</Stack>
			<Typography variant="h5" sx={{ textAlign: 'center', my: 2, fontWeight: 'bold' }}>최종 금액: {totalPrice ? totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0}원</Typography>
			<Stack direction={'row'} sx={{ justifyContent: 'space-around', mt: 5, mb: 4 }}>
				<Button sx={{ border: 1, width: '30%' }} color="error" onClick={() => navigate(-1)}>돌아가기</Button>
				<Button sx={{ border: 1, width: '30%' }} onClick={handleSubmit}>주문하기</Button>
			</Stack>
			<TossChackOut handleOpen={open} tossClose={handleClose} storeId={cartItems[0].storeId} userEmail={email} point={point} totalPrice={(point > 0) ? ((totalPrice - point) <= 0 ? 0 : (totalPrice - point)) : totalPrice} />
		</Card>
	);
}

