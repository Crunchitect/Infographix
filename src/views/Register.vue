<template>
    <div>
        <h1>{{ language == "en" ? "Sign Up" : "สมัครบัญชีใหม่" }}</h1>
        <form @submit.prevent="signup">
            <button type="submit"><i class="fa-brands fa-google"></i> With Google</button>
        </form>
        <ErrorBox v-if="error" :msg="error"/>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { supabase } from '@/lib/supabase';
    import { AuthError } from '@supabase/supabase-js';
    import ErrorBox from "../components/ErrorBox.vue";

    const router = useRouter();

    const error = ref(null as (null | string | AuthError));

    const props = defineProps({
        language: String
    });


    const signup = async () => {
        const {data, error: error_} = await supabase.auth.signInWithOAuth({
                    provider: "google",
                    options: {
                        queryParams: {
                            access_type: 'offline',
                            prompt: 'consent'
                        }   
                    },
                    
                });
        error.value = error_;
    }

    onMounted(() => {
        supabase.auth.getUser().then(resp => {
            if (!resp.error) router.push('/projects');
        })
    })
</script>

<style scoped>
    div {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }

    h1 {
        text-align: center;
        font-size: 5rem;
    }

    .padding {
        padding: 10px;
    }

    button {
        background: repeating-linear-gradient(to right, #4286f4 0% 25%, #DB4437 25% 50%,#F4B400 50% 75%, #0F9D58 75% 100%);
        width: 80vw;
        font-size: 5rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
        border: none;
        opacity: 0.8;
        font-weight: normal;
        transition: background-position 500ms, color 500ms, opacity 500ms, font-weight 500ms;
        transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    
    button:hover {
        background-position: 20vw;
        color: white;
        opacity: 1.2;
        font-weight: bold;
    }
</style>