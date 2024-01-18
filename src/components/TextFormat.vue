<template>
    <div class="box" ref="box">
        <div v-show="is_text">
            <button @click.prevent="do_command('bold')"><i class="fa-solid fa-bold"></i></button>
            <button @click.prevent="do_command('italic')"><i class="fa-solid fa-italic"></i></button>
            <button @click.prevent="do_command('underline')"><i class="fa-solid fa-underline"></i></button>
            <button @click.prevent="do_command('strikeThrough')"><i class="fa-solid fa-strikethrough"></i></button>
            <button @click.prevent="do_command('subscript')"><i class="fa-solid fa-subscript"></i></button>
            <button @click.prevent="do_command('superscript')"><i class="fa-solid fa-superscript"></i></button>
            <button @click.prevent="do_command('increaseFontSize')"><TextSizeUp /></button>
            <button @click.prevent="do_command('decreaseFontSize')"><TextSizeDown /></button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { watchEffect, ref, type PropType } from 'vue';
    import { onClickOutside } from '@vueuse/core'
    import { is_text_elem } from '@/lib/detect_tag';
    import { wrap_html } from '@/lib/wrap_html';

    import TextSizeUp from '@/components/icons/TextSizeUp.vue';
    import TextSizeDown from '@/components/icons/TextSizeDown.vue';

    import type { VueElRef } from "@/lib/types";

    const props = defineProps({
        update: Object as PropType<{tag?: string, id?: string}>
    });

    const is_text = ref(false);
    const box = ref(null as VueElRef);

    const do_command = (command: string) => {
        // Maybe change, The Clipboard API is not fully supported yet.
        console.log(command);

        switch (command) {
            case 'increaseFontSize':
                wrap_html('<span class="igx-bigger-font-size">', '</span>');
                break;
            case 'decreaseFontSize':
                wrap_html('<span class="igx-smaller-font-size">', '</span>');
                break;
            default:
                document.execCommand(command);
        }
        
    };

    onClickOutside(box, (e: PointerEvent) => {
        if (document.querySelector(":focus")?.id === props.update?.id && props.update?.id) return;
        if (!box.value?.style) return;
        box.value.style.transform = ' translate(-50%, -50%) rotateX(90deg)';
    });

    watchEffect(() => {
        if (!box.value?.style) return;
        if (!(props.update?.tag && props.update?.id)) return;
        is_text.value = is_text_elem(props.update.tag);
        let { left: x, top: y, width: w } = document.getElementById(props.update.id)?.getBoundingClientRect() ?? {};
        // ??= is set default value, dont get scared by this.
        x ??= 0; y ??= 0; w ??= 0;
        box.value.style.display = 'flex';
        box.value.style.top = `${y - 50}px`;
        box.value.style.left = `${x + w / 2}px`;
        box.value.style.transform = 'translate(-50%, -50%) rotateX(0deg)';
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
        transition: transform 500ms cubic-bezier(0.17, 1.67, 0.36, 1.61);
    }

    .box > * {
        display: flex;
        flex-flow: row nowrap;
        margin: 0.5vw;
        border-radius: 30px;
    }

    .box > * > * {
        min-width: fit-content;
        min-height: fit-content;
        margin: 0;
        border-radius: 0;
        background-color: #333;
    }

    button {
        aspect-ratio: 1 / 1 !important;
        transition: transform 100ms cubic-bezier(0.17, 1.67, 0.36, 1.61), 
                    border-radius 100ms cubic-bezier(0.17, 1.67, 0.36, 1.61);
    }

    button:hover {
        transform: scale(1.5);
        border-radius: 5px;
    }

    button:active {
        transform: scale(1);
    }
</style>