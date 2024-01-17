<template>
    <div class="box" ref="box">
        <div v-show="is_text">
            <button @click.prevent="do_command('bold')"><i class="fa-solid fa-bold"></i></button>
            <button @click.prevent="do_command('italic')"><i class="fa-solid fa-italic"></i></button>
            <button @click.prevent="do_command('underline')"><i class="fa-solid fa-underline"></i></button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { watchEffect, ref, type PropType } from 'vue';
    import { onClickOutside } from '@vueuse/core'
    import { is_text_elem } from '@/lib/detect_tag';

    import type { VueElRef } from "@/lib/types";

    const props = defineProps({
        update: Object as PropType<{tag?: string, id?: string}>
    });

    const is_text = ref(false);
    const box = ref(null as VueElRef);

    const is_focus = ref(0);

    const do_command = (command: string) => {
        // Maybe change, The Clipboard API is not fully supported yet.
        document.execCommand(command);
    };

    onClickOutside(box, (e: PointerEvent) => {
        if (is_focus.value) { is_focus.value--; return; }
        if (!box.value?.style) return;
        box.value.style.display = 'none';
    });

    watchEffect(() => {
        if (!box.value?.style) return;
        if (!(props.update?.tag && props.update?.id)) {
            return;
        }
        is_text.value = is_text_elem(props.update.tag);
        let { left: x, top: y, width: w } = document.getElementById(props.update.id)?.getBoundingClientRect() ?? {};
        // ??= is set default value, dont get scared by this.
        x ??= 0; y ??= 0; w ??= 0;
        box.value.style.display = 'flex';
        box.value.style.top = `${y - 50}px`;
        box.value.style.left = `${x + w / 2}px`;
        is_focus.value = 2;
    });
</script>

<style scoped>
    .box {
        background-color: #222;
        z-index: 6942069420;
        position: fixed;
        flex-flow: row nowrap;
        border-radius: 5px;
        gap: 0.5vw;
        transform: translate(-50%, -50%);
    }

    .box > * {
        display: flex;
        flex-flow: row nowrap;
        margin: 0.5vw;
        border-radius: 30px;
    }

    .box > * > * {
        aspect-ratio: 1 / 1;
        min-width: fit-content;
        min-height: fit-content;
        margin: 0;
        border-radius: 0;
        background-color: #333;
    }
</style>