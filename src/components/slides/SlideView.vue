<template>
    <div class="flex">
        <Draggable 
            :list="slides"
            group="slide" 
            @start="drag=true" 
            @end="drag=false" 
            item-key="id"
            class="slides grid">
            <template #item="{element, index}">
                <div class="flexx">
                    <p 
                        class="delete-p"
                        @mouseenter="show_trash_can"
                        @mouseleave="show_number($event, index + 1)"
                        @click="delete_slide(element)"
                    >
                        {{ index + 1 }}
                    </p>
                    <SlidePreview
                        :data="element"
                        :width="num_width"
                        :height="num_height"
                        :class="['slide', index == selected_index ? 'fancy' : '']"
                        :style="{'--anim-order': index}"
                        @click="selected(index)"
                    />
                </div>
            </template>
        </Draggable>
        <button @click="$emit('new_slide')"><i class="fa-solid fa-add"></i> New Slide</button>
    </div>
</template>

<style>
    .flex {
        display: flex;
        flex-flow: column nowrap;
    }

    .flexx {
        display: flex;
        flex-flow: row nowrap;
    }

    .flexx .delete-p {
        padding-left: 20px;
        /* opacity: 0.8; */
        color: #fffa;
        font-weight: 700;
        font-size: 1.2rem;
        transition: color 500ms ease-out;
    }

    .delete-p:hover {
        color: red;
    }

    .slides {
        /* height: 97% !important; */
        /* max-height: calc(97%) !important; */
        background-color: #181818;
        overflow-y: scroll;
        width: 15vw;
        height: calc(2em + 84.4vh - (5.5vh * v-bind(is_meta_opened)));
    }

    .slides::before, .slides::after { content: "" }

    .slide {
        margin-left: auto;
        margin-right: auto;
        margin-top: 20px;
        margin-bottom: 20px;
        overflow: hidden;
        display:block;
        z-index: 69420;
        background-color: white;
        color: black;
        border-radius: 5px;
        aspect-ratio: v-bind(num_width) / v-bind(num_height);
        min-width: 80%;
        max-width: 80%;
        transform: rotate(0deg);
        transition: transform 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .slide[draggable="true"] {
        opacity: 0.6;
    }

    .slide.sortable-chosen {
        transform: rotate(-10deg) scale(0.8);
    }

    .fancy {
        border: 5px solid limegreen;
    }

    button {
        outline: none;
        border: none;
        background: #333;
        color: white;
        font-size: 1.25rem;
        border-radius: 10px;
    }
</style>

<script lang="ts" setup>

    import type { PropType } from 'vue';
    import { ref, watchEffect } from 'vue';
    import Draggable from 'vuedraggable';
    import SlidePreview from '@/components/slides/SlidePreview.vue';

    import { metaState } from '@/state/is_meta_opened';

    let is_meta_opened = ref(Number(!metaState.value.is_opened));

    let selected_index = ref(0);
    // This syntax is weird...
    const emits = defineEmits<{
        (e: "new_slide"): void,
        (e: "select", value: number): void,
        (e: "delete_slide", id: string): void
    }>();

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
        slides: Array as PropType<Slide[]>,
        width: String,
        height: String
    });
    const drag = ref(false);

    let num_width = ref(0), num_height = ref(0);

    watchEffect(() => {
        num_width .value = Number((/\d+/g.exec(props.width  ?? "1920px") ?? [0])[0]);
        num_height.value = Number((/\d+/g.exec(props.height ?? "1080px") ?? [0])[0]);
    });

    const selected = (index: number) => {
        selected_index.value = index;
        emits("select", index);
    };

    const show_trash_can = (e: MouseEvent) => {
        (<HTMLElement>e.target).innerHTML = '<i class="fa-solid fa-trash fa-sm"></i>'
    };

    const show_number = (e: MouseEvent, index: number) => {
        (<HTMLElement>e.target).innerHTML = index.toString();
    };

    const delete_slide = (slide: Slide) => {
        emits("delete_slide", slide.id);
    };

</script>