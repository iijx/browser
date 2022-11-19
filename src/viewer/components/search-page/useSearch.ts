import { computed, ref } from "vue";
import { WEB_SITES_DEFAULT } from "../../../config";
import keycode from "keycode";
export default () => {
    const index = ref(0);
    const searchText = ref('');
    const curSearchWeb = computed(() => WEB_SITES_DEFAULT[index.value]);
    const maxIndex = WEB_SITES_DEFAULT.length - 1;

    const search = () => {
        window.open(`${curSearchWeb.value.url}${encodeURIComponent(searchText.value)}`);
    }

    document.addEventListener('keydown', function(e) {
        const pressKeyCode = keycode(e);
        if (pressKeyCode === 'tab') {
            // 1. 先判断
            index.value = index.value < maxIndex ? index.value + 1 : 0;
            e.preventDefault();
            // if ()
        }
    })
    return { curSearchWeb, searchText, search };
}