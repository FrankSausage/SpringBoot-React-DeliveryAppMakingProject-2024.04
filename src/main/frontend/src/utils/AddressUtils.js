export const findPostcode = (setRoadAddress, setExtraAddress) => {

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
        // if (data.buildingName !== '' && data.apartment === 'Y') {
        //   jibunRoadAddr += (jibunRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        // }
        if (jibunRoadAddr !== '') {
          jibunRoadAddr = ' (' + jibunRoadAddr + ')';
        }
        setJibunAddress(jibunRoadAddr);
        setExtraAddress(data.bname); 
        setAddressCode(data.bcode);
      }
    }).open();
  } else {
    console.error('Daum 우편번호 API 스크립트가 로드되지 않았습니다.');
  }
};

