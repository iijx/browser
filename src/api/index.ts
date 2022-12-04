import { PinModel, WebItem } from "@/interface";
import Http from "@/lib/request";
import { useGuard } from "@authing/guard-vue3";
import authing from "./login";
import Store from "@/store";


const Methods = {
    FIND_ALL: 'FIND_ALL',
    FIND_ALL_BY: 'FIND_ALL_BY',
    FIND_BY_IDS: 'FIND_BY_IDS',
    FIND_ONE_BY: 'FIND_ONE_BY',
    FIND_ONE_BY_ID: 'FIND_ONE_BY_ID',
    FIND_BY_PAGE: 'FIND_BY_PAGE',
    ADD: 'ADD',
    UPDATE: 'UPDATE',
    UPDATE_BY: 'UPDATE_BY',
    UPDATE_BY_DOCID: 'UPDATE_BY_DOCID',
    DELETE: 'DELETE',

    // user 模块特别方法
    LOGIN_BY_AUTHING_ID: 'LOGIN_BY_AUTHING_ID',
    USER_ADD_PIN: 'USER_ADD_PIN',

    // WebItem 模块特别方法
    WEB_ITEM_ADD_AUTO: 'ADD_AUTO',
}

const Api = {
    guard: useGuard(),
    Methods,
    Http,
    req<T>(model: string, method: string, params: any = {}):Promise<T> {
        const opt = { model, method, params };
        console.log(`will req ${model}_${method}`)
        return Http.post<T>('/pastecuts', opt).then(res => res.data);
    },
    tryCheckLogin() {
        const userStore = Store.userStore();
        const appStore = Store.appStore();
        if (!userStore._id) {
            appStore.setIsShowLoginDialog(true);
            return false;
        } else return true;
        // try {
        //     const state = await authing.getLoginState();
        //     if (!state) {
        //         await authing.loginWithRedirect();
        //         return false;
        //     }
        //     return true;
        // } catch (error) {
        //     await authing.loginWithRedirect();
        //     return false;
        // }
    },
    apiBizhiReq<T>():Promise<T> {
        return Http.get<T>('/api/bizhi').then(res => res.data);
    },
    appBrowserReq<T>(model: string, method: string, params: any = {}):Promise<T> {
        return Http.post<T>('/api/appBrowser',{
            model,
            method,
            params
        }).then(res => res.data);
    },

    apiLoginByAuthIdReq<T>(authingId: string):Promise<T> {
        return Api.appBrowserReq('user', Api.Methods.LOGIN_BY_AUTHING_ID, { authingId });
    },

    // 获取 pin
    getPins() {
        // return Api.appBrowserReq('pin', Api.Methods.FIND_ALL);
        // return Api.appBrowserReq('user', Api.Methods.FIND_ALL);
    },
    // 添加 pin
    addPin(pin: PinModel) {
        if (!this.tryCheckLogin()) return Promise.reject();
        // return Api.appBrowserReq('pin', Api.Methods.ADD, pin);
        const userStore = Store.userStore();
        const newPins = [...userStore.pins, pin];
        return Api.appBrowserReq('user', Api.Methods.UPDATE_BY_DOCID, {
            docId: userStore._id,
            updateData: {
                pins: JSON.stringify(newPins)
            }
        });
    },
    // 更新 pin
    updatePin() {
        if (!this.tryCheckLogin()) return;
        return Api.appBrowserReq('pin', Api.Methods.UPDATE);
    },
    // 删除 pin
    deletePin() {
        if (!this.tryCheckLogin()) return;
        return Api.appBrowserReq('pin', Api.Methods.DELETE);
    },

    // 获取 web_item
    getWebItems() {
        return Api.appBrowserReq('web_item', Api.Methods.FIND_ALL);
    },
    // 添加 web_item
    addWebItem(webItem: WebItem) {
        if (!this.tryCheckLogin()) return Promise.reject();
        // return Api.appBrowserReq('web_item', Api.Methods.ADD);
        return Api.appBrowserReq('web_item', Api.Methods.WEB_ITEM_ADD_AUTO, webItem);
    },
    // 更新 web_item
    updateWebItem() {
        if (!this.tryCheckLogin()) return;
        return Api.appBrowserReq('web_item', Api.Methods.UPDATE);
    },
    // 删除 web_item
    deleteWebItem() {
        if (!this.tryCheckLogin()) return;
        return Api.appBrowserReq('web_item', Api.Methods.DELETE);
    }
}

export default Api;
