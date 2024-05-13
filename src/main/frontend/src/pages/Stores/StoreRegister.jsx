import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container, FormControl, InputLabel, Select, Input, MenuItem, ListItemText } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { findPostcode } from '../../utils/AddressUtil';
import { getCurrentUser } from '../../utils/firebase';
import { extractDataFromFormData, formatPhoneNumber } from '../../utils/storeInfo';
import axios from 'axios';
import Ownerheader from '../../components/OwnerHeader';

const defaultTheme = createTheme();

export default function StoreRegister() {
  const { email } = getCurrentUser();
  const [roadAddress, setRoadAddress] = useState('');
  const [extraAddress, setExtraAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addressCode, setAddressCode] = useState('');
  const [minDeliveryPrice, setMinDeliveryPrice] = useState('');
  const [deliveryTip, setDeliveryTip] = useState('');
  const [content, setContent] = useState('');
  const [storePictureName, setStorePictureName] = useState('');
  const [minDeliveryTime, setMinDeliveryTime] = useState('');
  const [maxDeliveryTime, setMaxDeliveryTime] = useState('');
  const [operationHours, setOperationHours] = useState('');
  const [closedDays, setClosedDays] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [openHours, setOpenHours] = useState('');
  const [closeHours, setCloseHours] = useState('');

  const navigate = useNavigate();
  // const [userInfo, setUserInfo] = useState({email: '', password: '', })
  // const [storeInfo, setStoreInfo] = useState({deliveryAddress: '', closedDays: '',}) // 나중에 이런식으로 이팩토리 할것 이유 업데이트 할때 정보 받기 편해지기 위해서
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
              axios.post(`/dp/store/owner/register`, resFormData)
            })
            .then(() => {
              alert('입점 신청이 완료되었습니다.');
              navigate('/');
            })
        })
        .catch(console.error);
    }
  };

  const handlePhoneNumberChange = (event) => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value);
    setPhoneNumber(formattedPhoneNumber);
  };

  const setFormData = async (data) => {
    try {
      data.append('address', ((roadAddress ? roadAddress : '') + ',' + (extraAddress ? extraAddress : '')
        + ',' + (detailAddress ? detailAddress : '')));
      data.append('email', email);
      data.append('addressCode', addressCode.substring(0, 8));
      data.append('category', category);
      data.append('type', type);
      data.append('operationHours', `${openHours}~${closeHours}`);
      data.append('closedDays', selectedDays.join(','));
      return await data;
    }
    catch (error) {
      console.error('setFormData Error!: ', error);
      return null;
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

  const [selectedDays, setSelectedDays] = useState([]);

  const generateTimeOptions = (startHour, endHour) => {
    const options = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        options.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return options;
  };

  const timeOptionsOpen = generateTimeOptions(5, 18);
  const timeOptionsClose = generateTimeOptions(15, 24).concat(generateTimeOptions(0, 7));




  return (
    <ThemeProvider theme={defaultTheme}>
      <Ownerheader />
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
            <Link to="/OwnerMain" style={{ textDecoration: 'none', color: 'black' }}>휴먼 딜리버리</Link>
          </Typography>
          <Typography component="h1" variant="h5">
            온라인 입점 신청서
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
                  placeholder='ex) 휴먼 딜리버리'
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="전화번호"
                  placeholder='ex) 031-123-4567'
                  name="phone"
                  autoComplete="phone"
                  value={phoneNumber}
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
                      label="한식"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={category === '중식'} onChange={() => setCategory('중식')} color="primary" />}
                      label="중식"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={category === '일식'} onChange={() => setCategory('일식')} color="primary" />}
                      label="일식"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={category === '양식'} onChange={() => setCategory('양식')} color="primary" />}
                      label="양식"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={category === '패스트'} onChange={() => setCategory('패스트')} color="primary" />}
                      label="패스트"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={category === '치킨'} onChange={() => setCategory('치킨')} color="primary" />}
                      label="치킨"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={category === '분식'} onChange={() => setCategory('분식')} color="primary" />}
                      label="분식"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={category === '디저트'} onChange={() => setCategory('디저트')} color="primary" />}
                      label="디저트"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="roadAddress"
                  name="roadAddress"
                  label="도로명 주소"
                  value={roadAddress}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Button
                type="button"
                onClick={handleFindPostcode}
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2, ml: 2 }}
              >
                주소 찾기
              </Button>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="extraAddress"
                  name="extraAddress"
                  label="참고항목"
                  value={extraAddress}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="detailAddress"
                  label="상세주소"
                  name="detailAddress"
                  autoComplete="detailAddress"
                  onChange={e => setDetailAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>배달, 포장</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox checked={type === 0} onChange={() => setType(0)} color="primary" />}
                      label="배달"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={type === 1} onChange={() => setType(1)} color="primary" />}
                      label="배달+포장"
                    />
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
                  label="최소 주문금액"
                  placeholder='ex) 10000'
                  onChange={e => setMinDeliveryPrice(e.target.value)}
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
                  placeholder='ex) 2000'
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
                  placeholder='10'
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
                  placeholder='50'
                  onChange={e => setMaxDeliveryTime(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth required>
                  <InputLabel id="openHours-label">오픈 시간</InputLabel>
                  <Select
                    labelId="openHours-label"
                    id="openHours"
                    value={openHours}
                    onChange={e => setOpenHours(e.target.value)}
                  >
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
                  <Select
                    labelId="closeHours-label"
                    id="closeHours"
                    value={closeHours}
                    onChange={e => setCloseHours(e.target.value)}
                  >
                    {timeOptionsClose.map(time => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                  placeholder='ex) 원천동, 우만동'
                  onChange={e => setDeliveryAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="content"
                  fullWidth
                  id="content"
                  label="가게 소개글"
                  placeholder='ex) 안녕하세요. 고객을 위해 빠른 배달을 하는 휴먼 딜리버리입니다.'
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
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="개인정보 수집 및 이용에 동의합니다"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontSize: '1.1rem' }}>
              입점 신청하기
            </Button>
          </Box>
        </Box>
        <Footer sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
