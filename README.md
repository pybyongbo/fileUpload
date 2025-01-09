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

### 文件上传

流程:

1. 客户端将文件数据发送给服务器
2. 服务器接收到文件数据后,将文件数据保存到磁盘上
3. 服务器返回文件上传成功,响应给客户端一个文件访问地址
4. 客户端根据文件访问地址,获取文件数据,并展示在页面上

> 测试地址: http://101.132.72.36:5100/api/upload
> 键的名称(表单域名称):"imagefile"

请求方法: POST

请求的表单格式: multipart/form-data

请求体中必须包含一个键值对,键的名称是服务器要求的名称,值是文件数据

> HTML5 中,JS 仍然无法随意的获取文件数据,但是可以获取到 input 元素中,被用户选中的文件数据
> 可以利用 HTML5 提供的 FormData 对象,将文件数据封装到 FormData 对象中,再通过 XMLHttpRequest 对象发送给服务器
