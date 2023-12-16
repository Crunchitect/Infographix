<template>
    <div>
        <h1>{{ language == "en" ? "Sign Up" : "สมัครบัญชีใหม่" }}</h1>
        <form @submit.prevent="signup">
            <input type="submit" value="With Google">
        </form>
    </div>
</template>

<script lang="ts">
    import { supabase } from '@/lib/supabase';
    export default {
        props: ["language"],
        methods: {
            async signup() {
                const {data, error} = await supabase.auth.signInWithOAuth({
                    provider: "google",
                    options: {
                        queryParams: {
                            access_type: 'offline',
                            prompt: 'consent'
                        }   
                    },
                    
                });
                // console.log(data, error)
            }
        }
    }
</script>

<style scoped>
    div {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }

    h1, input {
        text-align: center;
        font-size: 5rem;
    }

    .padding {
        padding: 10px;
    }

    input {
        width: 80vw;
    }
</style>