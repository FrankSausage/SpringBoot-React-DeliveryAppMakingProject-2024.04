import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Avatar, Box, Button, Grid, Input, Stack,  Typography, Container, CssBaseline} from "@mui/material";
import { Link } from 'react-router-dom';
import RoomIcon from '@mui/icons-material/Room';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import MailSharpIcon from '@mui/icons-material/MailSharp';
import { findPostcode } from "../../../utils/AddressUtil";
import { useAddressListByEmail } from "../../../utils/userInfo";
import { extractDataFromFormData, splitAddressFromCurrentUserAddress } from "../../../utils/commonUitil";
import axios from "axios";
import AddressUpdate from "../AddressUpdate";
import AddressDelete from "../AddressDelete";
import BackDrop from "../../../components/BackDrop";


export default function Address() {
    const email = localStorage.getItem('email')
    const currentAddress = localStorage.getItem('address');
    const { isLoading, error, address } = useAddressListByEmail(email);
    const [roadAddress, setRoadAddress] = useState('');
    const [extraAddress, setExtraAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [addressCode, setAddressCode] = useState('');
    const { setOutletAddress } = useOutletContext();
    const navigate = useNavigate();
    useEffect(() => {
      const loadDaumPostcodeScript = () => {
        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => {
          console.log('Daum 우편번호 API 스크립트가 로드되었습니다.');
        };
      };
  
      loadDaumPostcodeScript();
      
      return () => {
        // 언마운트 시 스크립트 제거 로직
      };
    }, []);

    const handleFindPostcode = () => {
      findPostcode(setRoadAddress, setExtraAddress, setAddressCode);
    };

    const handleSubmit = e => {
      e.preventDefault();
      const data = new FormData();
      
      setFormData(data)
        .then(res => {
          extractDataFromFormData(res)
            .then(resFormData => {
              axios.post(`/dp/address/add`, resFormData);
              setOutletAddress(resFormData.address);
              localStorage.setItem('address', resFormData.address);
              localStorage.setItem('splitAddress', JSON.stringify(splitAddressFromCurrentUserAddress(resFormData.address)));
            })
        })
        .then(() => {
          alert('주소 등록이 완료 되었습니다.');
          navigate('/');
        })
        .catch(() => {
          alert('주소 등록에 문제가 발생했습니다.');
          navigate('/');
        })
    }

    const handleCurrentChange = addressData => {
      axios.post(`/dp/address/change`, {...addressData, email})
      .then(() => {
        setOutletAddress(addressData.address);
        localStorage.setItem('address', addressData.address)
        localStorage.setItem('splitAddress', JSON.stringify(splitAddressFromCurrentUserAddress(addressData.address)));
       })
       .then(() => {
        alert('현재 주소 변경에 성공하였습니다.')
        navigate('/')
       })
       .catch(() => {
        alert('현재 주소 변경에 실패하였습니다.')
        navigate('/')
       })

    }

    const setFormData = async (data) => {
      try{
        data.append('email', email);
        data.append('address', ((roadAddress ? roadAddress : '') + ',' 
          + (extraAddress ? extraAddress : '') + ',' + (detailAddress ? detailAddress : '')));
        data.append('addressCode', addressCode.substring(0,8));
        return await data;
      } catch(error) {
        return ('setFormData Error!: ' + error);
      }
    }

    const handleBack = () => {
      navigate(-1); 
    };

    return(
      <Box sx={{ height: 'auto', minHeight: '100vh', backgroundImage: 'url(/img/a0.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'lighten', backgroundColor: 'rgba(255, 255, 255, 0.6)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '28px 0',}}>
        <Container component="main" maxWidth="sm" style={{ backgroundColor: '#ffffffd9', padding: '20px', borderRadius: '8px', }}>
        <Typography variant="body1" onClick={handleBack} sx={{ cursor: 'pointer', textAlign: 'left', float: 'left' }}>
        ◀ 뒤로가기
      </Typography>
          <CssBaseline />
        <Box sx={{  marginTop: 8, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'black', fontFamily: 'Arial, sans-serif', display: 'flex', justifyContent: 'center' }}>
              <img src={'/img/logo01.png'} style={{ width: '30%', position: 'relative', marginBottom: '20px'}} alt='로고 이미지'/>
            </Link>
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: '#f09032', alignSelf: 'center', marginLeft: '20px'}}>
            <MailSharpIcon />
          </Avatar>
          <Stack sx={{ maxWidth:'500px', width:'100%', textAlign: 'center', marginLeft: '85px' }}>
            {isLoading && <BackDrop isLoading={isLoading} />}
            {error && <Typography>에러 발생!</Typography>}
            {address && 
            <Box>
              <Grid container justifyContent="center" alignItems="center">
                <Stack component='form' onSubmit={handleSubmit} sx={{my: 3}}>
                  <Grid item sx={{mb: 3}}>
                    <Typography variant="h5" sx={{ marginLeft: '-75px' }}> 주소 목록 </Typography>
                    <Stack direction={"row"}  sx={{my: 4, marginLeft: '-70px'}}>
                      <Input type="text" 
                      value={roadAddress + extraAddress} 
                      name='cuAddress'
                      id='cuAddress'
                      sx={{width: 430}} 
                      placeholder="주소를 입력하세요..." 
                      required/>
                      <Button sx={{border: 1, mx: 1}} onClick={handleFindPostcode}> 검색 </Button>
                    </Stack>
                    <Stack direction={"row"}  sx={{my: 4, marginLeft: '-69px' }}>
                      <Input type="text" value={detailAddress} 
                      onChange={e => setDetailAddress(e.target.value)} sx={{width: 429}} 
                      placeholder="상세 주소"/>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ mb: 3, marginLeft: '-70px' }}>
                      { !roadAddress && <Button variant="contained" disabled sx={{fontSize: '1.2rem', height: '3rem'}}>추가</Button> }
                      { roadAddress && <Button sx={{border: 0, mx: 1, fontSize: '1.2rem', height: '3rem',
                        backgroundColor: '#e69c00', color: '#FFFFFF' ,'&:hover': {backgroundColor: '#ffbe33'}}} 
                        type="submit" variant="contained" >주소 추가</Button> }
                  </Grid>
                </Stack>
              </Grid>
            </Box>
            }
            {/* <Divider sx={{my: 5}} /> */}
            {address && (
              address.map((data, idx) => (
                <Stack key={idx} direction={"row"} sx={{my: 3, marginLeft: '-35px'}} justifyContent="center" alignItems="center">
                  {
                    data.address===currentAddress ? 
                      <>
                      <Input value={data.address} sx={{width: 500}}/>  
                      <AddressUpdate addressData={data.address} addressId={data.addressId} 
                        email={email} currentAddress={currentAddress}/>
                      <RoomIcon sx={{ml: 0}}/>
                      </>
                    : 
                      <>
                      <Input value={data.address} sx={{width: 400}}/>
                      <AddressUpdate addressData={data.address} addressId={data.addressId} email={email}/>
                      <AddressDelete addressData={data.address} addressId={data.addressId}/>
                      <RoomOutlinedIcon onClick={() => handleCurrentChange(data)} sx={{cursor: "pointer"}}/>
                      </>
                  }
                </Stack>
              ))
            )}
          </Stack>
        </Box>
        </Container>
      </Box>

    );
}