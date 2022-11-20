import Http from "@/lib/request";

const Methods = {
    FIND_ALL: 'FIND_ALL',
}

const Api = {
    Methods,
    Http,
    req<T>(model: string, method: string, params: any = {}):Promise<T> {
        const opt = { model, method, params };
        console.log(`will req ${model}_${method}`)
        return Http.post<T>('/pastecuts', opt).then(res => res.data);
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
    getWebItems() {
        return Api.appBrowserReq('web_item', Api.Methods.FIND_ALL);
    },
    getPins() {
        return Api.appBrowserReq('pin', Api.Methods.FIND_ALL);
    }

}

export default Api;
