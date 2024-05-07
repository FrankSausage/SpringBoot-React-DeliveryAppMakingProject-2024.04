import { Button, Dialog, DialogActions, DialogContent, 
  DialogContentText, DialogTitle, Divider, Input, Stack, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { findPostcode } from "../utils/AddressUtil";
import axios from "axios";
import { extractDataFromFormData, splitAddressFromCurrentUserAddress } from "../utils/userInfo";
import { useNavigate, useOutletContext } from "react-router";


export default function AddressUpdate({addressData, email, currentAddress, addressId}) {
    const [open, setOpen] = useState(false);
    const [roadAddress, setRoadAddress] = useState('');
    const [extraAddress, setExtraAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [addressCode, setAddressCode] = useState('');
    const { setOutletAddress }  = useOutletContext();
    const navigate = useNavigate();
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      if(roadAddress || extraAddress || detailAddress) {
        setRoadAddress('')
        setExtraAddress('')
        setDetailAddress('')
      }
      setOpen(false)
    };
    useEffect(() => {
      const loadDaumPostcodeScript = () => {
        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        document.body.appendChild(script);
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
      if(!roadAddress && !extraAddress){
        alert('먼저 주소를 입력해 주세요.')
        return;
      } else {
        const data = new FormData();

        setFormData(data)
          .then(res => {
            extractDataFromFormData(res)
              .then(resFormData => {
                axios.post(`dp/address/modify`, resFormData)
                  .catch(() => {
                  alert('주소 수정 전송에 실패 하였습니다.')
                  navigate('/')
                  });
                if(!currentAddress) {
                  setOutletAddress(resFormData.address);
                  localStorage.setItem('address', resFormData.address)
                  localStorage.setItem('splitAddress', JSON.stringify(splitAddressFromCurrentUserAddress(resFormData.address)))
                }
              })
          })
          .then(() => {
            alert('주소 수정이 완료되었습니다.')
            navigate('/')
          })
          .catch(() => {
            alert('주소 수정에 실패 하였습니다.')
            navigate('/')
          })
      }
    }

    const setFormData = async (data) => {
      try{
        data.append('addressId', addressId);
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
        <Fragment>
          <Button sx={{border: 1, mx: 1}} onClick={handleOpen}>
            수정
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            component='form'
            onSubmit={handleSubmit}
          >
            <DialogTitle id="alert-dialog-title">
              <Typography variant="h5" sx={{textAlign: 'center'}}>주소 수정</Typography>
              
            </DialogTitle>
            <Divider />
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography sx={{mb: 2}} variant="h6">현재 주소: {addressData}</Typography>
            </DialogContentText>
              <Stack>
                <Input 
                type="text"
                placeholder="새 주소 입력" 
                value={roadAddress + extraAddress} 
                sx={{width: 400, margin: 'auto'}} 
                required
                />
                {roadAddress && extraAddress && 
                  <Input
                  type="text" 
                  placeholder="상세 주소" 
                  value={detailAddress}
                  onChange={e => setDetailAddress(e.target.value)}
                  sx={{width: 200, margin: 'auto'}}
                  />
                }
              </Stack>
              <Stack>
                <Button sx={{margin: 'auto', border: 1, mt: 1}} onClick={handleFindPostcode}>주소 검색</Button>
              </Stack>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Stack direction={'row'}>
                <Button onClick={handleClose} sx={{margin: 'auto'}}>닫기</Button>
                <Button type='submit' sx={{margin: 'auto'}} autoFocus>
                    수정
                </Button>
              </Stack>
            </DialogActions>
          </Dialog>
        </Fragment>
    );
}