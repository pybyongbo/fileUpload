import axios from 'axios';
const oFile = document.querySelector('#file');

const oUploadBtn = document.querySelector('#uploadBtn');

const oimgAddress = document.querySelector('#imgAddress');

const oTestBtn = document.querySelector('#testBtn');

oUploadBtn.addEventListener(
  'click',
  () => {
    //1. multipart/form-data upload
    // const file = oFile.files[0];
    // const formData = new FormData();
    // formData.append('file', file);
    // axios
    //   .post('http://localhost:3000/file', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //   .then((res) => {
    //     const {
    //       data: { hostName, filePath },
    //     } = res.data;
    //     alert('上传成功');
    //     oimgAddress.innerHTML = `<a href=${
    //       hostName + filePath
    //     } target="_blank">${hostName + filePath}</a>`;
    //   });
    // 2. base64 upload
    // const file = oFile.files[0];
    // const reader = new FileReader();
    // const ext = file.name.split('.')[1];
    // reader.onload = (e) => {
    //   console.log(e.target.result);
    //   const uint8Array = new Uint8Array(e.target.result);
    //   const str = uint8Array.reduce((prev, byte) => {
    //     return prev + String.fromCharCode(byte);
    //   }, '');
    //   const base64Data = btoa(str);
    //   // console.log('str', base64Data);
    //   axios
    //     .post('http://localhost:3000/base64', {
    //       ext,
    //       file: base64Data,
    //       originalname: file.name,
    //     })
    //     .then((res) => {
    //       alert('上传成功');
    //       // console.log(res.data);
    //       oimgAddress.innerHTML = `<a href=${res.data.filePath} target="_blank">${res.data.filePath}</a>`;
    //     });
    // };
    // reader.readAsArrayBuffer(file);
    // 3. 二进制上传
    const file = oFile.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryData = reader.result;
      console.log(111, file.name);
      axios
        .post('http://localhost:3000/binary', binaryData, {
          headers: {
            'Content-Type': 'application/octet-stream',
            'x-ext': file.name.split('.')[1],
            'file-name': file.name,
          },
          // responseType: 'arraybuffer', // 注意此处的 responseType
        })
        .then((res) => {
          console.log(res);
          const {
            data: { filePath },
          } = res.data;
          alert('上传成功');
          // console.log(res.data);
          oimgAddress.innerHTML = `<a href=${filePath} target="_blank">${filePath}</a>`;
        });
    };
    reader.readAsArrayBuffer(file);
  },
  false
);

oTestBtn.addEventListener('click', () => {
  //test 1.直接使用 blob 上传
  // const json = { hello: 'world', test: 'test1' };
  // const blob = new Blob([JSON.stringify(json, null, 2)], {
  //   type: 'application/json',
  // });
  // const form = new FormData();
  // form.append('file', blob, '1.json');
  // axios.post('http://localhost:3000/file', form).then((res) => {
  //   console.log(res.data);
  // });

  // test 2.使用 File 对象，再进行一次包装
  // const json = { hello: 'world', test: 'test2' };
  // const blob = new Blob([JSON.stringify(json, null, 2)], {
  //   type: 'application/json',
  // });
  // const file = new File([blob], '1.json');
  // const form = new FormData();
  // form.append('file', file);
  // axios.post('http://localhost:3000/file', form);

  // test3 Array Buffer
  // 这里需要注意的是 new Blob([typedArray.buffer], {type: 'xxx'})，
  // 第一个参数是由一个数组包裹。里面是 typedArray 类型的 buffer。
  // const bufferArrary = [
  //   137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0,
  //   0, 0, 1, 1, 3, 0, 0, 0, 37, 219, 86, 202, 0, 0, 0, 6, 80, 76, 84, 69, 0, 0,
  //   255, 128, 128, 128, 76, 108, 191, 213, 0, 0, 0, 9, 112, 72, 89, 115, 0, 0,
  //   14, 196, 0, 0, 14, 196, 1, 149, 43, 14, 27, 0, 0, 0, 10, 73, 68, 65, 84, 8,
  //   153, 99, 96, 0, 0, 0, 2, 0, 1, 244, 113, 100, 166, 0, 0, 0, 0, 73, 69, 78,
  //   68, 174, 66, 96, 130,
  // ];
  // const array = Uint8Array.from(bufferArrary);
  // const blob = new Blob([array], { type: 'image/png' });
  // const form = new FormData();
  // form.append('file', blob, '1.png');
  // axios.post('http://localhost:3000/file', form);

  // test4 base64
  const base64 =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABlBMVEUAAP+AgIBMbL/VAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAACklEQVQImWNgAAAAAgAB9HFkpgAAAABJRU5ErkJggg==';
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const array = Uint8Array.from(byteNumbers);
  const blob = new Blob([array], { type: 'image/png' });
  const form = new FormData();
  form.append('file', blob, '1.png');
  axios.post('http://localhost:3000/file', form);
});

// function _arrayBufferToBase64(buffer) {
//   var binary = '';
//   var bytes = new Uint8Array(buffer);
//   var len = bytes.byteLength;
//   for (var i = 0; i < len; i++) {
//     binary += String.fromCharCode(bytes[i]);
//   }
//   return window.btoa(binary);
// }
