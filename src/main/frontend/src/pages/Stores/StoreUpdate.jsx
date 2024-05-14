import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, 
  Typography, Container, ListItemText, FormControl, InputLabel, Select, Input, MenuItem } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../../components/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { findPostcode } from '../../utils/AddressUtil';
import { useOwnerByEmail } from '../../utils/storeInfo';
import { extractDataFromFormData, formatStorePhoneNumber, splitAddressFromCurrentUserAddress } from '../../utils/commonUitil';
import axios from 'axios';
import SearchHeader from '../../components/SearchHeader';

const defaultTheme = createTheme();

export default function StoreRegister() {
  const email = localStorage.getItem('email');
  const { storeId } = useParams();
  const { isLoading, error, store } = useOwnerByEmail(email, storeId);
  const [roadAddress, setRoadAddress] = useState('');
  const [extraAddress, setExtraAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [addressCode, setAddressCode] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [phone, setPhone] = useState('');
  const [minDeliveryPrice, setMinDeliveryPrice] = useState('');
  const [deliveryTip, setDeliveryTip] = useState('');
  const [content, setContent] = useState('');
  const [storePictureName, setStorePictureName] = useState('');
  const [minDeliveryTime, setMinDeliveryTime] = useState('');
  const [maxDeliveryTime, setMaxDeliveryTime] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [operationHours, setOperationHours] = useState('');
  const [closedDays, setClosedDays] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const navigate = useNavigate();

  console.log(store)

  useEffect(() => {
    const loadDaumPostcodeScript = () => {
      const script = document.createElement('script');
      script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        // console.log('Daum 우편번호 API 스크립트가 로드되었습니다.');
      };
    };

    loadDaumPostcodeScript();

    return () => {
    };
  }, []);

  useEffect(() => {
    if (store) {
      const { roadAddress, extraAddress, detailAddress } = splitAddressFromCurrentUserAddress(store.address)
      setRoadAddress(roadAddress)
      setExtraAddress(extraAddress)
      setDetailAddress(detailAddress)
      setCategory(store.category)
      setClosedDays(store.closedDays)
      setContent(store.content)
      setDeliveryTip(store.deliveryTip)
      setMaxDeliveryTime(store.maxDeliveryTime)
      setMinDeliveryPrice(store.minDeliveryPrice)
      setMinDeliveryTime(store.minDeliveryTime)
      setName(store.name)
      setOperationHours(store.operationHours)
      setPhone(store.phone)
      setDeliveryAddress(store.deliveryAddress)
      setStorePictureName(store.storePictureName)
      setType(store.type)
      
    }
  }, [isLoading])

  const handleFindPostcode = () => {
    findPostcode(setRoadAddress, setExtraAddress, setAddressCode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (email) {
      data.append('email', email);
    }

    if (!data.get('name') || !data.get('phone')) {
      alert('필수 항목을 입력하세요.');
      return;
    }


    const formData = await setFormData(data);
    extractDataFromFormData(formData)
      .then(resFormData => {
        axios.post(`/dp/store/owner/update`, resFormData)
        console.log(resFormData)
      }
      
      );

    alert('가게 수정이 완료되었습니다.');
    navigate(`/OwnerMain`);

  };

  const handlePhoneNumberChange = (event) => {
    const formattedPhoneNumber = formatStorePhoneNumber(event.target.value);
    setPhone(formattedPhoneNumber);
  };

  const setFormData = async (data) => {
    try {
      data.append('email', email);
      data.append('storeId', storeId);
      data.append('name', name);
      data.append('category', category);
      data.append('type', type);
      data.append('minDeliveryPrice', minDeliveryPrice);
      // data.append('address', ((updateRoadAddress ? updateRoadAddress : '') + ',' + (updateExtraAddress ? updateExtraAddress : '')
      //   + ',' + (updateDetailAddress ? updateDetailAddress : '')));
      data.append('addressCode', addressCode.substring(0, 8));
      data.append('deliveryTip', deliveryTip);
      data.append('minDeliveryTime', minDeliveryTime);
      data.append('maxDeliveryTime', maxDeliveryTime);
      data.append('operationHours', operationHours);
      data.append('minDeliveryTime', minDeliveryTime);
      data.append('closedDays', closedDays);
      // data.append('deliveryAddress', deliveryAddress);
      data.append('content', content);
      return await data;
    }
    catch (error) {
      console.error('setFormData Error!: ', error);
      return ('setFormData Error!: ', error);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const fileNames = files.map(file => file.name);
      setStorePictureName(fileNames);
    }
  };

  const weekDays = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];
  const holidays = ["공휴일", "공휴일 다음날", "공휴일 전날"];

  

  const generateTimeOptions = (startHour, endHour) => {
    const options = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour < endHour || (hour === endHour && minute < 30)) { // 24:00과 24:30 제외
          const formattedHour = (hour === 24 ? '23' : hour).toString().padStart(2, '0');
          const formattedMinute = (hour === endHour && minute === 0) ? '59' : minute.toString().padStart(2, '0'); // 24:00 대신 23:59 추가
          options.push(`${formattedHour}:${formattedMinute}`);
        }
      }
    }
    return options;
  };

  const timeOptionsOpen = generateTimeOptions(5, 18);
  const timeOptionsClose = generateTimeOptions(15, 24).concat(generateTimeOptions(0, 7));

  return (
    <ThemeProvider theme={defaultTheme}>
      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography>에러 발생!</Typography>}
      {store &&

        <>
          <SearchHeader />
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>휴먼 딜리버리</Link>
              </Typography>
              <Typography component="h1" variant="h5">
                가게 정보 수정
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      autoComplete="given-name"
                      name="name"
                      id="name"
                      value={name}
                      label="가게 이름"
                      onChange={e => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="phone"
                      label="전화번호"
                      name="phone"
                      autoComplete="phone"
                      value={phone}
                      onChange={handlePhoneNumberChange}
                      inputProps={{
                        maxLength: 12,
                        inputMode: 'numeric',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      카테고리
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={<Checkbox checked={category === '한식'} onChange={() => setCategory('한식')} color="primary" />}
                          label="한식" />
                        <FormControlLabel
                          control={<Checkbox checked={category === '중식'} onChange={() => setCategory('중식')} color="primary" />}
                          label="중식" />
                        <FormControlLabel
                          control={<Checkbox checked={category === '일식'} onChange={() => setCategory('일식')} color="primary" />}
                          label="일식" />
                        <FormControlLabel
                          control={<Checkbox checked={category === '양식'} onChange={() => setCategory('양식')} color="primary" />}
                          label="양식" />
                        <FormControlLabel
                          control={<Checkbox checked={category === '패스트'} onChange={() => setCategory('패스트')} color="primary" />}
                          label="패스트" />
                        <FormControlLabel
                          control={<Checkbox checked={category === '치킨'} onChange={() => setCategory('치킨')} color="primary" />}
                          label="치킨" />
                        <FormControlLabel
                          control={<Checkbox checked={category === '분식'} onChange={() => setCategory('분식')} color="primary" />}
                          label="분식" />
                        <FormControlLabel
                          control={<Checkbox checked={category === '디저트'} onChange={() => setCategory('디저트')} color="primary" />}
                          label="디저트" />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="roadAddress"
                      label="도로명 주소"
                      value={roadAddress} 
                      />
                  </Grid>
                  <Button type="button" onClick={handleFindPostcode} fullWidth variant="contained" sx={{ mt: 1, mb: 2, ml: 2 }} >주소 찾기 </Button>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="extraAddress"
                      label="참고항목"
                      value={extraAddress} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="detailAddress"
                      label="상세주소"
                      name="detailAddress"
                      autoComplete="detailAddress"
                      value={detailAddress}
                      onChange={e => setDetailAddress(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>배달, 포장</Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={<Checkbox checked={type === 0} onChange={() => setType(0)} color="primary" />}
                          label="배달" />
                        <FormControlLabel
                          control={<Checkbox checked={type === 1} onChange={() => setType(1)} color="primary" />}
                          label="배달+포장" />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="minDeliveryPrice"
                      required
                      fullWidth
                      id="minDeliveryPrice"
                      value={minDeliveryPrice}
                      label="최소 주문금액"
                      onChange={e => setMinDeliveryPrice(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="deliveryTip"
                      required
                      fullWidth
                      id="deliveryTip"
                      label="배달팁"
                      value={deliveryTip}
                      onChange={e => setDeliveryTip(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="minDeliveryTime"
                      required
                      fullWidth
                      id="minDeliveryTime"
                      value={minDeliveryTime}
                      label="최소 배달 예상 시간"
                      onChange={e => setMinDeliveryTime(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="maxDeliveryTime"
                      required
                      fullWidth
                      id="maxDeliveryTime"
                      value={maxDeliveryTime}
                      label="최대 배달 예상 시간"
                      onChange={e => setMaxDeliveryTime(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="operationHours"
                      required
                      fullWidth
                      id="operationHours"
                      value={operationHours}
                      label="운영 시간"
                      onChange={e => setOperationHours(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel id="closedDays-label">휴무일</InputLabel>
                      <Select
                        labelId="closedDays-label"
                        id="closedDays"
                        multiple
                        value={selectedDays}
                        onChange={e => setSelectedDays(e.target.value)}
                        input={<Input />}
                        renderValue={(selected) => selected.join(', ')}
                      >
                        {weekDays.map(day => (
                          <MenuItem key={day} value={day}>
                            <Checkbox checked={selectedDays.indexOf(day) > -1} />
                            <ListItemText primary={day} />
                          </MenuItem>
                        ))}
                        {holidays.map(holiday => (
                          <MenuItem key={holiday} value={holiday}>
                            <Checkbox checked={selectedDays.indexOf(holiday) > -1} />
                            <ListItemText primary={holiday} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="deliveryAddress"
                      required
                      fullWidth
                      id="deliveryAddress"
                      value={deliveryAddress}
                      label="배달 지역"
                      onChange={e => setDeliveryAddress(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="content"
                      value={content}
                      fullWidth
                      id="content"
                      label="가게 소개글"
                      multiline
                      rows={4}
                      variant='outlined'
                      onChange={e => setContent(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      가게 사진
                    </Typography>
                    <input
                      accept=".png, .jpeg, .jpg"
                      id="upload-photo"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleFileUpload} multiple
                    />

                    <TextField
                      autoComplete="given-name"
                      name="storePictureName"
                      value={storePictureName}
                      fullWidth
                      id="storePictureName"
                      label="가게 사진"
                      autoFocus
                      onClick={(e) => {
                        e.target.value = null;
                      }}
                    />
                    {/* 아이콘 대신에 "사진 올리기" 텍스트를 사용하고 싶다면 아래 주석 처리된 라인을 사용하세요 */}
                    {/* <span>사진 올리기</span> */}

                    <Button
                      type="button"
                      variant="contained"
                      onClick={() => document.getElementById('upload-photo').click()}
                      sx={{ mt: 3, mb: 2, }}>
                      사진 올리기
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />} label="개인정보 수집 및 이용에 동의합니다" />
                  </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>수정하기</Button>
              </Box>
            </Box>
            <Footer sx={{ mt: 5 }} />
          </Container>
        </>
      }
    </ThemeProvider>
  );
}
