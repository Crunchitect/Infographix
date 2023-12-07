<template>
    <h1>Please Wait</h1>
</template>

<style scoped>
    h1 {
        font-size: 7rem;
        text-align: center;
    }
</style>

<script setup lang="ts">
    import { useRoute, useRouter } from 'vue-router';
    const route = useRoute();
    const router = useRouter();
    if (!route.hash) {
        router.push('/404')
        throw new Error();
    } else {
        const client_token = route.hash.slice(1).split('&')[0].split('=')[1]
        const requester = new XMLHttpRequest();
        requester.open("GET", `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${client_token}`, false)
        requester.send(null)
        debugger;
    }

</script>