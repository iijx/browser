
import Base64 from 'crypto-js/enc-base64';
import Axios, { AxiosResponse } from 'axios';
interface IResponseData<T> {
    success: Boolean,
    data: T,
    msg: string
}
interface IResponse<T> {
    status: number,
    data: IResponseData<T>
}

const Http = Axios.create({
    baseURL: 'https://app.pastecuts.cn',
    timeout: 10000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
})


Http.interceptors.response.use(<T>(res: IResponse<T>) => {
    if (res.status === 200) {
        if (res.data.success) return res.data;
        else return Promise.reject(res.data)
    }
    else return Promise.reject(res)
})


export default Http;
