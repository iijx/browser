import Api from "@/api";
import { PinModel } from "@/interface";
import Http from "@/lib/request";
import Store from '@/store/index';

import { Ref } from "vue";

interface IOpt {
    collapsed: Ref<boolean>
}
export const usePin = (opt: IOpt) => {
    const appStore = Store.appStore();
    const userStore = Store.userStore();

    const renderPins = computed(() => {
        return [new PinModel('主页', '#838778', -1)].concat(userStore.pins);
    })

    const pinClick = (pinId: number) => {
        if (appStore.curPinId === pinId) return;
        else appStore.setPinId(pinId);
    }

    const deletePin = (index: number) => {
        userStore.pins.splice(index, 1);
    }

    // 获取
    Api.getPins().then((res: any) => {
        console.log('res', res);
        // userStore.setPins(res);
    });

  return { renderPins, pinClick, deletePin };
}