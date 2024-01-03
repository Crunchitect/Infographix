<template>
    <div class="container">
        <div class="preview">
            <InnerEditor 
                :data="slide" 
                :width="num_width" 
                :height="num_height"
                :log="'l'"
                class="slide"
            />
        </div>
    </div>
</template>

<style scoped>
    .container {
        flex-grow: 1;
        display: flex;
        flex-flow: row wrap;
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
</style>

<script lang="ts" setup>
    import { watchEffect, ref, type PropType } from 'vue';

    import InnerEditor from '@/components/slides/InnerEditor.vue';

    type Element = {
        id: string,
        tag: string,
        position: {x: number, y: number},
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

    let num_width = ref(0), num_height = ref(0);

    watchEffect(() => {
        num_width .value = Number((/\d+/g.exec(props.width  ?? "1920px") ?? [0])[0]);
        num_height.value = Number((/\d+/g.exec(props.height ?? "1080px") ?? [0])[0]);
    });

</script>