<template>
    <div class="center">
        <NuhUh class="nuh-uh"/>
    </div>
    <h1>{{ language === "en" ? "Nuh uh" : "ยุ่งไรค้าบ"}}</h1>
    <h2>{{ language === "en" ? "Permission Denied" : "ออกไปเลยครับสุดหล่อ"}}</h2>
</template>

<script lang="ts" setup>
    import NuhUh from '@/components/icons/NuhUh.vue';

    const props = defineProps({
        language: String
    });
</script>

<style scoped>
    h1, h2 {
        margin: 0;
        text-align: center;
    }

    .nuh-uh {
        width: 30vw;
        height: auto;
    }

    .center {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
    }

    h1 {
        font-size: 7rem;
    }
    
    h2 {
        font-size: 3rem;
    }
</style>