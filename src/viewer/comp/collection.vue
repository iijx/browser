<template>
    <main class="collection-container">
        <section class="web-item" v-for="(item, idx) of collections" :key="idx" @click="webClick(item)">
            <div class="img-wrap">
                <img :src="item.icon" alt="">
            </div>
            <div class="name">{{ item.name }}</div>
        </section>
        <!-- 默认的添加按钮 -->
        <section class="web-item add-item" @click="isShowDialog = true">
            <div class="img-wrap">
                <i class="icon plus text-xs"></i>
            </div>
            <div class="name">添加</div>
        </section>

        <!-- 添加弹窗 -->
        <AddDialog :show="isShowDialog" @close="isShowDialog = false"/>

    </main>
</template>

<script setup lang="ts">
import AddDialog from './dialog.vue';

enum WebType {
    Normal,
    DEFAULT_ADD,
}
class CollectionWeb {
    name: string = "";
    icon: string = "";
    url: string = "";
    type: WebType = WebType.Normal;
    constructor(name: string, icon: string, url: string, type: WebType = WebType.Normal) {
        this.name = name;
        this.icon = icon;
        this.url = url;
        this.type = type;
    }
}
const collections: CollectionWeb[] = [
    new CollectionWeb("百度", "https://www.baidu.com/favicon.ico", "https://www.baidu.com"),
    new CollectionWeb("谷歌", "https://www.google.com/favicon.ico", "https://www.google.com"),
    new CollectionWeb("必应", "https://cn.bing.com/favicon.ico", "https://cn.bing.com"),
    new CollectionWeb("搜狗", "https://www.sogou.com/favicon.ico", "https://www.sogou.com"),
    new CollectionWeb("360", "https://www.so.com/favicon.ico", "https://www.so.com"),
    new CollectionWeb("ADD", "", "", WebType.DEFAULT_ADD),
];

const webClick = (webItem: CollectionWeb) => {
    if (webItem.type === WebType.DEFAULT_ADD) {
        console.log("add");
    } else {
        window.open(webItem.url);
    }
};

const isShowDialog = ref(false);

</script>

<style lang="less">
.collection-container {
    width: 76%;
    width: 842px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
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
        background: #fff;
        // background: rgba(0, 0, 0, .2);
        border-radius: 18px;
        display: flex;
        align-items: center;
        justify-content: center;

        // @media not all and (hover: none) {
            animation: 2s ease 0s infinite normal none running blinking;
        // }

        transition-property: box-shadow, transform, border-radius, filter;
        /* transition-duration: 0.2s; */
        transition-timing-function: ease;
        // box-shadow: none;
        img {
            display: block;
            width: 60%;
            height: 60%;
        }
        .icon {
            width: 24px;
            height: 24px;
            color: rgba(#fff, .6);
        }
    }
    .name {
        margin-top: 8px;
    }
}
</style>