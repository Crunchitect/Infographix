<template>
    <Dialogue :title="lang.new_project" :opened="opened">
        <p style="font-size: 1.5rem; margin: 0;">{{ lang.project_name }}</p>
        <form @submit.prevent="new_project(!project_name ? lang.no_project : project_name)">
            <input type="text" :placeholder="lang.untitled_project" v-model="project_name">
            <br>
            <br>
            <button class="new bouncy">{{ lang.new_project + "!"}}</button>
        </form>
    </Dialogue>
    <div class="user">
        <div class="userblock">
            <img class="profile" :src="(user?.user_metadata?.avatar_url) ?? 'no'" referrerpolicy="no-referrer">
            <h1>{{  (user?.user_metadata?.name) ?? lang.loading  }}</h1>
        </div>
        <button class="sign-out" @click="signout">{{ lang.sign_out }}</button>
    </div>
    <div class="projects">
        <h1 class="big">{{ lang.projects }}</h1>
        <button @click="show_modal" class="bouncy"><i class="fa-solid fa-add"></i> {{ lang.new_project }}</button>
    </div>
    <div class="project-panel">
        <p v-if="!(project_data?.data[0])" class="blank">{{ lang.no_project }}</p>
        <div 
            class="project bouncy" 
            :style="`--anim-order: ${index}`" 
            @click="open_project(project)"
            v-for="(project, index) in project_data?.data"
        >
            <p>{{ project?.name ?? "What the fuck is in ur config?" }}</p>
        </div>
    </div>
    <ErrorBox v-if="error" :msg="project_data?.error"/>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { supabase } from '@/lib/supabase';
    import ErrorBox from '@/components/ErrorBox.vue';
    import Dialogue from '@/components/Dialogue.vue';
    import { generate_uuid_v4 } from '@/lib/generate_uuid';
    
    const props = defineProps({
        language: String
    });

    const lang = computed(() => {
        switch (props.language) {
            case 'en':
                return {
                    projects: "Projects",
                    new_project: "New Project",
                    untitled_project: "Untitled Project",
                    loading: "Loading...",
                    no_project: "No Projects Found... Maybe create a new one?",
                    project_name: "Project Name",
                    sign_out: "Sign Out"
                };
            default:
                return {
                    projects: "โปรเจกต์",
                    project_name: "โปรเจกต์ชื่อว่า...",
                    new_project: "สร้างโปรเจกต์ใหม่",
                    untitled_project: "ไม่มีชื่อ",
                    loading: "โหลดอยู่ค้าบ",
                    no_project: "ไม่มีโปรเจกต์เลย... ลองสร้างก่อนไหม :]",
                    sign_out: "ออกละ ไม่อยู่ละ"
                }
        }
    });

    let opened = ref(false);
    let user = ref({} as any);
    let error = null as any;
    let project_name = ref("");
    const route = useRoute();
    const router = useRouter();
    let user_data = supabase.auth.getUser().then(resp => {
        if (resp.error){
            console.clear();
            router.push('/sign-up');
        } 
    })
    if (!route.hash && !user_data) {
        router.push('/sign-up');
    } else {
        const client_token = route.hash.slice(1).split('&')[0].split('=')[1];
        (async () => {
            const { data: { user: user_ } } = await supabase.auth.getUser();
            user.value = user_;
        })();
    }

    const show_modal = () => {
        opened.value = !opened.value;
    };

    const signout = async () => {
        let { error: error_local } = await supabase.auth.signOut(); 
        if (error_local) {
            error = "You are stuck here. No changing.";
            return error;
        }
        router.push('/');
    };

    const new_project = async (name: string) => {
        show_modal();

        const team_string = [{
                        uid: user.value.id,
                        status: "owner"
                    }];
        const { data: team_data, error: team_error } = await supabase
            .from("Teams")
            .insert([
                {
                    team_members: team_string
                }
            ])
            .select();
        if (team_error) {
            error = "Please wait until we have a stable connection to the database.";
            return team_error;
        }
        const team_id = team_data[0].id;
        const { data: proj_data, error: proj_error } = await supabase
                .from("Projects")
                .insert([
                    {
                        name: name ?? "Untitled Project",
                        type: "slide",
                        content: {
                            metadata: {
                                width: "1920px",
                                height: "1080px"
                            },
                            data: [
                                {
                                    id: generate_uuid_v4(),
                                    content: [{
                                        id: generate_uuid_v4(),
                                        tag: "h1",
                                        content: "Hello!",
                                        position: {
                                            x: 69,
                                            y: 420,
                                            w: 420,
                                            h: 69
                                        }
                                    }]
                                },
                            ]
                        },
                        team_id: team_id
                    }
                ])
                .select();
        if (proj_error) {
            error = "Please wait until we have a stable connection to the database.";
            return proj_error;
        }
        router.push(`/${proj_data[0].type}/${proj_data[0].id}`);
    };

    const open_project = async (a: {name: string, id: string, type: string}) => {
        router.push(`/${a.type}/${a.id}`)
    }

    let project_data = ref({data: {}, error: null as any} as any);
    (async () => {
        project_data.value = await supabase.from("Projects").select("name,id,type");
    })();
</script>

<style scoped>
    .new {
        background-image: none !important;
        background-color: #222 !important;
        font-size: 1rem;
        /* margin: 20px; */
        border-radius: 10px;
        outline: none;
        border: 1px solid black;
    }

    input {
        width: 80%;
        height: 20%;
        border-radius: 10px;
        font-size: 1.5rem;
    }

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
        background-image: none !important;
        border: none !important;
        background-color: #222 !important;
        padding: 1%;
        border-radius: 10px;
        display: flex;
        /* max-width: 200px; */
        flex-flow: column nowrap;
        animation: showProject 0.5s cubic-bezier(0.58, 0.85, 0.78, 1.29) calc(var(--anim-order) * 100ms) forwards;
        transform: translateX(200%);
        opacity: 0;
        font-weight: bold;
        margin: 1%;
        text-overflow: clip;
        aspect-ratio: 16 / 9;
        display: flex;
        flex-flow: row wrap;
        place-content: center;
        backface-visibility: hidden;
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

    .projects {
        display: flex;
        align-items: center;
        flex-flow: row nowrap;
        gap: clamp(30px, 5%, 50px);
    }

    .project-panel {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
    }

</style>
