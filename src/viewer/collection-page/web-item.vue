<template>
    <section class="web-item" @click="() => webClick(item)">
        <div class="img-wrap shadow-md">
            <img :src="icon" alt="">
        </div>
        <div v-if="item.name" class="name shadow-lg">{{ item.name }}</div>
        <div v-else class="name shadow-lg">&nbsp;</div>
    </section>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { CollectionWeb } from '@/interface';

const props = defineProps({
    item: {
        type: Object as PropType<CollectionWeb>,
        required: true,
    },
});

const webClick = (webItem: CollectionWeb) => window.open(webItem.url);

const url = computed(() => new URL(props.item.url));

const icon = computed(() => `${url.value.href}/favicon.ico`);
</script>

<style lang="less" scoped>
.web-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 1.6;
    cursor: pointer;
    border-radius: 8px;
    margin: 0 24px;
    &.add-item {
        > .img-wrap {
            background-color: rgba(#000, .4);
        }
    }
    // &:hover {
    //     background-color: rgba(#000, .4);
    // }
    .img-wrap {
        width: 100px;
        height: 100px;
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
        font-size: 16px;
        font-weight: bold;
    }
}
</style>