import { PinModel } from "@/interface";
import Http from "@/lib/request";
import authing from "./login";

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
}

const Api = {
    Methods,
    Http,
    req<T>(model: string, method: string, params: any = {}):Promise<T> {
        const opt = { model, method, params };
        console.log(`will req ${model}_${method}`)
        return Http.post<T>('/pastecuts', opt).then(res => res.data);
    },
    async tryCheckLogin() {
        try {
            const state = await authing.getLoginState();
            if (!state) {
                await authing.loginWithRedirect();
                return false;
            }
            return true;
        } catch (error) {
            await authing.loginWithRedirect();
            return false;
        }
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

    // 获取 pin
    getPins() {
        return Api.appBrowserReq('pin', Api.Methods.FIND_ALL);
    },
    // 添加 pin
    addPin(pin: PinModel) {
        if (!this.tryCheckLogin()) return Promise.reject();
        return Api.appBrowserReq('pin', Api.Methods.ADD, pin);
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
    addWebItem() {
        if (!this.tryCheckLogin()) return;
        return Api.appBrowserReq('web_item', Api.Methods.ADD);
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
