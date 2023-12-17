<template>
    <div class="user">
        <div class="userblock">
            <img class="profile" :src="(user?.user_metadata?.avatar_url) ?? 'no'" referrerpolicy="no-referrer">
            <h1>{{  (user?.user_metadata?.name) ?? "Loading..."  }}</h1>
        </div>
        <button class="sign-out" @click="signout">Sign Out</button>
    </div>
    <div class="projects">
        <h1 class="big">Projects</h1>
    </div>
    <div class="project-panel">
        <p v-if="!(project_data?.data[0])" class="blank">No Projects Found... Maybe create a new one?</p>
        <div class="project" :style="`--anim-order: ${index}`" v-for="(project, index) in project_data?.data">
            <p>{{ project?.name ?? "What the fuck is in ur config?" }}</p>
        </div>
    </div>
    <ErrorBox v-if="project_data?.error" :msg="project_data?.error"/>
</template>

<style scoped>
    .user {
        width: 80vw;
        display: flex;
        flex-flow: row nowrap;
        margin: auto;
        justify-content: space-between;
        margin-top: 5%;
        margin-bottom: 5%;
        align-items: center;
    }

    img.profile {
        border-radius: 50%;
        aspect-ratio: 1 / 1;
    }

    .userblock { 
        display: flex;
        flex-flow: row nowrap;
        gap: 10%;
        align-items: center;
    }

    .userblock h1 {
        font-size: 3rem;
        margin: 0;
        white-space: nowrap;
    }

    .user button {
        background-color: #ff000074;
        color: white;
        border: 1px solid red;
        height: 100%;
        padding: 2%;
        font-size: medium;
        font-weight: lighter;
        border-radius: 30px;
        transition: background-color 500ms, font-size 500ms;
    }

    .user button:hover {
        background-color: red;
        font-weight: bold;
        font-size: larger;
    }

    .big {
        font-size: 5rem;
        margin-left: 5%;
    }

    .project {
        background-color: #222;
        padding: 1%;
        border-radius: 10px;
        display: flex;
        max-width: 200px;
        flex-flow: column nowrap;
        animation: showProject 0.5s cubic-bezier(0.58, 0.85, 0.78, 1.29) calc(var(--anim-order) * 100ms) forwards;
        transform: translateX(200%);
        opacity: 0;
        font-weight: bold;
        margin: 1%;
        text-overflow: clip;
    }

    @keyframes showProject {
        to {
            transform: none;
            opacity: 1;
        }
    }

    .blank {
        opacity: 0.8;
        color: #aaa;
        text-align: center;
    }
</style>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { supabase } from '@/lib/supabase';
    import ErrorBox from '@/components/ErrorBox.vue';
    
    const props = defineProps({
        language: String
    });

    let user = ref({} as any);
    const route = useRoute();
    const router = useRouter();
    let user_data = supabase.auth.getUser().then(resp => {
        if (resp.error){
            console.clear();
            router.push('/sign-up');
        } 
    })
    if (!route.hash && !user_data) {
        console.log(user_data)
        router.push('/sign-up');
    } else {
        const client_token = route.hash.slice(1).split('&')[0].split('=')[1];
        (async () => {
            const { data: { user: user_ } } = await supabase.auth.getUser();
            user.value = user_;
        })();
    }

    const signout = async () => {
        let { error } = await supabase.auth.signOut(); 
        router.push('/');
        return error;
    };

    let project_data = ref({data: {}, error: null as any} as any);
    (async () => {
        project_data.value = await supabase.from("Projects").select("name")
    })();
</script>