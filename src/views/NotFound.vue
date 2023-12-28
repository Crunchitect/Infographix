<template>
    <div class="big">
        <div :class="['glitch', val === '404' ? 'tb' : 'ts']">{{ val }}</div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, onBeforeMount } from 'vue';

    const val = ref('404');
    const callback = ref(true);

    onMounted(async () => {
        doThingy();
    });

    onBeforeMount(() => {
        callback.value = false;
    });

    const doThingy = async () => {
        val.value = '[NOT FOUND]'
        await new Promise(r => setTimeout(r, 150));
        val.value = '404'
        if (callback.value) {
            setTimeout(doThingy, Math.random() * 5000)
        }
    }

</script>

<style scoped>
    div.big {
        overflow: hidden;
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: row wrap;
        place-content: center;
    }

    div.tb {
        font-size: 15rem;
    }
    div.ts {
        margin-top: 5vh;
        font-size: 9rem;
    }
</style>