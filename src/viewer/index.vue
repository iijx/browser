<template>
<div class="app" :style="mainStyle">
    <div class="cover"></div>

    <full-page ref="fullpage" :options="fullPageOptions">
        <!-- <section class="section page">
            <RecommendPage />
        </section> -->

        <section class="section page">
            <CollectionPage />
        </section>
        <section class="section page" :class="{'focus': isFocus}">
            <SearchPage :isFocus="isFocus" @focus="isFocus = true" @blur="isFocus = false" />
        </section>
    </full-page>
</div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { computed, ref } from 'vue';
import CollectionPage from './components/collection-page/index.vue';
import SearchPage from './components/search-page/index.vue';
// import RecommendPage from './components/recommend-page/index.vue';

const bgSrc = ref("");
axios.get("https://pastecuts-1gmwynv5478a4fa1-1257702679.ap-shanghai.app.tcloudbase.com/api/bizhi").then(res => {
  bgSrc.value = `https://cn.bing.com/${res.data.data[0].todayBing}`
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
        transition: all .3s;
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