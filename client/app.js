import axios from 'axios';
const oFile = document.querySelector('#file');

const oUploadBtn = document.querySelector('#uploadBtn');

oUploadBtn.addEventListener(
  'click',
  () => {
    //1. multipart/form-data upload
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
    // 2.base64 上传

    const file = oFile.files[0];
    const reader = new FileReader();
    const ext = file.name.split('.')[1];
    reader.onload = (e) => {
      console.log(e.target.result);
      const uint8Array = new Uint8Array(e.target.result);
      const str = uint8Array.reduce((prev, byte) => {
        return prev + String.fromCharCode(byte);
      }, '');

      const base64Data = btoa(str);
      // console.log('str', str);

      axios
        .post('http://localhost:8080/base64', {
          ext,
          file: base64Data,
        })
        .then((res) => {
          alert('上传成功');
          console.log(res);
        });
    };

    reader.readAsArrayBuffer(file);
  },
  false
);
