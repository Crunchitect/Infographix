<template>
    <div>
        <div class="userblock">
            <img :src="user?.user_metadata?.avatar_url" referrerpolicy="no-referrer">
            <h1>{{  user?.user_metadata?.name  }}</h1>
        </div>
        <p>{{ user?.user_metadata?.avatar_url }}</p>
        <button class="sign-out" @click="signout">Sign Out</button>
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
    import { supabase } from '../composables/supabase';

    let user = ref({} as any);
    const route = useRoute();
    const router = useRouter();

    
    if (!route.hash) {
        router.push('/404');
    } else {
        const client_token = route.hash.slice(1).split('&')[0].split('=')[1];
        (async () => {
            const { data: { user: user_ } } = await supabase.auth.getUser();
            user.value = user_;
            console.log(user.value)
        })();
    }

    const signout = async () => {
        let { error } = await supabase.auth.signOut(); 
        router.push('/');
        return error;
    };

</script>