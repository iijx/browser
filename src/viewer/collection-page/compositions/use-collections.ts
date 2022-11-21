import Api from "@/api/index";
import { CollectionWeb } from "@/interface";

import { useStorage } from '@vueuse/core';
import { Ref } from "vue";

export const useCollections = () => {

    const collections: Ref<CollectionWeb[]> = useStorage('collections', [] as CollectionWeb[]);

    // 获取
    Api.getWebItems().then((res: any) => {
        collections.value = res;
    });

    // 添加
    const add = (webItem: CollectionWeb, pinId?: string) => {
        if (pinId) webItem.setPinId(pinId);

        collections.value.push(webItem);
        Api.req('browser_home', 'ADD_COLLECTION', webItem);
    };

    // 更新
    const update = (webItem: CollectionWeb) => {
        const idx = collections.value.findIndex(item => item.url === webItem.url);
        collections.value[idx] = webItem;
        Api.req('browser_home', 'UPDATE_COLLECTION', webItem);
    };

    return { collections, add, update };
}