<template>
    <section class="com-main-container">
        <div class="search-container">
            <div class="icon-wrap">
                <img class="icon" :src="curSearchWeb.icon" alt=""/>
            </div>
            <!-- @mouseover="$emit('focus')" @mouseleave="$emit('blur')" -->
            <div class="input-wrap" >
                <input class="input" type="text" v-model="searchText" @keyup.enter="search" placeholder="">
            </div> 
        </div>
    </section>
</template>

<script lang="ts" setup>
import useSearch from './use-search';

const { curSearchWeb, search, searchText } = useSearch();

defineEmits(["focus", 'blur'])
defineProps({
    isFocus: {
        type: Boolean,
        default: false,
    },
});
</script>

<style lang="less">

@searchHeight: 48px;
.search-container {
    height:@searchHeight;
    white-space: normal;
    box-sizing: border-box;
    white-space: nowrap;
    position: absolute;
    margin: 0 auto;
    top: 20%;
    left: 50%;
    transform: translate(-50%, 0);
    box-shadow:  rgba(0, 0, 0, 0.11) 0 0 3px 0, 0 1.5px 3.6px 0 rgba(0, 0, 0, 0.13);
    overflow: hidden;
    border-radius: calc(@searchHeight/3);
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, .1);
    width: 100%;
    transition: all .3s;

    > .icon-wrap {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        box-sizing: border-box;
        padding: 0 10px 0 12px;
        display: flex;
        align-items: center;
        > .icon {
            width: 24px;
            height: 24px;
            opacity: .8;
            display: block;
        }
    }
    > .input-wrap {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        background-color: #fff;
            color: black;
        > .input {
            display: block;
            border-radius: 8px;
            height: 100%;
            width: 100%;
            background-color: transparent;
            border: none;
            color: black;
            border: none;
            outline: none;
            font-size: 18px;
            text-indent: 2em;
            &::-webkit-input-placeholder {
                text-align: left;
                color: black;
                font-size: 15px;
            }
        }
    }
}
</style>