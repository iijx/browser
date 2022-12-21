<template>
<!-- <div class="app" :style="mainStyle"> -->
    
<div class="app" :style="style">
    <!-- <div class="cover"></div> -->

    <!-- <main class="pages-container" id="container">
        <section data-anchor="page-1" class="page">
            <CollectionPage />
        </section>
        <section data-anchor="page-2" class="page">
        </section>
    </main> -->
    <SearchPage />

    <!-- 设置按钮 -->
    <section class="icon-setting-wrap">
        <label for="my-modal-6" class="btn">
            <icon-setting-config fill="#fff" size="18"/>
        </label>

        <!-- <bill theme="outline" size="24" fill="#333"/> -->
    </section>

    <!-- 登录弹窗 -->
    <!-- <div id="authing-guard-container" class="login-container"></div> -->
    <!-- <LoginDialog v-show="true" /> -->
    <SettingDialog />
</div>
</template>

<script setup lang="ts">
import Pageable from "pageable";
import "pageable/dist/pageable.min.css"
import { useStorage } from '@vueuse/core';
import { computed } from 'vue';
import CollectionPage from './collection-page/index.vue';
import SearchPage from './search-page/index.vue';
import Api from "@/api";
import { useGuard } from "@authing/guard-vue3";
import "@authing/guard-vue3/dist/esm/guard.min.css";
import { UserModel } from '@/interface';
import LoginDialog from '@/components/login-dialog.vue';
import SettingDialog from '@/components/setting-dialog/index.vue';
import Store from "@/store";
import { useBackground } from "@/compositions/use-background";
const appStore = Store.appStore();
const userStore = Store.userStore();

const { style } = useBackground();
console.log("style", style.backgroundImage)

onMounted(() => {
    // new Pageable("#container", {
    //     pips: true,
    //     animation: 460,
    //     events: {
    //         wheel: true, // enable / disable mousewheel scrolling
    //         mouse: false, // enable / disable mouse drag scrolling
    //         touch: true, // enable / disable touch / swipe scrolling
    //         keydown: true, // enable / disable keyboard navigation
    //     },
    // });
})



const bgSrc = useStorage("bizhi", "");
Api.apiBizhiReq<any[]>().then((res: any[]) => {
    bgSrc.value = `https://cn.bing.com/${res[0].todayBing}`
});

const mainStyle = computed(() => ({
    backgroundImage: `url(${bgSrc.value})`,
}));

const guard = useGuard();

const loginUserByAuthId = (authingId: string) => {
    return Api.apiLoginByAuthIdReq(authingId).then((res: any) => {
        console.log("[http] Api.apiLoginByAuthIdReq res", res);
        userStore.setUserInfo(new UserModel(res));
    });
};
guard.on("login", (res: any) => {
    appStore.setIsShowLoginDialog(false);
    loginUserByAuthId(res.data?.id);
});
guard.checkLoginStatus().then((res: any) => {
    console.log("[authing] index checkLoginStatus", res);
    if (res) {
        loginUserByAuthId(res.data?.id);
    }
})
watch(() => appStore.isShowLoginDialog, (isShow) => {
    if (isShow) {
        guard.show();
        //     guard.start("#authing-guard-container").then((userInfo) => {
        //     if (userInfo.id) {
        //         // guard.hide();
        //     }
        //     console.log("userInfo: ", userInfo);
        //     }).catch((err) => {
        //         console.log("err", err);
        //     })
        // }
    } else {
        guard.hide();
    }
});

onMounted(() => {
    // 使用 start 方法挂载 Guard 组件到你指定的 DOM 节点，登录成功后返回 userInfo
    // guard.getAuthClient().then((res) => {
        //     console.log("res", res)
        // })

    // guard.trackSession().then((res) => {
    //     console.log("trackSession", res)
    // })
});


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
<style>
.icon-setting-wrap {
    @apply absolute right-0 top-0 m-4 cursor-pointer;
}

</style>

<style lang="less">
.com-main-container {
    position: relative;
    max-width: 1350px;
    height: 100%;
    margin: 0 auto;
    // border: 1px solid #fff;
}
</style>