import { defineStore } from 'pinia'
import { PinModel, ThemeEnum } from "@/interface";
import localDataManage, { ENUM_LOCAL_KEY } from '@/lib/localDataManager';

export default defineStore('app', {
    state: () => {
        return {
            theme: ThemeEnum.LIGHT,
            isLogin: false, // 是否登录user === 是否绑定微信
            curPinId: "",
            pins: [] as PinModel[],
        }
    },
    getters: {
    },
    actions: {
        setTheme(theme: ThemeEnum) {
            this.theme = theme;
            // localStorage.setItem("theme", theme);
        },

        addPins(pin: PinModel) {
            this.pins.push(pin);
            localDataManage.setItem(ENUM_LOCAL_KEY.PINS, JSON.stringify(this.pins));
        },

        updatePin(_id: string, name: string, color: string) {
            const index = this.pins.findIndex(i => i._id === _id);
            this.pins[index].name = name;
            this.pins[index].color = color;
            localDataManage.setItem(ENUM_LOCAL_KEY.PINS, JSON.stringify(this.pins))
        },

        setPinId(id: string) {
            this.curPinId = id;
        },
        setIsLogin(v: boolean) { this.isLogin = v; },
    }
});