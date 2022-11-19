import { Ref } from "vue";

interface IOpt {
    collapsed: Ref<boolean>
}
export const usePop = (opt: IOpt) => {
    const popInfo = reactive({ show: false, top: '', left: '', pinIndex: -1 })

    const showPop = (e: MouseEvent, index: number) => {
        popInfo.show = true;
        if (!opt.collapsed.value) return false; // 折叠下双击无效，不用处理
        popInfo.show = true;
        popInfo.left = `${e.clientX}px`;
        popInfo.top = `${e.clientY}px`;
        popInfo.pinIndex = index;
        return false;
    }

    // 编辑
    const pinRightClick = (e: MouseEvent, index: number) => {
        if (!opt.collapsed.value) return false; // 折叠下双击无效，不用处理
        popInfo.show = true;
        popInfo.left = `${e.clientX}px`;
        popInfo.top = `${e.clientY}px`;
        popInfo.pinIndex = index;
        return false;
    }

    onMounted(() => {
        document.addEventListener('click', () => popInfo.show = false)
    });

    return { popInfo, showPop, pinRightClick };
}