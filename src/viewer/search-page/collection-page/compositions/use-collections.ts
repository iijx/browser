import Api from "@/api/index";
import { WebItem } from "@/interface";
import Store from '@/store/index';

import { useStorage } from '@vueuse/core';
import { Ref } from "vue";

export const useCollections = () => {

    const appStore = Store.appStore();
    const userStore = Store.userStore();
    const collections: Ref<WebItem[]> = useStorage('collections', [] as WebItem[]);

    const renderCollections = computed(() => {
        if (!appStore.curPinId || appStore.curPinId === 'DEFAULT_PIN_UUID') return collections.value;
        else return collections.value.filter(item => item.pinId === appStore.curPinId);
    });
    // 获取
    Api.getWebItems().then((res: any) => {
        console.log("[http] WebItem res", res);
        collections.value = res;
    });

    // 添加
    const add = (_webItem: WebItem) => {
        const webItem = new WebItem(_webItem);
        if (appStore.curPinId && appStore.curPinId !== 'DEFAULT_PIN_UUID') webItem.pinId = appStore.curPinId;
        webItem.uid = userStore._id || '';

        // collections.value.push(webItem);
        return Api.addWebItem(webItem).then((res: any) => {
            console.log("[http] addWebItem res", res);
            collections.value.push(res);
        })
    };

    // 更新
    const update = (webItem: WebItem) => {
        const idx = collections.value.findIndex(item => item.url === webItem.url);
        collections.value[idx] = webItem;
        Api.req('browser_home', 'UPDATE_COLLECTION', webItem);
    };

    return { renderCollections, add, update };
}