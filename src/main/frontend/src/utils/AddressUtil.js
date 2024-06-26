export const findPostcode = (setRoadAddress, setExtraAddress, setAddressCode) => {

  if (window.daum && window.daum.Postcode) {
    new window.daum.Postcode({
      oncomplete: (data) => {
        setRoadAddress(data.roadAddress);
        let extraRoadAddr = '';
        if (data.bname !== '' && /[동|로|가|읍|면|리]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        if (extraRoadAddr !== '') {
          extraRoadAddr = ' (' + extraRoadAddr + ')';
        }
        setExtraAddress(extraRoadAddr);
        setAddressCode(data.bcode);
      }
    }).open();
  } else {
    console.error('Daum 우편번호 API 스크립트가 로드되지 않았습니다.');
  }
};

export const findPostcodeWithOutBCode = (setRoadAddress, setExtraAddress) => {

  if (window.daum && window.daum.Postcode) {
    new window.daum.Postcode({
      oncomplete: (data) => {
        setRoadAddress(data.roadAddress);
        let extraRoadAddr = '';
        if (data.bname !== '' && /[동|로|가|읍|면|리]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        if (extraRoadAddr !== '') {
          extraRoadAddr = ' (' + extraRoadAddr + ')';
        }
        setExtraAddress(extraRoadAddr);
      }
    }).open();
  } else {
    console.error('Daum 우편번호 API 스크립트가 로드되지 않았습니다.');
  }
};

export const findDeliverPostCode = (setJibunAddress, setExtraAddress, setAddressCode) => {

  if (window.daum && window.daum.Postcode) {
    new window.daum.Postcode({
      oncomplete: (data) => {
        let jibunRoadAddr = '';
        if (data.bname !== '' && /[동|로|가|읍|면|리]$/g.test(data.bname)) {
          jibunRoadAddr += data.bname;
        }
        if (jibunRoadAddr !== '') {
          jibunRoadAddr = ' (' + jibunRoadAddr + ')';
        }
        setJibunAddress(prev => {
          if (prev)
            return prev + ',' + jibunRoadAddr;
          return jibunRoadAddr});
        setExtraAddress(prev => {
          if (prev)
            return prev + ',' + data.bname;
          return data.bname}); 
        setAddressCode(prev => {
          if (prev)
            return prev + ',' + data.bcode.substring(0, 8);
          return data.bcode.substring(0, 8)});
      }
    }).open();
  } else {
    console.error('Daum 우편번호 API 스크립트가 로드되지 않았습니다.');
  }
};

export const findUpdatePostCode = (setJibunAddress, setAddressCode, setDeliveryAddress) => {
  if (window.daum && window.daum.Postcode) {
    new window.daum.Postcode({
      oncomplete: (data) => {
        let jibunRoadAddr = '';
        if (data.bname !== '' && /[동|로|가|읍|면|리]$/g.test(data.bname)) {
          jibunRoadAddr += data.bname;
        }
        if (jibunRoadAddr !== '') {
          jibunRoadAddr = ' (' + jibunRoadAddr + ')';
        }
        setJibunAddress(prev => {
          if (prev)
            return prev + ',' + jibunRoadAddr;
          return jibunRoadAddr});
          setDeliveryAddress(prev => {
          if (prev)
            return prev + ',' + data.bname;
          return data.bname}); 
        setAddressCode(prev => {
          if (prev)
            return prev + ',' + data.bcode.substring(0, 8);
          return data.bcode.substring(0, 8)});
      }
    }).open();
  } else {
    console.error('Daum 우편번호 API 스크립트가 로드되지 않았습니다.');
  }
};



