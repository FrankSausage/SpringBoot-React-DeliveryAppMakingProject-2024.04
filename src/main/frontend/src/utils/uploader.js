export function uploadImageToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET); // 클라우드니어리 업로드 프리셋

  return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
    method: 'POST',
    body: formData,
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to upload image to Cloudinary');
    }
    return response.json();
  })
  .then(data => data.url) // 업로드된 이미지의 URL 반환
  .catch(error => {
    console.error('Upload image to Cloudinary error:', error);
    throw error;
  });
}
