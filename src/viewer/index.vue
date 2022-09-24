<template>
<div class="app" :style="mainStyle">
    <div class="cover"></div>

    

    <!-- <main class="main-sections">
        <MainSection class="main-section" />
    </main> -->
    <full-page ref="fullpage">
      <div class="section">First section ...</div>
      <div class="section">
        <section class="search-container main-container">
            <img class="icon" :src="curSearchWeb.icon" alt="" />
            <input type="text" v-model="searchText" @keyup.enter="search">
        </section>
      </div>
      <div class="section">Second section ...</div>
    </full-page>
</div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { computed, ref } from 'vue';
import useSearch from './useSearch';
import MainSection from './comp/main-section.vue';

const bgSrc = ref("");
axios.get("https://pastecuts-1gmwynv5478a4fa1-1257702679.ap-shanghai.app.tcloudbase.com/api/bizhi").then(res => {
  bgSrc.value = `https://cn.bing.com/${res.data.data[0].todayBing}`
  console.log(bgSrc.value)
});

const mainStyle = computed(() => ({
    backgroundImage: `url(${bgSrc.value})`,
}));

const { curSearchWeb, search, searchText } = useSearch();


</script>

<style lang="less">
.app {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: center;
    > .cover {
        background-image: radial-gradient(rgba(0,0,0,0) 0,rgba(0,0,0,.5) 100%),radial-gradient(rgba(0,0,0,0) 33%,rgba(0,0,0,.3) 166%);
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        top: 0;
        opacity: .5;
    }
}
.main-container {
    width: 78%;
    max-width: 632px;
    min-width: 506px;
    min-width: 580px;
    max-width: 596px;
    margin: 0 auto;
}
@searchHeight: 44px;
.search-container {
    height:@searchHeight;
    white-space: normal;
    box-sizing: border-box;
    white-space: nowrap;
    top: 40%;
    position: relative;
    z-index: 2;
    /* background-color: red; */
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, .6);
    // background-color: rgba(74, 74, 74, 1);
    
    overflow: hidden;
    border-radius: calc(@searchHeight/2);

    display: flex;
    align-items: center;
    box-shadow:  rgba(0, 0, 0, 0.11) 0 0 3px 0, 0 1.5px 3.6px 0 rgba(0, 0, 0, 0.13);

    > .icon {
        padding: 0 10px 0 12px;
        width: 24px;
        height: 24px;
        opacity: .8;
    }
    input {
        display: block;
        border-radius: 8px;
        height: 100%;
        width: 100%;
        background-color: transparent;
        border: none;
        color: black;
        // color: white;
        font-size: 18px;
        &:focus {
            border: none;
            outline: none;
        }
    }
}

.main-sections {
    position: absolute;
    width: 100%;
    top: 30%;
    bottom: 0;
    right: 0;
    left: 0;
    .main-section {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: yellowgreen;
    }
}
</style>