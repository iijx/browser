
import { PinModel } from "@/interface";
import Store from '@/store/index';
import { Ref, watch } from "vue";

interface IOpt {
    collapsed: Ref<boolean>
}
export const usePin = (opt: IOpt) => {
    const appStore = Store.appStore();
    const userStore = Store.userStore();

    const renderPins = computed(() => {
        return [new PinModel({name: '主页', color: '#838778', uuid: "DEFAULT_PIN_UUID"})].concat(userStore.pins);
    })

    watch(() => renderPins.value, () => {
        if (!appStore.curPinId && renderPins.value.length > 0) {
            appStore.setPinUuid(renderPins.value[0].uuid);
        }
    })

    const pinClick = (pinUuid: string) => {
        if (appStore.curPinId === pinUuid) return;
        else appStore.setPinUuid(pinUuid);
    }

    const deletePin = (index: number) => {
        userStore.pins.splice(index, 1);
    }

  return { renderPins, pinClick, deletePin };
}