<template>
    <main class="collection-container">
        <!-- <section class="web-item"  @click="webClick(item)">
            <div class="img-wrap shadow-md">
                <img :src="item.icon" alt="">
            </div>
            <div class="name shadow-lg">{{ item.name }}</div>
        </section> -->
        <WebItem v-for="(item, idx) of collections" :key="idx" :item="item"/>
        <!-- 默认的添加按钮 -->
        <section class="web-item add-item" @click="() => show(DialogType.ADD)">
            <div class="img-wrap">
                <!-- <i class="icon plus text-xs"></i> -->
            </div>
            <div class="name">添加</div>
        </section>  

        <!-- 添加弹窗 -->
        <AddDialog :show="isShowDialog" :type="dialogType" @close="hide" @add="add" @update="update"/>

    </main>
</template>

<script setup lang="ts">
import VueFullPage from 'vue-fullpage.js'
import AddDialog from './dialog/dialog.vue';
import { useDialog, DialogType } from './dialog/use-dialog';
import { WebType, CollectionWeb } from './interface';
import { useStorage } from '@vueuse/core';
import WebItem from './web-item.vue';
import { Ref } from 'vue';
import Api from '@/lib/http';

console.log(VueFullPage);
// const collections: CollectionWeb[] = [
//     new CollectionWeb("得到", "https://www.dedao.cn/favicon.ico", "https://www.dedao.cn"),
//     new CollectionWeb("ReadHub", "https://www.readhub.cn/favicon.ico", "https://www.readhub.cn"),
//     // new CollectionWeb("ADD", "", "", WebType.DEFAULT_ADD),
// ];

const collections: Ref<CollectionWeb[]> = useStorage('collections', [] as CollectionWeb[]);

Api.req('browser_home', 'GET_COLLECTION').then((res: any) => {
    console.log('res', res);
    collections.value = res;
});

const add = (webItem: CollectionWeb) => {
    collections.value.push(webItem);
    Api.req('browser_home', 'ADD_COLLECTION', webItem);
};

const update = (webItem: CollectionWeb) => {
    const idx = collections.value.findIndex(item => item.url === webItem.url);
    collections.value[idx] = webItem;
    Api.req('browser_home', 'UPDATE_COLLECTION', webItem);
};


const { isShow: isShowDialog, type: dialogType, show, hide } = useDialog();

</script>

<style lang="less">
.collection-container {
    width: 76%;
    width: 842px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    // justify-content: space-around;
}


.web-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 1.6;
    cursor: pointer;
    border-radius: 8px;
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