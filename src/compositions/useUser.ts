import { Authing } from '@authing/browser'

export default () => {
    const user = ref(null)
    const loading = ref(false)
    const error = ref(null)

    const authingSdk = new Authing({
        domain: 'https://paste.authing.cn',
        appId: '63498aa1da8437597fe8ca7a',
        redirectUri: 'http://localhost:8080',
    });

    const getLoginState = async () => {
        console.log("0");
        try {
            const state = await authingSdk.getLoginState();
            if (!state) {
                authingSdk.loginWithRedirect();
            }
            console.log("2", state);
        } catch (error) {
            console.log("1", error);
            authingSdk.loginWithRedirect()
        }
    }

    if (authingSdk.isRedirectCallback()) {
        console.log('redirect');
  
        /**
         * 以跳转方式打开 Authing 托管的登录页，认证成功后，
         * 需要配合 handleRedirectCallback 方法，在回调端点处理 Authing 发送
         * 的授权码或 token，获取用户登录态
         */
         authingSdk.handleRedirectCallback().then((res) => {
            console.log("res");
        //   this.loginState = res;
        //   window.location.replace('/');
        });
    } else {
        getLoginState();
    }
    
    
    
    return {
        user,
        loading,
        error,
    }

}