<template>
    <div class="error">
        <i class="fa-solid fa-circle-exclamation"></i>
        <p>
            <strong>Error: </strong>
            {{ msg }}
        </p>
    </div>
</template>

<style scoped>
    .error {
        background-color: #ff00004d;
        padding: 2%;
        font-size: 1.75rem;
        display: flex;
        flex-flow: row nowrap;
        border-radius: 10px;
        border: 1px solid red;
        justify-content: space-between;
        gap: 5%;
        margin: 10%;
    }

    .error * {
       margin: 0;
    }
</style>

<script setup lang="ts">
    const props = defineProps(['msg']);
</script>