<template>
    <div class="flex">
        <div class="slides grid">
            <div class="slide"></div>
            <!-- <div class="item">
                <div class="slide"></div>
            </div> -->
        </div>
        <button><i class="fa-solid fa-add"></i> New Slide</button>
    </div>
</template>

<style>
    .flex {
        display: flex;
        flex-flow: column nowrap;
    }

    .slides {
        height: 97% !important;
        background-color: #181818;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        gap: 10px;
        overflow-y: auto;
        width: 15vw;
    }

    .slides::before, .slides::after { content: "" }

    .slide {
        background-color: white;
        border-radius: 5px;
        aspect-ratio: v-bind(num_width) / v-bind(num_height);
        min-width: 60%;
        max-width: 80%;
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

    // This syntax is weird...
    defineEmits<{
        (e: "new_slide"): void
    }>();

    type Element = {
        id?: string,
        tag?: string,
        attrs?: {[key: string]: string},
        content?: string,
        position?: {x: number, y: number}
    };
    type Slide = Element[];

    const props = defineProps({
        slides: Array as PropType<Slide[]>,
        width: String,
        height: String
    });

    const update_slide_ctx = {
        get() {
            // TODO: Make it work.
        },
        set() {
            // TODO: Make it work.
            return false;
        }
    };

    let slides_internal = new Proxy({} as Slide[], update_slide_ctx);
    let num_width = ref(0), num_height = ref(0);

    watchEffect(() => {
        num_width .value = Number((/\d+/g.exec(props.width  ?? "1920px") ?? [0])[0]);
        num_height.value = Number((/\d+/g.exec(props.height ?? "1080px") ?? [0])[0]);
    });

    watchEffect(() => {
        props.slides
    })

</script>