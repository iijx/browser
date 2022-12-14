import Api from "@/api/index";
import { DialogType, PinModel } from "@/interface";
import Store from '@/store/index';
import { Message } from '@arco-design/web-vue';

export const useDialog = () => {
    const appStore = Store.appStore();
    const userStore = Store.userStore();
    
    const tagDialog = reactive({
        show: false,
        type: DialogType.ADD, // 'ADD' | 'EDIT',
        item: new PinModel({}),
        pinIndex: -1,
    })

    const showDialog = (type: DialogType, item?: PinModel) => {
        tagDialog.show = true;
        tagDialog.type = type;
        if (type === DialogType.ADD) {
            tagDialog.item = new PinModel({});
        } else if (type === DialogType.EDIT) {
            tagDialog.item = PinModel.build(item as PinModel);
        }
    }

    // 完成
    const complete = ({ name = '', color = '' }) => {
        if (tagDialog.type === DialogType.ADD) {
            const pin = new PinModel({name, color});
            Api.addPin(pin).then(res => {
                userStore.pins.push(pin);
                Message.success('添加成功');
            });
        } else {
            // appStore.updatePin(tagDialog.item._id, name, color);
        }
        tagDialog.show = false;
    }

    return { tagDialog, complete, showDialog };
}