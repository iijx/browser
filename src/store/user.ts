import Api from '../lib/http';
import { defineStore } from 'pinia'
import { PinModel, UserModel } from '../interface'
import localDataManage, { ENUM_LOCAL_KEY } from '@/lib/localDataManager';

export default defineStore('user', {
    state: () => {
        return {
            ...new UserModel({
                pins: []
            })
        }
    },
    actions: {
        setUserInfo(_user: UserModel) {
            this._id = _user._id || '';
            this.avatar = decodeURIComponent(_user.avatar || '');
            this.nickname = decodeURIComponent(_user.nickname || '');
            this.openid = _user.openid || '';
            this.isSync = _user.isSync || false;
        },
        addPins(pin: PinModel) {
            this.pins.push(pin);
            localDataManage.setItem(ENUM_LOCAL_KEY.PINS, JSON.stringify(this.pins))
        },
        updatePin(pinId: number, name: string, color: string) {
            const index = this.pins.findIndex(i => i.pinId === pinId);
            this.pins[index].name = name;
            this.pins[index].color = color;
            localDataManage.setItem(ENUM_LOCAL_KEY.PINS, JSON.stringify(this.pins))
        },
        async loginByUser(userId: string) {
            const userRes = await Api.req('user', 'FIND_ONE_BY_ID', userId);
            console.log('userRes', userRes);
            this.setUserInfo(userRes as unknown as UserModel);
        }
    }
});