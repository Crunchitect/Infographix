<template>
    <div class="flex">
        <div class="slides grid">
            <div class="item">
                <div class="slide"></div>
            </div>
        </div>
        <button @click="() => {new_slide(); $emit('new_slide');}"><i class="fa-solid fa-add"></i> New Slide</button>
    </div>
</template>

<style>
    .flex {
        display: flex;
        flex-flow: column nowrap;
    }

    .slides {
        width: 15vw;
        height: 97% !important;
        background-color: #181818;
        /* display: flex;
        flex-flow: column nowrap;
        align-items: center; */
        gap: 10px;
        overflow-y: auto;
    }

    .slides::before, .slides::after { content: "" }

    .slide {
        height: 5vh;
        background-color: white;
        border-radius: 5px;
        aspect-ratio: v-bind(num_width) / v-bind(num_height);
        /* margin: auto; */
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
    import { onMounted, ref, watchEffect } from 'vue';

    import Muuri from 'muuri';

    // This syntax is weird...
    defineEmits<{
        (e: "new_slide"): void
    }>();

    type Element = {
        id: string,
        tag: string,
        attrs: {[key: string]: string},
        content: string,
        position: {x: number, y: number}
    };
    type Slide = Element[];

    const props = defineProps({
        slides: Array as PropType<Slide[]>,
        width: String,
        height: String
    });

    let num_width = ref(0), num_height = ref(0);
    let new_slide = () => {};

    watchEffect(() => {
        num_width .value = Number((/\d+/g.exec(props.width ?? "1920px")  ?? [0])[0]);
        num_height.value = Number((/\d+/g.exec(props.height ?? "1080px") ?? [0])[0]);
    });

    onMounted(() => {
        let grid = new Muuri('.grid', {
            dragEnabled: true,
            layout: {
                horizontal: false
            }
        });

        new_slide = () => {
            
            let item = document.createElement('div');
            item.classList.add('item');

            let slide = document.createElement('div');
            item.classList.add('slide');

            item.appendChild(slide);
            grid.add(item);
        };
    });

</script>