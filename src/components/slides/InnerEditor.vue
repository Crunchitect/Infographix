<!-- 
    The $refs thing is only i know... but it gets the job done quite amazingly, actually.
    https://stackoverflow.com/questions/55379483/can-you-pass-an-element-to-a-function-within-the-template-in-vue
-->
<template v-if="$refs">
    <div ref="ctx" class="ctx">
        <DraggableResizableVue
            v-for="(element, index) in data?.content"
            @dragging="(x: number, y: number) => edit_pos(x, y, (<HTMLElement[]>$refs[`draggable${index}`]))"
            @resizing="
                (x: number, y: number, w: number, h: number) => 
                    edit_scale(x, y, w, h, (<HTMLElement[]>$refs[`draggable${index}`]))
            "
            v-model:x="element.position.x"
            v-model:y="element.position.y"
            v-model:w="element.position.w"
            v-model:h="element.position.h"
        >
            <component 
                :ref="`draggable${index}`"
                :is="element.tag" 
                :id="element.id"
                :style="{
                    ...element.styles,
                    color: 'black',
                    'font-size': `${element.position.h / 3}px`,
                    'text-align': 'center'
                }"
                v-bind="element.attrs"
                contenteditable
                @input="edit_content"
            >
                {{ element.content }}
            </component>
        </DraggableResizableVue>
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
</style>

<script lang="ts" setup>
    import type { PropType } from 'vue';
    import { getCaretPosition } from '@/lib/caret_position';

    // @ts-ignore
    import DraggableResizableVue from 'draggable-resizable-vue3';

    type Element = {
        id: string,
        tag: string,
        position: {x: number, y: number, w: number, h: number},

        styles?: {[key: string]: string | number | null},
        attrs?: {[key: string]: string},
        content?: string,
    };

    type Slide = {
        id: string,
        content: Element[]
    };

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
        (e: "content", content: string, caret_pos: number, id: string): void
    }>();

    const edit_pos = (left: number, top: number, ref: HTMLElement[]) => {
        emit("drag", left, top, ref[0].id);
    };

    const edit_scale = (x: number, y: number, w: number, h: number, ref: HTMLElement[]) => {
        ref[0].style.fontSize = `${h/3}px`;
        emit("resize", x, y, w, h, ref[0].id);
    };

    const edit_content = (e: InputEvent) => {
        const target = <HTMLElement>e.target;
        emit("content", target.innerText, getCaretPosition(), target.id);
    }
</script>