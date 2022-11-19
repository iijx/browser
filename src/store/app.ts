import { defineStore } from 'pinia'
import { ThemeEnum } from "@/interface";

export default defineStore('app', {
    state: () => {
        return {
            theme: ThemeEnum.LIGHT,
            isLogin: false, // 是否登录user === 是否绑定微信
            curPinId: -1,
        }
    },
    getters: {
    },
    actions: {
        setTheme(theme: ThemeEnum) {
            this.theme = theme;
            // localStorage.setItem("theme", theme);
        },

        setPinId(id: number) {
            this.curPinId = id;
        },
        setIsLogin(v: boolean) { this.isLogin = v; },
    }
});