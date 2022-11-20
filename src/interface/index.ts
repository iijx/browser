
export enum DialogType {
    ADD,
    EDIT
}

export class PinModel {
    _id?: string;
    name: string;
    color: string;
    static build(item: PinModel) {
        return new PinModel(item.name, item.color, item._id || '');
    }
    constructor(name: string, color: string, _id?: string) {
        if (_id) {
            this._id = _id;
        }
        this.name = name || '';
        this.color = color || '';
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
        this.pins = opt.pins || [];
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
        this.pins = opt.pins || [];
    }
}

export enum WebType {
    Normal,
    DEFAULT_ADD,
}
export class CollectionWeb {
    name: string = "";
    icon: string = "";
    url: string = "";
    type: WebType = WebType.Normal;
    pinId: string = "";
    constructor(name: string, icon: string, url: string, type: WebType = WebType.Normal) {
        this.name = name;
        this.icon = icon;
        this.url = url;
        this.type = type;
        this.pinId = "";
    }
    setPinId(id: string) {
        this.pinId = id;
    }
}
