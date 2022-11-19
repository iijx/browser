
export enum ENUM_LOCAL_KEY {
    DEVICE_ID = 'deviceId',
    USER_INFO = 'userInfo',
    PINS = 'pin',
    PLUGIN_INSTALLED = 'pluginInstalled'
}
const localDataManage = {
    setItem(key: ENUM_LOCAL_KEY, value: string):void {
        localStorage.setItem(key, value);
    },
    getItem(key: ENUM_LOCAL_KEY, defaultValue = ''):string {
        return localStorage.getItem(key) || defaultValue;
    }
}

export default localDataManage;