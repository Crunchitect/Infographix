<template>
    <div :class="['metadata', opened ? 'op' : 'cl']">
        <div :class="['content', opened ? 'op' : 'cl']">
            <h1>{{ name }}</h1>
            <p><strong>{{ language == 'en' ? "Size" : "ขนาด" }}:</strong> 
                {{ width }} x {{ height }}
            </p>
        </div>
    </div>
    <i :class="['fa-solid', 'fa-chevron-up', 'fa-xs', 'chevron', opened ? 'op' : 'cl']" @click="toggle"></i> 
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { metaState } from '@/state/is_meta_opened';

    const props = defineProps({
        name: String,
        width: String,
        height: String,
        language: String
    });

    const opened = ref(true);

    const toggle = () => {
        opened.value = !opened.value;
        metaState.value.set_is_opened(opened.value);
    };
</script>

<style scoped>
    .metadata {
        background-color: #222;
        width: 100vw;
        height: fit-content;
        max-height: 8vh;
        transition: max-height 250ms ease-out;
    }

    .content {
        padding: 1%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        max-height: 10vh;
        transition: max-height 250ms ease-out, transform 250ms ease-out;
    }

    .content.op {
        max-height: 0;
        transform: scale(0);
    }

    .content p {
        font-size: 1.5rem;
    }

    .chevron {
        position: absolute;
        background-color: #222;
        width: fit-content;
        padding: 15px;
        border-radius: 30px;
        transition: transform 500ms cubic-bezier(0, 1.07, 0.28, 1.15), top 500ms cubic-bezier(0, 1.07, 0.28, 1.15);
        top: calc(10vh + 2rem);
        left: 50vw;
        transform: translateY(-50%);
    }

    .chevron.op {
        top: calc(2vh + 2rem);
        transform: translateY(50%) rotateX(180deg);
    }

    .metadata.op {
        max-height: 10px;
    }

    .content h1 {
        margin: 0;
        font-size: 1.5rem;
    }

    .content > * {
        margin: 0;
    }
</style>