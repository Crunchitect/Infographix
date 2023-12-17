<template>
    <div>
        <h1>{{ language == "en" ? "Sign Up" : "สมัครบัญชีใหม่" }}</h1>
        <form @submit.prevent="signup">
            <input type="submit" value="With Google">
        </form>
        <ErrorBox v-if="error" :msg="error"/>
    </div>
</template>

<script lang="ts">
    import { supabase } from '@/lib/supabase';
    import { AuthError } from '@supabase/supabase-js';
    import ErrorBox from "../components/ErrorBox.vue";
    export default {
        props: ["language"],
        components: { ErrorBox },
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
                this.error = error;
                // console.log(data, error)
            }
        },
        data() {
            return {
                error: null as (null | string | AuthError)
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