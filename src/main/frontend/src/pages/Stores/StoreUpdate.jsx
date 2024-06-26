import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container, FormControl, InputLabel, Select, Input, MenuItem, ListItemText, Paper } from '@mui/material';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../../components/Footer';
import { useOwnerByEmail } from '../../utils/storeInfo';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { findUpdatePostCode, findPostcodeWithOutBCode } from '../../utils/AddressUtil';
import { extractDataFromFormData, formatStorePhoneNumber, addressCodePacker, generateTimeOptions, splitAddressFromCurrentUserAddress } from '../../utils/commonUitil';
import { useStore } from './Hook/useStore';
import SearchHeader from '../../components/SearchHeader';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { uploadImageToCloudinary } from '../../utils/uploader';
import BackDrop from '../../components/BackDrop';

const defaultTheme = createTheme({
  palette: { primary: { main: '#1976d2' }, secondary: { main: '#dc004e' } },
  typography: { fontFamily: 'Roboto, sans-serif', h5: { fontWeight: 600 } },
});

export default function StoreUpdate() {
  const email = localStorage.getItem('email')
  const queryClient = useQueryClient();
  const { storeId } = useParams();
  const { isLoading, error, store } = useOwnerByEmail(email, storeId);
  const { postStoreUpdate } = useStore();
  const [roadAddress, setRoadAddress] = useState('');
  const [extraAddress, setExtraAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState([]);
  const [type, setType] = useState('');
  const [phone, setPhone] = useState('');
  const [closedDays, setClosedDays] = useState([]);
  const [addressCode, setAddressCode] = useState('');
  const [minDeliveryPrice, setMinDeliveryPrice] = useState('');
  const [deliveryTip, setDeliveryTip] = useState('');
  const [content, setContent] = useState('');
  const [storePictureName, setStorePictureName] = useState('');
  const [storePictureUrl, setStorePictureUrl] = useState('');  // 업로드된 이미지 URL을 저장할 상태 추가
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [minDeliveryTime, setMinDeliveryTime] = useState('');
  const [maxDeliveryTime, setMaxDeliveryTime] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState([]);
  const [usePreviousData, setUsePreviousData] = useState(true);
  const [selectedDays, setSelectedDays] = useState([]);
  const [firstDeliveryAddress, setFirstDeliveryAddress] = useState('')
  const [firstAddressCode, setFirstAddressCode] = useState('')
  const [openHours, setOpenHours] = useState('');
  const [closeHours, setCloseHours] = useState('');
  const [jibun, setJibunAddress] = useState([]);
  const timeOptionsOpen = generateTimeOptions(5, 18);
  const timeOptionsClose = generateTimeOptions(15, 24).concat(generateTimeOptions(0, 7));
  const weekDays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  // const holidays = ["공휴일", "공휴일 다음날", "공휴일 전날"];
  const navigate = useNavigate();
  console.log(store)
  useEffect(() => {
    const loadDaumPostcodeScript = () => {
      const script = document.createElement('script');
      script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
      };
    };

    loadDaumPostcodeScript();

    return () => {
    };
  }, []);

  const handleFindPostcode = () => {
    findPostcodeWithOutBCode(setRoadAddress, setExtraAddress);
  };

  const handleFindDeliverPostCode = async () => {
    try {
      if (!usePreviousData) {
        await findUpdatePostCode(
          setJibunAddress,
          setAddressCode,
          setDeliveryAddress
        );
      }
    } catch (error) {
      console.error('배달지역 찾기 오류:', error);
    }
  };

  const handleUsePreviousDataChange = () => {
    setUsePreviousData(prev => !prev);

    if (usePreviousData) {
      setDeliveryAddress(''); // 새로운 데이터 입력 시 이전 데이터 초기화
      setJibunAddress(''); // 주소 초기화
      setAddressCode('');
    } else {
      setDeliveryAddress(firstDeliveryAddress)
      setAddressCode(firstAddressCode)
    }
  };

  useEffect(() => {
    if (store && store.addressCodes) {
      const { roadAddress, extraAddress, detailAddress } = splitAddressFromCurrentUserAddress(store.address)
      setRoadAddress(roadAddress); setExtraAddress(extraAddress); setExtraAddress(extractExtraAddress(store.address)); setCategory(store.category);
      setSelectedDays(store.closedDays ? store.closedDays : []); setClosedDays(store.closedDays ? store.closedDays : []); setContent(store.content); setDeliveryTip(store.deliveryTip); setMaxDeliveryTime(store.maxDeliveryTime);
      setMinDeliveryPrice(store.minDeliveryPrice); setMinDeliveryTime(store.minDeliveryTime); setName(store.name); setOpenHours(store.openHours); setCloseHours(store.closeHours);
      setPhone(store.phone); setStorePictureName(store.storePictureName); setType(store.type);
      setDeliveryAddress(store.addressCodes.map(res => res.deliveryAddress));
      setAddressCode(store.addressCodes.map(res => res.addressCode));
      setFirstDeliveryAddress(store.addressCodes.map(res => res.deliveryAddress));
      setFirstAddressCode(store.addressCodes.map(res => res.addressCode));
      const addressArray = store.address.split(',');
      const lastPartOfAddress = addressArray[addressArray.length - 1].trim();
      setDetailAddress(lastPartOfAddress);
      if (store.operationHours) {
        const { open, close } = splitOperationHours(store.operationHours);
        setOpenHours(open);
        setCloseHours(close);
      }
      if (store && store.closedDays) {
        const selectedDays = store.closedDays.split(',').map(day => day.trim());
        setSelectedDays(selectedDays);
      }
      if (store && store.addressCodes) {
        const addresses = store.addressCodes.map(res => res.deliveryAddress);
        setDeliveryAddress(addresses);
      }
    }
  }, [isLoading])

  const extractExtraAddress = (address) => {
    const regex = /\((.*?)\)/;
    const match = regex.exec(address);
    return match ? match[1] : '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    extractDataFromFormData(data).then(res => console.log(res))
    if (!data.get('name') || !data.get('phone')) {
      alert('필수 항목을 입력하세요.');
      return;
    } else {
      setFormData(data)
        .then(res => {
          extractDataFromFormData(res)
            .then(resFormData => {
              resFormData.addressCodes =
                addressCodePacker(typeof (addressCode) === 'string' ? addressCode.split(',') : addressCode,
                  typeof (deliveryAddress) === 'string' ? deliveryAddress.split(',') : deliveryAddress);

              postStoreUpdate.mutate(resFormData, {
                onSuccess: () => {
                  queryClient.refetchQueries(['storeId']);
                  // alert('가게 수정이 완료 되었습니다.')
                  navigate('/');
                },
                onError: e => console.error('가게 수정 실패: ' + e)
              })
            })
        });
    }
  }

  const handlePhoneNumberChange = (event) => {
    const formattedPhoneNumber = formatStorePhoneNumber(event.target.value);
    setPhone(formattedPhoneNumber);
  };

  const setFormData = async (data) => {
    try {
      data.append('address', ((roadAddress ? roadAddress : '') + ',' + (extraAddress ? extraAddress : '')
        + ',' + (detailAddress ? detailAddress : '')));
      data.append('email', email);
      data.append('storeId', storeId);
      data.append('category', category);
      data.append('type', type);
      data.append('operationHours', `${openHours}~${closeHours}`);
      data.append('closedDays', selectedDays.join(','));
      data.append('storePictureName', storePictureUrl ? storePictureUrl : storePictureName)
      console.log(storePictureUrl)
      return await data;
    }
    catch (error) {
      console.error('setFormData Error!: ', error);
      return null;
    }
  };


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name;
      setIsFileUploading(true);
      setStorePictureName(fileName);
      uploadImageToCloudinary(file) // 클라우드니어리에 이미지 업로드
        .then((url) => {
          setStorePictureUrl(url); // 업로드된 이미지 URL 저장
        })
        .then(() => setIsFileUploading(false)
        )
        .catch((error) => {
          console.error('Failed to upload image to Cloudinary:', error);
        });
    }
  };


  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(prevCategory => {
      if (Array.isArray(prevCategory)) {
        if (prevCategory.includes(selectedCategory)) {
          return prevCategory.filter(cat => cat !== selectedCategory);
        } else {
          return [...prevCategory, selectedCategory];
        }
      } else {
        console.error('Category state is not an array.');
        return [];
      }
    });
  };

  const splitOperationHours = (operationHours) => {
    const [open, close] = operationHours.split('~').map(str => str.trim());
    return { open, close };
  };

  const handleClosedDaysChange = (event) => {
    setSelectedDays(event.target.value);
  };

  const handleStoreDelete = () => {
    const confirmDelete = window.confirm('정말로 가게를 삭제하시겠습니까?');
    if (confirmDelete) {
      axios.post(`/dp/store/owner/delete`, { storeId: storeId, email: email })
        .then(response => {
          alert('가게가 삭제되었습니다.');
          navigate(`/`);
        })
        .catch(error => {
          console.error('가게 삭제 중 에러 발생:', error);
          alert('가게 삭제 중 에러가 발생했습니다.');
        });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {isLoading && <BackDrop isLoading={isLoading} />}
      {error && <Typography>에러 발생!</Typography>}
      {store && store.addressCodes &&
        <>
          <SearchHeader />
          <Paper sx={Paperstyle}>
            <div style={{ width: '100%', maxWidth: '900px', display: 'flex', justifyContent: 'center' }}>
              <Container component="main" maxWidth="xs" style={{ backgroundColor: '#ffffffd9', padding: '20px', borderRadius: '8px'}}>
                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      <ContentPasteGoIcon />
                    </Avatar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      <Link to="/OwnerMain" style={{ textDecoration: 'none', color: 'black' }}>HOME</Link>
                    </Typography>
                    <Typography component="h1" variant="h5">
                      가게 정보 수정
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField required fullWidth autoComplete="given-name" name="name" id="name" value={name} label="가게 이름" placeholder='ex) 휴먼 딜리버리' onChange={e => setName(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField required fullWidth id="phone" label="전화번호" placeholder='ex) 031-123-4567' name="phone" autoComplete="phone" value={phone} onChange={handlePhoneNumberChange} inputProps={{ maxLength: 12, inputMode: 'numeric' }} />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h6" gutterBottom>
                            카테고리
                          </Typography>
                          <Grid container spacing={3}>
                            <Grid item xs={12}>
                              {['한식', '중식', '일식', '양식', '패스트', '치킨', '분식', '디저트'].map((cat) => (
                                <FormControlLabel key={cat} control={<Checkbox checked={category.includes(cat)}
                                  onChange={handleCategoryChange} value={cat} color="primary" />} label={cat} />))}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField required fullWidth id="roadAddress" name="roadAddress" label="도로명 주소" value={roadAddress} InputProps={{ readOnly: true }} />
                        </Grid>
                        <Button type="button" onClick={handleFindPostcode} fullWidth variant="contained" sx={{ mt: 1, mb: 2, ml: 2 }} >
                          주소 찾기
                        </Button>
                        <Grid item xs={12}>
                          <TextField required fullWidth id="extraAddress" name="extraAddress" label="참고항목" value={extraAddress} InputProps={{ readOnly: true }} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField required fullWidth id="detailAddress" label="상세주소" value={detailAddress} name="detailAddress" autoComplete="detailAddress" onChange={e => setDetailAddress(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h6" gutterBottom>배달, 포장</Typography>
                          <Grid container spacing={3}>
                            <Grid item xs={12}>
                              <FormControlLabel
                                control={<Checkbox checked={type === 0} onChange={() => setType(0)} color="primary" />} label="배달" />
                              <FormControlLabel
                                control={<Checkbox checked={type === 1} onChange={() => setType(1)} color="primary" />} label="배달+포장" />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            autoComplete="given-name" name="minDeliveryPrice" required fullWidth id="minDeliveryPrice" value={minDeliveryPrice} label="최소 주문금액" placeholder='ex) 10000' onChange={e => setMinDeliveryPrice(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField autoComplete="given-name" name="deliveryTip" fullWidth id="deliveryTip" value={deliveryTip} label="배달 팁" placeholder='ex) 3000' onChange={e => setDeliveryTip(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField autoComplete="given-name" name="minDeliveryTime" required fullWidth id="minDeliveryTime" value={minDeliveryTime} label="최소 배달 예상 시간" placeholder='10' onChange={e => setMinDeliveryTime(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField autoComplete="given-name" name="maxDeliveryTime" required fullWidth id="maxDeliveryTime" value={maxDeliveryTime} label="최대 배달 예상 시간" placeholder='50' onChange={e => setMaxDeliveryTime(e.target.value)} />
                        </Grid>
                        <Grid item xs={6}>
                          <FormControl fullWidth required>
                            <InputLabel id="openHours-label">오픈 시간</InputLabel>
                            <Select labelId="openHours-label" id="openHours" value={openHours} onChange={e => setOpenHours(e.target.value)} >
                              {timeOptionsOpen.map(time => (
                                <MenuItem key={time} value={time}>
                                  {time}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                          <FormControl fullWidth required>
                            <InputLabel id="closeHours-label">종료 시간</InputLabel>
                            <Select labelId="closeHours-label" id="closeHours" value={closeHours} onChange={e => setCloseHours(e.target.value)} >
                              {timeOptionsClose.map(time => (
                                <MenuItem key={time} value={time}>
                                  {time}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <InputLabel id="demo-multiple-checkbox-label">휴무일 선택</InputLabel>
                          <Select labelId="demo-multiple-checkbox-label" id="demo-multiple-checkbox" multiple value={selectedDays} onChange={handleClosedDaysChange} input={<Input />} renderValue={(selected) => selected.join(', ')}>
                            {weekDays.map((day) => (
                              <MenuItem key={day} value={day}>
                                <Checkbox checked={selectedDays.indexOf(day) > -1} />
                                <ListItemText primary={day} />
                              </MenuItem>
                            ))}
                            {/* {holidays.map((holiday) => (
                        <MenuItem key={holiday} value={holiday}>
                          <Checkbox checked={selectedDays.indexOf(holiday) > -1} />
                          <ListItemText primary={holiday} />
                        </MenuItem>
                      ))} */}
                          </Select>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h6" gutterBottom>배달 가능 지역</Typography>
                          <Grid container spacing={3}>
                            <Grid item xs={12}>
                              <TextField fullWidth id="deliveryAddress" name="deliveryAddress" label="배달 가능 지역" value={deliveryAddress ? deliveryAddress : jibun} />
                            </Grid>
                            <Grid item xs={12}>
                              <Grid container spacing={1}>
                                <FormControlLabel control={<Checkbox checked={!usePreviousData} onChange={handleUsePreviousDataChange} color="primary" />} label="새로운 배달 지역 사용" />
                              </Grid>
                            </Grid>
                            <Button type="button" onClick={handleFindDeliverPostCode} fullWidth variant="contained" sx={{ mt: 1, mb: 2, ml: 2 }} disabled={usePreviousData} >
                              배달 지역 찾기
                            </Button>
                            <Grid item xs={12}>
                              <TextField autoComplete="given-name" name="content" fullWidth id="content" value={content} label="가게 소개" multiline rows={4} placeholder='ex) 휴먼 딜리버리에 오신것을 환영합니다.' onChange={e => setContent(e.target.value)} />
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="h6" gutterBottom>
                                가게 사진 업로드
                              </Typography>
                              {storePictureUrl && <img src={storePictureUrl} width={100} height={100} style={{ margin: 30 }} />}
                              <input accept=".png, .jpeg, .jpg" id="upload-photo" type="file" style={{ display: 'none' }} onChange={handleFileUpload} multiple />
                              {/* <TextField autoComplete="given-name" name="storePictureName" value={storePictureName.split(',')[1]} fullWidth id="storePictureName" label="가게 사진" onClick={() => document.getElementById('upload-photo').click()} InputProps={{ readOnly: true }} sx={{ mb: 2 }} /> */}

                              {isFileUploading ?
                                <Button type="button" disabled variant="contained" onClick={() => document.getElementById('upload-photo').click()} fullWidth>
                                  사진 올리기
                                </Button>
                                :
                                <Button type="button" variant="contained" onClick={() => document.getElementById('upload-photo').click()} fullWidth>
                                  사진 올리기
                                </Button>
                              }
                              {storePictureName && (
                                <Typography variant="body1" gutterBottom>
                                  {/* 업로드된 파일: {storePictureName.split(',')[0]} */}
                                </Typography>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={6}>
                          {isFileUploading ?
                            <Button type="submit" fullWidth disabled variant="contained" sx={{ mt: 3, mb: 2 }}>
                              수정
                            </Button>
                            :
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                              수정 </Button> }
                        </Grid>
                        <Grid item xs={6}>
                          <Button fullWidth variant="contained" color="error" onClick={() => handleStoreDelete(email, storeId)} sx={{ mt: 3, mb: 2 }}>
                            삭제하기
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Container>
              </Container>
            </div>
          </Paper>
          <Footer />
        </>
      }
    </ThemeProvider>
  );
}

const Paperstyle = {
  backgroundImage: 'url(/img/kaka.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'center',
  padding: '23px 0',
  backgroundBlendMode: 'lighten',
  backgroundColor: 'rgba(255, 255, 255, 0.2)'
};