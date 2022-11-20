
// /**
//  * 这个文件走的是 api 网关，但是现在不用了，，api网关也删了，
//  * 因为 云函数可以直接 http 访问
//  * 所以 该文件不再使用，代码暂时保留，，，后续统一用 request.ts 
//  */
// import { MD5, HmacSHA1, enc} from 'crypto-js';
// import Base64 from 'crypto-js/enc-base64';
// import Axios, { AxiosResponse } from 'axios';
// interface IResponseData<T> {
//     success: Boolean,
//     data: T,
//     msg: string
// }
// interface IResponse<T> {
//     status: number,
//     data: IResponseData<T>
// }
// const apiAppKey = 'APIDj1xL1pHRnc1LpiO2d06980tze9faJc3L84us'
// const apiAppSecret = 'wKgoei5lFle2C2nwkxOISe9H3qqA91ntap4BJ88'

// const http = Axios.create({
//     baseURL: 'https://app.pastecuts.cn',
//     timeout: 10000,
//     headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//     }
// })

// http.interceptors.request.use((request: any) => {
//     const md5 = MD5(JSON.stringify(request.data)).toString(enc.Hex)
//     const contentMD5 = window.btoa(String.fromCharCode(...new TextEncoder().encode(md5)));
//     const dateTime = new Date().toUTCString();
//     const signingStr = [`x-date: ${dateTime}`, request.method.toUpperCase(), request.headers.Accept, request.headers['Content-Type'],contentMD5, request.url].join('\n');
//     const signing = Base64.stringify(HmacSHA1(signingStr, apiAppSecret));
//     const sign = `hmac id="${apiAppKey}", algorithm="hmac-sha1", headers="x-date", signature="${signing}"`;
//     request.headers['Content-MD5'] = contentMD5;
//     request.headers['x-date'] = dateTime;
//     request.headers['Authorization'] = sign;
//     return request;
// })

// http.interceptors.response.use(<T>(res: IResponse<T>) => {
    
//     if (res.status === 200) {
//         if (res.data.success) return res.data;
//         else return Promise.reject(res.data)
//     }
//     else return Promise.reject(res)
// })

// const Api = {
//     req<T>(model: string, method: string, params: any = {}):Promise<T> {
//         const opt = { model, method, params };
//         console.log(`will req ${model}_${method}`)
//         return http.post<T>('/pastecuts', opt).then(res => res.data);
//     },
//     pluginTranslate: function <T>(text: string, Source = 'en', Target = 'zh') {
//         return http.post<T>('/plugin_translate', {SourceText: text, Source, Target}).then(res => res.data)
//     },
//     // upload: (_path: string, pathname: string) => {
//     //     return new Promise((resolve, reject) => {
//     //         cos.putObject({
//     //             Bucket: 'pastecuts-1257702679', /* 必须 */
//     //             Region: 'ap-guangzhou',    /* 必须 */
//     //             Key: pathname,  /* 必须 */
//     //             StorageClass: 'STANDARD',
//     //             Body: createReadStream(_path), // 上传文件对象
//     //             onProgress: function(progressData: any) {
//     //                 // console.log('onProgress', JSON.stringify(progressData));
//     //             }
//     //         }, function(err: any, data: any) {
//     //             console.log('upload res', err, data);
//     //             if (err) reject(err);
//     //             else resolve(`http://cdn.pastecuts.com${pathname}`);
//     //         });
//     //     })
//     // }
// }
// export default Api;
