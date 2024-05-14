export async function extractDataFromFormData(formData) {
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  return await data;
}

export const formatPhoneNumber = (phoneNumberValue) => {
const strippedPhoneNumber = phoneNumberValue.replace(/\D/g, '');
//  핸드폰 입력 formatting (e.g., XXX-XXXX-XXXX)
const formattedPhoneNumber = strippedPhoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

return formattedPhoneNumber;
};

export const formatStorePhoneNumber = (phoneNumberValue) => {
const strippedPhoneNumber = phoneNumberValue.replace(/\D/g, '');
//  핸드폰 입력 formatting (e.g., XXX-XXXX-XXXX)
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