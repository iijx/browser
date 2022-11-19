import { DialogType, PinModel } from "@/interface";
import Store from '@/store/index';

import { Ref } from "vue";

interface IOpt {
    collapsed: Ref<boolean>
}
export const useDialog = (opt: IOpt) => {
    const appStore = Store.appStore();
    const userStore = Store.userStore();
    
    const tagDialog = reactive({
        show: false,
        type: DialogType.ADD, // 'ADD' | 'EDIT',
        item: new PinModel('', ''),
        pinIndex: -1,
    })

    const showDialog = (type: DialogType, item?: PinModel) => {
        tagDialog.show = true;
        tagDialog.type = type;
        if (type === DialogType.ADD) {
            tagDialog.item = new PinModel('', '');
        } else if (type === DialogType.EDIT) {
            tagDialog.item = PinModel.build(item as PinModel);
            console.log('tagDialog', tagDialog)
        }
    }

    // 完成
    const complete = ({ name = '', color = '' }) => {
        if (tagDialog.type === DialogType.ADD) {
            const pin = new PinModel(name, color);
            userStore.addPins(pin);
        } else {
            userStore.updatePin(tagDialog.item.pinId, name, color);
        }
        tagDialog.show = false;
    }

    return { tagDialog, complete, showDialog };
}