import { ref } from 'vue';

export const metaState = ref({
    is_opened: false,
    set_is_opened(value: boolean) {
        //@ts-ignore
        this.is_opened = value;
    }
});