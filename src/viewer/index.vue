<template>
<div class="app" :style="mainStyle">
    <div class="cover"></div>

    <!-- <full-page ref="fullpage" :options="fullPageOptions">
        <section class="section page">
            <CollectionPage />
        </section>
        <section class="section page" :class="{'focus': isFocus}">
            <SearchPage :isFocus="isFocus" @focus="isFocus = true" @blur="isFocus = false" />
        </section>
    </full-page> -->

    <main class="pages-container" id="container">
        <section data-anchor="page-1" class="page">
            <CollectionPage />
        </section>
        <section data-anchor="page-2" class="page">
            <SearchPage :isFocus="isFocus" @focus="isFocus = true" @blur="isFocus = false" />
        </section>
    </main>
</div>
</template>

<script setup lang="ts">
import Pageable from "pageable";
import "pageable/dist/pageable.min.css"

import { useStorage } from '@vueuse/core';
import axios from 'axios';
import { computed, ref } from 'vue';
import CollectionPage from './collection-page/index.vue';
import SearchPage from './search-page/index.vue';
import Http from "@/lib/request";
import Api from "@/api";
// import RecommendPage from './components/recommend-page/index.vue';

onMounted(() => {
    new Pageable("#container", {
        pips: true,
        animation: 460,
        events: {
            wheel: true, // enable / disable mousewheel scrolling
            mouse: false, // enable / disable mouse drag scrolling
            touch: true, // enable / disable touch / swipe scrolling
            keydown: true, // enable / disable keyboard navigation
        },
    });
})

const bgSrc = useStorage("bizhi", "");
Api.apiBizhiReq().then(res => {
  bgSrc.value = `https://cn.bing.com/${res[0].todayBing}`
  console.log(bgSrc.value)
});

const fullPageOptions = {
    scrollOverflow: false,
    navigation: true,
}
const mainStyle = computed(() => ({
    backgroundImage: `url(${bgSrc.value})`,
}));

const isFocus = ref(false);

</script>

<style lang="less" scoped>
.app {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: center;
    > .pages-container {
        width: 100%;
        height: 100%;
    }
    > .cover {
        // background-image: radial-gradient(rgba(0,0,0,0) 0,rgba(0,0,0,.5) 100%),radial-gradient(rgba(0,0,0,0) 33%,rgba(0,0,0,.3) 166%);
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        top: 0;
    }
    .page {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        // background-color: rgba(0, 0, 0, );
        // transition: all .3s;
        &.focus {
            background-color: rgba(0, 0, 0, .2);
        }
    }
}
</style>

<style lang="less">
.com-main-container {
    position: relative;
    max-width: 632px;
    min-width: 506px;
    min-width: 580px;
    max-width: 596px;
    height: 100%;
    margin: 0 auto;
}
</style>