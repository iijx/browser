import { defineStore } from 'pinia'
import { UserModel } from '../interface'

export default defineStore('user', {
    state: () => {
        return {
            ...new UserModel({
            })
        }
    },
    actions: {
        setUserInfo(_user: UserModel) {
            this._id = _user._id || '';
            // this.avatar = decodeURIComponent(_user.avatar || '');
            // this.nickname = decodeURIComponent(_user.nickname || '');
            // this.openid = _user.openid || '';
            // this.isSync = _user.isSync || false;
            this.pins = _user.pins || [];

        },
        async loginByUser(userId: string) {
            // const userRes = await Api.req('user', 'FIND_ONE_BY_ID', userId);
            // console.log('userRes', userRes);
            // this.setUserInfo(userRes as unknown as UserModel);
        }
    }
});