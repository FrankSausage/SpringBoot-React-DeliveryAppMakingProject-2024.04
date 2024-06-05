import { Box, Button, Grid, InputBase, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, } from "react-router-dom";
import SearchHeader from "../../components/SearchHeader";
import SearchIcon from '@mui/icons-material/Search';
import StoreList from '../Stores/StoreList';
import { useQueryClient } from "@tanstack/react-query";
import Slider from "react-slick";
import { Stack } from "react-bootstrap";
import Footer from "../../components/Footer";

export default function StoreSearch() {
	const queryClient = useQueryClient();
	const [searchText, setSearchText] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		if (searchText) {
			queryClient.refetchQueries(['storeList'])
		}
	}

	return (
		<Box>
			<SearchHeader />
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Stack sx={{ maxHeight: 300, borderRadius: 0, overflow: 'hidden' }}>
						<Slider {...settings}>
							<Box component="img" sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 'inherit' }} src="img/c/01.jpg" alt="01" />
							<Box component="img" sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 'inherit' }} src="img/c/02.jpg" alt="02" />
							<Box component="img" sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 'inherit' }} src="img/c/03.jpg" alt="03" />
							<Box component="img" sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 'inherit' }} src="img/c/04.jpg" alt="04" />
							<Box component="img" sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 'inherit' }} src="img/c/05.jpg" alt="05" />
							<Box component="img" sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 'inherit' }} src="img/c/06.jpg" alt="06" />
							<Box component="img" sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 'inherit' }} src="img/c/07.jpg" alt="07" />
							<Box component="img" sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 'inherit' }} src="img/c/08.jpg" alt="08" />
							<Box component="img" sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 'inherit' }} src="img/c/09.jpg" alt="09" />
						</Slider>
					</Stack>
				</Grid>
			</Grid>
			<Paper elevation={3} sx={{ minHeight: '100vh',maxHeight: 'auto', backgroundImage: 'url(/img/space.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'lighten', backgroundColor: 'rgba(255, 255, 255, 0.1)', p: 2 }}>
			<Typography component={Link} to={'/Store'} style={{ textDecoration: 'none', color: 'white' }}> ◀ 뒤로가기 </Typography>
			<Grid container justifyContent="center" alignItems="center" mt={2}>
				<Grid item xs={6} md={4}>
					{/* <Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderColor: 'divider', borderRadius: 1 }}> */}
						<Box sx={{ display: 'flex', justifyContent: 'center', border: 1, borderColor: 'divider', borderRadius: 3, p: 1, bgcolor: '#fff', boxShadow: 1 }}>
							<Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 5 }}>
								<SearchIcon sx={{ m: 1 }} />
								<InputBase placeholder="검색" inputProps={{ 'aria-label': 'search' }} value={searchText} onChange={e => setSearchText(e.target.value)} fullWidth autoFocus />
								<Button onClick={handleSubmit}>검색</Button>
							</Box>
						</Box>
				</Grid>
			</Grid>
			{searchText &&
				<StoreList searchText={searchText} />
			}
			</Paper>
			<Footer/>
		</Box >
	);
}
const settings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 3000,
};