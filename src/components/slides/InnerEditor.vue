<!-- 
    The $refs thing is messy i know... but it gets the job done quite amazingly, actually.
    https://stackoverflow.com/questions/55379483/can-you-pass-an-element-to-a-function-within-the-template-in-vue
-->
<template v-if="$refs">
    <TextFormat :update="text_edit_show" />
    <div ref="ctx" class="ctx">
        <BoxModal
            v-for="(element, index) in data?.content"
            @dragstop="
                (x: number, y: number) => 
                    edit_pos(x, y, (<HTMLElement[]>$refs[`draggable${index}`]))
            "
            @resizestop="
                (x: number, y: number, w: number, h: number) => 
                    edit_scale(x, y, w, h, (<HTMLElement[]>$refs[`draggable${index}`]))
            "
            @rotatestop="
                (r: number) => 
                        edit_rotate(r, (<HTMLElement[]>$refs[`draggable${index}`]))
            "
            @activated="fill"
            v-model:x="element.position.x"
            v-model:y="element.position.y"
            v-model:w="element.position.w"
            v-model:h="element.position.h"
            v-model:r="element.position.r"
            @keydown.delete="delete_elem"
        >
            <component 
                :ref="`draggable${index}`"
                :is="element.tag" 
                :id="element.id"
                :style="{
                    ...element.styles,
                    color: 'black',
                    'text-align': 'center'
                }"
                v-bind="element.attrs"
                v-html="element.content"
                contenteditable
                class="no-focus"
                @focus="text_edit_show = {tag: element.tag, id: element.id}"
                @blur="(e: InputEvent) => {edit_content(e); text_edit_show = {}}"
            >
            </component>
        </BoxModal>
    </div>
</template>

<style scoped>
    .ctx {
        background-color: white;
        aspect-ratio: v-bind(width) / v-bind(height);
        border-radius: 20px;
        min-width: 80%;
        max-width: 80%;
        margin: auto;
        position: relative;
    }

    .vue-drag-resize-rotate {
        color: #00e72a59;
        border: 3px solid !important;
    }

    [contenteditable] {
        outline: 0px solid transparent;
    }
</style>

<script lang="ts" setup>
    import { type PropType, ref } from 'vue';
    import { getCaretPosition } from '@/lib/caret_position';

    // @ts-ignore
    import BoxModal from '@gausszhou/vue3-drag-resize-rotate';
    import "@gausszhou/vue3-drag-resize-rotate/lib/bundle.esm.css";

    import TextFormat from '@/components/TextFormat.vue';

    import type { Slide } from '@/lib/types';

    const text_edit_show = ref(<{tag?: string, id?: string}>{});

    const props = defineProps({
        data: Object as PropType<Slide>,
        width: Number,
        height: Number,
        class: String,
        log: String
    });

    const emit = defineEmits<{
        (e: "drag", x: number, y: number, id: string): void,
        (e: "resize", x: number, y: number, w: number, h: number, id: string): void,
        (e: "content", content: string, caret_pos: number, id: string): void,
        (e: "rotate", r: number, id: string): void,
        (e: "delete", id: string): void
    }>();

    const edit_pos = (left: number, top: number, ref: HTMLElement[]) => {
        emit("drag", left, top, ref[0].id);
    };

    const edit_scale = (x: number, y: number, w: number, h: number, ref: HTMLElement[]) => {
        // ref[0].style.fontSize = `${h/3}px`;
        emit("resize", x, y, w, h, ref[0].id);
    };

    const edit_rotate = (r: number, ref: HTMLElement[]) => {
        // ref[0].style.fontSize = `${h/3}px`;
        emit("rotate", r, ref[0].id);
    };

    const edit_content = (e: InputEvent) => {
        const target = <HTMLElement>e.target;
        emit("content", target.innerHTML, getCaretPosition(), target.id);
    };

    const fill = () => {
        Array.from(document.getElementsByClassName('handle-rot')).forEach(element => {
            (<HTMLElement>element).style.display = "block";
        });
    };

    const delete_elem = (e: KeyboardEvent) => {
        emit("delete", (<HTMLElement>e.target).id);
    };
</script>