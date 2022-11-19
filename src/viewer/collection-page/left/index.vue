<script setup lang="ts">
import { DialogType } from '@/interface';
import PinDialog from './pin-dialog.vue';
import Store from '@/store/index';
import { usePin } from './use-pin';
import { useDialog } from './use-dialog';
import { usePop } from './use-pop';
const appStore = Store.appStore();

const collapsed = ref(false);
// 列表相关
const { renderPins, pinClick, deletePin } = usePin({ collapsed });
// 弹窗相关
const { tagDialog, showDialog, complete } = useDialog({ collapsed});
// pop 相关
const { popInfo, pinRightClick } = usePop({ collapsed });

// 删除按钮 事件
const handleDeletePin = () => {
    deletePin(popInfo.pinIndex);
}
</script>

<template>
    <section class="v-left-wrap" :class="{'w-20': collapsed, 'w-12': !collapsed}" oncontextmenu="return false">
        <section class="v-left pt-12">
            <div @click="collapsed = !collapsed" :class="{'rotate-180': !collapsed}" class="absolute top-0 w-full cursor-pointer py-3 flex justify-center bg-black bg-opacity-0 hover:bg-opacity-5">
                <icon-left theme="outline" size="24" fill="#838778" class="transition-transform" />
            </div>
            <div v-for="(item, index) of renderPins" :key="item.pinId" class="tab-btn" :class="{'selected': appStore.curPinId === item.pinId}" @click="pinClick(item.pinId)" @contextmenu="e => pinRightClick(e, index)">
                <i class="w-2 h-2 rounded-full transition-all" :style="{background: item.color}"></i>
                <!-- <i v-show="!collapsed" class="w-6 h-6 rounded-full" :style="{background: item.color}"></i> -->
                <span v-show="collapsed" class="ml-2 text-sm truncate select-none">{{ item.name }}</span>
            </div>
            <!-- <div class="grow"></div> -->
            <div class="add-btn" @click="showDialog(DialogType.ADD)">
                <icon-plus theme="outline" size="20" fill="#333" :strokeWidth="4" strokeLinecap="square"></icon-plus>
            </div>

            <ul v-show="popInfo.show" class="fixed bg-base-200 w-24 shadow-md rounded-md text-base-content z-50 p-1 leading-4 border border-slate-200" :style="{left: popInfo.left, top: popInfo.top, fontSize: '13px'}">
                <li class="px-3 py-1 rounded hover:bg-primary hover:text-white" @click="showDialog(DialogType.EDIT, renderPins[popInfo.pinIndex])"><a href="javascript:;">编辑</a></li>
                <li class="px-3 py-1 rounded hover:bg-primary hover:text-white" @click="handleDeletePin"><a href="javascript:;">删除</a></li>
            </ul>

            <pin-dialog :show="tagDialog.show" :type="tagDialog.type" :item="tagDialog.item" @complete="complete" @close="tagDialog.show = false" />
        </section>
    </section>
</template>

<style scoped>
.v-left-wrap {
    @apply relative h-full shrink-0;
    @apply transition-all ease-in-out duration-300;
}
.v-left {
    @apply h-full w-full;
    @apply flex flex-col items-center justify-center justify-items-center;
    background-color: rgba(0, 0, 0, .2);
}
.v-left-wrap.w-12 .tab-btn { @apply justify-center; }
.tab-btn {
    @apply w-full flex items-center cursor-pointer bg-white bg-opacity-0 hover:bg-opacity-60;
    @apply px-2 text-sm h-10 mt-1;
    @apply text-cyan-700;
    @apply text-stone-700;
    @apply dark:text-white dark:text-opacity-100;
    @apply transition-all ease-in-out duration-300;
}
.tab-btn.selected {
    /* @apply bg-opacity-5 ; */
    background-color: rgba(255, 255, 255, .15)
    /* @apply bg-primary;
    @apply dark:bg-primary dark:text-white; */
}
.add-btn { 
    @apply absolute inset-x-0 bottom-0;
    @apply h-10 flex justify-center items-center z-10  rounded-none;
    /* @apply bg-black bg-opacity-5; */
    @apply cursor-pointer bg-black bg-opacity-0 hover:bg-opacity-5; 
}
</style>