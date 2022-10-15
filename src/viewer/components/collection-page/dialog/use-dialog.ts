
export enum DialogType {
    ADD,
    EDIT,
}

export const useDialog = () => {
    const isShow = ref(false)
    const type = ref(DialogType.ADD);
    const show = (_type: DialogType) => {
        type.value = _type;
        isShow.value = true;
    }
    const hide = (e: MouseEvent) => {
        isShow.value = false;
    }
    return { isShow, show, hide, type };
}
