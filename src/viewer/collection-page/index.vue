<template>
    <main class="collection-container">
        <!-- 左侧 pin -->
        <section class="left-wrap">
            <Left />
        </section>

        <!-- 主要视图 -->
        <main class="collection-main-container">
            <WebItem v-for="(item, idx) of collections" :key="idx" :item="item"/>
            <!-- 默认的添加按钮 -->
            <section class="web-item add-item ml-4" @click="() => showDialog(DialogType.ADD)">
                <div class="img-wrap">
                    <i class="icon plus text-xs"></i>
                </div>
                <div class="name">添加</div>
            </section>
        </main>

        <!-- 添加弹窗 -->
        <AddDialog :show="isShowDialog" :type="dialogType" @close="hideDialog" @add="add" @update="update" />
    </main>
</template>

<script setup lang="ts">
import AddDialog from './dialog/dialog.vue';
import { useDialog, DialogType } from './dialog/use-dialog';
import WebItem from './web-item.vue';
import Left from './left/index.vue';
import { useCollections } from './compositions/use-collections';

// 网站 item 收集列表
const { collections, add, update } = useCollections();

// 弹窗
const { isShow: isShowDialog, type: dialogType, show: showDialog, hide: hideDialog } = useDialog();

</script>

<style lang="less" scoped>
.collection-container {
    position: relative;
    width: 100%;
    height: 100%;
    // justify-content: space-around;
    .left-wrap {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
    }
    .collection-main-container {
        width: 76%;
        width: 842px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
    }
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