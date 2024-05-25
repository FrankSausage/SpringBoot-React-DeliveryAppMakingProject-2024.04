import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container, FormControl, InputLabel, Select, Input, MenuItem, ListItemText } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { findDeliverPostCode, findPostcodeWithOutBCode } from '../../utils/AddressUtil';
import { extractDataFromFormData, formatStorePhoneNumber, addressCodePacker, generateTimeOptions } from '../../utils/commonUitil';
import { useStore } from './Hook/useStore';
import SearchHeader from '../../components/SearchHeader';
import { uploadImageToCloudinary } from '../../utils/uploader';

const defaultTheme = createTheme({
  palette: { primary: { main: '#1976d2' }, secondary: { main: '#dc004e' } },
  typography: { fontFamily: 'Roboto, sans-serif', h5: { fontWeight: 600 } },
});

const styles = {
  container: { marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', },
  paper: { marginTop: 8, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)', borderRadius: '10px' },
  form: { width: '100%', marginTop: 3 },
  submit: { marginTop: 3, marginBottom: 2, fontSize: '1.1rem' },
  textField: { backgroundColor: 'white' }
};

export default function StoreRegister() {
  const email = localStorage.getItem('email')
  const { postStoreRegister } = useStore();
  const [roadAddress, setRoadAddress] = useState('');
  const [extraAddress, setExtraAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState([]);
  const [type, setType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addressCode, setAddressCode] = useState('');
  const [minDeliveryPrice, setMinDeliveryPrice] = useState('');
  const [deliveryTip, setDeliveryTip] = useState('');
  const [content, setContent] = useState('');
  const [storePictureName, setStorePictureName] = useState('');
  const [storePictureUrl, setStorePictureUrl] = useState('');  // 업로드된 이미지 URL을 저장할 상태 추가
  const [minDeliveryTime, setMinDeliveryTime] = useState('');
  const [maxDeliveryTime, setMaxDeliveryTime] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [openHours, setOpenHours] = useState('');
  const [closeHours, setCloseHours] = useState('');
  const [jibun, setJibunAddress] = useState('')
  const timeOptionsOpen = generateTimeOptions(5, 18);
  const timeOptionsClose = generateTimeOptions(15, 24).concat(generateTimeOptions(0, 7));
  const navigate = useNavigate();

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

  const handleFindDeliverPostCode = () => {
    findDeliverPostCode(setJibunAddress, setDeliveryAddress, setAddressCode);
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
              resFormData.addressCodes = addressCodePacker(addressCode.split(','), deliveryAddress.split(','));
              console.log(resFormData)
              postStoreRegister.mutate(resFormData, {
                onSuccess: () => navigate('/'),
                onError: e => console.error('가게 등록 실패: ' + e)
              })
            })
        });
    }
  }

  const handlePhoneNumberChange = (event) => {
    const formattedPhoneNumber = formatStorePhoneNumber(event.target.value);
    setPhoneNumber(formattedPhoneNumber);
  };

  const setFormData = async (data) => {
    try {
      data.append('address', ((roadAddress ? roadAddress : '') + ',' + (extraAddress ? extraAddress : '')
        + ',' + (detailAddress ? detailAddress : '')));
      data.append('email', email);
      data.append('category', category);
      data.append('type', type);
      data.append('operationHours', `${openHours}~${closeHours}`);
      data.append('closedDays', selectedDays.join(','));
      data.append('storePictureName', storePictureUrl + ', ' +  storePictureName);
      return await data;
    }
    catch (error) {
      console.error('setFormData Error!: ', error);
      return null;
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name;
      setStorePictureName(fileName);
      try {
        const url = await uploadImageToCloudinary(file); // 클라우드니어리에 이미지 업로드
        setStorePictureUrl(url); // 업로드된 이미지 URL 저장
      } catch (error) {
        console.error('Failed to upload image to Cloudinary:', error);
      }
    }
  };

  const weekDays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  // const holidays = ["공휴일", "공휴일 다음날", "공휴일 전날"];

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    const isChecked = event.target.checked;

    // 체크된 상태인지 확인하여 카테고리 배열을 업데이트합니다.
    if (isChecked) {
      setCategory([...category, selectedCategory]); // 기존 배열에 추가
    } else {
      setCategory(category.filter(cat => cat !== selectedCategory)); // 해당 카테고리를 배열에서 제거
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <SearchHeader />
      <div style={{ backgroundImage: 'url(/img/kitchenO.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', padding: '23px 0', backgroundBlendMode: 'lighten', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
        <div style={{ width: '100%', maxWidth: '900px', display: 'flex', justifyContent: 'center' }}>
          <Container component="main" maxWidth="xs" style={{ backgroundColor: '#ffffffd9', padding: '20px', borderRadius: '8px' }}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
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
                      <TextField required fullWidth autoComplete="given-name" name="name" id="name" value={name} label="가게 이름" placeholder='ex) 휴먼 딜리버리' onChange={e => setName(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField required fullWidth id="phone" label="전화번호" placeholder='ex) 031-123-4567' name="phone" autoComplete="phone" value={phoneNumber} onChange={handlePhoneNumberChange} inputProps={{ maxLength: 12, inputMode: 'numeric' }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        카테고리
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          {['한식', '중식', '일식', '양식', '패스트', '치킨', '분식', '디저트'].map((cat) => (
                            <FormControlLabel
                              key={cat}
                              control={<Checkbox checked={category.includes(cat)} onChange={handleCategoryChange} value={cat} color="primary" />}
                              label={cat}
                            />
                          ))}
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
                      <TextField required fullWidth id="detailAddress" label="상세주소" name="detailAddress" autoComplete="detailAddress" onChange={e => setDetailAddress(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>포장 여부</Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <FormControlLabel control={<Checkbox checked={type === 0} onChange={() => setType(0)} color="primary" />} label="배달" />
                          <FormControlLabel control={<Checkbox checked={type === 1} onChange={() => setType(1)} color="primary" />} label="배달+포장" />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField autoComplete="given-name" name="minDeliveryPrice" required fullWidth id="minDeliveryPrice" label="최소 주문금액" placeholder='ex) 10000' onChange={e => setMinDeliveryPrice(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField autoComplete="given-name" name="deliveryTip" required fullWidth id="deliveryTip" label="배달팁" placeholder='ex) 2000' value={deliveryTip} onChange={e => setDeliveryTip(e.target.value)} />
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
                        <Select labelId="openHours-label" id="openHours" value={openHours} onChange={e => setOpenHours(e.target.value)}>
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
                      <FormControl fullWidth required>
                        <InputLabel id="closedDays-label">휴무일</InputLabel>
                        <Select labelId="closedDays-label" id="closedDays" multiple value={selectedDays} onChange={e => setSelectedDays(e.target.value)} input={<Input />} renderValue={(selected) => selected.join(', ')} >
                          {weekDays.map(day => (
                            <MenuItem key={day} value={day}>
                              <Checkbox checked={selectedDays.indexOf(day) > -1} />
                              <ListItemText primary={day} />
                            </MenuItem>
                          ))}
                          {/* {holidays.map(holiday => (
                      <MenuItem key={holiday} value={holiday}>
                        <Checkbox checked={selectedDays.indexOf(holiday) > -1} />
                        <ListItemText primary={holiday} />
                      </MenuItem>
                    ))} */}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField autoComplete="given-name" required fullWidth id="jibun" value={deliveryAddress ? deliveryAddress : jibun} label="배달 지역" placeholder='ex) 원천동, 우만동' onChange={e => setJibunAddress(e.target.value)} InputProps={{ readOnly: true }} />
                    </Grid>
                    <Button type="button" onClick={handleFindDeliverPostCode} fullWidth variant="contained" sx={{ mt: 1, mb: 2, ml: 2 }}>
                      배달 지역 찾기
                    </Button>
                    <Grid item xs={12}>
                      <TextField autoComplete="given-name" name="content" fullWidth id="content" label="가게 소개글 + 원산지"
                        placeholder='ex) 안녕하세요. 고객을 위해 빠른 배달을 하는 휴먼 딜리버리입니다.'
                        multiline rows={4} variant='outlined' onChange={e => setContent(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        가게 사진 업로드
                      </Typography>
                      <input accept=".png, .jpeg, .jpg" id="upload-photo" type="file" style={{ display: 'none' }} onChange={handleFileUpload} multiple />
                      <TextField autoComplete="given-name" name="storePictureName" value={storePictureName} fullWidth id="storePictureName" label="가게 사진" onClick={() => document.getElementById('upload-photo').click()} InputProps={{ readOnly: true }} sx={{ mb: 2 }} />
                      <Button type="button" variant="contained" onClick={() => document.getElementById('upload-photo').click()} fullWidth>
                        사진 올리기
                      </Button>
                      {storePictureName && (
                        <Typography variant="body1" gutterBottom>
                          업로드된 파일: {storePictureName}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />} label="개인정보 수집 및 이용에 동의합니다" />
                    </Grid>
                  </Grid>
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, fontSize: '1.1rem' }}>
                    입점 신청하기
                  </Button>
                </Box>
              </Box>
              <Footer sx={{ mt: 5 }} />
            </Container>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
}
