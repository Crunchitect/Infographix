<template>
    <div :class="['metadata', opened ? 'op' : 'cl']">
        <div :class="['content', opened ? 'op' : 'cl']">
            <h1>{{ name }}</h1>
            <p><strong>{{ language == 'en' ? "Size" : "ขนาด" }}:</strong> 
                {{ width }} x {{ height }}
            </p>
        </div>
    </div>
    <div :class="['chevron', opened ? 'op' : 'cl']" @click="toggle">
        <i class="fa-solid fa-chevron-up fa-xs"></i> 
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';

    const props = defineProps({
        name: String,
        width: String,
        height: String,
        language: String
    });

    const opened = ref(true);

    const toggle = () => {
        opened.value = !opened.value;
    }
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
        background-color: #222;
        width: fit-content;
        padding: 2px;
        padding-left: 15px;
        padding-right: 15px;
        border-radius: 30px;
        transform: translateY(-50%);
        margin: auto;
        transition: transform 500ms cubic-bezier(0, 1.07, 0.28, 1.15);
    }

    .chevron.op {
        transform: translateY(-50%) rotateX(180deg);
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