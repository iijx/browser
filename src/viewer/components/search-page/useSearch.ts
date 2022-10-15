import { computed, ref } from "vue";
import { WEB_SITES } from "../../../config";
import keycode from "keycode";
export default () => {
    const index = ref(0);
    const searchText = ref('');
    const curSearchWeb = computed(() => WEB_SITES[index.value]);
    const maxIndex = WEB_SITES.length - 1;

    const search = (e: MouseEvent) => {
        window.open(`${curSearchWeb.value.url}${encodeURIComponent(searchText.value)}`);
    }

    document.addEventListener('keydown', function(e) {
        const pressKeyCode = keycode(e);
        if (pressKeyCode === 'tab') {
            index.value = index.value < maxIndex ? index.value + 1 : 0;
            e.preventDefault();
        }
    })
    return { curSearchWeb, searchText, search };
}