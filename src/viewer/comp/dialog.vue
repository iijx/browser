<template>
    <input type="checkbox" class="modal-toggle" :checked="props.show">
    <div class="modal cursor-pointer" @click="emits('close')">
        <div class="modal-box">
            <h3 class="font-bold text-lg">Congratulations random Internet user!</h3>
            <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
            <div class="modal-action">
            <label for="my-modal" class="btn">Yay!</label>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// import { PinModel } from '@/interface';
enum DialogType {
    ADD,
    EDIT,
}

const props = defineProps({
    show: Boolean,
    type: { type: Number, default: 1 },
})
const emits = defineEmits(['complete', 'close'])
const curTitle = computed(() => `${props.type === DialogType.ADD ? '创建新文件夹' : '更新资料'}`);
const info = reactive({
    name: props.item?.name || '',
    color: props.item?.color || '#000'
})
const create = () => emits('complete', { name: info.name, color: info.color });
const colors = ['#000', '#8e8e93', '#c7c7cc', '#017Aff', '#59adc4', '#27cd41', '#5856d6', '#af52de', '#ff2c55', '#ff3b30', '#ff9502', '#ffcc00'];
const iconCloseClick = () => emits('close');
</script>

<style scoped>

</style>
    