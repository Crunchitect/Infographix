<template>
    <div class="box" ref="box">
        <div v-show="is_text">
            <button @click.prevent="do_command('bold')"><i class="fa-solid fa-bold"></i></button>
            <button @click.prevent="do_command('italic')"><i class="fa-solid fa-italic"></i></button>
            <div class="underline">
                <button>
                    <i @click.prevent="do_command('underline')" class="fa-solid fa-underline"></i>
                    <i @click.prevent="underline_toggle = Number(!underline_toggle)"
                        class="underline-span fa-solid fa-chevron-right fa-2xs"></i>
                </button>
                <div class="underline-container" v-if="underline_toggle">
                    <button class="inner" @click.prevent="do_command('customUnderline', 'double')">
                        <span style="text-decoration: underline double">T</span>
                    </button>
                    <button class="inner" @click.prevent="do_command('customUnderline', 'dotted')">
                        <span style="text-decoration: underline dotted">T</span>
                    </button>
                    <button class="inner" @click.prevent="do_command('customUnderline', 'dashed')">
                        <span style="text-decoration: underline dashed">T</span>
                    </button>
                    <button class="inner" @click.prevent="do_command('customUnderline', 'wavy')">
                        <span style="text-decoration: underline wavy">T</span>
                    </button>
                </div>
            </div>
            <button @click.prevent="do_command('justifyLeft')"><i class="fa-solid fa-align-left"></i></button>
            <button @click.prevent="do_command('justifyCenter')"><i class="fa-solid fa-align-center"></i></button>
            <button @click.prevent="do_command('justifyRight')"><i class="fa-solid fa-align-right"></i></button>
            <button @click.prevent="do_command('justifyFull')"><i class="fa-solid fa-align-justify"></i></button>
            <button @click.prevent="do_command('strikeThrough')"><i class="fa-solid fa-strikethrough"></i></button>
            <button @click.prevent="do_command('subscript')"><i class="fa-solid fa-subscript"></i></button>
            <button @click.prevent="do_command('superscript')"><i class="fa-solid fa-superscript"></i></button>
            
            <button class="font-color">
                <i @click.prevent="do_command('textColor', text_color)" class="fa-solid fa-font"></i>
                <input type="color" v-model="text_color">
            </button>
            <button class="font-color">
                <i @click.prevent="do_command('fillColor', fill_color)" class="fa-solid fa-fill-drip fa-sm"></i>
                <input type="color" v-model="fill_color">
            </button>
            <div class="font-size">
                <button class="inner" @click.prevent="text_size_toggle = Number(!text_size_toggle)">
                    <Text />
                    <i class="text-span fa-solid fa-chevron-right fa-2xs"></i>
                </button>
                <div class="text-container" v-if="text_size_toggle">
                    <button class="inner" @click.prevent="do_command('setFontSize', font_size)">
                        <TextSize />
                    </button>
                    <button class="inner" @click.prevent="font_size--"><i class="fa-solid fa-minus"></i></button>
                    <input type="number" value="24" v-model="font_size">
                    <button class="inner" @click.prevent="font_size++"><i class="fa-solid fa-plus"></i></button>
                    <button class="inner" @click.prevent="do_command('increaseFontSize')">
                        <TextSizeUp />
                    </button>
                    <button class="inner" @click.prevent="do_command('decreaseFontSize')">
                        <TextSizeDown />
                    </button>
                </div>
            </div>
            <div class="font-width">
                <button class="inner" @click.prevent="text_width_toggle = Number(!text_width_toggle)">
                    <i class="fa-solid fa-text-width"></i>
                    <i class="width-span fa-solid fa-chevron-right fa-2xs"></i>
                </button>
                <div class="width-container" v-if="text_width_toggle">
                    <button class="inner" @click.prevent="do_command('setFontWidth', text_width)">
                        <i class="fa-solid fa-check"></i> 
                    </button>
                    <button class="inner" @click.prevent="text_width -= 0.1"><i class="fa-solid fa-minus"></i></button>
                    <input type="number" value="2.5" v-model="text_width">
                    <button class="inner" @click.prevent="text_width += 0.1"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
            <div class="font-height">
                <button class="inner" @click.prevent="text_height_toggle = Number(!text_height_toggle)">
                    <i class="fa-solid fa-text-height"></i>
                    <i class="height-span fa-solid fa-chevron-right fa-2xs"></i>
                </button>
                <div class="height-container" v-if="text_height_toggle">
                    <button class="inner" @click.prevent="do_command('setFontHeight', text_height)">
                        <i class="fa-solid fa-check"></i> 
                    </button>
                    <button class="inner" @click.prevent="text_height -= 0.1"><i class="fa-solid fa-minus"></i></button>
                    <input type="number" value="2.5" v-model="text_height">
                    <button class="inner" @click.prevent="text_height += 0.1"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
        </div>
        <div>
            <button @click.prevent="$emit('delete', el_state)"><i class="fa-solid fa-trash" style="color: red"></i></button>
            <button @click.prevent="do_command('moveUp')"><LayerForward /></button>
            <button @click.prevent="do_command('moveDown')"><LayerBackward /></button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { watchEffect, ref, type PropType } from 'vue';
    import { onClickOutside } from '@vueuse/core'
    import { is_text_elem } from '@/lib/detect_tag';
    import { wrap_html } from '@/lib/wrap_html';

    import Text from '@/components/icons/Text.vue';
    import TextSize from '@/components/icons/TextSize.vue';
    import TextSizeUp from '@/components/icons/TextSizeUp.vue';
    import TextSizeDown from '@/components/icons/TextSizeDown.vue';
    import LayerForward from '@/components/icons/LayerForward.vue';
    import LayerBackward from '@/components/icons/LayerBackward.vue';

    import type { VueElRef } from "@/lib/types";

    const props = defineProps({
        update: Object as PropType<{ tag?: string, id?: string }>
    });

    const emit = defineEmits<{
        (e: "delete", id: string): void,
        (e: "styles"): void
    }>();

    const is_text = ref(false);
    const box = ref(null as VueElRef);

    const font_size = ref(24);
    const text_width = ref(0);
    const text_height = ref(0);
    const el_state = ref("");
    const tag_state = ref("");

    const text_color = ref("#FF0000")
    const fill_color = ref("#FF0000")

    const underline_toggle = ref(0);
    const text_size_toggle = ref(0);
    const text_width_toggle = ref(0);
    const text_height_toggle = ref(0);

    const do_command = (command: string, ...args: (string | number)[]) => {
        emit("styles");
        switch (command) {
            case 'increaseFontSize':
                wrap_html('<span class="igx-bigger-font-size">', '</span>');
                break;
            case 'decreaseFontSize':
                wrap_html('<span class="igx-smaller-font-size">', '</span>');
                break;
            case 'setFontSize':
                wrap_html(`<span style="font-size: ${args[0]}pt" >`, '</span>');
                break;
            case 'customUnderline':
                document.execCommand("backColor", false, <string>args[0]);
                break;
            case 'textColor':
                document.execCommand("foreColor", false, <string>args[0]);
                break;
            case 'fillColor':
                if (tag_state.value === "div") 
                    (document.getElementById(el_state.value!))!.style.backgroundColor = <string>args[0];
                else
                    wrap_html(`<span style="background-color: ${args[0]}" >`, '</span>');
                break;
            case 'setFontWidth':
                wrap_html(`<span style="letter-spacing: ${args[0]}pt" >`, '</span>');
                break;
            case 'setFontHeight':
                wrap_html(`<span style="line-height: ${args[0]}" >`, '</span>');
                break;
            case 'moveUp':
                let z_index = Number((document.getElementById(el_state.value!))!.style.zIndex);
                (document.getElementById(el_state.value!))!.style.zIndex = String(z_index + 1);
                break;
            case 'moveDown':
                let zz_index = Number((document.getElementById(el_state.value!))!.style.zIndex);
                (document.getElementById(el_state.value!))!.style.zIndex = String(zz_index - 1);
                break;
            default:
                // Maybe change, The Clipboard API is not fully supported yet.
                document.execCommand(command);
        }

    };

    onClickOutside(box, (e: PointerEvent) => {
        if (document.querySelector(":focus")?.id === props.update?.id && props.update?.id) return;
        if (!box.value?.style) return;
        box.value.style.transform = 'translate(-50%, -50%) rotateX(90deg)';
    });

    watchEffect(() => {
        if (!box.value?.style) return;
        if (!(props.update?.tag && props.update?.id)) return;
        el_state.value = props.update.id;
        tag_state.value = props.update.tag;
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
    * {
        display: flex;
        align-items: center;
    }

    .box {
        background-color: #222;
        z-index: 6942069420;
        position: fixed;
        flex-flow: row nowrap;
        border-radius: 5px;
        gap: 0.5vw;
        transform: translate(-50%, -50%);
        transition: transform 200ms cubic-bezier(0.17, 1.67, 0.36, 1.61);
        max-width: fit-content;
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
        transform: scale(1.2);
        border-radius: 5px;
    }

    button:active {
        transform: scale(1);
    }

    input[type="number"] {
        width: 2em;
        min-width: none;
        text-align: center;
        font-weight: bold;
        border-radius: 7px;
    }

    button.inner {
        background-color: #555;
        width: 80%;
        height: 80%;
    }

    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    .color {
        width: 110%;
        height: 10%;
        border-radius: 3px;
        background-color: v-bind(text_color);
    }

    .font-size,
    .underline {
        background-color: #444;
        border-radius: 3px;
        min-width: 0;
    }

    .font-color,
    .underline-style {
        flex-flow: column nowrap;
        justify-content: space-evenly;
    }

    .text-span,
    .text-container,
    .underline-span,
    .underline-container,
    .text-width-span,
    .text-width-container,
    .text-height-span,
    .text-height-container {
        transition: transform 100ms cubic-bezier(0.17, 1.67, 0.36, 1.61);
    }

    .text-span {
        transform: rotate(calc(180deg * v-bind(text_size_toggle)));
    }

    .underline-span {
        transform: rotate(calc(180deg * v-bind(underline_toggle)));
    }

    .text-width-span {
        transform: rotate(calc(180deg * v-bind(text_width_toggle)));
    }

    .text-height-span {
        transform: rotate(calc(180deg * v-bind(text_height_toggle)));
    }

    .text-container,
    .underline-container,
    .text-width-container, 
    .text-height-container {
        transform-origin: left center;
    }

    .text-container {
        transform: scale(v-bind(text_size_toggle));
    }

    .underline-container {
        transform: scale(v-bind(underline_toggle));
    }

    .text-width-container {
        transform: scale(v-bind(text_width_toggle));
    }

    .text-height-container {
        transform: scale(v-bind(text_height_toggle));
    }

    .underline-container > * {
        font-weight: bolder;
    }

    input[type="color"] {
        -webkit-appearance: none;
        appearance: none;
        border: none;
        width: 110%;
        height: 5px;
        border-radius: 3px;
    }

    input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 0;
    }

    input[type="color"]::-webkit-color-swatch {
        border: none;
    }
</style>