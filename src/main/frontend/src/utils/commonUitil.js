export async function extractDataFromFormData(formData) {
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  return await data;
}

export function addressCodePacker(addressCode, deliveryAddress) {
  const data = [];   
    for(let i = 0; i < addressCode.length; i++) {
      data[i] = {'addressCode': addressCode[i], 'deliveryAddress' : deliveryAddress[i]}
    }
  return data;
}

export const formatPhoneNumber = (phoneNumberValue) => {
const strippedPhoneNumber = phoneNumberValue.replace(/\D/g, '');
//  핸드폰 입력 formatting (e.g., XXX-XXXX-XXXX)
const formattedPhoneNumber = strippedPhoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

return formattedPhoneNumber;
};

export const formatStorePhoneNumber = (phoneNumberValue) => {
const strippedPhoneNumber = phoneNumberValue.replace(/\D/g, '');
//  핸드폰 입력 formatting (e.g., XXX-XXX-XXXX)
const formattedPhoneNumber = strippedPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

return formattedPhoneNumber;
};

export function splitAddressFromCurrentUserAddress(currentAddress) {
  const splitAddress = currentAddress.toString().split(',');
  const roadAddress = (splitAddress[0] || '');
  const extraAddress = (splitAddress[1] || '');
  const detailAddress = (splitAddress[2] || '');

  return { roadAddress: roadAddress, extraAddress: extraAddress, detailAddress: detailAddress };
}

export const generateTimeOptions = (startHour, endHour) => {
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

