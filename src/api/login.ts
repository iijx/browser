import { Authing } from '@authing/browser'

console.log(import.meta.env.DEV);
const authing = new Authing({
    domain: 'https://paste.authing.cn',
    appId: '63498aa1da8437597fe8ca7a',
    redirectUri: import.meta.env.DEV ? 'http://localhost:8080' : 'https://home.pastecuts.cn',
});

if (authing.isRedirectCallback()) {
    console.log('redirect 1');
    /**
     * 以跳转方式打开 Authing 托管的登录页，认证成功后，
     * 需要配合 handleRedirectCallback 方法，在回调端点处理 Authing 发送
     * 的授权码或 token，获取用户登录态
     */
    authing.handleRedirectCallback().then((res) => {
        console.log("redirect res", res);
    });
}

export default authing;
