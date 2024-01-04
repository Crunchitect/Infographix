<template>
    <div class="container">
        <div class="preview">
            <InnerEditor 
                :data="slide" 
                :width="num_width" 
                :height="num_height"
                :log="'l'"
                class="slide"
                @drag="drag"
                @resize="resize"
                @content="content"
            />
        </div>
        <div class="flex-row"> 
            <button class="new" @click="new_elem('h1')"><i class="fa-solid fa-add"></i> h1</button>
            <button class="new" @click="new_elem('p')"><i class="fa-solid fa-add"></i> p</button>
        </div>
    </div>
</template>

<style scoped>

    .flex-row {
        display: flex;
        flex-flow: row nowrap;
        gap: 20px;
    }
    .container {
        flex-grow: 1;
        display: flex;
        flex-flow: column wrap;
        place-content: center;
    }

    .slide {
        background-color: white;
        width: 100%;
        height: 100%;
        margin: auto;
    }

    .preview {
        aspect-ratio: v-bind(num_width) / v-bind(num_height);
        min-width: 80%;
    }

    .new {
        width: fit-content;
        border-radius: 100%;
        min-width: 3rem;
        min-height: 3rem;
        margin-left: auto;
    }
</style>

<script lang="ts" setup>
    import { watchEffect, ref, type PropType } from 'vue';

    import InnerEditor from '@/components/slides/InnerEditor.vue';
import { preProcessFile } from 'typescript';

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
        slide: Object as PropType<Slide>,
        width: String,
        height: String
    });

    const emit = defineEmits<{
        (e: "drag", x: number, y: number, id: string): void,
        (e: "resize", x: number, y: number, w: number, h: number, id: string): void,
        (e: "content", content: string, caret_pos: number, id: string): void,
        (e: "new_elem", tag: string, id: string): void
    }>();

    const new_elem = (tag: string) => {
        if (!props.slide) return "cope";
        emit("new_elem", tag, props.slide.id);
    };

    let num_width = ref(0), num_height = ref(0);

    watchEffect(() => {
        num_width .value = Number((/\d+/g.exec(props.width  ?? "1920px") ?? [0])[0]);
        num_height.value = Number((/\d+/g.exec(props.height ?? "1080px") ?? [0])[0]);
    });

    const drag = (x: number, y: number, id: string) => {
        emit("drag", x, y, id);
    };

    const resize = (x: number, y: number, w: number, h: number, id: string) => {
        emit("resize", x, y, w, h, id);
    };

    const content = (content: string, caret_pos: number, id: string) => {
        emit("content", content, caret_pos, id);
    };

</script>