import axios from 'axios';
const oFile = document.querySelector('#file');

const oUploadBtn = document.querySelector('#uploadBtn');

oUploadBtn.addEventListener(
  'click',
  () => {
    // multipart/form-data upload
    // const file = oFile.files[0];
    // const formData = new FormData();
    // formData.append('file', file);
    // axios
    //   .post('http://localhost:8080/file', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     alert('上传成功');
    //   });
  },
  false
);
