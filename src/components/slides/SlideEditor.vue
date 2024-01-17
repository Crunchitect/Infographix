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
                @rotate="rotate"
                @keydown.delete="delete_el"
                @content="content"
            />
        </div>
        <button class="new" @click="show_add_popup = !show_add_popup">
            <i class="fa-solid fa-add"></i>
        </button>
        <div :class="['popup', show_add_popup ? 'show' : 'hide' ]">
            <h1>{{ language == "en" ? "Add..." : "เพิ่ม..." }}</h1>
            <div class="selection">
                <Card class="card" icon="heading" :heading="language == 'en' ? 'Header' : 'หัวข้อ'" @click="new_elem('h1')"></Card>
                <Card class="card fa-sm" icon="heading" :heading="language == 'en' ? 'Subheader' : 'หัวข้อย่อย'" @click="new_elem('h2')"></Card>
                <Card class="card" icon="paragraph" :heading="language == 'en' ? 'Paragraph' : 'ข้อความ'" @click="new_elem('p')"></Card>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
        position: fixed;
        right: 5%;
        bottom: 5%;
        width: fit-content;
        border-radius: 100%;
        min-width: 3rem;
        min-height: 3rem;
        margin-left: auto;
        aspect-ratio: 1 / 1;
    }
    .popup {
        position: fixed;
        right: 10%;
        bottom: 5%;
        width: fit-content;
        min-width: 3rem;
        min-height: 3rem;
        margin-left: auto;
        background: #222;
        border-radius: 10px;
        border-bottom-right-radius: 0;
        padding: 20px;
        margin: 1px;
        transform-origin: 100% 100%;
        transition: transform 250ms cubic-bezier(0.34, 1.35, 0.54, 1.4),
                    opacity 250ms cubic-bezier(0.34, 1.35, 0.54, 1.4);
    }

    .popup.hide {
        transform: scale(0);
        opacity: 0;
    }

    .popup.show {
        transform: scale(1);
        opacity: 1;
    }

    .card {
        max-width: 20vw;
        max-height: 5vh;
        border-radius: 10px;
        padding: 20px;
        transition: transform 250ms cubic-bezier(0.34, 1.35, 0.54, 1.4);
    }

    .card:hover {
        transform: scale(1.2);
    }
</style>

<script lang="ts" setup>
    import { watchEffect, ref, type PropType } from 'vue';
    import type { Slide } from '@/lib/types';
    import Card from '../Card.vue';

    import InnerEditor from '@/components/slides/InnerEditor.vue';

    const props = defineProps({
        slide: Object as PropType<Slide>,
        width: String,
        height: String,
        language: String
    });

    const emit = defineEmits<{
        (e: "drag", x: number, y: number, id: string): void,
        (e: "resize", x: number, y: number, w: number, h: number, id: string): void,
        (e: "rotate", r: number, id: string): void,
        (e: "content", content: string, caret_pos: number, id: string): void,
        (e: "new_elem", tag: string, id: string): void,
        (e: "delete", id: string): void
    }>();

    const new_elem = (tag: string) => {
        if (!props.slide) return "cope";
        emit("new_elem", tag, props.slide.id);
        show_add_popup.value = false;
    };

    let num_width = ref(0), num_height = ref(0);
    const show_add_popup = ref(false);

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

    const rotate = (r: number, id: string) => {
        emit("rotate", r, id);
    }

    const content = (content: string, caret_pos: number, id: string) => {
        emit("content", content, caret_pos, id);
    };

    const delete_el = (id: string) => {
        emit("delete", id);
    };

</script>