import Api from "@/api";

export enum DialogType {
    ADD,
    EDIT,
}

export const useDialog = () => {
    const isShow = ref(false)
    const type = ref(DialogType.ADD);

    const show = (_type: DialogType) => {
        if (Api.tryCheckLogin()) {
            type.value = _type;
            isShow.value = true;
        }
    }
    const hide = () => {
        isShow.value = false;
    }
    return { isShow, show, hide, type };
}
