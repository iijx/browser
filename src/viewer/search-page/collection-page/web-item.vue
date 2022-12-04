<template>
    <section class="web-item-container" @click="() => webClick(item)">
        <div class="img-wrap shadow-md">
            <img :src="icon" alt="">
        </div>
        <div v-if="item.title" class="name">{{ title }}</div>
        <div v-else class="name">&nbsp;</div>
    </section>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import { WebItem } from '@/interface';

const props = defineProps({
    item: {
        type: Object as PropType<WebItem>,
        required: true,
    },
});

const webClick = (webItem: WebItem) => window.open(webItem.url);

const url = computed(() => {
    console.log("url", props.item);
    return new URL(props.item.url || 'www.baidu.com');
});

const title = computed(() => {
    return (/^[^|\-/｜•—]+/.exec(props.item.title) || [])[0] || props.item.title || '';
});

const icon = computed(() => props.item.icon || `${url.value.href}/favicon.ico`);
</script>

<style lang="less" scoped>
.web-item-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 1.6;
    cursor: pointer;
    border-radius: 8px;
    margin-left: 24px;
    margin-right: 24px;
    &.add-item {
        > .img-wrap {
            background-color: rgba(#000, .4);
        }
    }
    // &:hover {
    //     background-color: rgba(#000, .4);
    // }
    .img-wrap {
        width: 60px;
        height: 60px;
        // overflow: hidden;
        // background: #fff;
        // background: rgba(0, 0, 0, .2);
        border-radius: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 16px;
        overflow: hidden;

        // @media not all and (hover: none) {
            animation: 2s ease 0s infinite normal none running blinking;
        // }

        transition-property: box-shadow, transform, border-radius, filter;
        /* transition-duration: 0.2s; */
        transition-timing-function: ease;
        // box-shadow: none;
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
        .icon {
            width: 24px;
            height: 24px;
            color: rgba(#fff, .6);
        }
    }
    .name {
        margin-top: 8px;
        font-size: 12px;
        font-weight: bold;
        color: #fff;
    }
}
</style>