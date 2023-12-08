<template>
    <div class="userblock">
        <img :src="user.user_metadata.avatar_url">
        <h1>{{  user.user_metadata.name  }}</h1>
    </div>
</template>

<style scoped>
    h1 {
        font-size: 5rem;
    }

    .userblock {
        width: 80vw;
        margin: auto;
        background-color: #222;
        border-radius: 10vw 10vw;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-evenly;
        /* gap: 5vw; */
    }

    img {
        border-radius: 101%;
        transform: scale(1.5);
    }
</style>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { createClient } from '@supabase/supabase-js';

    const supabase = createClient("https://uhtmxrngduhmkroxbcdk.supabase.co", import.meta.env.VITE_SUPABASE_KEY);
    let user = ref({} as any);
    const route = useRoute();
    const router = useRouter();
    if (!route.hash) {
        router.push('/404')
        throw new Error();
    } else {
        const client_token = route.hash.slice(1).split('&')[0].split('=')[1];
        // const requester = new XMLHttpRequest();
        // requester.open("GET", `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${client_token}`, false)
        // requester.send(null)
        // debugger;
        (async () => {
            const { data: { user: user_ } } = await supabase.auth.getUser();
            user.value = user_;
            console.log(user.value)
        })();
    }

</script>