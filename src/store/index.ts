import useAppStore from './app';
import useUserStore from './user';

export default {
    appStore: () => useAppStore(),
    userStore: () => useUserStore(),
}