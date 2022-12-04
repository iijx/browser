<template>
    <input type="checkbox" class="modal-toggle" :checked="props.show">
    <div class="modal cursor-pointer">
        <main class="modal-box relative text-base-content" style="max-width: 24rem;" @click.stop.prevent="">
            <section class="flex">
                <div class="text-md font-bold leading-6 grow">{{curTitle}}</div>
                <div @click="iconCloseClick" class="btn btn-xs btn-circle bg-base-300 border-base-300">✕</div>
            </section>
            <section class="leading-9 relative">
                <input type="text" v-model.trim="info.url" class="w-full input input-bordered mt-6" placeholder="网站URL"/>
                <input type="text" v-model.trim="info.title" class="w-full input input-bordered mt-6" placeholder="网站名称 - 留空自动获取"/>
                <button @click="operateBtn" class="btn btn-block mt-8" :class="{'btn-disabled': isDisabled}">{{type === DialogType.ADD ? '添加' : '更新'}}</button>
            </section>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { DialogType } from './use-dialog';

const props = defineProps({
    show: Boolean,
    type: { type: Number as PropType<DialogType>, default: DialogType.ADD },
})
const emits = defineEmits(['add', 'update', 'close'])

const curTitle = computed(() => `${props.type === DialogType.ADD ? '添加网站' : '更新网站'}`);
const info = reactive({
    title: '',
    url: '',
});

const isDisabled = computed(() => !info.url.trim());

const operateBtn = (e: MouseEvent) => {
    if (isDisabled.value) return;
    emits(props.type === DialogType.ADD ? 'add' : 'update', { ...info });
}

const iconCloseClick = () => emits('close');
</script>

<style scoped>

</style>
    