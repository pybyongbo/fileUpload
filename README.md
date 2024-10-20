# file-uploads (文件上传,前端基础) (前后端主要流程)

### 文件上传常见的三种方式

- multipart/form-data
- base64
- 二进制文件流

### 注意事项

项目本地运行起来需要再`server`根目录下面建立一个`uploads`文件夹,存储上传的文件.

否则会报错.

### 文件目录说明

- client 前端界面
- server 后端接口

```
// 普通文件上传 单文件上传  (multipart/form-data)
接口API地址:'http://localhost:8080/file'

headers: {
      'Content-Type': 'multipart/form-data',
},
```

```
// base64 格式文件上传
接口API地址:'http://localhost:8080/base64'

```

```
// 二进制格式文件上传
接口API地址:'http://localhost:8080/binary'
 headers: {
    'Content-Type': 'application/octet-stream',
    'x-ext': file.name.split('.')[1],
 },
```
