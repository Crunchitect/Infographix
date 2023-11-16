<script setup>

</script>

<template>
    <div :class="['block', rev ? 'rev' : '']">
        <div class="icon">
            <i :class="['fa-solid', 'fa-2x', 'fa-' + icon]"></i>
        </div>
        <div class="padding"></div>
        <div>
            <h2>{{ heading }}</h2>
            <p><slot></slot></p>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Card',
        props: ['heading', 'icon', 'rev']
    }
</script>

<style scoped>
    .block {
        background-color: #333;
        width: 80vw;
        margin: auto;
        padding: 20px;
        border-radius: 10px;
        display: flex;
        flex-flow: row nowrap;
        margin-top: 3vh;
        margin-bottom: 3vh;
    }

    .icon {
        width: 10vh;
        height: 10vh;
        background-color: #222;
        display: flex;
        flex-flow: column wrap;
        place-content: center;
        border-radius: 10px;
    }

    .padding {
        padding-left: 5vw;
    }

    h2 {
        margin: 0;
        font-size: 1.9rem;
    }

    .rev {
        flex-direction: row-reverse;
        justify-content: space-between;
    }
</style>