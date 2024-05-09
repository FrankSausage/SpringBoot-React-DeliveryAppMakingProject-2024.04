import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Avatar, Box, Button,Divider, Grid, Input, Stack,  Typography, } from "@mui/material";
import RoomIcon from '@mui/icons-material/Room';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import MailSharpIcon from '@mui/icons-material/MailSharp';
import { findPostcode } from "../../../utils/AddressUtil";
import { extractDataFromFormData, splitAddressFromCurrentUserAddress, useAddressListByEmail } from "../../../utils/userInfo";
import { getCurrentUser } from "../../../utils/firebase";
import axios from "axios";
import AddressUpdate from "../AddressUpdate";
import AddressDelete from "../AddressDelete";


export default function Address() {
    const { email } = getCurrentUser();
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
      axios.post(`/dp/address/change`, {...addressData, ['email'] : email})
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

    return(
      <Box sx={{  marginTop: 8,
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  width: '100%',
                  }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main',
                    alignSelf: 'center' }}>
          <MailSharpIcon />
        </Avatar>
        <Stack sx={{ maxWidth:'500px', width:'100%', 
                    textAlign: 'center', marginLeft: '85px' }}>
          {isLoading && <Typography>로딩 중..</Typography>}
          {error && <Typography>에러 발생!</Typography>}
          {address && 
          <Box>
            <Grid container>
              <Stack component='form' onSubmit={handleSubmit} sx={{my: 3}}>
                <Grid item sx={{mb: 3}}>
                  <Typography variant="h5" sx={{marginLeft: '-60px'}}> 주소 목록 </Typography>
                  <Stack direction={"row"}  sx={{my: 4}}>
                    <Input type="text" 
                    value={roadAddress + extraAddress} 
                    name='cuAddress'
                    id='cuAddress'
                    sx={{width: 400}} 
                    placeholder="주소를 입력하세요..." 
                    required
                    />
                    <Button sx={{border: 1, mx: 1}} onClick={handleFindPostcode}> 검색 </Button>
                  </Stack>
                  <Stack direction={"row"}  sx={{my: 4}}>
                    <Input type="text" value={detailAddress} 
                    onChange={e => setDetailAddress(e.target.value)} sx={{width: 400}} 
                    placeholder="상세 주소"/>
                  </Stack>
                </Grid>
                <Grid item sx={{marginLeft: '-60px', mb: 3}}>
                    { !roadAddress && <Button disabled sx={{fontSize: '1.2rem', height: '3rem'}}>추가</Button> }
                    { roadAddress && <Button sx={{border: 0, mx: 1, fontSize: '1.2rem', height: '3rem'}} type="submit" variant="contained" >주소 추가</Button> }
                </Grid>
              </Stack>
            </Grid>
          </Box>
          }
          <Divider sx={{my: 5}} />
          {address && (
            address.map((data, idx) => (
              <Stack key={idx} direction={"row"} sx={{my: 3}}>
                {
                  data.address===currentAddress ? 
                    <>
                    <Input value={data.address} sx={{width: 400}}/>  
                    <AddressUpdate addressData={data.address} addressId={data.addressId} 
                      email={email} currentAddress={currentAddress}/>
                    <RoomIcon sx={{ml: 10}}/>
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
    );
}