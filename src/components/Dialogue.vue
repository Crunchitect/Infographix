<template>
    <div class="backdrop" v-show="_opened" @click.self="close">
        <div :class="{modal: true, cpb: theme === 'corporate-bullshit'}">
            <i 
            :class="['fa-solid', xactive ? 'fa-circle-xmark' : 'fa-xmark', xactive ? 'fa-1.5x' : '']"
            @mouseover="toggle_x"
            @mouseout="toggle_x"
            @click="close"
            ></i>
            <h1>{{ title }}</h1>
            <p>{{ content }}</p>
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, toRef, watch } from 'vue';

    const props = defineProps({
        title: String,
        content: String,
        theme: String,
        opened: Boolean
    });

    const xactive = ref(false);

    const _opened = ref(false);
    const opened = toRef(props, 'opened');

    const toggle_x = () => xactive.value = !xactive.value;
    const close = () => _opened.value = false;

    watch(opened, () => {
        _opened.value = !_opened.value;
    })
    
</script>

<style scoped>

    .modal {
        background-color: #333;
        padding: 20px;
        border-radius: 10px;
        width: 50vw;
        height: fit-content;
        margin: 10%;
        z-index: 6942069420;
    }

    .modal.cpb {
        background-color: rgb(255, 134, 134);
        padding: 20px;
        border-radius: 10px;
        width: 50vw;
        height: 30vh;
        margin: 10%;
    }

    .backdrop {
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.8);
        position: absolute;
        display: flex;
        place-content: center;
        z-index: 69420;
    }

    .fa-xmark, .fa-circle-xmark {
        float: right;
    }

    .fa-circle-xmark {
        color: rgb(255, 134, 134);
    }
</style>
