<template>
<div class="app" :style="mainStyle">
    <section class="search-container main-container">
        <img class="icon" :src="curSearchWeb.icon" alt="" />
        <input type="text" v-model="searchText" @keyup.enter="search">
    </section>

    <main class="main-section">
        <div class="main-container" style="height: 100px;">
            <section class="section bg1"></section>
            <section class="section bg2"></section>
            <section class="section bg3"></section>
        </div>
    </main>
</div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { computed, ref } from 'vue';
import useSearch from './useSearch';

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
}
.main-container {
    width: 78%;
    max-width: 632px;
    min-width: 506px;
    min-width: 580px;
    max-width: 596px;
    margin: 0 auto;
}
.search-container {
    height: 52px;
    white-space: normal;
    box-sizing: border-box;
    white-space: nowrap;
    top: 15%;
    position: relative;
    z-index: 2;
    /* background-color: red; */
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, .6);
    
    overflow: hidden;
    border-radius: 8px;

    display: flex;
    align-items: center;

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
        font-size: 18px;
        &:focus {
            border: none;
            outline: none;
        }
    }
}

.main-section {
    position: absolute;
    width: 100%;
    top: 30%;
    bottom: 0;
    right: 0;
    left: 0;
    .section {
        width: 100%;
        height: 100%;
        &.bg1 { background-color: red; }
        &.bg2 { background-color: blue; }
        &.bg3 { background-color: yellowgreen; }
    }
}
</style>