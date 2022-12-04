import { v4 as uuid } from 'uuid';

export enum DialogType {
    ADD,
    EDIT
}

export class PinModel {
    _id?: string;
    uuid: string = '';
    name: string;
    color: string;
    static build(item: PinModel) {
        return new PinModel(item);
    }
    constructor(opt: any) {
        if (opt._id) {
            this._id = opt._id;
        }
        this.name = opt.name || '';
        this.color = opt.color || '#000000';
        this.uuid = opt.uuid || uuid();
    }
}

export enum ThemeEnum {
    LIGHT = "light",
    DARK = "dark"
}

export class UserModel {
    _id?: string;
    openid: string;
    nickname: string;
    avatar: string;
    miniOpenid: string;
    mobile: string;
    email: string;
    isSync: boolean; // 是否开启云同步
    pins: PinModel[];
    constructor(opt: any = {}) {
        if (opt._id) this._id = opt._id;

        this.openid = opt.openid || '';
        this.avatar = opt.avatar || '';
        this.nickname  = opt.nickname || '';
        this.miniOpenid = opt.miniOpenid || '';
        this.mobile = opt.mobile || '';
        this.email = opt.email || '';

        this.isSync = opt.isSync || false;
        this.pins = typeof opt.pins === 'string' ? JSON.parse(opt.pins) : (opt.pins || []);
    }
    build(opt: UserModel) {
        if (opt._id) this._id = opt._id;

        this.openid = opt.openid || '';
        this.avatar = opt.avatar || '';
        this.nickname  = opt.nickname || '';
        this.miniOpenid = opt.miniOpenid || '';
        this.mobile = opt.mobile || '';
        this.email = opt.email || '';
        this.isSync = opt.isSync || false;
        this.pins = typeof opt.pins === 'string' ? JSON.parse(opt.pins) : (opt.pins || []);
    }
    addPin(pin: PinModel) {
        this.pins.push(pin);
    }
}

export enum WebType {
    Normal,
    DEFAULT_ADD,
}
export class WebItem {
    _id?: string;
    title: string = "";
    icon: string = "";
    url: string = "";
    pinId: string = "";
    uid: string = "";
    constructor(opt: any) {
        if (opt._id) this._id = opt._id;
        this.title = opt.title || '';
        this.icon = opt.icon || '';
        this.url = opt.url || '';
        this.pinId = opt.pinId || '';
        this.uid = opt.uid || '';
    }
    setPinId(id: string) {
        this.pinId = id;
    }
}
